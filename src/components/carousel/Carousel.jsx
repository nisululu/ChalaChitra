import React, { useRef } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LazyLoadImg from '../lazyLoad/LazyLoadImg'
import NoPoster from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import Genres from '../genres/Genres'


const Carousel = ({ data, loading, type }) => {

    const { url } = useSelector((state) => state.home)
    const carouselContainer = useRef()
    const navigate = useNavigate()

    const navigation = (direction) => {
        const container = carouselContainer.current
        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skeleton = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='carousel'>
            <ContentWrapper>
                <KeyboardArrowLeftIcon
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("left")}
                />
                <KeyboardArrowRightIcon
                    className='carouselRightNav arrow'
                    onClick={() => navigation("right")}
                />
                {
                    !loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {data?.map((item) => {
                                const posterUrl = item.poster_path ? url.poster + item.poster_path : NoPoster
                                return (
                                    <div
                                        className="carouselItem"
                                        key={item.id}
                                        onClick={() => navigate(`/${item.media_type || type || "movie"}/${item.id}`)}
                                    >
                                        <div className="posterBlock">
                                            <LazyLoadImg image={posterUrl} />
                                            <div className='rating'>{item.vote_average.toFixed(1)}</div>
                                            <Genres ids={item.genre_ids.slice(0, 2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
