import React from 'react'
import dynamic from 'next/dynamic'

const LiveFaceDetect = dynamic(() => import('../components/LiveFaceDetect'), {
  ssr: false
})

export default function HomePage() {
  return (
    <div>
      <h1>Take a photo</h1>
      <LiveFaceDetect />
    </div>
  )
}
