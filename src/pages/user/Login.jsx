import { Spin } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/authSlice';
import './Login.scss'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await dispatch(login({...formData}))
    //console.log('data in function Login', data)
    if(data?.payload){
      navigate('/')
    }
    setLoading(false)
  }
  return (
    <section style={{marginTop: 20}} className='card'>
      <h1 className='title'>Log in your account</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }} onSubmit={handleLogin}>
        <input type="email" placeholder='Email' className='input' autoFocus value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />

        <input type='password' placeholder='Password' className='input' value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />

        <button className='btn-login' type='submit'>
          Login
          {loading && <Spin style={{marginLeft: 10}} size= 'small' />}
        </button>

        <p style={{
          marginTop: 5
          }}>You don't have an account? <Link style={{
            color: 'blue',
            cursor: 'pointer'
          }} to={'/register'}>Register</Link>
        </p>
      </form>
    </section>
  )
}

export default Login