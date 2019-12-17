import React from 'react'

import VidCam from '../components/LiveFaceDetect'
// import FbInitParent from '../containers/FbInitParent'
// import FbUserShare from '../components/FbUserShare'

export default function HomePage() {
  return (
    <div>
      <h1>Take a photo</h1>
      <h4>Facebook stuff</h4>
      {/* <FbInitParent>
      {() => (
        <FbUserShare href='https://myapp.example:3000/create-recipe' quote='This is absolutely amazing!!' />
      )}
      </FbInitParent> */}
      <VidCam />
    </div>
  )
}
