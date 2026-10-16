import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './SingleProduct.css';
import { createshoppingcart } from '../../store/shoppingcart';
import { useEffect, useRef, useState } from 'react';
import { createReview } from '../../store/review';
import { deleteReview } from '../../store/review';
import { updateReview } from '../../store/review';
import ErrorsModal from "../ProductForm/ErrorModal";
import Footer from '../Footer';
import { orderCreate } from '../../store/order';

const SingleProduct = () => {

    const [quantity, setQuantity] = useState(1)
    const [reviewDropdown, setReviewDropdown] = useState(false);
    const [selected, setSelected] = useState(1);
    const [title, setTitlte] = useState('');
    const [comment, setComment] = useState('');
    const [averageRating, setAveraegeRating] = useState(0);
    const [optionArr, setOptionArr] = useState([]);
    const [errors, setErrors] = useState([]);
    const [buynowModal, setBuyNowModal] = useState(false);
    let { productId } = useParams();
    const [updateState, setUpdateState] = useState([false, 0, 0, '', ''])
    productId = +productId;

    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector(state => Object.values(state.products)).filter(el => el.id === productId)[0];
    const user = useSelector(state => state.session.user);

    const reviews = useSelector(state => Object.values(state.reviews)).filter(el => el?.product_id === productId).reverse();
    const shoppingcart = useSelector(state => Object.values(state.shoppingcart)).filter(el => el?.product_id === productId)[0];

    const orders = useSelector(state => Object.values(state.orders)).filter(el => el.userId === user?.id && el?.orderedItems?.filter(ele=> ele?.product_id === product?.id).length);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            history.push('/login')
            return
        }

        if ((shoppingcart?.user_id === user?.id) && (shoppingcart?.quantity + (+quantity)) > product?.quantity) {
            setErrors(['You cannot buy more than provided quantity!!! (You already have this product in your shopping cart...) '])
            return
        }
        if (user?.id === product?.user_id) {
            setErrors(['You cannot add your own product to your shopping cart'])

            return
        }



        dispatch(createshoppingcart(productId, quantity));
        history.push('/user/cart')

    }

    const handleBuySubmit = (e) => {
        e.preventDefault();

        setBuyNowModal(false);
        if (user?.id === product?.user_id) {
            setErrors(['You cannot buy your own product!!!'])

            return
        }

        let payload = {
            totalCost: product.price * quantity,
            instructions: 'Leave it at the front door!',
            products: [product],
            quantity
        }

        dispatch(orderCreate(payload))
        history.push('/orders')


    }


    const handleSubmitComment = (e) => {
        e.preventDefault();



        if (title.length > 80) {
            setErrors(["Title length should be between 1-80!!!"])

            return
        }

        if (title.length === 0) {
            setErrors(["Title length should be between 1-80!!!"])

            return
        }

        if (comment.length > 1000) {
            setErrors(["Review length should be between 1-1000!!!"])

            return
        }

        if (comment.length === 0) {
            setErrors(["Review length should be between 1-1000!!!"])

            return
        }


        dispatch(createReview(product?.id, selected, title, comment));

        const anchor = document.querySelector('.writecustomerreviewbutton')
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setReviewDropdown(false);

        setSelected(1);
        setComment('')
        setTitlte('');
    }

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])

    const hadnleUpdate = async (e) => {
        e.preventDefault();


        if (updateState[3].length > 80) {
            setErrors(["Title length should be between 0-80!!!"])

            return
        }
        if (updateState[3].length === 0) {
            setErrors(["Title length should be between 0-80!!!"])

            return
        }
        if (updateState[4].length > 1000) {
            setErrors(["Review length should be between 0-1000!!!"])

            return
        }
        if (updateState[4].length === 0) {
            setErrors(["Review length should be between 0-1000!!!"])

            return
        }


        await dispatch(updateReview(product?.id, updateState[2], updateState[3], updateState[4], updateState[1]));

        setUpdateState([false, 0, 0, '', '']);

    }


    const handleClickinformativecircle = () => {

        alert('You are currently selling this product, so you can neither buy or review this item!!!')
    }

    const selectedthingyhandle = (e) => {
        e.preventDefault();

        if (!user) {
            history.push('/login')
            return
        }

        setReviewDropdown(ele => {
            if (updateState[0] === false) {
                return !ele
            } else {
                return false
            }
        });

        setSelected(1);
        setComment('')
        setTitlte('');
        setUpdateState([false, 0, 0, '', '']);

    }

    const deleteHandle = (e, id) => {
        e.preventDefault();

        setUpdateState([false, 0, 0, '', '']);

        dispatch(deleteReview(id));

    }

    const editHandle = (e, id, rating, title, body) => {
        e.preventDefault();

        setUpdateState([true, id, rating, title, body]);
        setReviewDropdown(false);
        setSelected(1);
        setComment('')
        setTitlte('');
    }

    useEffect(() => {



        let toplam = 0
        for (let i = 0; i < reviews.length; i++) {
            toplam += reviews[i].rating;
        }

        setAveraegeRating(Math.round(toplam / reviews.length))
    }, [reviews])



    useEffect(() => {
        let arr = []
        for (let i = 1; i <= product?.quantity; i++) {
            arr.push((<option key={i} value={`${i}`}>{i}</option>))
        }

        setOptionArr(arr);

    }, [product?.quantity])


    let menuRef2 = useRef();


    useEffect(() => {

        const handler = (event) => {

            if (!menuRef2?.current?.contains(event.target)) {

                setBuyNowModal(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }


    });

    const deliveryDate = (daysFromNow) => new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })

    const geri = () => {

        history.goBack()
    }

    const setBuyNowModalfunc = (e) => {
        e.preventDefault();

        if(!user){
            history.push('/login');
            return
        }

        setBuyNowModal(true)

    }
    return (
        <>
            <div className='indivproduct-main-div'>
                <div className='middivallthestuff'>
                    <p onClick={geri} className='heryersessizce' style={{ height: "fit-content", fontSize: "11px", color: "#565959", marginTop: "20px" }}><i style={{ fontSize: "10px", color: "#565959" }} className="fa-solid fa-caret-left"></i> Back to results</p>
                    <div className='imgdivibu'>
                        <img alt='something' className='theimageintheindiv' src={product?.image_url}></img>
                    </div>
                    <div className='infordivibu'>
                        <h1 className='productnameh1' style={{ fontFamily: "Arial, sans-serif", wordBreak: "break-word" }}>{product?.name}</h1>
                        <div className='imgandusername' style={{ marginTop: "10px" }}>
                            <div className='oneswehurt' >
                                <i style={averageRating >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                <i style={averageRating >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                <i style={averageRating >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                <i style={averageRating >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                <i style={averageRating === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            </div>
                            <h2 style={{ wordBreak: "break-all" }} >{reviews.length} {reviews.length === 1 ? "rating" : "ratings"}</h2>
                        </div>
                        <div className='pricethingyhehe'>
                            <p style={{ fontSize: "14px" }} ><span style={{ fontSize: "14px", fontFamily: "Merienda" }}>Price:</span> <span style={{
                                fontFamily: "Merienda",
                                fontSize: "18px", color: "#B12704", padding: "0 6px"
                            }}>${product?.price}.00</span>& <span style={{
                                fontSize: "13px",
                                fontFamily: "Merienda", color: "#007185"
                            }}>FREE Returns</span></p>
                        </div>
                        <div className='descriptionindivpageinside'>
                            <p className='onlarbizler'>About this item:</p>

                            <p className='asildescription'>
                                {product?.description}
                            </p>

                        </div>
                    </div>

                    <div className='productcheckoutsection'>
                        <div className='productcheckoutprice'>
                            <div className='price-amoutn'>${product?.price}</div>
                            <div className='freereturnslabel'>
                                &
                                <span className='freereturnslink'> FREE Returns</span>
                            </div>
                            {product?.user_id === user?.id &&
                                <i className="fa-solid fa-circle-info informativecircle2" onClick={handleClickinformativecircle}></i>
                            }
                        </div>
                        <div className='productcheckoutdelivery'>
                            <div className='freeeta'>
                                <span style={{ color: "#007185" }}>FREE delivery:</span>
                                <b>{deliveryDate(7)}</b>
                            </div>
                            <div className='fastesteta'>
                                <div>
                                    <span style={{ color: "#007185" }}>Fastest delivery:</span>
                                    <b> {deliveryDate(1)} </b>

                                </div>
                                <div style={{ color: "#565959" }}>Order within 24 hours</div>
                            </div>
                        </div>
                        <div className='instocksection'>In Stock.</div>
                        <select onChange={(e) => setQuantity(e.target.value)} className='selectnumberstack' style={{}}>

                            {optionArr}

                        </select>
                        <button onClick={handleSubmit} style={{ display: "block", marginBottom: "10px", fontFamily: 'Merienda' }} className='somebuttonadd'>Add to Cart</button>
                        <button onClick={(e) => setBuyNowModalfunc(e)} style={{ display: "block", fontFamily: 'Merienda' }} className='somebuttonbuy'>{orders.length ? 'Buy again' : 'Buy Now'}</button>

                        <div className='securetransactionsection'>
                            <i style={{ color: "#999", fontSize: "13px", paddingRight: "10px" }} className='fas fa-lock'></i>
                            <span style={{ color: "#007185" }}>Secure transaction</span>
                        </div>

                        <div className='bringussugarandtum'>
                            <div >
                                <div style={{ fontFamily: "Merienda", fontSize: "11px" }}>Ships from</div>
                                <div style={{ fontFamily: "Merienda", fontSize: "11px" }}>Sold by</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: "Merienda", fontSize: "11px" }}>GenZon.com</div>
                                <div style={{ fontFamily: "Merienda", fontSize: "11px" }}>GenZon.com</div>

                            </div>
                        </div>

                        <div style={{ fontSize: "14px", lineHeight: "20px", marginTop: "10px" }}>
                            Return policy:
                            <span style={{ color: " #007185", wordBreak: "break-word" }}> Returnable within 30 days</span>
                        </div>




                    </div>
                </div>
                <div className='reviewsmain-div'>
                    <div className='middlediv-forreviews'>
                        <div className='reviewthisproductdiv'>
                            <h2 className='h2reviewtrhisproduct'>Review this product</h2>
                            <p className='pshareyourthought'>Share your thoughts with other customers</p>
                            <button onClick={selectedthingyhandle} className='writecustomerreviewbutton'>Write a customer review</button>
                            {reviewDropdown &&
                                <div className='sennediyorsun'>
                                    <h2 style={{}} className='h2reviewtrhisproduct'>Add a review for:</h2>
                                    <div style={{ display: "flex", gap: "10px", paddingBottom: "20px" }}>
                                        <img alt='something' className='imgreviewind' src={product?.image_url}></img>
                                        <h2 style={{ marginTop: "22px" }}>{product?.name}</h2>
                                    </div>
                                    <div className='formreviewthingy'>

                                        <h4 style={{ fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Add a rating</h4>
                                        <div className='star-widget'>
                                            <input type='radio' value={selected} className="same" checked={selected === 5} onChange={(e) => setSelected(5)} id='rate-5'></input>
                                            <label htmlFor='rate-5' className='fas fa-star'></label>
                                            <input type='radio' value={selected} className="same" checked={selected === 4} onChange={(e) => setSelected(4)} id='rate-4'></input>
                                            <label htmlFor='rate-4' className='fas fa-star'></label>
                                            <input type='radio' value={selected} className="same" checked={selected === 3} onChange={(e) => setSelected(3)} id='rate-3'></input>
                                            <label htmlFor='rate-3' className='fas fa-star'></label>
                                            <input type='radio' value={selected} className="same" checked={selected === 2} onChange={(e) => setSelected(2)} id='rate-2'></input>
                                            <label htmlFor='rate-2' className='fas fa-star'></label>
                                            <input type='radio' value={selected} className="same" checked={selected === 1} onChange={(e) => setSelected(1)} id='rate-1'></input>
                                            <label htmlFor='rate-1' className='fas fa-star'></label>

                                        </div>
                                        <div style={{ marginTop: "10px" }}>

                                            <h2 style={{ fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Add a title</h2>
                                            <input value={title} onChange={(e) => setTitlte(e.target.value)} type='text' style={{ outline: "none", width: "100%" }}></input>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <h2 style={{ fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Add a written review</h2>
                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ outline: "none", width: "100%", height: "90px" }}></textarea>
                                        </div>
                                        <div className='cancelsubmit'>
                                            <button onClick={selectedthingyhandle} className='buttoncancel'>Cancel</button>
                                            <button onClick={handleSubmitComment} className='submitbutton'>Submit</button>
                                        </div>
                                    </div>

                                </div>
                            }
                            {updateState[0] ?
                                <div className='sennediyorsun'>
                                    <h2 style={{ textDecoration: "underline" }} className='h2reviewtrhisproduct'>Update your review:</h2>
                                    <div style={{ display: "flex", gap: "10px", paddingBottom: "20px" }}>
                                        <img alt='something' className='imgreviewind' src={product?.image_url}></img>
                                        <h2 style={{ marginTop: "22px" }}>{product?.name}</h2>
                                    </div>
                                    <div className='formreviewthingy'>

                                        <h4 style={{ textDecoration: "underline", fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Edit your rating</h4>
                                        <div className='star-widget'>
                                            <input type='radio' value={updateState[2]} className="same" checked={updateState[2] === 5} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], 5, ele[3], ele[4]])} id='rate-25'></input>
                                            <label htmlFor='rate-25' className='fas fa-star'></label>
                                            <input type='radio' value={updateState[2]} className="same" checked={updateState[2] === 4} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], 4, ele[3], ele[4]])} id='rate-24'></input>
                                            <label htmlFor='rate-24' className='fas fa-star'></label>
                                            <input type='radio' value={updateState[2]} className="same" checked={updateState[2] === 3} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], 3, ele[3], ele[4]])} id='rate-23'></input>
                                            <label htmlFor='rate-23' className='fas fa-star'></label>
                                            <input type='radio' value={updateState[2]} className="same" checked={updateState[2] === 2} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], 2, ele[3], ele[4]])} id='rate-22'></input>
                                            <label htmlFor='rate-22' className='fas fa-star'></label>
                                            <input type='radio' value={updateState[2]} className="same" checked={updateState[2] === 1} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], 1, ele[3], ele[4]])} id='rate-21'></input>
                                            <label htmlFor='rate-21' className='fas fa-star'></label>

                                        </div>
                                        <div style={{ marginTop: "10px" }}>

                                            <h2 style={{ textDecoration: "underline", fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Edit your title</h2>
                                            <input value={updateState[3]} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], ele[2], e.target.value, ele[4]])} type='text' style={{ outline: "none", width: "100%" }}></input>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>

                                            <h2 style={{ textDecoration: "underline", fontSize: "15.6px" }} className='h2reviewtrhisproduct'>Edit your written review</h2>
                                            <textarea value={updateState[4]} onChange={(e) => setUpdateState(ele => [ele[0], ele[1], ele[2], ele[3], e.target.value])} style={{ outline: "none", width: "100%", height: "90px" }}></textarea>
                                        </div>
                                        <div className='cancelsubmit'>
                                            <button onClick={selectedthingyhandle} className='buttoncancel'>Cancel</button>
                                            <button onClick={hadnleUpdate} className='submitbutton'>Update</button>
                                        </div>
                                    </div>

                                </div> : ""
                            }
                        </div>
                        <div>
                            <h2 className='h2reviewtrhisproduct'>Top reviews</h2>
                            <div className='reviewgrid'>
                                {reviews.map(ele => {
                                    return (
                                        <div key={ele?.id} className='indvreviews'>
                                            <div className='imgandusername'>
                                                <img alt='something' style={{ width: "34px" }} src='https://images-na.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png'></img>
                                                <h4 style={{ wordBreak: "break-all", fontSize: "12.4px", lineHeihgt: "19px", color: "#0f1111", fontWeight: "300" }}>{ele?.user?.username}</h4>
                                            </div>
                                            <div className='imgandusername'>
                                                <div className='oneswehurt'>
                                                    <i style={{ color: "#fd4" }} className='fas fa-star'></i>
                                                    <i style={ele?.rating >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                                    <i style={ele?.rating >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                                    <i style={ele?.rating >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                                    <i style={ele?.rating === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                                                </div>
                                                <h2 style={{ wordBreak: "break-all" }} >{ele?.title}</h2>
                                            </div>
                                            <h6 style={{ marginBottom: "10px" }} className='verifiedpurchase'>Verified Purchase</h6>
                                            <p style={{ wordBreak: "break-word" }}>{ele?.body}</p>
                                            {user?.id === ele?.user?.id && <button onClick={(e) => editHandle(e, ele?.id, ele?.rating, ele?.title, ele?.body)} className='buttoncancelthing'>Edit</button>}
                                            {user?.id === ele?.user?.id && <button onClick={(e) => deleteHandle(e, ele?.id)} className='buttoncancelthing'>Delete</button>}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer something={true} />

            </div>
            {errors?.length > 0 ?
                <ErrorsModal errors={errors} setErrors={setErrors} /> : null
            }
            {
                buynowModal &&
                <div className='buynowmodalmaindiv'>
                    <div ref={menuRef2} className='buynowmodalcontaiiner'>
                        <button onClick={handleBuySubmit} className='placeyourorderbutton'>Place your order</button>
                        <p style={{ fontSize: "12px", margin: "4px auto", textAlign: "center" }}>By placing your order, you agree to GenZon's privacy notice and conditions of use.</p>

                        <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "22px", justifyContent: "space-evenly", height: "60%" }}>
                            <p style={{ color: "#333333", fontSize: "13px", margin: "0px 0px 4px", fontWeight: "bold", width: "100%", padding: "0 8px" }}>Order Summary</p>


                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 8px" }}>
                                <p>Items ({quantity}):</p>
                                <p>${product?.price * quantity}.00</p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 8px" }}>
                                <p>Total before tax:</p>
                                <p>${product?.price * quantity}.00</p>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 8px" }}>
                                <p>Estimated tax to be collected:*</p>
                                <p>$0.00</p>
                            </div>

                            <div style={{ display: "flex", borderTop: "1px solid #D5D9D9", justifyContent: "space-between", width: "100%", padding: "0 8px", paddingTop: "12px" }}>
                                <h1 style={{ color: "#B12704", fontSize: "17px" }}>Order total:</h1>
                                <h1 style={{ color: "#B12704", fontSize: "17px" }}>${product?.price * quantity}.00</h1>
                            </div>
                        </div>

                    </div>
                    <div className='anotherdiviste'>

                    </div>

                </div>
            }
        </>
    )

}

export default SingleProduct;
