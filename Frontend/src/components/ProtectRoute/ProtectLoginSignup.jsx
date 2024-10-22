import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectLoginSignup(props) {
  const navigate = useNavigate()
  
    const { pathname } = useLocation();
    const { children } = props;
    const { isLogged } = useSelector(( state ) => state.userInfo );
    console.log('protect', pathname, 'isLogged in', isLogged);
    useEffect(() => {
      if(isLogged) {
        console.log('nav')
        navigate(-1);
      }
    },[])


    return isLogged ? <></> : children
}

export default ProtectLoginSignup
