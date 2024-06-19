import { Spin, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncMovies, updateMovie } from '../../redux/movie/movieSlice'
import NOTIFICATION_TYPE from '../../constants'
import './UpdateMovie.scss'

function UpdateMovie({ selectedMovie, setIsUpdateMovie }) {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: selectedMovie?.title,
    year: selectedMovie?.year,
    poster: selectedMovie?.poster
  })

  const handleUpdateMovie = async (e) => { 
    e.preventDefault()
    setIsLoading(true)
    try {
      await dispatch(updateMovie({
        accessToken: localStorage.getItem('access_token'),
        id: selectedMovie?._id,
        dataUpdate: formData,
      }))
      notification[NOTIFICATION_TYPE.success]({
        message: 'Update movie successfully',
        placement: 'topRight'
      })
      await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')))
    } catch (error) {
      notification[NOTIFICATION_TYPE.error]({
        message: 'Update movie failed',
        placement: 'topRight'
      })
    }
    setIsLoading(false)
    setIsUpdateMovie(false)
  }

  return (
    <section>
      <h1 className='title'>Update movie</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 500,
        maxWidth: 500,
      }}>
        <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder='Movie title' className='input' autoFocus />
        <input type="text" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder='Year release' className='input' />
        <textarea type='text' value={formData.poster} onChange={e => setFormData({ ...formData, poster: e.target.value })} placeholder='Movie poster' className='input' rows="4" />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          width: '100%',
          maxWidth: 500,
        }}>
          <button className='btn btn-next' onClick={handleUpdateMovie}>
            Update
            {loading && <Spin style={{
              marginLeft: 10
            }} size='small' />}
          </button>
          <button className='btn btn-back' onClick={() => setIsUpdateMovie(false)}>Cancel</button>
        </div>
      </form>
    </section>
  )
}

export default UpdateMovie