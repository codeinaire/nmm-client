import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import ImagePreview from './ImagePreview'
import { loadModels, detectFacesAndExpression } from '../utils/faceRecog'

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user'
}

const SET_FACE_INIT_STATE: any = {
  expressions: null,
  detection: null
}

const SET_IMAGE_INFO_INIT_STATE: any = {
  dataUri: null,
  loading: null
}

export default () => {
  const [faceInfo, setFaceInfo] = useState(SET_FACE_INIT_STATE)
  const [imageInfo, setImageInfo] = useState(SET_IMAGE_INFO_INIT_STATE)

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
  }, [webcamRef])

  async function dataURItoBlob(dataUri:any) {
    var t0 = performance.now();
    const result = await detectFacesAndExpression(dataUri)
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    console.log('result of face', result);
    setFaceInfo({
      expressions: result[0].expressions,
      detection: result[0].detection
    })
    setImageInfo({
      dataUri,
      loading: true
    })
    let byteString = atob(dataUri.split(',')[1]);
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
    {imageInfo.dataUri ? (
        <ImagePreview dataUri={imageInfo.dataUri} expressions={faceInfo.expressions} detection={faceInfo.detection} />
      ) : (
      <Webcam
        id='video'
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />)}
      <button onClick={capture}>Capture photo</button>
    </>
  )
}
