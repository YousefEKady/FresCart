import React, { useContext, useEffect, useState } from 'react'
import { theCartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Cart() {
  let { getLoggedUserCart, deleteProduct, updateCartQuantity, createCheckout } = useContext(theCartContext)
  const [items, setItems] = useState({ products: [], totalCartPrice: 0 })

  async function removeItemFromCart(productId) {
    let {data} = await deleteProduct(productId)
    console.log(data)
    setItems(data?.data)
  }

  async function updateitemCart(productId, count) {
    let {data} = await updateCartQuantity(productId, count)
    console.log(data)
    if(data.status = "success") {
      toast.success("Product Updated Successfully")
      setItems(data?.data)
    }
  } 

  async function checkOut(cartId) {
    let {data} = await createCheckout(cartId)
    window.location.href = data.session.url;
  } 
  
  useEffect(() => {
      (async() => {
          let data = await getLoggedUserCart()
          setItems(data?.data.data)
      })()
  }, [])

  return (
    <div>
      <div className="container bg-main-light my-3 p-3">
        <h2>Shop Cart:</h2>
        {items.totalCartPrice > 0 ? (
          <>
            <p className='text-main'>Total Cart Price: {items.totalCartPrice} EGP</p>
            {items.products.map(item => (
              <div key={item._id} className="row border-bottom p-2">
                <div className="col-md-1">
                  <img src={item.product.imageCover} className='w-100' alt='' />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <p className='m-0'>{item.product.title}</p>
                    <p className='text-main m-0'>Price: {item.price} EGP</p>
                    <button onClick={() => removeItemFromCart(item.product._id)} className='btn m-0 mt-1 p-0'>
                      <i className='fa-solid fa-trash-can text-main'></i> Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={() => updateitemCart(item.product._id, item.count + 1)} className='btn brd'>+</button>
                    <span className='mx-2'>{item.count}</span>
                    <button disabled={item.count == 1} onClick={() => updateitemCart(item.product._id, item.count - 1)} className='btn brd'>-</button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => checkOut(items._id)} className='btn bg-main text-white my-4 w-25'>Place Order</button>
          </>
        ) : (
          <p className='text-main'>No items in the cart.</p>
        )}
      </div>
    </div>
  )
}