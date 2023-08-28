import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'

const Home = () => { 
  // const homeSlide= ["trending", "popular","top_rated"]
  return (
    <div>
        <HeroBanner/>
        <Trending /> 
        <Popular/>
        <TopRated/>
    </div>
  )
}

export default Home