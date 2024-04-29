/* eslint-disable no-async-promise-executor */
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByFilter(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductBySort(option) {
  let queryString ='';
  if(option.order==='asc'){
    queryString=`_sort=${option.sort}`
  }else{
    queryString=`_sort=-${option.sort}`

  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    resolve({ data });
  });
}
