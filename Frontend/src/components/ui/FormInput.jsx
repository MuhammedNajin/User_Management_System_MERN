import React from 'react'
import TextField from '@mui/material/TextField';

function FormInput(props) {
    console.log('render')
    const {
    label,
    type,
    error,
    onAction,
    errorMassage
    } = props
    console.log('errorfff', errorMassage)
  return (
    <div className='input-container'>
      <TextField
          id="outlined-password-input"
          label={label}
          type={type}
          error={error}
          autoComplete="current-password"
          sx={{ width: '300px' }}
          fullWidth={true}
          size='small'
          onChange={onAction}
          helperText={ errorMassage != true ? errorMassage : null}
        />
    </div>
  )
}

export default FormInput
