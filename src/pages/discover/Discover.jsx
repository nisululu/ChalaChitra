import React, { useEffect, useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import { Pagination, Stack } from '@mui/material'
import Loading from '../../components/loading/Loading'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import ResultNotFound from '../../assets/no-results.png'
import LazyLoadImg from '../../components/lazyLoad/LazyLoadImg'
import MoviesCard from '../../components/moviesCard/MoviesCard'


const Discover = () => {

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  const {mediaType} = useParams()

  const fetchData = () => {
    setLoading(true)
    fetchDataFromApi(`/discover/${mediaType}?&page=${page}`)
      .then((res) => {
        setLoading(false)
        setData(res)
      }).catch((err) => {
        setLoading(false)
        setError("Woops! Something went wrong.")
      })
  }

  useEffect(() => {
    fetchData()
  }, [page, mediaType])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <div className='searchSection'>
      {loading && <Loading initial={true} />}
      {
        !loading && (
          <ContentWrapper>
            {data?.results?.[0] ? (
              <>
                <div className="mainTitle">{`List of some of the random ${mediaType === "tv" ? "TV Shows" : "Movies"}`}</div>
                <div className='moviesWrapper'>
                  {data.results.map((item, index) => (
                    <MoviesCard key={index} data={item} searchType={false} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="backdropImg">
                  <LazyLoadImg image={ResultNotFound} />
                </div>
                <span className='resultNotFoundtxt'>Result not found</span>
              </>
            )}

            <div className="pagination">
              <Stack spacing={2}>
                {<Pagination count={100} page={page} onChange={handleChange} size={width < 640 ? "small" : "large"} />}
              </Stack>
            </div>

          </ContentWrapper>
        )
      }
    </div>
  )
}

export default Discover
