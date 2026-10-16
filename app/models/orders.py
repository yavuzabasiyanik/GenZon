from .db import db
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from datetime import datetime

# orderedItems = db.Table(
#     "orderedItems",
#     db.Column("order_id", db.Integer, db.ForeignKey("products.id")),
#     db.Column("product_id", db.Integer, db.ForeignKey("orders.id"))
# )

class Order(db.Model):
    __tablename__ = 'orders';


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    totalCost = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    instructions = db.Column(db.String, nullable=False)


    buyer = db.relationship('User', backref= 'orders')

    orderedItems = db.relationship('OrderItem', back_populates='order', cascade="all, delete-orphan")

    def to_dict(self):
        return{
            'id': self.id,
            'created_at': self.created_at,
            'userId': self.user_id,
            'totalCost': self.totalCost,
            'instructions':self.instructions,
            'buyer': self.buyer.to_dict(),
            'orderedItems': [item.to_dict() for item in self.orderedItems]
        }


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"),nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    itemNum = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    order = db.relationship('Order', back_populates='orderedItems')
    item = db.relationship('Product', back_populates='ordered_by')

    def to_dict(self):
        return {
            'id':self.id,
            'product_id':self.product_id,
            'order_id': self.order_id,
            'product': self.item.to_dict(),
            'itemNum': self.itemNum,
            'created_at': self.created_at
        }
