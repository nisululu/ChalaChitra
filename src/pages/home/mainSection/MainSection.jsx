import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import LazyLoadImg from '../../../components/lazyLoad/LazyLoadImg'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'

const MainSection = () => {

    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")

    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = "https://image.tmdb.org/t/p/original" + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
        setBackground(bg)
    }, [data])

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='mainSection'>
            {!loading && <div className="backdropImg">
                <LazyLoadImg image={background} />
            </div>}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="mainSectionContent">
                    <span className="title">Welcome,</span>
                    <span className="subTitle">Most of the movies and TV shows to discover.</span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search any movies/TV shows'
                            onKeyUp={(e) => searchQueryHandler(e)}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={()=>{query.length>0?navigate(`/search/${query}`):""}}>Search</button>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default MainSection
