// import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/Product-list/ProductList'

function Home() {
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
    </div>
  )
}

export default Home