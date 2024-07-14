/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllOrderAsync,updateOrderAsync} from "../../order/orderSlice";
import { nanoid } from "@reduxjs/toolkit";
import Pagination from "../../../Components/Pagination";
import { ITEMS_PER_PAGE } from "../../../app/constant";

function AdminOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state)=> state.order.totalOrders)
  const [page, setPage] = useState(1);
  const [sortOption, setsortOption] = useState({});

  const [editableOrderId,setEditableOrderId] = useState(-1);

  const handleEdit = (order)=>{
    setEditableOrderId(order.id)
  }
  const handleView = (order)=>{
    console.log("view handler called",order);
  }
 
  const orderEdit = (order,e)=>{
    const newOrder = {...order,status:e.target.value};
    console.log(newOrder);
    dispatch( updateOrderAsync(newOrder));
    setEditableOrderId(-1);
  }
  
  const chooseColor = {
    Pending:"bg-yellow-100 text-yellow-800 p-4 rounded-md",
    Dispatched:"bg-blue-100 text-blue-800 p-4 rounded-md",
    Delivered:"bg-green-100 text-green-800 p-4 rounded-md",
    Cancelled:"bg-red-100 text-red-800 p-4 rounded-md"

  }
  const cancelEdit = ()=>{
    setEditableOrderId(-1);

  }

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    
    dispatch(fetchAllOrderAsync({pagination,sortOption}));
    
  }, [page,sortOption]);

  
  const [order,setOrder] = useState('desc'); 
  const sortHandler = async (option)=>{
    if(order==='desc')
        setOrder('asc')
    else
      setOrder('desc');
    const newSortOption = {...sortOption,_sort:option,_order:order};
    setsortOption(newSortOption);
  
  }

  // useEffect(() => {
  //   if (sortOption) {
    
  //     console.log(sortOption);
  //   }
  // }, [sortOption]);

  const pageHandler = (e,page)=>{
    setPage(page);
    // console.log(page);
  }

  return (
    <>
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left" onClick={e=>{sortHandler('id')}}>#Order</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center" onClick={e=>{sortHandler('subTotal')}}>Total Amount</th>
                  <th className="py-3 px-6 text-center" onClick={e=>{sortHandler('status')}}>Status</th>
                  <th className="py-3 px-6 text-center" >Shipping Address</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders ? (
                  orders.map((order) => (
                    <tr
                      key={nanoid()}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex flex-col space-y-2">
                          {order.items.map((item) => (
                            <div key={nanoid()} className="flex items-center space-x-4 p-3 border-b border-gray-200">
                              <img
                                className="w-10 h-10 rounded-full border border-gray-300 transform hover:scale-125 transition-transform duration-200"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                              <span className="text-gray-800 font-semibold">
                                {item.product.title} <span className="text-gray-600 font-medium">({item.quantity})</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.subTotal}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <div>
                            <select
                              defaultValue={order.status}
                              onChange={(e) => orderEdit(order, e)}
                              className="border border-gray-300 rounded-md py-1 px-2"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              className="m-2 p-2 bg-red-500 rounded-lg text-white font-bold"
                              onClick={cancelEdit}
                            >
                              Cancel Edit
                            </button>
                          </div>
                        ) : (
                          <span className={`${chooseColor[order.status]} py-1 px-3 rounded-full text-lg font-semibold`}>
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="text-gray-700 text-sm">
                          <strong>{order.selectedAddress.name}</strong>,<br />
                          {order.selectedAddress.street},<br />
                          {order.selectedAddress.city}, {order.selectedAddress.state},<br />
                          {order.selectedAddress.pincode}, {order.selectedAddress.phone}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <div className="transform hover:text-purple-500 hover:scale-110 transition-transform duration-200 cursor-pointer">
                            <svg
                              onClick={() => handleView(order)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <div className="transform hover:text-purple-500 hover:scale-110 transition-transform duration-200 cursor-pointer">
                            <svg
                              onClick={() => handleEdit(order)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-lg text-center py-4">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page = {page} setPage = {setPage} pageHandler = {pageHandler} totalItems={totalOrders}/>
        </div>
      </div>
    </div>
  </>
  
  );
}

export default AdminOrder;
