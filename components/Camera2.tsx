import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import ImagePreview from './ImagePreview'
import { loadModels, getFullFaceExpression } from '../utils/faceRecog'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

export default () => {
  const [dataUri, setDataUri] = useState('')

  const webcamRef: any = React.useRef(null)
  async function loadModelsFunc() {
    await loadModels()
  }

  useEffect(() => {
    console.log('use effect')
    loadModelsFunc()
  })
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    console.log(imageSrc)
    dataURItoBlob(imageSrc)
    setDataUri(imageSrc)
  }, [webcamRef])

  async function dataURItoBlob(dataURI:any) {
    const result = await getFullFaceExpression(dataURI)
    console.log('result of face', result);
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let unSignedInts = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      unSignedInts[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([unSignedInts], {
        type: 'image/jpeg'
    });

    return blob;
  }

  return (
    <>
    {dataUri ? (
        <ImagePreview dataUri={dataUri} />
      ) : (
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />)}
      <button onClick={capture}>Capture photo</button>
    </>
  )
}
