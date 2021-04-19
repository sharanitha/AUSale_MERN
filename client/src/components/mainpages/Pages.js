import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
//import MyProducts from './products/MyProducts'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory2'
import Reports from './history/Reports'
import MyProducts from './products/MyProducts'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

import {GlobalState} from '../../GlobalState'

function Pages(){
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route path='/' exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct} />
            
            <Route path='/login' exact component={isLogged ? NotFound : Login}/>
            <Route path='/register' exact component={isLogged ? NotFound : Register}/>

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />

            <Route path="/create_product" exact component={CreateProduct} />
            <Route path="/myproducts" exact component={MyProducts} />
            <Route path="/edit_product/:id" exact component={CreateProduct} />

            <Route path="/reports" exact component={isLogged ? Reports : NotFound} />
            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path='/cart' exact component={Cart}/>

            <Route path='*' exact component={NotFound}/>
        </Switch>
    )
}

export default Pages;