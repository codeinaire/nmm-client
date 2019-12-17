import React from 'react'

// import VidCam from '../components/LiveFaceDetect'
import FbInitAndToken from '../containers/FbInitAndToken'
import FbUserShare from '../components/FbUserShare'

export default function HomePage() {
  return (
    <div>
      <h1>Take a photo</h1>
      <h4>Facebook stuff</h4>
      <FbInitAndToken>
      {() => (
        <FbUserShare href='https://myapp.example:3000/create-recipe' quote='This is absolutely amazing!!' />
      )}
      </FbInitAndToken>
      {/* <VidCam /> */}
    </div>
  )
}
