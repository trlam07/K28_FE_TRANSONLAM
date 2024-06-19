import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../../redux/movie/movieSlice';
import CreateMovie from '../../components/CreateMovie/CreateMovie';
import UpdateMovie from '../../components/UpdateMovie/UpdateMovie';
import { TABLE_HEADER_CONTENTS } from '../../constants';

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
  }, [movies, idSelectedMovie])
  return (
    <div>
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
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: 10
          }
        }>
          {TABLE_HEADER_CONTENTS.map(content => <p className='table-header-item' key={content}>{content}</p>)}
          {/* <p className='table-header'>Id</p>
          <p>Title</p>
          <p>Year</p>
          <p>Poster</p>
          <p>Action</p> */}
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
              }}>
                <p className='table-body-item'>{_id}</p>
                <p className='table-body-item'>{title}</p>
                <p className='table-body-item'>{year}</p>
                <p className='table-body-item'>
                  <img src={poster} alt="movie-poster" />
                </p>
                <p className='table-body-item'>
                  <button style={{
                    cursor: 'pointer',
                    padding: '3px'
                  }}>Edit</button>
                  <button style={{
                    cursor: 'pointer',
                    padding: '3px'
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