import React from 'react'
import './GCN.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import GeoTag from '../Geotag/Geotag'

const GCN = () => {
  return (
    <div>
        <Navbar/>
        <div className='gc_container'>
        <div className='gc_wrapper'>
        <div className='gc_heading'>
            <h1 style={{fontSize:'40px', marginTop:'3rem'}}>Collector Nearby</h1>
        </div>
        <GeoTag/>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GCN