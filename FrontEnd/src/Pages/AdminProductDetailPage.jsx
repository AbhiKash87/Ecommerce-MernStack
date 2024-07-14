// import React from 'react'
import { useParams } from 'react-router-dom'
import AdminProductDetails from '../features/Admin/Components/AdminProductDetails';

function AdminProductDetailPage() {
  const product_id = useParams().product_id;
  // console.log(product_id);
  return (
    <div>
        <AdminProductDetails product_id={product_id}/>
    </div>
  )
}

export default AdminProductDetailPage