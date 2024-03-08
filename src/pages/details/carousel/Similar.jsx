import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carousel from '../../../components/carousel/Carousel'

const Similar = ({ data, loading }) => {
    
    return (
        <>
            {data?.results?.[0] && (
                <div className='carouselSection'>
                    <ContentWrapper>
                        <span className='carouselTitle'>Similar Movies</span>
                    </ContentWrapper>
                    <Carousel data={data?.results} loading={loading} />
                </div>
            )}
        </>
    )
}

export default Similar
