from flask import Blueprint, jsonify, session, request
from app.models import User,Product, db, Order, OrderItem
from flask_login import current_user, login_user, logout_user, login_required



order_routes = Blueprint('orders', __name__)


@order_routes.route('/',methods=['GET'])
@login_required
def getAllOrders():

    allOrders = Order.query.filter(Order.user_id == current_user.id).all()

    return {'allOrders': [order.to_dict() for order in allOrders]}


@order_routes.route('/', methods=['POST'])
@login_required
def createOrder():

    req = request.json
    products = req.get('products') or []

    if not products:
        return {'errors': ['products : Order must contain at least one item']}, 400

    # Cart checkout sends cart rows ({product_id, quantity}); "buy now" sends
    # the product itself plus a top-level quantity.
    if 'product_id' in products[0]:
        items = [(p['product_id'], p['quantity']) for p in products]
    else:
        items = [(products[0]['id'], req.get('quantity', 1))]

    # Never trust prices from the client: look them up and total server-side
    orderItems = []
    totalCost = 0
    for product_id, quantity in items:
        product = Product.query.get(product_id)
        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            quantity = 0
        if not product or quantity < 1:
            return {'errors': ['products : Invalid product or quantity']}, 400
        totalCost += product.price * quantity
        orderItems.append(OrderItem(product_id=product.id, itemNum=quantity))

    order = Order(
        user_id = current_user.id,
        totalCost = totalCost,
        instructions = req.get('instructions') or 'Leave it at the front door!',
        orderedItems = orderItems
    )

    db.session.add(order)
    db.session.commit()

    return order.to_dict()


@order_routes.route('/delete/<order_id>', methods=['DELETE'])
@login_required
def deleteOrder(order_id):

    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    db.session.delete(order)
    db.session.commit()

    return {"id": order_id}

@order_routes.route('/update/<order_id>', methods=['PUT'])
@login_required
def updateOrder(order_id):

    req = request.json

    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403

    order.instructions = req['instructions']

    db.session.commit()

    return order.to_dict()
