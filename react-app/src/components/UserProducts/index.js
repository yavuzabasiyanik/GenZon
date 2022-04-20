import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './UserProducts.css';
import { deleteProduct } from '../../store/product';
import { useState } from 'react';
import UpdateForm from '../ProductForm/UpdateForm';

const UserProducts = () => {

    const user = useSelector(state => state.session.user);
    const [updateProduct, setUpdateProduct] = useState([false, 0]);
    const dispatch = useDispatch();

    const allProducts = useSelector(state => Object.values(state.products))
    const userProducts = allProducts.filter(ele => {
        return ele.user_id === user.id;
    }).reverse()

    const deleteProductFunc = (e, id) => {
        e.preventDefault();

        dispatch(deleteProduct(id));

    }


    const allProductsUserDiv = userProducts.map(ele => {
        return (<div className='productsinuserpage' key={ele?.id}>
            <div className='pallikiskeye'>
                <NavLink exact to={`/productpage/${ele?.id}`}><img className='imageinthe' src={ele?.image_url}></img></NavLink>

                <div className='nameusernamepricedescription'>

                    <NavLink exact to={`/productpage/${ele?.id}`}><p style={{ color: "#007185", cursor: "pointer", fontSize: "14px", fontWeight: "700", display: "inline" }}>{ele?.name}</p></NavLink>
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
                <button className='reddeleteproduct' onClick={(e) => deleteProductFunc(e, ele?.id)}>Delete</button>
            </div>
        </div>)
    })


    // background-color: #ffd814;
    // border-color: #FCD200;

    const legendaryLeagueEmptyImage = (
        <div className='legendmain-div'>
            <div className='asilllegendary-div-empty'>
                <div className='somethingheree3'>
                    <div className='h1veh6ikilisi'>

                        <h1 style={{ marginLeft: "10px", fontSize: "28px" }}>Wanna sell your item on GenZon? Click
                         <NavLink  exact to={`/product/sell`}><span style={{margin: "0px 10px", fontSize: "28px", color: "#F08804", textDecoration:"underline" }}>here</span></NavLink>
                        to learn more.</h1>
                    </div>

                </div>
                <img className='legendimg' src='https://external-preview.redd.it/GLem0FFrjGGfKF8ruVScaYqNmB0CbKde8gFD82Ov-cw.jpg?auto=webp&s=c925bc146f8b8b0bad10909fe40470b96eaa4c7b'></img>
            </div>
        </div>
    )

    return (

        <>
            {userProducts?.length ?

                (<div className='user-products-main-div'>
                    <div className='productsGrid'>
                        {allProductsUserDiv}
                    </div>
                </div>)
                : (
                    legendaryLeagueEmptyImage
                )

            }
            {updateProduct[0] &&
                <UpdateForm id={updateProduct[1]} update={updateProduct} setUpdate={setUpdateProduct} />
            }
        </>

    )
}

export default UserProducts;
