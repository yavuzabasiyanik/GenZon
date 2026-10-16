from unicodedata import category
from flask import Blueprint, request
from app.models import User,Product, db
from app.forms import ProductForm
from flask_login import current_user, login_user, logout_user, login_required

import boto3
import botocore
import os
import uuid
from urllib.parse import urlparse

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

product_routes = Blueprint('product', __name__)



def error_thingy(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@product_routes.route('/', methods=['GET'])
def getAllProducts():

    allProducts = Product.query.all()

    return {'allProducts': [product.to_dict() for product in allProducts]}


@product_routes.route('/', methods=['POST'])
@login_required
def createProduct():

    # Either an uploaded file (needs S3 configured) or a link to an image
    image = request.files.get("image")
    image_url = request.values.get("image_url", "").strip()

    name = request.values["name"]
    description = request.values["description"]
    quantity = request.values["quantity"]
    price = request.values["price"]
    category = request.values["category"]

    errors = []
    if image:
        if not BUCKET_NAME:
            errors.append("image : Image uploads are not enabled, please use an image link")
        elif not allowed_file(image.filename):
            errors.append("image : File type not permitted")
    elif not image_url:
        errors.append("image : Image required")
    elif not (urlparse(image_url).scheme in ("http", "https")
              and urlparse(image_url).path.lower().endswith(tuple(f".{ext}" for ext in ALLOWED_EXTENSIONS))):
        errors.append("image : Image link must end in .png, .jpg, .jpeg or .gif")
    if not 4 <= len(name) <= 80:
        errors.append("name : Name must be between 4-80")
    if not 4 <= len(description) <= 1001:
        errors.append("description : Description must be between 4-1001")
    if not category:
        errors.append("category : Please choose a category")
    try:
        if not 1 <= int(price) <= 10000:
            errors.append("price : Price must be between 1-10000")
    except ValueError:
        errors.append("price : Price must be a number")
    try:
        if not 1 <= int(quantity) <= 10:
            errors.append("quantity : Quantity must be between 1-10")
    except ValueError:
        errors.append("quantity : Quantity must be a number")
    if errors:
        return {"errors": errors}, 400


    if image:
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"errors": ["image : Upload failed, please try again"]}, 400

        url = upload["url"]
    else:
        url = image_url

    product = Product(
        user_id = current_user.id,
        name = name,
        description = description,
        image_url = url,
        price = price,
        quantity = quantity,
        category = category
    )
    db.session.add(product)
    db.session.commit()
    return product.to_dict()


@product_routes.route('/delete/<product_id>', methods=['DELETE'])
@login_required
def deleteProduct(product_id):

    product = Product.query.get_or_404(product_id)
    if product.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(product)
    db.session.commit()
    return {"id": product_id}


@product_routes.route('/update/<product_id>', methods=['PUT'])
@login_required
def updateProduct(product_id):

    product = Product.query.get_or_404(product_id)
    if product.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    form = ProductForm()

    form['csrf_token'].data = request.cookies.get('csrf_token')

    if form.validate_on_submit():

        product.name = form.data['name']
        product.description = form.data['description']
        product.image_url = form.data['image_url']
        product.price = form.data['price']
        product.quantity = form.data['quantity']
        product.category = form.data['category']

        db.session.commit()
        return product.to_dict()
    return {'errors': error_thingy(form.errors)}, 401
