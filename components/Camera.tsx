import React, { useState } from 'react'
/**
 * @remark react-html5-camera-photo contains no type defs
 */
import Camera from 'react-html5-camera-photo'
import * as faceapi from 'face-api.js'
import ImagePreview from './ImagePreview'

export default () => {
  const [dataUri, setDataUri] = useState('')

  function handleTakePhotoAnimationDone(dataUri: any) {
    console.log('takePhoto', dataUri)
    setDataUri(dataUri)
  }

  const handleTakePhoto = async (dataUri: any) => {
    const detections = await faceapi.detectAllFaces(dataUri)
    console.log('detections', detections);
    console.log('dataURI take photo',dataUri);

    // setDataUri(dataUri)
  }

  const isFullscreen = false
  return (
    <div>
      {dataUri ? (
        <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          onTakePhoto={(dataUri:any) => { handleTakePhoto(dataUri)}}
        />
      )}
      <button onClick={handleTakePhoto}>Take photo</button>
    </div>
  )
}
