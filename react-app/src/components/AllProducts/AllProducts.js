import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { productLoad } from "../../store/product";
import { getAllReviews } from "../../store/review";
import Footer from "../Footer";
import './AllProducts.css';
const AllProductsPage = () => {



    const [sortby, setSortby] = useState('');
    let { tagNumber } = useParams();
    tagNumber = +tagNumber

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(productLoad())
        dispatch(getAllReviews())

    }, [tagNumber, dispatch])


    useEffect(() => {

        window.scrollTo(0, 0)
    }, [tagNumber])



    let allProducts = useSelector(state => Object.values(state.products));
    const user = useSelector(state => state.session.user);

    if (tagNumber === 1) {
        allProducts = allProducts.filter(ele => ele?.category.toLowerCase() === 'electronics');
    } else if (tagNumber === 2) {
        allProducts = allProducts.filter(ele => ele?.category.toLowerCase() === 'fashion');

    } else if (tagNumber === 3) {
        allProducts = allProducts.filter(ele => ele?.category.toLowerCase() === 'furniture');

    } else if (tagNumber === 4) {
        allProducts = allProducts.filter(ele => ele?.category.toLowerCase() === 'food');

    } else if (tagNumber === 5) {
        allProducts = allProducts.filter(ele => ele?.category.toLowerCase() === 'toys');
    }


    const reviews = useSelector(state => Object.values(state.reviews))

    let mappedProducts;

    const averageRating = (product) => {
        const productReviews = reviews.filter(el => el?.product_id === product?.id);
        return productReviews.length ? productReviews.reduce((a, b) => a + b.rating, 0) / productReviews.length : 0;
    }


    const handleClickinformativecircle = () => {

        alert('You are currently selling this product, so you can neither buy or review this item!!!')
    }


    if (sortby === '' || sortby === 'newest') {


        mappedProducts = allProducts.map(ele => (

            <div key={ele?.id} className="selam23">
                <div className="experiencehehe" >

                    <NavLink exact to={`/productpage/${ele?.id}`}><img alt="" style={{ cursor: "pointer" }} className="imgcokzor" src={ele?.image_url}></img></NavLink>
                </div>
                <div className="name-price-description">
                    <NavLink exact to={`/productpage/${ele?.id}`}><p className="turuncu" style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold", maxWidth: "fit-content" }}>{ele?.name}</p></NavLink>
                    <div className='imgandusername' style={{ marginTop: "10px" }}>

                        <div className='oneswehurt' >
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                        </div>
                        <h2 style={{ wordBreak: "break-all", fontFamily: "Merienda" }} >{reviews.filter(el => el?.product_id === ele?.id).length}</h2>

                    </div>
                    <p className="dolarthingy" style={{ fontFamily: "Merienda" }}>$<span style={{ fontWeight: "bold", fontSize: "14px", fontFamily: "Merienda" }}>{ele?.price}.00</span></p>
                    <p className="getitassonsas">Get it as soon as <span style={{ fontWeight: "bold" }}>Tomorrow</span><br></br>FREE Shipping by GenZon</p>
                    <p className="description-product-page">{ele?.description}</p>

                </div>
                <NavLink exact to={`/productpage/${ele?.id}`}><p className="readmoreclassname">Read more</p></NavLink>

                {
                    ele?.user_id === user?.id &&
                    <i className="fa-solid fa-circle-info informativecircle" onClick={handleClickinformativecircle}></i>
                }
            </div>
        )).reverse()
    } else if (sortby === 'oldest') {

        mappedProducts = allProducts.map(ele => (

            <div key={ele?.id} className="selam23">
                <div style={{ width: "100%", height: "271px", backgroundColor: "white", display: "flex", justifyContent: "center", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>

                    <NavLink exact to={`/productpage/${ele?.id}`}><img alt="" style={{ cursor: "pointer" }} className="imgcokzor" src={ele?.image_url}></img></NavLink>
                </div>
                <div className="name-price-description">
                    <NavLink exact to={`/productpage/${ele?.id}`}><p className="turuncu" style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold", maxWidth: "fit-content" }}>{ele?.name}</p></NavLink>
                    <div className='imgandusername' style={{ marginTop: "10px" }}>

                        <div className='oneswehurt' >
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                        </div>
                        <h2 style={{ wordBreak: "break-all", fontFamily: "Merienda" }} >{reviews.filter(el => el?.product_id === ele?.id).length}</h2>

                    </div>
                    <p className="dolarthingy" style={{ fontFamily: "Merienda" }}>$<span style={{ fontWeight: "bold", fontSize: "14px", fontFamily: "Merienda" }}>{ele?.price}.00</span></p>
                    <p className="getitassonsas">Get it as soon as <span style={{ fontWeight: "bold" }}>Tomorrow</span><br></br>FREE Shipping by GenZon</p>
                    <p className="description-product-page">{ele?.description}</p>

                </div>
                <NavLink exact to={`/productpage/${ele?.id}`}><p className="readmoreclassname">Read more</p></NavLink>
                {
                    ele?.user_id === user?.id &&
                    <i className="fa-solid fa-circle-info informativecircle" onClick={handleClickinformativecircle}></i>
                }
            </div>
        ))
    } else if (sortby === 'lowtohigh') {
        mappedProducts = allProducts.sort((a, b) => a.price - b.price).map(ele => (

            <div key={ele?.id} className="selam23">
                <div style={{ width: "100%", height: "271px", backgroundColor: "white", display: "flex", justifyContent: "center", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>

                    <NavLink exact to={`/productpage/${ele?.id}`}><img alt="" style={{ cursor: "pointer" }} className="imgcokzor" src={ele?.image_url}></img></NavLink>
                </div>
                <div className="name-price-description">
                    <NavLink exact to={`/productpage/${ele?.id}`}><p className="turuncu" style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold", maxWidth: "fit-content" }}>{ele?.name}</p></NavLink>
                    <div className='imgandusername' style={{ marginTop: "10px" }}>

                        <div className='oneswehurt' >
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                        </div>
                        <h2 style={{ wordBreak: "break-all", fontFamily: "Merienda" }} >{reviews.filter(el => el?.product_id === ele?.id).length}</h2>

                    </div>
                    <p className="dolarthingy" style={{ fontFamily: "Merienda" }}>$<span style={{ fontWeight: "bold", fontSize: "14px", fontFamily: "Merienda" }}>{ele?.price}.00</span></p>
                    <p className="getitassonsas">Get it as soon as <span style={{ fontWeight: "bold" }}>Tomorrow</span><br></br>FREE Shipping by GenZon</p>
                    <p className="description-product-page">{ele?.description}</p>

                </div>
                <NavLink exact to={`/productpage/${ele?.id}`}><p className="readmoreclassname">Read more</p></NavLink>
                {
                    ele?.user_id === user?.id &&
                    <i className="fa-solid fa-circle-info informativecircle" onClick={handleClickinformativecircle}></i>
                }
            </div>
        ))
    } else if (sortby === 'hightolow') {
        mappedProducts = allProducts.sort((a, b) => b.price - a.price).map(ele => (

            <div key={ele?.id} className="selam23">
                <div style={{ width: "100%", height: "271px", backgroundColor: "white", display: "flex", justifyContent: "center", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>

                    <NavLink exact to={`/productpage/${ele?.id}`}><img alt="" style={{ cursor: "pointer" }} className="imgcokzor" src={ele?.image_url}></img></NavLink>
                </div>
                <div className="name-price-description">
                    <NavLink exact to={`/productpage/${ele?.id}`}><p className="turuncu" style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold", maxWidth: "fit-content" }}>{ele?.name}</p></NavLink>
                    <div className='imgandusername' style={{ marginTop: "10px" }}>

                        <div className='oneswehurt' >
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                        </div>
                        <h2 style={{ wordBreak: "break-all", fontFamily: "Merienda" }} >{reviews.filter(el => el?.product_id === ele?.id).length}</h2>

                    </div>
                    <p className="dolarthingy" style={{ fontFamily: "Merienda" }}>$<span style={{ fontWeight: "bold", fontSize: "14px", fontFamily: "Merienda" }}>{ele?.price}.00</span></p>
                    <p className="getitassonsas">Get it as soon as <span style={{ fontWeight: "bold" }}>Tomorrow</span><br></br>FREE Shipping by GenZon</p>
                    <p className="description-product-page">{ele?.description}</p>

                </div>
                <NavLink exact to={`/productpage/${ele?.id}`}><p className="readmoreclassname">Read more</p></NavLink>
                {
                    ele?.user_id === user?.id &&
                    <i className="fa-solid fa-circle-info informativecircle" onClick={handleClickinformativecircle}></i>
                }
            </div>
        ))
    } else if (sortby === 'ratingavg') {

        mappedProducts = allProducts.sort((a, b) => averageRating(b) - averageRating(a) || b.reviews.length - a.reviews.length).map(ele => (

            <div key={ele?.id} className="selam23">
                <div style={{ width: "100%", height: "271px", backgroundColor: "white", display: "flex", justifyContent: "center", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>

                    <NavLink exact to={`/productpage/${ele?.id}`}><img alt="" style={{ cursor: "pointer" }} className="imgcokzor" src={ele?.image_url}></img></NavLink>
                </div>
                <div className="name-price-description">
                    <NavLink exact to={`/productpage/${ele?.id}`}><p className="turuncu" style={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold", maxWidth: "fit-content" }}>{ele?.name}</p></NavLink>
                    <div className='imgandusername' style={{ marginTop: "10px" }}>

                        <div className='oneswehurt' >
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 1 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 2 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 3 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) >= 4 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                            <i style={Math.round(reviews.filter(el => el?.product_id === ele?.id).reduce((a, b) => a + b.rating, 0) / reviews.filter(el => el?.product_id === ele?.id).length) === 5 ? { color: "#fd4" } : { color: "#444" }} className='fas fa-star'></i>
                        </div>
                        <h2 style={{ wordBreak: "break-all", fontFamily: "Merienda" }} >{reviews.filter(el => el?.product_id === ele?.id).length}</h2>

                    </div>
                    <p className="dolarthingy" style={{ fontFamily: "Merienda" }}>$<span style={{ fontWeight: "bold", fontSize: "14px", fontFamily: "Merienda" }}>{ele?.price}.00</span></p>
                    <p className="getitassonsas">Get it as soon as <span style={{ fontWeight: "bold" }}>Tomorrow</span><br></br>FREE Shipping by GenZon</p>
                    <p className="description-product-page">{ele?.description}</p>

                </div>
                <NavLink exact to={`/productpage/${ele?.id}`}><p className="readmoreclassname">Read more</p></NavLink>
                {
                    ele?.user_id === user?.id &&
                    <i className="fa-solid fa-circle-info informativecircle" onClick={handleClickinformativecircle}></i>
                }
            </div>
        ))


    }




    return (
        <div className="main-div-all-products">
            <div className="resultstable">
                <p style={{ margin: "10px 20px", fontSize: "15px" }}>{mappedProducts.length} results</p>
                <select className="selecthehe" onChange={(e) => setSortby(e.target.value)} value={sortby}>
                    <option value={''}>Sort by: Featured</option>
                    <option value={'lowtohigh'}>Price: Low to High</option>
                    <option value={'hightolow'}>Price: High to Low</option>
                    <option value={'ratingavg'}>Customer Rating</option>
                    <option value={'newest'}>Newest</option>
                    <option value={'oldest'}>Oldest</option>

                </select>
            </div>
            <div className="middle-div-hehe">
                <div className="left-navbarthingy">

                </div>
                <div className="main-product-smallgrid">
                    <div className="asildiv">
                        {mappedProducts}
                    </div>
                </div>
            </div>
            <Footer something={true} />
        </div>

    )

}


export default AllProductsPage;
