import React from 'react'
import './style.scss'
import LazyLoadImg from '../lazyLoad/LazyLoadImg'
import { useSelector } from 'react-redux'
import NoPoster from '../../assets/no-poster.png'
import Genres from '../genres/Genres'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'


const MoviesCard = ({ data, searchType }) => {

    const { url } = useSelector((state) => state.home)
    const posterUrl = data.poster_path ? url?.poster + data.poster_path : NoPoster

    const navigate = useNavigate()

    return (
        <div className='moviesCard' onClick={() => { navigate(`/${data.media_type || "movie"}/${data.id}`) }}>
            <div className="posterBlock">
                <LazyLoadImg image={posterUrl} />
                {!searchType && (
                    <>
                        <div className='rating'>{data.vote_average.toFixed(1)}</div>
                        <Genres ids={data.genre_ids.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">
                    {data.title || data.name}
                </span>
                <span className="date">
                    {dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    )
}

export default MoviesCard
