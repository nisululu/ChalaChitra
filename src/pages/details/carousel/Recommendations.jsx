import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carousel from '../../../components/carousel/Carousel'

const Recommendations = ({ data, loading }) => {

    return (
        <>
            {data?.results?.[0] && (
                <div className='carouselSection'>
                    <ContentWrapper>
                        <span className='carouselTitle'>Recommendations</span>
                    </ContentWrapper>
                    <Carousel data={data?.results} loading={loading} />
                </div>
            )}
        </>
    )
}

export default Recommendations
