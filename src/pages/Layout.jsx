import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../redux/auth/authSlice';
import { removeMovie, removeMovies } from '../redux/movie/movieSlice';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getLoggedInUser);

  const handleLogout = () => {
    if(confirm('Confirm logout')) {
      dispatch(logout(localStorage.getItem('access_token')))
      dispatch(removeMovies())
      dispatch(removeMovie())

      navigate('/login')
    }
  }

  return (
    <>
        <header style={{
            backgroundColor: '#6366F1',
            padding: '30px 20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link style={{
            color: 'white',
          }} title = 'Home' to= {
            user?.email ? '/' : '/login'
          } className='fa-solid fa-house' />

            {
              user?.email && (<div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 5
            }}>
              {
                user?.role === 'admin' && 
                <Link style = {{
                  color: 'white',
                  cursor: 'pointer'
                }} 
                  title = 'Edit movie' 
                  to = '/admin' 
                  className='fa-solid fa-pen-to-square' />
              }
              <button
                title = 'logout'
                onClick={handleLogout}
                style={{ cursor: 'pointer'}}
                className='fa-solid fa-right-from-bracket' 
              />
              </div>)
            }
          </div>
        </header>

        <main style={{
          padding: '30px 20px'
        }}>
          <Outlet />
        </main>
    </>
  )
}

export default Layout


