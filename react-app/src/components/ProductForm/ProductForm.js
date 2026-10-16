import { useState } from "react"
import { useDispatch } from "react-redux";
import "./ProductForm.css"
import { createProduct } from "../../store/product";
import { useHistory } from "react-router-dom";
import ErrorsModal from "./ErrorModal";

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    // const [img, setImg] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState([]);

    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();




    const submitProductForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        let errors = []
        if (name.length <= 3) {
            errors.push('Name must be between 4-80');
        }
        if (description.length <= 10) {
            errors.push('Description must be between 10-1000');
        }
        if (price < 1 || price > 10000) {
            errors.push('Price must be between 1-10000');
        }
        if (quantity < 1 || quantity > 10) {
            errors.push('Quantity must be between 1-10');
        }
        if (category.length === 0) {
            errors.push('Please choose a category!');
        }

        if (errors.length) {
            setErrors(errors)
            return
        }


        formData.append("image_url", imageUrl);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category);


        setImageLoading(true);

        const data = await dispatch(createProduct(formData));

        setImageLoading(false);

        if (data) {
            setErrors(Array.isArray(data) ? data : [data]);
            return
        }

        history.push('/user/products')
    }

    return (
        <>
            <div className="form-main-div-product-sell">

                    <form className="ana-form" onSubmit={submitProductForm}>
                        <div className="selam">
                            <p>Sell Your Item</p>
                        </div>

                        {/* <div className="jeezdodgeit"> */}

                        <div className="product-form-create">
                            <label>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='inputss whatdounow'
                                maxLength={80}
                            />
                        </div>

                        <div className="product-form-create">

                            <label>Price</label>
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='inputss'
                            />
                        </div>

                        {/* </div> */}
                        {/* <div className="teamcompdependent"> */}

                        <div className="product-form-create">

                            <label>Quantity</label>
                            <input
                                type='text'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className='inputss'
                            />
                        </div>
                        <div className="product-form-create">

                            <label>Category</label>
                            <select className='inputss' onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value=''>--Please choose a category--</option>
                                <option value='electronics'>Electronics</option>
                                <option value='fashion'>Fashion</option>
                                <option value='furniture'>Furniture</option>
                                <option value='food'>Food</option>
                                <option value='toys'>Toys, Hobby & DIY</option>
                            </select>
                        </div>
                        <div className="product-form-create">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='inputss'
                                maxLength={1001}

                            />

                        </div>
                        {/* </div> */}
                        <div className="product-form-create image-thingiyhahaha">

                            <label>Product Image Link</label>
                            <input
                                type='url'
                                required
                                placeholder='https://example.com/photo.jpg'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className='inputss'
                            />
                        </div>
                        <button className="formsubmitbuttons" type="submit">Submit</button>

                    </form>

            </div>
            {errors?.length ?
                <ErrorsModal errors={errors} setErrors={setErrors} /> : null

            }
            {
                imageLoading &&
                <div className="modalbackgroundkidna">

                    <img className="somethingelseimageloading" src="https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=ecf05e47y74xgrh1hhu8v8c6obl2bkfw12tuvuvl58qhgh5s&rid=giphy.gif&ct=g" alt="asdas"></img>
                </div>
            }
        </>
    )
}


export default ProductForm
