import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  return (
    <section style={{marginTop: 20}} className='card'>
      <h1 className='title'>Log in your account</h1>
    </section>
  )
}

export default Login