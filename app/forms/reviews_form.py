from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, URL, NumberRange
from app.models import Reviews


class ReviewForm(FlaskForm):
    product_id = IntegerField('ProductId', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    body = StringField('Bodt', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
