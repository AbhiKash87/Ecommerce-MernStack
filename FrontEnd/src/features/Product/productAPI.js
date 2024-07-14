/* eslint-disable no-unused-vars */

import customFetch from "../CustomApi/CustomFetch";

/* eslint-disable no-async-promise-executor */
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByFilter({filter,sortOption,pagination}) {
  let queryString = "";
  

  for (let key in filter) {
    const categoryValue = filter[key];
    if(categoryValue.length>0){
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString+=`${key}=${lastCategoryValue}&`
    }
  }  

  for (let key in sortOption) {
    queryString += `${key}=${sortOption[key]}&`;
   
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    
  }
 
 
  
  return new Promise(async (resolve) => {

 
    
    const response = await customFetch(
      `/products?${queryString}`);
    const data = await response.json();
    
    resolve({ data });
  });
}



export function fetchAllCategories() {
  return new Promise(async (resolve) => {

    const response = await customFetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {

    const response = await customFetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductByID(product_id) {
  return new Promise(async (resolve) => {
    const response = await customFetch(`/products/${product_id}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {

    const response = await customFetch(`/products/`,{
      method:'POST',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await customFetch(`/products/${product.id}`,{
      method:'PATCH',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    });
    const data = await response.json();
    //TODO on server it will only return releveant information
    resolve({ data });
  });
}

// export function deleteProduct(itemId) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`http://localhost:8080/products/${itemId}`,{
//       method:'DELETE',
//       headers: {'content-type':'application/json'}
//     });
//     const data = await response.json();
//     //TODO on server it will only return releveant information
//     resolve({ data:{id:itemId} });
//   });
// }


// export function fetchProductBySort(option) {
//   let queryString ='';
//   if(option.order==='asc'){
//     queryString=`_sort=${option.sort}`
//   }else{
//     queryString=`_sort=-${option.sort}`

//   }
//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       `http://localhost:8080/products?${queryString}`
//     );
//     const data = await response.json();
//     resolve({ data });
//   });
// }
