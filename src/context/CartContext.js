import axios from 'axios'
import React, { createContext, useState } from 'react'
export let theCartContext = createContext(0)

async function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}

async function deleteProduct(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}

async function updateCartQuantity(productId,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}

async function getLoggedUserCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}

async function createCheckout(cartId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {}, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then((data) => {
        return data
    }).catch((err) => {
        return err
    })
}

export default function CartContextProvider({ children }) {
    let [counter, setCounter] = useState(0)
    return <theCartContext.Provider value={{ counter, setCounter, addToCart, getLoggedUserCart, deleteProduct, updateCartQuantity, createCheckout }}>
        {children}
    </theCartContext.Provider>
}
