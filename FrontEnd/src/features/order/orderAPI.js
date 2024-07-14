/* eslint-disable no-async-promise-executor */

import customFetch from "../CustomApi/CustomFetch";

export function createOrder(newOrder) {
  
  return new Promise(async (resolve) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/order`,{
      method:'POST',
      body: JSON.stringify(newOrder),
      headers: {'content-type':'application/json',Authorization: token}
    });
    
    const data = await response.json();
    //TODO on server it will only return releveant information
    resolve({ data });
  });
}
export function updateOrder(newOrder) {
  
  return new Promise(async (resolve) => {

    const response = await customFetch(`/order/${newOrder.id}`,{
      method:'PATCH',
      body: JSON.stringify(newOrder),
      headers: {'content-type':'application/json'}
    });
    
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrder({pagination,sortOption}) {
  let queryString = "";

  for (let key in sortOption) {
    queryString += `${key}=${sortOption[key]}&`;
   
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    
  }
  
  // console.log(`http://localhost:8080/order/admin?${queryString}`);
  return new Promise(async (resolve) => {
     
      const response = await customFetch(`/order/admin?${queryString}`);
      const data = await response.json();
      resolve({ data:{orders:data.data,totalOrders:data.items} });
  });
}




