/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedAdmin({children}) {
    const user = useSelector(state=>state.user.userInfo);
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    if(!user && user.role !== 'admin'){
        return <Navigate to='/'></Navigate>
    }
    
    return children;
}

export default ProtectedAdmin