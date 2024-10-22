import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectAdminCredential(props) {
    const { children } = props;
    const { isLogged } = useSelector((state) => state.adminInfo);
    console.log('logihgndjids', isLogged)
    return isLogged == false ? children : <Navigate to="/admin" replace/> 
}

export default ProtectAdminCredential
