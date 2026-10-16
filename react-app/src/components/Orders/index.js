import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteOrderThunk, orderCreate, updateOrderThunk } from '../../store/order';
import Footer from '../Footer';
import './orders.css';


const Orders = () => {


    const [instructionsModal, setIModal] = useState([false, undefined]);
    const [instructionsv2, setInstructionsv2] = useState('');
    const user = useSelector(state => state.session.user);

    const orders = useSelector(state => Object.values(state.orders)).filter(el => el.userId === user?.id);

    const dispatch = useDispatch();






    useEffect(() => {

        window.scrollTo(0, 0)

    }, [])




    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const handleBuySubmit = (e, product) => {
        e.preventDefault();


        let payload = {
            totalCost: product.price,
            instructions: 'Leave it at the front door!',
            products: [product],
            quantity: '1'
        }

        dispatch(orderCreate(payload))

        alert('Thank you, your order has been placed.')

        window.scrollTo({ top: 0, behavior: "smooth" })

    }


    const handleDELETEORDER = (e, id) => {
        e.preventDefault();

        dispatch(deleteOrderThunk(id))
    }

    const handleUpdateInstructions = (e, el) => {
        e.preventDefault();


        dispatch(updateOrderThunk(instructionsv2, el?.id));
        setIModal([false, undefined])
    }

    const handleSomething = (e, el) => {
        e.preventDefault();

        setIModal([true, el]);
        setInstructionsv2(el?.instructions);
    }

    const orderDivs = orders.map((el) => (

        <div className='kucukdivler' key={el?.id}>
            <div className='ustpart'>
                <div style={{ display: "flex", gap: "30px" }}>
                    <div className='orderplaced'>
                        <p style={{ color: "#565959", fontSize: "11px", lineHeight: "16px", fontFamily: "Merienda" }}>ORDER PLACED</p>
                        <p style={{ color: "#565959", fontSize: "13px", lineHeight: "20px", fontFamily: "Merienda" }}>{months[new Date(el?.created_at).getMonth()]} {new Date(el?.created_at).getDate()}, {new Date(el?.created_at).getFullYear()}</p>
                    </div>
                    <div className='shipti'>
                        <p style={{ color: "#565959", fontSize: "11px", lineHeight: "16px", fontFamily: "Merienda" }}>SHIP TO</p>
                        <p style={{ color: "#007185", fontSize: "13px", lineHeight: "20px", fontFamily: "Merienda" }}>{el?.buyer?.username}</p>
                    </div>
                </div>

                <div style={{ margin: "0" }} className='total'>
                    <p style={{ color: "#565959", fontSize: "11px", lineHeight: "16px", fontFamily: "Merienda" }}>TOTAL</p>
                    <p style={{ color: "#565959", fontSize: "13px", lineHeight: "20px", fontFamily: "Merienda" }}>$ {el?.totalCost}</p>
                </div>
            </div>
            <div className='middlepart'>
                {Object.values(el?.orderedItems).map(ele => (
                    <div key={ele?.id} className='eachdivsomething'>
                        <NavLink exact to={`/productpage/${ele?.product?.id}`}><img className='everypenie' style={{ width: "90px" }} src={ele?.product?.image_url} alt='nothing'></img></NavLink>
                        <div className='twobttonsonename'>
                            <NavLink exact to={`/productpage/${ele?.product?.id}`}><p className='askneyledi veyiste'>{ele?.product?.name}</p></NavLink>
                            <p><span style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "10px" }}>Price:</span> ${ele?.product?.price}</p>
                            <p><span style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "10px" }}>Quantity:</span> {ele?.itemNum}</p>
                            <div>
                                <button onClick={(e) => handleBuySubmit(e, ele?.product)} className='yellowbutton' style={{ margin: '0px 7px 4px 0', width: "122.38px", height: "31px", fontFamily: "Merienda", borderRadius: "8px", border: "none" }}>Buy it again</button>
                                <NavLink exact to={`/productpage/${ele?.product?.id}`}><button className='whitebutton' >View your item</button></NavLink>
                            </div>

                        </div>

                        <div className='divdoldursadece'>
                        </div>

                        <NavLink exact to={`/productpage/${ele?.product?.id}`}><button className='writeareview'>Write a product review</button></NavLink>

                        {((Number(new Date(el?.created_at)) + (60 * 60 * 24 * 1000)) - Number(new Date())) > 0 ?
                            <button onClick={(e) => handleSomething(e, el)} className='viewinstructions'>Delivery Instructions</button> :
                            <button className='delivered'>Delivery complete</button>
                        }
                    </div>
                ))}
            </div>
            <div className='altpart'>
                {
                    ((Number(new Date(el?.created_at)) + (60 * 60 * 24 * 1000)) - Number(new Date())) > 0 ? <p onClick={(e) => handleDELETEORDER(e, el?.id)} style={{ fontSize: "13px" }} className='askneyledi'>Cancel Order</p> : <p onClick={(e) => handleDELETEORDER(e, el?.id)} style={{ fontSize: "13px" }} className='askneyledi'>Return Item</p>}

            </div>

        </div>
    )).reverse();

    let menuRef = useRef();

    useEffect(() => {

        const handler = (event) => {

            if (!menuRef?.current?.contains(event.target)) {
                setIModal([false, undefined])
            }

        }


        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }


    })

    const modalInstructions = (
        <div className='destiny'>
            <div ref={menuRef} className='instructionstable'>
                <i onClick={(e) => setIModal([false, undefined])} className="fa-solid fa-x monsterrr"></i>
                <p className='kucukpdevlieryinstructions'>Delivery Instructions:</p>
                <textarea onChange={(e) => setInstructionsv2(e.target.value)} maxLength={300} className='textareasooo' style={{ padding: "4px", width: "90%", height: "55%" }} value={instructionsv2}></textarea>
                <button onClick={(e) => handleUpdateInstructions(e, instructionsModal[1])} className='instructionsbutton'>Update Instructions</button>
            </div>
        </div>
    )



    return (
        <>
            <div className='orderspagemaindiv'>
                <div className='middivorderpage'>
                    {
                        orderDivs.length ?
                            <>
                                <h1 className='yourorders'>Your Orders</h1>
                                <p className='imgoingtothegym'> <span style={{ fontWeight: "bold", fontSize: "14px", color: "black" }}>{orders.length} {orders.length > 1 ? 'orders' : 'order'}</span> placed</p>

                            </> :
                            <h1 className='somesssssss'>You don't have any orders right now, Click <NavLink exact to={'/allproducts/0'}><span className='hereeee'>here</span></NavLink> to see the offers.</h1>

                    }
                </div>

                <div className='orders'>
                    {
                        orderDivs.length ?
                            orderDivs :

                            <img className='legendimg3' src='https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/5a709b550515d8e828000001.jpeg' alt='some'></img>

                    }
                </div>

                <div className='agreable'>

                    <Footer something={true} />
                </div>

                {instructionsModal[0] &&
                    modalInstructions
                }
            </div>
        </>
    )
}

export default Orders
