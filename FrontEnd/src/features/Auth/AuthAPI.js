/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
export function signUp(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch(`/auth/signup`,{
        method:'POST',
        body: JSON.stringify(userData),
        headers: {'content-type':'application/json'}
      });
      
     
      const data = await response.json();
      //TODO on server it will only return releveant information
      console.log(data)
      resolve({ data });
    });
  }

export function Login(loginInfo) {

  console.log("Login:",loginInfo)
    return new Promise(async (resolve,reject) => {
      try{
        const response = await fetch(`/auth/login`,{
          method:'POST',
          body: JSON.stringify(loginInfo),
          headers: {'content-type':'application/json'}
        });

        if(response.ok){
          const data = await response.json();
          resolve({ data });
        }else{
          const err = await response.json();
          reject(err)
        }
      }catch(err){
        reject( err )
      }
      
      
    });
}


export function signOut() {
    
    return new Promise(async (resolve) => {
     
          resolve({ data: 'success' });
             
    });
}

