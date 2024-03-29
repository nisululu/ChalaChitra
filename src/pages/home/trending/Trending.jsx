import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {

  const [timeWindow, setTimeWindow] = useState("day")

  const { data, loading } = useFetch(`/trending/all/${timeWindow}`)
  const onTabChange = (tab) => {
    setTimeWindow(tab.toLowerCase())
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
