from flask import Blueprint, jsonify, session, request
from app.models import User,Product, db, ShoppingCart
from app.forms import ShoppingCartForm
from flask_login import current_user, login_user, logout_user, login_required


shoppingcart_routes = Blueprint('shoppingcart', __name__)


def error_thingy(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages




@shoppingcart_routes.route('/', methods=['GET'])
@login_required
def getshoppingcart():

    allShoppingcart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).all()

    return {'allCartProduct': [cart.to_dict() for cart in allShoppingcart]}


@shoppingcart_routes.route('/', methods=['POST'])
@login_required
def createShoppingCart():

    form = ShoppingCartForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        shoppingcartProductDeneme = ShoppingCart.query.filter(ShoppingCart.product_id == form.data['product_id'], ShoppingCart.user_id == current_user.id ).first()

        if(shoppingcartProductDeneme):
            shoppingcartProductDeneme.quantity = shoppingcartProductDeneme.quantity+form.data['quantity']
            db.session.add(shoppingcartProductDeneme)
            db.session.commit()
            return shoppingcartProductDeneme.to_dict()


        shoppingcartProduct = ShoppingCart(
            user_id = current_user.id,
            product_id = form.data['product_id'],
            quantity = form.data['quantity']
        )
        db.session.add(shoppingcartProduct)
        db.session.commit()
        return shoppingcartProduct.to_dict()
    return {'errors': error_thingy(form.errors)}, 401


@shoppingcart_routes.route('/delete/<shoppingcart_id>/', methods=['DELETE'])
@login_required
def deleteShoppingCart(shoppingcart_id):

    shoppingcart = ShoppingCart.query.get_or_404(shoppingcart_id)
    if shoppingcart.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(shoppingcart)
    db.session.commit()
    return {"id": shoppingcart_id}


@shoppingcart_routes.route('/deleteall/', methods=['DELETE'])
@login_required
def deleteShoppingCartAll():

    shoppingcart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).all()

    array = []

    for cart in shoppingcart:
        if cart.user_id == current_user.id:
            array.append(cart.id)
            db.session.delete(cart)


    db.session.commit()
    return {"arrayIds": array}



@shoppingcart_routes.route('/update/<shoppingcart_id>', methods=['PUT'])
@login_required
def updateShoppingCart(shoppingcart_id):

    shoppingcartProduct = ShoppingCart.query.get_or_404(shoppingcart_id)
    if shoppingcartProduct.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403


    form = ShoppingCartForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        shoppingcartProduct.quantity = form.data['quantity']

        db.session.add(shoppingcartProduct)
        db.session.commit()

        return shoppingcartProduct.to_dict()
    return {'errors': error_thingy(form.errors)}, 401
