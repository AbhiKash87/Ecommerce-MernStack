
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import {Footer} from './Footer'

function LayOut() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default LayOut