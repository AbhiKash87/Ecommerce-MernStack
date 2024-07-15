/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync } from "../userSlice";
import { discountedPrice } from "../../../app/constant";

function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.userOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());

    if (orders) {
      // console.log(orders);
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-4xl font-bold tracking-tight text-gray-900 bg-gray-300 p-4 my-8 bg-slate-500">
        My Orders
      </div>

      {orders && orders.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Product</th>
              <th className="py-2">Brand</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2">Total Items</th>
              <th className="py-2">Subtotal</th>
              <th className="py-2">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-t border-gray-200">
                <td className="py-4 px-6 text-center">{order.id}</td>
                <td className="py-4 px-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">
                          {item.product.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-gray-500">
                      {item.product.brand}
                    </p>
                  ))}
                </td>
                <td className="py-4 px-6 text-center">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-gray-500">
                      {item.quantity}
                    </p>
                  ))}
                </td>
                <td className="py-4 px-6 text-center">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm text-gray-500">
                      ${discountedPrice(item.product)}.00
                    </p>
                  ))}
                </td>
                <td className="py-4 px-6 text-center">{order.ItemCount}</td>
                <td className="py-4 px-6 text-center">${order.subTotal}.00</td>
                <td className="py-4 px-6">
                  <p>{order.selectedAddress.name}</p>
                  <p className="text-xs text-gray-500">
                    {order.selectedAddress.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm text-gray-900">
                    {order.selectedAddress.country}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.selectedAddress.street}, {order.selectedAddress.city}
                    , {order.selectedAddress.state},{" "}
                    {order.selectedAddress.pincode}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Product</th>
                <th className="py-2">Brand</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total Items</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-6 text-center" colSpan="8">
                  No orders found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserOrders;

{/* <div>
  <div className="text-4xl  font-bold tracking-tight text-gray-900 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-300 p-4 my-8  bg-slate-500">
    <h1 className="text-4xl  font-bold tracking-tight text-gray-900 p-2 px-8 mt-2 mx-52">
      My Orders
    </h1>
  </div>

  {orders &&
    orders.map((order, index) => (
      <div
        key={order.id}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-300 p-4 my-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {index + 1}. Order Id : #{order.id}
        </h1>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {order.items.map((item) => (
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
                          <a href="#">{item.product.title}</a>
                        </h3>
                        <p className="ml-4">
                          ${discountedPrice(item.product)}.00
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        <label className="inline text-sm font-medium leading-6 text-gray-900 m-5">
                          Qty: {item.quantity}
                        </label>
                      </p>
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
            <p>{order.ItemCount} items</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 my-2">
            <p>Subtotal</p>
            <p>${order.subTotal}.00</p>
          </div>
          <div className="flex text-base font-medium text-gray-900 my-2">
            <p>Shipping Address:</p>
            <div className="flex items-center">
              <div className="ml-3">
                <p>{order.selectedAddress.name}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {order.selectedAddress.email}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {order.selectedAddress.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.country}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {order.selectedAddress.street}, {order.selectedAddress.city},{" "}
                  {order.selectedAddress.state}, {order.selectedAddress.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
</div> */}
