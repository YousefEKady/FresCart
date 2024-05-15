import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { theCartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function ProductDetails() {
  let { ProductID } = useParams()
  const [product, setProduct] = useState(null)
  let { counter, setCounter, addToCart } = useContext(theCartContext)
  let [btnLoading, setBtnLoading] = useState(true)

  async function addProductToCart(id) {
    setBtnLoading(false)
    let data = await addToCart(id)
    console.log(data)
    if (data.data.status === "success") {
      toast.success('Product Added Successfully')
      setCounter(data.data.numOfCartItems)
    }
    setBtnLoading(true)
  }

  async function getProduct() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProductID}`)
    console.log(data.data)
    setProduct(data.data)
  }

  useEffect(() => {
    getProduct()
  }, [])

  if (!product) return <div>Loading...</div>

  return (
    <>
      <div className="product-details my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img src={product.imageCover} className='w-100' alt='' />
            </div>
            <div className="col-md-9">
              <h2>{product.title}</h2>
              <p className='mx-3 my-3'>{product.description}</p>
              <span>{product.brand?.name}</span>
              <div className="d-flex justify-content-between my-2">
                <div>
                  <p>{product.price} EGP</p>
                </div>
                <div>
                  <p><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</p>
                </div>
              </div>
              <button disabled={!btnLoading} onClick={() => addProductToCart(product._id)} className='btn bg-main w-100 text-white'>
                {btnLoading?'Add To Cart':<i className='fa fa-spin fa-spinner'></i>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
