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

const Search = () => {

  const { query } = useParams()

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  const fetchData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/movie?query=${query}&page=${page}`)
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
  }, [query, page])

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
                <div className="mainTitle">{`Search results for "${query}"`}</div>
                <div className='moviesWrapper'>
                  {data.results.map((item, index) => (
                    <MoviesCard key={index} data={item} searchType={true} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="backdropImg">
                  <LazyLoadImg image={ResultNotFound} />
                </div>
                <span className='resultNotFoundtxt'>Ops, result not found !!!</span>
              </>
            )}

            <div className="pagination">
              <Stack spacing={2}>
                {data?.total_pages > 1 && <Pagination count={data?.total_pages} page={page} onChange={handleChange} size={width < 640 ? "small" : "large"} />}
              </Stack>
            </div>

          </ContentWrapper>
        )
      }
    </div>
  )
}

export default Search
