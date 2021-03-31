import React, {useContext} from 'react'
import {Switch, Route, Router} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
//import OrderHistory from './history/OrderHistory'
//import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
//import Categories from './categories/Categories'
//import CreateProduct from './createProduct/CreateProduct'

import {GlobalState} from '../../GlobalState'

function Pages(){
    return (
        <Switch>
            <Route path='/' exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/cart' exact component={Cart}/>
            <Route path='*' exact component={NotFound}/>
        </Switch>
    )
}

export default Pages;