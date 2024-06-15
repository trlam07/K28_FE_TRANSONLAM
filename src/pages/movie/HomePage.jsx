import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncMovies, getMovies } from '../../redux/movie/movieSlice';
import { Spin, message, notification } from 'antd';
import NOTIFICATION_TYPE from '../../constants';
import MovieListing from '../../components/MovieListing/MovieListing';
import './HomePage.scss'

function HomePage() {
  const dispatch = useDispatch();
  const movies = useSelector(getMovies)
  console.log('movies in Homepage', movies)

  const fetchMovies = async() => {
    if(localStorage.getItem('access_token') && movies.length === 0) {
      const data = await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')))
      console.log('data in homepage', data)
      if(data?.payload) {
        notification[NOTIFICATION_TYPE.success]({
          message: 'Get movies successfully',
          placement: 'topRight'
        }) 
      } else {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Get movies failed',
          placement: 'topRight'
        })
      }
    }
  }

  useEffect(() => {fetchMovies()}, [movies.length, localStorage.getItem('access_token')])
  return (
    <section>
      <h1 className='title'>Movies</h1>
      {
        movies.length === 0 ? (<div style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <Spin />
        </div>) : (<>
          <MovieListing movies={movies} />
        </>)
      }
    </section>
  )
}

export default HomePage