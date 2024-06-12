import React from 'react'
import './MovieDetail.scss'

function MovieDetail({movie}) {
    const {title, year, poster} = movie
  return (
    <div className='movie-section'>
        <div className='section-left'>
            <p className='movie-title'>{title}</p>
            <p>Year <i class="fa-solid fa-calendar-days" /> : {year}</p>
        </div>

        <div className='section-right'>
            <img src={poster} alt={title} />
        </div>
    </div>
  )
}

export default MovieDetail