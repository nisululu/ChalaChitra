import React, {useState} from 'react'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {

    const [type, setType] = useState("movie")
    const { data, loading } = useFetch(`/${type}/popular`)

    const onTabChange = (tab) => {
        setType(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Popular {type === "movie" ? "Movies" : "Tv Shows"}</span>
                <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>

            <Carousel data={data?.results} loading={loading} type={type} />
        </div>
    )
}

export default Popular
