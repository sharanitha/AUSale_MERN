import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

function CreateProduct() {

    const state = useContext(GlobalState)
    const [userID] = state.userAPI.userID


    const initialState = {
        title : '',
        price: 0,
        description : 'Description of product goes here',
        content : 'Add any specifications about product here',
        status: 'For Sale',
        category: '',
        _id: '',
        seller: `${userID}`,
        buyer: ''
    }
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products

    // used to show if product is being edited
    //if true, then form will be created with product info,
    // button will have update text, and api url will be for editing
    const [onEdit, setOnEdit] = useState(false)

    const [callback, setCallback] = state.productsAPI.callback

    //  when editing an item, it will pull all the info about it and
    // display it on the createProduct page so it can be edited
    useEffect(() =>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product =>{
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                } 
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    //handles image uploads
    const handleUpload = async e =>{
        e.preventDefault()
        try{
            const file = e.target.files[0]
            //console.log(file)

            if(!file) return alert("No file uploaded")

            if(file.size > 1024 * 1024) {
                return alert("Size is too large");
            }

            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                return alert('File format is not accepted. Please upload JPEG or PNG')
            }

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type' : 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setImages(res.data)
            

        }catch (err) {
            alert(err.response.data.msg)
        }
    }

    //delete the uploaded image if it's not the one the user wants or changes their mind
    const handleDestroy = async () =>{
        try{
            //if(!isAdmin) return alert("You are not an admin")

            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id},
                {header: {Authorization : token}}
            )
            setLoading(false)

            setImages(false)

        }catch (err){
            alert(err.response.data.msg)
        }
    }

    //get info from form fields
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            //if(!isAdmin) return alert("You are not an admin")
            if(!isLogged) return alert("You are not logged in")
            if(!images) return alert("No image has been uploaded")

            if(onEdit){
                //if onEdit is true, then go to edit API url
                await axios.put(`/api/products/${product._id}`, {...product, images}, {headers: {Authorization : token}})

            } else {
                //if onEdit is not true, then go to create product API url
                await axios.post('/api/products', {...product, images}, {headers: {Authorization : token}})
            }

            setCallback(!callback)
            history.push('/')
            
        } catch (err){
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display : images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className='upload'>
                <input type='file' name='file' id='file_up' onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                    : <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {
                    onEdit ?
                    <div className='row'>
                    <label htmlFor='title'>Status: </label>
                    <select name='status' value={product.status} onChange={handleChangeInput}>
                        <option value='For Sale'>For Sale</option>
                        <option value='Pending'>Pending</option>
                        <option value='Sold'>Sold</option>
                    </select>
                    </div>
                    :
                    <input type='hidden' name='status' id='status' required value={product.status} onChange={handleChangeInput}/>
                }

                <button type='submit'>{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
