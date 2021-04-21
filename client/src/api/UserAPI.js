import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
//const Users = require('../models/userModel')
//const Product = require('../models/productModel')

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [userID, setUserID] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    
                    console.log('from UserAPI.js - User Information fom userAPI.js ', res);
                    //console.log('User Information fom userAPI.js ', res.data._id);
                    setFirstName(res.data.firstName)
                    setUserID(res.data._id)
                    setUserEmail(res.data.email)

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        product.buyer = userID
        product.buyerEmail = userEmail
        product.status = "Pending"
        const title = product.title.toUpperCase()
        alert(`You have bought ${title}`)

        await axios.put(`/api/products/${product._id}`, {...product}, {headers: {Authorization : token}})

        /*
        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        } */
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        firstName: [firstName, setFirstName],
        userID: [userID, setUserID],
        userEmail: [userEmail, setUserEmail],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI