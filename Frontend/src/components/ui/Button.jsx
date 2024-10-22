import React from 'react'
import Button from '@mui/material/Button';

export default function Buttons(props) {
    const { text, onAction, color, bgColor } = props;
  return <Button onClick={onAction} sx={{width: '200px', textTransform: 'capitalize', }} color={color} variant="contained">{text}</Button>
}
