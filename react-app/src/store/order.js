const LOAD_ORDERS = 'orders/load';
const CREATE_ORDER = 'orders/create';
const DELETE_ORDER = 'order/delete';
const UPDATE_ORDER = 'order/update';



const loadOrder = (orders) => ({
    type: LOAD_ORDERS,
    orders
})

const createOrder = (order) => ({
    type: CREATE_ORDER,
    order
})

const deleteOrder = (id) => ({
    type: DELETE_ORDER,
    id
})

const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    order
})


export const orderLoad = () => async (dispatch) => {
    const response = await fetch('/api/orders/');

    if(response.ok) {
        const data = await response.json();

        if(data.errors) {
            return data.errors;
        }

        dispatch(loadOrder(data.allOrders));

    }
}


export const orderCreate = (payload) => async (dispatch) => {

    const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const data = await response.json();

        if(data.errors){
            return data.errors;
        }

        dispatch(createOrder(data))
        return data
    }

    return null
}

export const deleteOrderThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/orders/delete/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(deleteOrder(data.id));
    }
}

export const updateOrderThunk = (instructions,id) => async (dispatch) => {
    const response = await fetch(`/api/orders/update/${id}`,{
        method: 'PUT',

        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({instructions})
    });


    if(response.ok){
        const data = await response.json();

        if(data.errors){
            return data.errors;
        }
        
        dispatch(updateOrder(data))

    }

}


const ordersReducer = (state = {}, action) => {
    let newState = {...state};

    switch(action.type){

        case LOAD_ORDERS:
            action.orders.forEach(el => {
                newState[el.id] = el
            });
            return {...newState}

        case CREATE_ORDER:
            newState[action.order.id] = action.order;
            return {...newState}

        case DELETE_ORDER:
            delete newState[action.id]
            return {...newState}

        case UPDATE_ORDER:
            newState[action.order.id] = action.order;
            return {...newState};

        default:
            return {...state};
    }
}

export default ordersReducer
