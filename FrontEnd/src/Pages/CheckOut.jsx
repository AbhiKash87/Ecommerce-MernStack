/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useFormAction } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  fetchAllCartItemsByUserIdAsync,
  updateCartAsync,
} from "../features/Cart/cartSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { nanoid } from "@reduxjs/toolkit";
import { createOrderAsync } from "../features/order/orderSlice";
import { updateUserAsync } from "../features/User/userSlice";
import { discountedPrice } from "../app/constant";

const addresses = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    country: "United States",
    street: "123 Main St",
    city: "Anytown",
    state: "California",
    pincode: "12345",
    phone: "1242353456",
  },
  {
    name: "Jane smith",
    email: "jane.smith@example.com",
    country: "Canada",
    street: "456 Maple Ave",
    city: "Mapletown",
    state: "Ontario",
    pincode: "A1B 2C3",
    phone: "1242353456",
  },
];

export default function CheckOut() {
  const CartItems = useSelector((state) => state.cart.items);
  const subTotal = CartItems.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const ItemCount = CartItems.reduce((count, item) => item.quantity + count, 0);
  const userInfo = useSelector((state) => state.user.userInfo);
  const currentOrder = useSelector((state) => state.order.currentOrder);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddress = (index) => {
    setSelectedAddress(userInfo.addresses[index]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const qtyHandler = (e, item) => {
    e.preventDefault();
    const update = { id: item.id, quantity: +e.target.value };
    dispatch(updateCartAsync({ update }));
  };

  const removeItemHandler = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const HandleOrder = () => {
    if (paymentMethod && selectedAddress) {
      let newOrder = {
        items: CartItems,
        subTotal,
        ItemCount,
        paymentMethod,
        selectedAddress,
        status: "Pending",
      };

      if(paymentMethod === 'Card Payment'){
        newOrder = {...newOrder,cardPaymentStatus:'pending'}
      }
  
      dispatch(createOrderAsync(newOrder));
      
    } else {
      alert("select Address and payment method");
    }

    // TODO: Serverside stock change, clear cart, redirect
  };
  return (
    <>
      {ItemCount <= 0 && <Navigate to="/"></Navigate>}
      {currentOrder && currentOrder.paymentMethod ==='Cash On delivery' && (
        <Navigate to={`/order-success/${currentOrder.id}?redirect_status=succeeded`}></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod ==='Card Payment' && (
        <Navigate to={`/stripe-checkout`}></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-4 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
          <div className="lg:col-span-3">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...userInfo,
                    addresses: [...userInfo.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="region"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "pincode is required",
                          })}
                          id="pincode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                  <fieldset className="mt-5">
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Choose from existing Address
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose one
                    </p>

                    <ul role="list" className="divide-y divide-gray-100">
                      {userInfo.addresses.map((address, index) => (
                        <li
                          key={nanoid()}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              onChange={() => {
                                handleAddress(index);
                              }}
                              id={address.email}
                              name="existing-address"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              value={address}
                              checked={
                                selectedAddress &&
                                selectedAddress.id === address.id
                              }
                            />
                            <div className="ml-3">
                              <label
                                htmlFor={address.name}
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                {address.name}
                              </label>
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                {address.email}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm leading-6 text-gray-900">
                              {address.country}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              {address.street}, {address.city}, {address.state},{" "}
                              {address.pincode}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </fieldset>

                  <fieldset className="mt-5">
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payments methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose one
                    </p>

                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="payments"
                          name="paymentMethods"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) => handlePayment(e)}
                          value="Cash On delivery"
                          checked={
                            paymentMethod &&
                            paymentMethod === "Cash On delivery"
                          }
                        />
                        <label
                          htmlFor="payments"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash On delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="paymentMethods"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) => handlePayment(e)}
                          value="Card Payment"
                          checked={
                            paymentMethod && paymentMethod === "Card Payment"
                          }
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-nothing"
                          name="paymentMethods"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={(e) => handlePayment(e)}
                          value="UPI"
                          checked={paymentMethod && paymentMethod === "UPI"}
                        />
                        <label
                          htmlFor="push-nothing"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          UPI
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-100 p-4 mt-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Shoping cart
              </h1>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                                Qty
                              </label>
                              <select
                                onChange={(e) => {
                                  qtyHandler(e, item);
                                }}
                                value={item.quantity}
                              >
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
                                onClick={(e) => removeItemHandler(e, item.id)}
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
                <div
                  onClick={HandleOrder}
                  className="mt-6 flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Order Now
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
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
          </div>
        </div>
      </div>
    </>
  );
}
