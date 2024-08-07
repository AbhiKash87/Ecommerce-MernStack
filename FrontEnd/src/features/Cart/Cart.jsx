/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, fetchAllCartItemsByUserIdAsync, updateCartAsync } from "./cartSlice";
import { discountedPrice } from "../../app/constant";


export default function Cart() {
  const [open, setOpen] = useState(true);
  const CartItems = useSelector((state)=>state.cart.items);
  const subTotal = CartItems.reduce((amount,item)=>discountedPrice(item.product)*item.quantity+amount,0);
  const ItemCount = CartItems.reduce((count,item)=>(item.quantity)+count,0);
  const dispatch = useDispatch();
  
  const qtyHandler = (e,item)=>{
    e.preventDefault();
    const update = {id:item.id,quantity:+e.target.value};
    dispatch(updateCartAsync({update}));
  
    
  }

  const removeItemHandler = (e,itemId)=>{
    dispatch(deleteItemFromCartAsync(itemId))
  }
 
  
 
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-4 mt-12">
       <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Shoping cart
            </h1>
    <div className="mt-8">
    <div className="flow-root">
      <ul
        role="list"
        className="-my-6 divide-y divide-gray-200"
      >
        {CartItems.map((item) => (
          <li key={item.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href='#'>
                      {item.product.title}
                    </a>
                  </h3>
                  <div>
                  <p className="ml-4 line-through">${(item.product.price)*item.quantity}.00</p>
                  <p className="ml-4">${discountedPrice(item.product)*(item.quantity)}.00</p>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {item.product.brand}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">
                  <label  className="inline text-sm font-medium leading-6 text-gray-900 m-5">
                    Qty
                  </label> 
                  <select onChange={(e)=>{
                    qtyHandler(e,item)
                  }} value={item.quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={e=>removeItemHandler(e,item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<div className="flex justify-between text-base font-medium text-gray-900 my-2">
    <p>Total Items</p>
    <p>{ItemCount} items</p>
  </div>
  <div className="flex justify-between text-base font-medium text-gray-900 my-2">
    <p>Subtotal</p>
    <p>${subTotal}.00</p>
  </div>
  
  <p className="mt-0.5 text-sm text-gray-500">
    Shipping and taxes calculated at checkout.
  </p>
  <div className="mt-6">
    <Link
      to="/checkout"
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Checkout
    </Link>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or{" "}
     <Link to='/'>
     <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
     </Link>
    </p>
  </div>
</div>
   </div>
  );
}
