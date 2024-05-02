/* eslint-disable no-unused-vars */
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
  // console.log("sortOption in fetchProductByFilter",sortOption);
  // console.log("filter in fetchProductByFilter",filter);

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
  // console.log(`${queryString}`);
 
  
  
  console.log(`http://localhost:8080/products?${queryString}`);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    // console.log(data.data);
    resolve({ data });
  });
}

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
