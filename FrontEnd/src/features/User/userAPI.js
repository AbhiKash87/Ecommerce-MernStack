/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import {customFetch} from "../CustomApi/CustomFetch";

/* eslint-disable no-async-promise-executor */
export function fetchLoggedInUserOrder() {
    
    return new Promise(async (resolve) => {
      
      const response = await customFetch(`/order/user`);
      
      const data = await response.json();
      resolve({ data });
    });
}


export function fetchLoggedInUser() {
    
    return new Promise(async (resolve,reject) => {
      
      try {
        const response = await customFetch(`/user/own`);
        const data = await response.json();
        resolve({ data });
      } catch (error) {
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

export function updateUser(updateData) {
    return new Promise(async (resolve) => {
      
      const response = await customFetch(`/user/update`,{
        method:'PATCH',
        body: JSON.stringify(updateData),
        headers: {'content-type':'application/json'}
      });
      
     
      const data = await response.json();
      //TODO on server it will only return releveant information
      resolve({ data });
    });
}


