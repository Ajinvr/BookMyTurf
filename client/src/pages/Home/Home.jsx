import React from 'react'
import Carousel from './components/Carousel'
import Sub from '../../../src/globalComponents/sub heading/Sub'
import Card from './components/Card'

function Home() {
  return (
    <div className='mt-3'>
        <Carousel/>
            <Sub text={"Near you"}/>
        <Card/>
    </div>
  )
}

export default Home