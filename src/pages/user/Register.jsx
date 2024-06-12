import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  return (
    <section className='card'>
      <h1 className='title'>Create a new account</h1>
      <form style={{
        
      }}>
        <input type="email" placeholder='Email' className='input' autoFocus value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      </form>
    </section>
  )
}

export default Register