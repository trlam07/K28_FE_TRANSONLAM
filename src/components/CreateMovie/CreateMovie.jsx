import React, { useState } from 'react';
import './CreateMovie.scss';
import { useDispatch } from 'react-redux';
import { createNewMovie, fetchAsyncMovies } from '../../redux/movie/movieSlice';
import { Spin, notification } from 'antd';
import NOTIFICATION_TYPE from '../../constants';

function CreateMovie({ setIsCreateNewMovie }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    poster: ''
  });

  const handleCreateNewMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createNewMovie({
        accessToken: localStorage.getItem('access_token'),
        newMovie: formData
      }));
      notification[NOTIFICATION_TYPE.success]({
        message: 'Create new movie successfully',
        placement: 'topRight'
      });
      await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')));
    } catch (error) {
      notification[NOTIFICATION_TYPE.error]({
        message: 'Fail to create new movie',
        placement: 'topRight'
      });
    }
    setLoading(false);
    setIsCreateNewMovie(false);
  };

  return (
    <section>
      <h1 className='title'>Create new movie</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 500,
        maxWidth: 500,
      }}>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder='Movie title'
          className='input'
          autoFocus
        />
        <input
          type="text"
          value={formData.year}
          onChange={e => setFormData({ ...formData, year: e.target.value })}
          placeholder='Movie release date'
          className='input'
        />
        <textarea
          value={formData.poster}
          onChange={e => setFormData({ ...formData, poster: e.target.value })}
          placeholder='Movie poster'
          className='input'
          rows='4'
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          width: '100%',
          maxWidth: 500
        }}>
          <button className='btn btn-next' onClick={handleCreateNewMovie}>
            Create
            {loading && <Spin style={{
              marginLeft: 10
            }} size='small' />}
          </button>
          <button className='btn btn-back' onClick={() => setIsCreateNewMovie(false)}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

export default CreateMovie;