import React, { Component } from 'react'
import FaceLeft from '../assets/freezaLeft.svg'
import FaceRight from '../assets/freezaRight.svg'

function LoadingScreen() {
  return (
    <div className='loadingScreenContain'>
      <div className='faceContain'>
        <img className='face left' src={FaceLeft} alt='Left'/>
        <img className='face right' src={FaceRight} alt='Right'/>
      </div>
    </div>
  )
}

export default LoadingScreen
