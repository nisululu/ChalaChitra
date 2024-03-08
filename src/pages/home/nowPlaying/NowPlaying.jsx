import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const NowPlaying = () => {

    const { data, loading } = useFetch(`/movie/now_playing`)

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Now Playing</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default NowPlaying
