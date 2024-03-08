import React, { useEffect, useState } from 'react'
import logo from '../../assets/movix-logo.png'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import './style.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {

  const [show, setShow] = useState("show")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000)
    }
  }

  const handleNavigate = (type) => {
    navigate(`/discover/${type}`)
    setMobileMenu(false)
    setShowSearch(false)
  }

  const controlHeader = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide")
      } else {
        setShow("show")
      }
      setLastScrollY(window.scrollY)
    }else {
      setShow("show")
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", controlHeader)
    return () => window.removeEventListener("scroll", controlHeader)
  }, [lastScrollY])

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="" />
          <h1 className='logoTxt'>ChalaChitra</h1>
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => handleNavigate("movie")}>Movies</li>
          <li className="menuItem" onClick={() => handleNavigate("tv")}>TV Shows</li>
          <li className="menuItem"><SearchIcon onClick={openSearch} /></li>
        </ul>

        <div className="mobileMenuItems">
          <SearchIcon onClick={openSearch} />
          {
            mobileMenu ? (
              <CloseIcon onClick={() => setMobileMenu(false)} />
            ) : (
              <MenuIcon onClick={openMobileMenu} />
            )
          }

        </div>
      </ContentWrapper>

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search any movies/TV shows'
              onKeyUp={(e) => searchQueryHandler(e)}
              onChange={(e) => setQuery(e.target.value)}
            />
            <CloseIcon onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  )
}

export default Header
