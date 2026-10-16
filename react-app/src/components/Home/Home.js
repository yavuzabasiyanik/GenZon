import './Home.css';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Home = () => {


    const products = useSelector(state => Object.values(state.products));
    const echoDotId = products.find(p => p.name === 'Echo Dot Smart speaker with clock and Alexa')?.id;
    const giftCardId = products.find(p => p.name === 'League of Legends Gift Card')?.id;
    const [imgInde, setImgIndex] = useState(1);
    const [some, setSome] = useState(0);

    const leftok = (e) => {

        e.preventDefault();

        setImgIndex((el) => {

            if (el - 1 < 1) {
                return 3;
            } else {
                return el - 1;
            }

        })
        setSome((e) => e + 1);

    }

    const sagok = (e) => {

        e.preventDefault();

        setImgIndex((el) => {

            if (el + 1 > 3) {
                return 1;
            } else {
                return el + 1;
            }

        })

        setSome((e) => e + 1);

    }


    useEffect(() => {

        const interval = setInterval(() => {

            setImgIndex((e) => {
                if (e + 1 > 3) {
                    return 1;
                } else {
                    return e + 1;
                }
            })


        }, 4000);

        return () => clearInterval(interval);

    }, [some]);


    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])



    const backgroundImgDivBigHome = (
        <div className='backgroundimgthingy'>


            <button onClick={leftok} className='carousel-button prev'><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={sagok} className='carousel-button next'><i className="fa-solid fa-chevron-right"></i></button>

            <ul>
                <li className={imgInde === 1 ? 'slide data-active' : "slide"} >
                    <img src='https://m.media-amazon.com/images/I/71iZHxT2gNL._SX3000_.jpg' alt='img1'></img>
                </li>

                <li className={imgInde === 2 ? 'slide data-active' : "slide"}>
                    <img src='https://m.media-amazon.com/images/I/61gLca6v8gL._SX3000_.jpg' alt='img3'></img>
                </li>
                <li className={imgInde === 3 ? 'slide data-active' : "slide"}>
                    <img src='https://rainforest-dev.s3.us-west-1.amazonaws.com/home_page_banner_4.jpg' alt='img4'></img>
                </li>

            </ul>
        </div>
    )



    return (
        <>
            <div className="home-main-div">
                {backgroundImgDivBigHome}
                <div className='daddy-of-categories'>

                    <div className='categories-home-page'>

                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/1'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Echo Dot</p></NavLink>
                        <NavLink exact to={`/productpage/${echoDotId}`}><img id='alexa' alt='something' className='' src='https://m.media-amazon.com/images/I/51MzOVciT3L._AC_UY218_.jpg'></img></NavLink>
                        <div className='genzonrecommended'>
                            GenZon Recommended
                        </div>
                        <p style={{ fontFamily: "Merienda", fontSize: "18px", margin: "7px 0 0", display: "flex", cursor: "auto" }} ><span style={{ fontSize: "12px", fontFamily: "Merienda" }}>$</span>60.00</p>
                        <NavLink exact to={`/productpage/${echoDotId}`}><p style={{ marginTop: "7px" }}>Echo Dot Smart speaker with clock and Alexa</p></NavLink>

                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/1'}><p style={{ marginTop: "20px" }} className='mavicik'>Shop from this category</p></NavLink>



                    </div>

                    <div className='categories-home-page'>
                        <NavLink style={{ cursor: "auto" }} exact to={`/productpage/${giftCardId}`}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Best Deal...</p></NavLink>

                        <NavLink exact to={`/productpage/${giftCardId}`}><img id='alexa' alt='something' className='' src='https://m.media-amazon.com/images/I/71iUrQk82KL._SY500_.jpg'></img></NavLink>
                        <div style={{ width: "100px" }} className='genzonrecommended'>
                            Deal of the Day
                        </div>
                        <p style={{ fontFamily: "Merienda", fontSize: "18px", margin: "7px 0 0", display: "flex", cursor: "auto" }} ><span style={{ fontSize: "12px", fontFamily: "Merienda" }}>$</span>100.00</p>
                        <NavLink exact to={`/productpage/${giftCardId}`}><p style={{ marginTop: "7px" }}>League of Legends Gift Card</p></NavLink>

                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/5'}><p style={{ marginTop: "20px" }} className='mavicik'>Buy more League products</p></NavLink>



                    </div>
                    <div className='categories-home-page4'>
                        <NavLink exact to={'/allproducts/2'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Recommended clothing!</p></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/5'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/51c5K0DI-WL._AC_UX679_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/7'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/81yRtzd2b5L._AC_UX569_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/8'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/81S2WhcTf7L._AC_UX569_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/9'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/71kD7y88tdL._AC_UX569_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "flex-end", cursor: "pointer" }} exact to={'/allproducts/2'}><p className='mavicik'>See more deals</p></NavLink>

                    </div>
                    <div style={{ width: "307px", height: "150px", paddingTop: "25px", padding: "20px" }} className='categories-home-page'>
                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/4'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold", marginBottom: "14px" }}>Let us do the shopping</p></NavLink>
                        <p style={{ marginBottom: "14px", cursor: "auto" }}>Free 1-hour grocery pickup from Whole Foods Market included with Prime</p>
                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/4'}><p className='mavicik'>Show all Groceries</p></NavLink>

                    </div>
                    <div className='categories-home-page4'>
                        <NavLink exact to={'/allproducts/5'}><p className="homepageptags" style={{ cursor: "pointer", fontSize: "21px", fontWeight: "bold" }}>Toys & Hobbies</p></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/18'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/71-1LCdiXEL._AC_UL480_FMwebp_QL65_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/19'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/71xzZpt0DyL._AC_UL480_FMwebp_QL65_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/20'}><img alt='something' className='womanclothing' src='https://m.media-amazon.com/images/I/71Zvn0rRMwL._AC_UL480_FMwebp_QL65_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "center" }} exact to={'/productpage/6'}><img alt='something' className='womanclothing' src='https://images-na.ssl-images-amazon.com/images/I/51wUNgIcO+L._SX258_BO1,204,203,200_.jpg'></img></NavLink>
                        <NavLink style={{ display: "flex", alignItems: "flex-end", cursor: "pointer" }} exact to={'/allproducts/5'}><p className='mavicik'>See more toys & hobbies</p></NavLink>

                    </div>
                    <div className='categories-home-page'>
                        <NavLink style={{ cursor: "auto" }} exact to={'/productpage/4'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Earbuds</p></NavLink>

                        <NavLink exact to={'/productpage/4'}><img id='alexa' alt='something' className='' src='https://m.media-amazon.com/images/I/71qsNVFefKL._AC_SX466_.jpg'></img></NavLink>
                        <div style={{ width: "120px" }} className='genzonrecommended'>
                            Deal of the Month
                        </div>
                        <p style={{ fontFamily: "Merienda", fontSize: "18px", margin: "7px 0 0", display: "flex", cursor: "auto" }} ><span style={{ fontSize: "12px", fontFamily: "Merienda" }}>$</span>97.00</p>
                        <NavLink exact to={'/productpage/4'}><p style={{ marginTop: "7px" }}>Samsung Galaxy BudsTrue Wireless Earbuds</p></NavLink>

                        <NavLink style={{ cursor: "auto" }} exact to={'/productpage/4'}><p style={{ marginTop: "20px" }} className='mavicik'>See the deal</p></NavLink>





                    </div>
                    <div className='categories-home-page'>
                        <NavLink style={{ cursor: "auto" }} exact to={'/productpage/6'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Deal of the Day</p></NavLink>

                        <NavLink exact to={'/productpage/6'}><img id='alexa' alt='something' className='' src='https://m.media-amazon.com/images/I/71JWVVP3nWL._AC_UL480_FMwebp_QL65_.jpg'></img></NavLink>
                        <div style={{ width: "100px" }} className='genzonrecommended'>
                            Deal of the Day
                        </div>
                        <p style={{ fontFamily: "Merienda", fontSize: "18px", margin: "7px 0 0", display: "flex", cursor: "auto" }} ><span style={{ fontSize: "12px", fontFamily: "Merienda" }}>$</span>20.00</p>
                        <NavLink exact to={'/productpage/6'}><p style={{ marginTop: "7px" }}>League of Legends</p></NavLink>

                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/5'}><p style={{ marginTop: "20px" }} className='mavicik'>Buy more League products</p></NavLink>



                    </div>
                    <div className='categories-home-page'>
                        <NavLink style={{ cursor: "auto" }} exact to={'/productpage/15'}><p className="homepageptags" style={{ fontSize: "21px", fontWeight: "bold" }}>Junk Food</p></NavLink>

                        <NavLink exact to={'/productpage/15'}><img id='alexa' alt='something' className='' src='https://m.media-amazon.com/images/I/81CIge4tiwL._AC_UL480_FMwebp_QL65_.jpg'></img></NavLink>
                        <div style={{ width: "100px" }} className='genzonrecommended'>
                            Best junk food
                        </div>
                        <p style={{ fontFamily: "Merienda", fontSize: "18px", margin: "7px 0 0", display: "flex", cursor: "auto" }} ><span style={{ fontSize: "12px", fontFamily: "Merienda" }}>$</span>12.00</p>
                        <NavLink exact to={'/productpage/15'}><p style={{ marginTop: "7px" }}>Pringles Potato Crisps Chips, Lunch Snacks</p></NavLink>

                        <NavLink style={{ cursor: "auto" }} exact to={'/allproducts/4'}><p style={{ marginTop: "20px" }} className='mavicik'>Shop more groceries</p></NavLink>

                    </div>


                    <div style={{ width: '307px' }}></div>
                    <div style={{ width: '307px' }}></div>

                </div>
                <div style={{ marginTop: "300px" }}>


                    <Footer something={true} />
                </div>
            </div>

        </>

    )
}


export default Home
