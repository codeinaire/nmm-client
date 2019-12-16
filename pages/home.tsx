import React from 'react'

import VidCam from '../components/LiveFaceDetect'
// import FbInitAndToken from '../containers/FbInitAndToken'
// import FbGroupShare from '../components/FbGroupShare'

export default function HomePage() {
  return (
    <div>
      <h1>Take a photo</h1>
      <h4>Facebook stuff</h4>
      {/* <FbInitAndToken>
        <FbGroupShare access_token={props} />
      </FbInitAndToken> */}
      <VidCam />
    </div>
  )
}
