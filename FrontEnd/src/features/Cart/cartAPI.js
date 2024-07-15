/* eslint-disable no-unused-vars */

import { useSelector } from "react-redux";
import {customFetch} from "../CustomApi/CustomFetch";

/* eslint-disable no-async-promise-executor */
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await customFetch(`/cart`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json"},
    });

  

    const data = await response.json();
    //TODO on server it will only return releveant information
    resolve({ data });
  });
}
export function updateCart({ update }) {

  return new Promise(async (resolve) => {
    const id = update.id;
    delete update["id"];
    const response = await customFetch(`/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json"},
    });
    // console.log(response)
    const data = await response.json();
    //TODO on server it will only return releveant information
    resolve({ data });
  });
}
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await customFetch(`/cart/${itemId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json"},
    });
    const data = await response.json();
    //TODO on server it will only return releveant information
    resolve({ data: { id: itemId } });
  });
}
export function fetchAllCartItemsByUserId() {
  return new Promise(async (resolve,reject) => {

    try{
      const response = await customFetch(`/cart`);
    const data = await response.json();
    resolve({ data });
    }catch (error) {
      // Handle the error here (e.g., log it, show a notification, etc.)
      if (error.message === 'Unauthorized access. Please log in.') {
        // You can handle the specific unauthorized error here
        // For example, redirect to login page or show a message
        // console.error('Unauthorized access: Redirecting to login.');
      }
      reject(error);
    }
  });
}
export function resetCart() {
  return new Promise(async (resolve) => {
    const res = await fetchAllCartItemsByUserId();
    const allCartItems = await res.data;

    for (let item of allCartItems) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "cart successfully reset" });
  });
}
