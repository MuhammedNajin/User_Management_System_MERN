import React from 'react';
import FormInput from './FormInput';
import Button from './Button';


function Form() {
  return (
    <div className='myform'>
        <p className='signup-heading'>Create an account</p>
      
      <FormInput label='Name' type='text' />
      <FormInput label='Email' type='email' />
      <FormInput label='Phone' type='text' />
      <FormInput label='Password' type='password' />
      <FormInput label='Confrim password' type='password'/>
       <div className='submit-button'>
          <Button />
       </div>
    </div>
  )
}

export default Form
