import React from 'react'

import Camera from '../components/Camera2'
import VidCam from '../components/LiveVideoCapture'

export default function HomePage() {
  return (
    <div>
      <h1>Take a photo</h1>
      <VidCam />
      {/* <Camera /> */}
    </div>
  )
}
