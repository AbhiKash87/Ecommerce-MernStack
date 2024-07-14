
import { useDispatch, useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutAsync } from '../AuthSlice';
import { useEffect } from 'react';

function LogOut() {
    const dispatch = useDispatch();
    const loggedINUserToken = useSelector(state=>state.auth.loggedINUserToken);

    useEffect(()=>{
      if(loggedINUserToken)
        dispatch(signOutAsync());
    },[])
    return (
        <>
            {!loggedINUserToken && 
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                You are successfully Logged Out 
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
                
    
                
              
                <div>
                  <Link to = '/login'>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log In
                  </button>
                  </Link>
                </div>
            
    
              
            </div>
          </div>}
        </>
          );
}

export default LogOut