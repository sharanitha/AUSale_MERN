import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    //for listing items that the logged in user has created
    const createdList = []
    const pendingList = []
    const soldList = []

    var total = 0;

    products.forEach((product) =>{
        if(product.status === "For Sale"){
            createdList.push(<tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.seller}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>{product.status}</td>
                <td>${product.price}.00</td>
            </tr>)
        }else if(product.status === "Pending"){
            pendingList.push(<tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.seller}</td>
                <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                <td>{product.status}</td>
                <td>${product.price}.00</td>
            </tr>)
        }else if(product.status === "Sold"){
            soldList.push(<tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.seller}</td>
                <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                <td>{product.status}</td>
                <td>${product.price}.00</td>
            </tr>)
            total += product.price
        }
    })

    if(loading) return <div><Loading /></div>
    return (
        <div className="history-page">
            <h2>For Sale Items</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Seller ID</th>
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
            <h2>Pending Items</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Seller ID</th>
                        <th>Date Bought</th>
                        <th>Status</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingList}
                </tbody>
            </table>

            <br></br>
            <h2>Sold Products</h2>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Seller ID</th>
                        <th>Date Sold</th>
                        <th>Status</th>
                        <th>Purchase Price</th>
                    </tr>
                </thead>
                <tbody>
                    {soldList}
                </tbody>
            </table>

            <h2>Total = ${total}.00 </h2>

        </div>
    )
}

export default Products