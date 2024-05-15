import React from 'react'
import Carousel from '../Carousel/Carousel'
import Categories from '../Categories/Categories'
import AllProducts from '../Products/AllProducts'

export default function Home() {
  return (
    <div className='container my-2'>
      <Carousel />
      <Categories />
      <AllProducts />
    </div>
  )
}
