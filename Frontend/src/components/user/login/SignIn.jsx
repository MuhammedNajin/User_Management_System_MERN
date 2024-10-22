import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormInput from '../../ui/FormInput';
import Button from '../../ui/Button';
import createAxios from '../../../axios/axios';
import { baseURL } from '../../../data/urls'
import { useDispatch } from 'react-redux';
import { changeState } from '../../../redux/userSlice';
import { setEmail } from '../../../redux/emailSlice';
import { 
  validateEmail, 
  validateName, 
  validatePassword, 
  validatePhone, 
  } from '../../../utils/validation'
import './SignIn.css';

function Login() {
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('')
const [ error, setError] = useState({email: false, password: false})
const navigate = useNavigate();
const dispach = useDispatch()
const axios = createAxios( baseURL );

useState(() => {
  console.log('heeee');
  const id = setTimeout(() => {
    
      setError({email: false, password: false});
     
  }, 3000);
  return () => {
    clearTimeout(id);
  }
}, [error]);
function handleEmail(event) {
  console.log(email)
   setEmail(event.target.value);
}

function handlePassword() {
   setPassword(event.target.value)
}

async function handleSubmit() {
  const data = {
    email,
    password
  }
   axios.post('/login', data)
   .then((response) => {
    console.log(response.data.user);
   if(response.status === 200) {
        dispach(changeState(response.data.token));
        dispach(setEmail(user.email));
        localStorage.setItem('user', JSON.stringify(response.data.user));
       navigate('/')
   }
   })
   .catch((err) => {
    if(err.response?.status === 401) {
      console.log('email errir');
       setError({...error, email: true})
       
    } else if(err.response.status === 402) {
      setError({...error, password: true})
    }
  })
}

  return (
    <div className='login-container'>
       <div className='myform'>
        <p className='signup-heading'>Sign In</p>
     <div className='login-input-container'>
     <FormInput label='Email' type='email' onAction={handleEmail} 
        errorMassage={
          error.email ? 'Invalid email' : null
        }
        error={ error.email }
     />
     </div>
     <div className='login-input-container'>
     <FormInput label='Password' type='password' onAction={handlePassword} 
       errorMassage={
        error.password ? 'Invalid password' : null
      }
      error={ error.password}
     />
     </div>
       <div className='submit-button'>
          <Button onAction={handleSubmit} text='Signup' />
       </div>
    </div>
    </div>
  )
}

export default Login
