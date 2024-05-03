// import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../features/Product/Components/ProductDetails'

function ProductDetailPage() {
  const product_id = useParams().product_id;
  // console.log(product_id);
  return (
    <div>
        <ProductDetails product_id={product_id}/>
    </div>
  )
}

export default ProductDetailPage