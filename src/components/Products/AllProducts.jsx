import axios from 'axios'
import Product from '../Product/Product'
import { useQuery } from 'react-query'

export default function AllProducts() {

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let { data } = useQuery('getProducts', getProducts, {
    //cacheTime: 3000,
    //refetchOnMount: false, true by default
    //refetchOnWindowFocus: false, true by default
    //refetchOnReconnect: false, true by default 
  })

  return (
    <>
      <div className="products my-3">
        <div className="container">
          <div className="row">
            {data?.data.data.map((item) => <Product key={item._id} item={item} />)}
          </div>
        </div>
      </div>
    </>
  )
}
