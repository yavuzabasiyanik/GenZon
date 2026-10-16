import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './UserProducts.css';
import { deleteProduct } from '../../store/product';
import { useEffect, useRef, useState } from 'react';
import UpdateForm from '../ProductForm/UpdateForm';
import Footer from '../Footer';

const UserProducts = () => {

    const user = useSelector(state => state.session.user);
    const [updateProduct, setUpdateProduct] = useState([false, 0]);
    const [deleteProductModal, setDeleteProductModal] = useState([false, -1]);

    const dispatch = useDispatch();

    const allProducts = useSelector(state => Object.values(state.products))
    const userProducts = allProducts.filter(ele => {
        return ele.user_id === user.id;
    }).reverse()

    let shoppingcart = useSelector(state => Object.values(state.shoppingcart));

    const deleteProductFunc = (e, id) => {
        e.preventDefault();


        shoppingcart = shoppingcart?.filter(thing => thing.product_id === id)[0]

        dispatch(deleteProduct(id));

        setDeleteProductModal([false,-1])
    }

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])

    let menuRef = useRef()

    useEffect(() => {
        const handler = (event) => {
            if (!menuRef?.current?.contains(event.target)) {

                setDeleteProductModal([false, -1]);
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });


    const allProductsUserDiv = userProducts.map(ele => {
        return (<div className='productsinuserpage' key={ele?.id}>
            <div className='pallikiskeye'>
                <NavLink exact to={`/productpage/${ele?.id}`}><img alt='something' className='imageinthe' src={ele?.image_url}></img></NavLink>

                <div className='nameusernamepricedescription'>

                    <NavLink exact to={`/productpage/${ele?.id}`}><p className='turuncu' style={{ color: "#007185", cursor: "pointer", fontSize: "14px", fontWeight: "700", display: "inline" }}>{ele?.name}</p></NavLink>
                    <p style={{ lineHeight: "20px" }}><span style={{ fontSize: "10.5px" }}>by</span> <span style={{ fontWeight: "700" }}>{ele?.user.username}</span></p>
                    <p style={{ marginTop: "20px", fontSize: "14px", width: "500px", wordBreak: "break-word" }}>{ele?.description}</p>
                </div>
            </div>
            <div className='herosoftonight'>
                <div className='sky'>

                    <p>Price: ${ele?.price}.00</p>
                    <p>Category: {ele?.category[0].toUpperCase() + ele?.category.slice(1)}</p>
                </div>
                <button className='yellowupdatethingy' onClick={(e) => setUpdateProduct([true, ele?.id])} >Update</button>
                <button className='reddeleteproduct' onClick={(e) => setDeleteProductModal([true,ele?.id])}>Delete</button>
            </div>
        </div>)
    })




    const legendaryLeagueEmptyImage = (
        <div className='legendmain-div'>
            <div className='asilllegendary-div-empty'>
                <div className='somethingheree3'>
                    <div className='h1veh6ikilisi'>

                        <h1 style={{ marginLeft: "10px", fontSize: "28px" }}>Wanna sell your item on GenZon? Click
                            <NavLink exact to={`/product/sell`}><span style={{ margin: "0px 10px", fontSize: "28px", color: "#F08804", textDecoration: "underline" }}>here</span></NavLink>
                            to learn more.</h1>
                    </div>

                </div>
                <img alt='something' className='legendimg' src='https://external-preview.redd.it/GLem0FFrjGGfKF8ruVScaYqNmB0CbKde8gFD82Ov-cw.jpg?auto=webp&s=c925bc146f8b8b0bad10909fe40470b96eaa4c7b'></img>
            </div>
            <Footer something={true}></Footer>
        </div>
    )

    return (

        <>
            {userProducts?.length ?

                (<div className='user-products-main-div'>
                    <div className='productsGrid'>
                        {allProductsUserDiv}
                    </div>
                    <Footer something={true} />
                </div>)
                : (
                    legendaryLeagueEmptyImage
                )

            }
            {updateProduct[0] &&
                <UpdateForm id={updateProduct[1]} update={updateProduct} setUpdate={setUpdateProduct} />
            }
            {deleteProductModal[0] &&
                <div className='background-modal'>
                    <div ref={menuRef} className="modal-container-edit-delete-post-modal">
                        <div className="areYouSureYouwannaDelete" >
                            <div className='pareyousure'>
                                <p className='deletePostA'>Delete product?</p>
                                <p className='areyousuredeletepost'>Are you sure you want to remove this product from GenZon?</p>
                            </div>
                            <div onClick={(e) => deleteProductFunc(e, deleteProductModal[1])} className="yes">
                                {/* edit-delete-post-modal-divs navlink-delete */}
                                <button  className="navlink-delete">Yes</button>
                            </div>
                            <div className="edit-delete-post-modal-divs" onClick={() => setDeleteProductModal([false,-1])}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default UserProducts;
