/* eslint-disable no-async-promise-executor */
export function createUser(userData) {
    console.log(userData);
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/user`,{
        method:'POST',
        body: JSON.stringify(userData),
        headers: {'content-type':'application/json'}
      });
      
      console.log("done")
      const data = await response.json();
      resolve({ data });
    });
  }