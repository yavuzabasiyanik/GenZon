import { useDispatch, useSelector } from 'react-redux';
import './ShoppingCart.css';
import { shoppingcartDeleteone, updateShoppingcart } from '../../store/shoppingcart';
import { shoppingcartdeleteall } from '../../store/shoppingcart';
import { NavLink, useHistory } from 'react-router-dom';
import Footer from '../Footer';
import { orderCreate } from '../../store/order';
import { useEffect, useState } from 'react';
const ShoppingCart = () => {

    const [instructionsDropdown, setinstructionsDropdown] = useState(false)
    const [instructions, setInstructions] = useState("Leave it at the front door!")

    let shoppingcart = useSelector(state => Object.values(state.shoppingcart));

    const user = useSelector(state => state.session.user);



    shoppingcart = shoppingcart.filter(ele => ele?.user_id === user?.id);

    const dispatch = useDispatch();
    const history = useHistory();

    let subtotal = 0;

    shoppingcart.forEach(ele => {
        subtotal += (ele?.product?.price * ele?.quantity);
    })

    const handleDeleteOne = (id) => {
        dispatch(shoppingcartDeleteone(id));
    }


    const pleasework = (num) => {
        let arr = []

        for (let i = 1; i <= num; i++) {
            arr.push((<option key={i} value={`${i}`}>{i}</option>))
        }
        return arr

    }


    const updateQuantity = (id, product_id, quantity) => {

        dispatch(updateShoppingcart(id, product_id, quantity));
        return
    }

    let items = 0;

    shoppingcart.forEach((item) => {
        items += item.quantity;
    })

    const allCart = shoppingcart.map(ele => {
        return (
            <div className='productsinuserpageCart' key={ele?.id}>
                <div className='imgnamepricedeletethingies'>

                    <NavLink exact to={`/productpage/${ele?.product?.id}`}><img alt='something' className='imginthecart' src={ele?.product?.image_url}></img></NavLink>
                    <div className='somedivdd'>
                        <NavLink exact to={`/productpage/${ele?.product?.id}`} className='shoppingcartnameproduct'><p className='shoppingcartnameproduct' style={{ color: "#0F1111", fontSize: "17px", cursor: "pointer", wordWrap: "break-word", marginTop: "8px", fontWeight: "700" }}>{ele?.product?.name}</p></NavLink>
                        <p style={{ color: "#007185" }}>In Stock</p>
                        <p style={{ color: "#565959", fontSize: "12px", lineHeight: "16px" }}>Eligible for FREE Shipping & <span style={{ fontWeight: "700", fontSize: "12px", color: "#007185" }}>FREE Returns</span></p>
                        <div className='qtydelete'>
                            <select onChange={(e) => updateQuantity(ele?.id, ele?.product?.id, e.target.value)} value={ele?.quantity} style={{ width: "60px", paddingRight: "8px", fontWeight: "700", }}>

                                {
                                    pleasework(ele?.product?.quantity)
                                }

                            </select>
                            <p onClick={() => handleDeleteOne(ele?.id)} className='dontholdme'>Delete</p>
                        </div>
                    </div>
                </div>
                <p style={{ fontSize: "18px", lineHeight: "24px", fontWeight: "700", color: "#0F1111" }}>${ele?.product?.price * ele?.quantity}.00</p>
            </div>
        )
    }).reverse()


    const legendaryLeagueEmptyImage = (
        <div className='legendmain-div'>
            <div className='asilllegendary-div-empty'>
                <div className='somethingheree3'>
                    <div className='h1veh6ikilisi'>

                        <h1 style={{ marginLeft: "10px", fontSize: "28px" }}>Your GenZon Cart is empty...</h1>
                    </div>

                </div>
                <img alt='something' className='legendimg' src='https://external-preview.redd.it/GLem0FFrjGGfKF8ruVScaYqNmB0CbKde8gFD82Ov-cw.jpg?auto=webp&s=c925bc146f8b8b0bad10909fe40470b96eaa4c7b'></img>
            </div>
            <Footer something={true} />

        </div>
    )

    const handleDeleteAll = () => {
        dispatch(shoppingcartdeleteall());
    }

    const handleCheckout = async (e) => {
        e.preventDefault();

        let paylaod = {
            totalCost: subtotal,
            instructions,
            products: [...shoppingcart]
        }

        const order = await dispatch(orderCreate(paylaod));

        // Only empty the cart once the order has actually been saved
        if (!order || Array.isArray(order)) return;

        await dispatch(shoppingcartdeleteall());

        history.push({pathname: '/orders', state: {boughtsomething:true}})


    }

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            {
                shoppingcart.length
                    ?
                    <div className='user-products-main-divCart'>
                        <div className='productsGridCart'>
                            <div className='somethingheree3'>
                                <div className='h1veh6ikilisi'>

                                    <h1 style={{ fontSize: "28px" }}>Shopping Cart</h1>
                                    <h6 onClick={handleDeleteAll} className='h6deleteallitems' style={{ width: "fit-content", cursor: "pointer", color: "#007185" }}>Delete all items</h6>
                                </div>
                                <div className='someguy'>

                                    <p>Price</p>
                                </div>
                            </div>
                            {allCart}
                            <div className='somethingheree4'>
                                <p style={{ fontSize: "18px", marginTop: "10px" }} >

                                    Subtotal ({items} {items === 1 ? "item" : "items"}): <span style={{ fontSize: "18px", fontWeight: "700" }}>${subtotal}.00</span>
                                </p>
                            </div>

                        </div>
                        <div className='ikincicheckout'>
                            <p style={{ fontSize: "18px", marginTop: "10px" }} >

                                Subtotal ({items} {items === 1 ? "item" : "items"}): <span style={{ fontSize: "18px", fontWeight: "700" }}>${subtotal}.00</span>
                            </p>
                            <button onClick={handleCheckout} className='proceedtocheckout'>Place your order</button>
                        </div>
                        <h2 onClick={(e) => setinstructionsDropdown((s) => !s)} className='settingdeliveryinstructions'>Set Delivery Instruction <i className="fa-solid fa-chevron-down okisareti"></i></h2>

                        {
                            instructionsDropdown &&
                            <div className='instructionsdrowdowndiv'>
                                <textarea maxLength={300} className='dropdownInstructions' onChange={(e) => setInstructions(e.target.value)} value={instructions}>

                                </textarea>
                                <div className='buttondivssscancelupdate'>
                                    <button onClick={(e)=> setinstructionsDropdown(false)} style={{margin:"0 0px 0 10px"}} className='submitbutton'>Update</button>

                                </div>
                            </div>


                        }

                        <div style={{ marginTop: "300px" }}>

                            <Footer something={true} />
                        </div>
                    </div>
                    : legendaryLeagueEmptyImage
            }
        </>

    )
}

export default ShoppingCart;
