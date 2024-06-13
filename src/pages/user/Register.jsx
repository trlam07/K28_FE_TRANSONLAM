import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'
import { register } from '../../redux/auth/authSlice';
import { Spin } from 'antd';

function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault()
    setLoading(true)
    const data = await dispatch(register({...formData}))
    console.log('data in function register', data)
  }
  return (
    <section className='card'>
      <h1 className='title'>Create a new account</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }} onSubmit={handleRegister}>
        <input type="email" placeholder='Email' className='input' autoFocus value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />

        <input type='password' placeholder='Password' className='input' value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />

        <button className='btn-register' type='submit'>
          Register
          {loading && <Spin style={{marginLeft: 10}} size= 'small' />}
        </button>

        <p style={{
          marginTop: 5
        }}>You have an account? <Link style={{
          color: 'blue',
          cursor: 'pointer'
        }} to={'/login'}>Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register