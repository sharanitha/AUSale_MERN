import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [userID] = state.userAPI.userID
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    //for listing items that the logged in user has created
    const createdList = []
    const soldList = []

    var total = 0;

    products.forEach((product) =>{
        if(product.status !== "Sold"){
            createdList.push(<tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.createdAt}</td>
                <td>{product.status}</td>
                <td>{product.price}</td>
            </tr>)
        } else if(product.status === "Sold"){
            soldList.push(<tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.createdAt}</td>
                <td>{product.status}</td>
                <td>{product.price}</td>
            </tr>)
        }
    })

    products.forEach( p =>{
        total += p.price
    })

    if(loading) return <div><Loading /></div>
    return (
        <div className="history-page">
            <h2>For Sale / Pending Items</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {createdList}
                </tbody>
            </table>

            <br></br>
            <h2>Sold Products</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Purchase Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldList}
                </tbody>
            </table>

            <h2>Total = {total} </h2>

        </div>
    )
}

export default Products