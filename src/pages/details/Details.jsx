import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import Similar from './carousel/Similar'
import Recommendations from './carousel/Recommendations'

const Details = () => {

  const location = useLocation()
  const {data:video, loading:videoLoading} = useFetch(`${location?.pathname}/videos`)
  const {data:credits, loading:creditsLoading} = useFetch(`${location?.pathname}/credits`)
  const {data:similarMovie, loading:similarMovieLoading} = useFetch(`${location?.pathname}/similar`)
  const {data:recommendations, loading:recommendationsLoading} = useFetch(`${location?.pathname}/recommendations`)
  
  return (
    <div>
      <DetailsBanner video={video?.results[0]} crew={credits?.crew}  />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Similar data={similarMovie} loading={similarMovieLoading}/>
      <Recommendations data={recommendations} loading={recommendationsLoading} />
    </div>
  )
}

export default Details
