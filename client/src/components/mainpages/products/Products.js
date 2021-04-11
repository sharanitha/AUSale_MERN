import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'

function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const getProducts = async () =>{
            const res = await axios.get('/api/products')
            setProducts(res.data.products)
        }
        getProducts()

    }, [setProducts])

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                     token={token} callback={callback} setCallback={setCallback} />
                })
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <Loading/>}
        </>
    )
}

export default Products
