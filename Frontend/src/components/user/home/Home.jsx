import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeState, logout } from '../../../redux/userSlice';
import createAxios from '../../../axios/axios';
import { baseURL } from '../../../data/urls'
import './home.css'

function Home() {
const { token } = useSelector((state) => state.userInfo);
const { value } = useSelector((state) => state.email); 
console.log('home token', token);
const axios = createAxios(baseURL, token);
const [ state, setState ] = useState('');
const dispatch = useDispatch()
  useEffect(() => {
     axios.get('/user')
     .then((res) => {
      console.log('status',res.status);
        if(res.status === 200) {
          console.log('success');
        }
     })
     .catch((err) => {
        console.log('errr', err.response.status)
        if(err.response.status === 403) {
          dispatch(logout())
        }
     })
  }, [])
  return (
    <div className='home-container'>
       <div style={{height: '646px'}}>
        <div style={{textAlign: 'center', padding: '3rem'}}>
        <div>
        <h1>User Management System</h1>
        </div>
        <div style={{marginTop: '20px'}}>
          <p>Welcome {value ?? value }</p>
        </div>

        </div>
       </div>
    </div>
  )
}

export default Home
