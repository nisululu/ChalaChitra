import { useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './slice/homeSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Search from './pages/search/Search'
import Explore from './pages/discover/Discover'
import PageNotFound from './pages/404/PageNotFound'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then(res => {
      const url = {
        backdrop: res.images.secure_base_url +"original",
        poster: res.images.secure_base_url +"original",
        profile: res.images.secure_base_url +"original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let type = ["movie", "tv"]
    let allGenres = {}
    
    type.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres}) => {
      return genres.map((item) => allGenres[item.id] = item)
    })

    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/discover/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
