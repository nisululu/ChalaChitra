import React from 'react'
import './style.scss'
import MainSection from './mainSection/MainSection'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import Upcoming from './upcoming/Upcoming'
import NowPlaying from './nowPlaying/NowPlaying'

const Home = () => {
    return (
        <div className="homePage">
            <MainSection />
            <Trending />
            <Popular />
            {/* <NowPlaying /> */}
            <Upcoming />
        </div>
    )
}

export default Home
