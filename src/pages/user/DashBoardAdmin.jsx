import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovie, fetchAsyncMovies, getMovies } from '../../redux/movie/movieSlice';
import CreateMovie from '../../components/CreateMovie/CreateMovie';
import UpdateMovie from '../../components/UpdateMovie/UpdateMovie';
import NOTIFICATION_TYPE, { TABLE_HEADER_CONTENTS } from '../../constants';
import './DashBoardAdmin.scss';
import { message, notification } from 'antd';

function DashBoardAdmin() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const movies = useSelector(getMovies);
  console.log('movies in admin page', movies);

  const [isCreateNewMovie, setIsCreateNewMovie] = useState(false);
  const [isUpdateMovie, setIsUpdateMovie] = useState(false);
  const [idSelectedMovie, setIdSelectedMovie] = useState(' ');

  const selectedMovie = useMemo(() => {
    return movies.find(item => item._id === idSelectedMovie)
  }, [movies, idSelectedMovie]);

  const handleDeleteMovie = async(id) => {
    if(confirm('Confirm delete movie?')) {
      try {
        await dispatch(deleteMovie({accessToken: localStorage.getItem('access_token'), id}))
        notification[NOTIFICATION_TYPE.success] ({
          message: 'Delete movie successfully',
          placement: 'topRight'
        })
        await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')))
      } catch (error) {
        console.log('error deleting movie', error)
        notification[NOTIFICATION_TYPE.error] ({
          message: "Fail to delete movie",
          placement: 'topRight'
        })
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 20
    }}>
      <h1>Admin Dashboard</h1>
      <button className='new-movie-btn' onClick={() => setIsCreateNewMovie(true)}>New movie</button>
      {
        isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie} />
      }
      {
        isUpdateMovie && <UpdateMovie selectedMovie={selectedMovie} setIsUpdateMovie={setIsUpdateMovie} />
      }
      <section>
        <div style={
          {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            gridGap: 10,
            padding: 10,
            color: 'black',
            border: '1px solid gray'
          }
        }>
          {TABLE_HEADER_CONTENTS.map(content => <p className='table-header-item' key={content}>{content}</p>)}
        </div>
        <>
        {
          movies.length && movies.map(movie => {
            const {_id, title, year, poster} = movie
            return (
              <div key={_id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                gridGap: 10,
                padding: 10,
                color: 'black',
                border: '1px solid gray'
              }}>
                <p className='table-body-item'>{_id}</p>
                <p className='table-body-item'>{title}</p>
                <p className='table-body-item'>{year}</p>
                <p className='table-body-item'>
                  <img src={poster} alt="movie-poster" className='movie-poster' /> 
                </p>
                <p className='table-body-item' style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <button style={{
                    cursor: 'pointer',
                    padding: '3px'
                  }} onClick={() => {
                    setIsUpdateMovie(true)
                    setIdSelectedMovie(_id)
                  }}>Edit</button>
                  <button style={{
                    cursor: 'pointer',
                    padding: '3px'
                  }} onClick={() => {
                    handleDeleteMovie(_id)
                  }}>Delete</button>
                </p>
              </div>
            )
          })
        }
        </>
      </section>
    </div>
    
  )
}

export default DashBoardAdmin