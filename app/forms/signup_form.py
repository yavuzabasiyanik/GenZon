from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User
from urllib.parse import urlparse


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_match(form, field):

    password = field.data
    confirmPassword = form.data['confirmPassword'];

    if password !=confirmPassword:
        raise ValidationError('Passwords do not match!')


def img_check(form ,field):
    path = urlparse(field.data).path.lower()

    if not path.endswith(('.png', '.jpg', '.jpeg', '.gif')):
        raise ValidationError('Images Only!')

def usernamepls(form,field):
    username = field.data

    if len(username) >13:
        raise ValidationError('Username character limit is 13!!!')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, usernamepls])
    profilePic = StringField('profilePic', validators=[DataRequired(),img_check ,URL()])
    password = StringField('password', validators=[DataRequired(),password_match])
    confirmPassword = StringField('confirm password', validators=[])
