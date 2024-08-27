import React from 'react'
import Carousel from './components/Carousel'
import Sub from '../globalComponents/sub heading/Sub'
import Card from './components/Card'

function Home() {
  return (
    <div>
        <Carousel/>
        <Sub text={"Near you"}/>
        <Card/>
    </div>
  )
}

export default Home