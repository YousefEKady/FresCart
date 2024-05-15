import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { theCartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Product({item}) {
  let {counter, setCounter, addToCart} = useContext(theCartContext)
  let [btnLoading, setBtnLoading] = useState(true)
  async function addProductToCart(id) {
    setBtnLoading(false)
    let data = await addToCart(id)
    console.log(data)
    if(data.data.status == "success") {
      toast.success('Product Added Successfully')
      setCounter(data.data.numOfCartItems)
      setBtnLoading(true)
    }
  }
  return (
    <>
      <div className="col-md-2">
        <div className="product py-3 px-2 rounded-3 cursor-pointer">
          <Link to={'/Product-Details/'+item._id}>
            <img src={ item.imageCover } alt='' className='w-100' />
            <span className='text-main'>{ item.category.name }</span>
            <h6>{ item.title.split(' ').slice(0,2).join(' ') }</h6>
            <div className="d-flex justify-content-between">
              <div>
                <p>{ item.price } EGP</p>
              </div>
              <div>
                <p><i className='fa-solid fa-star rating-color'></i> { item.ratingsAverage }</p>
              </div>
            </div>
          </Link>
          <button disabled={!btnLoading} onClick={() => addProductToCart(item._id)} className='btn bg-main w-100 text-white'>
            {btnLoading?'Add To Cart':<i className='fa fa-spin fa-spinner'></i>}
          </button>
        </div>
      </div>
    </>
  )
}
