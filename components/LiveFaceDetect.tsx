import React, {
  useCallback,
  useState,
  useEffect,
  createRef,
  RefObject
} from 'react'
import Webcam from 'react-webcam'
import { loadModels, detectFacesAndExpression } from '../utils/faceRecog'
import ImagePreview from './ImagePreview'
import logger from '../utils/logger'
import { isServer } from '../utils/misc'
import FbInitAndToken from '../containers/FbInitParent'
import FbGroupShare from '../components/FbGroupShare'

import { FaceRecogProperties } from './types'

const WIDTH = 420
const HEIGHT = 420
const INPUT_SIZE = 160
const FACE_RECOG_INITIAL_STATE: Array<FaceRecogProperties> = []


/**
 * @remark used to prevent fetching when SSR which causes error
 */
if (!isServer()) {
  loadModels()
}
// TODO fix up the styling for the camera and if I want the box or some kind of notice that is nicer than a box
export default () => {
  const [faceRecog, setFaceRecog] = useState(FACE_RECOG_INITIAL_STATE)
  const [cameraFacingMode, setCameraFacingMode] = useState('')
  const [dataUri, setDataUri] = useState('')
  const webcamRef: RefObject<any> = createRef()
  let interval: any

  useEffect(() => {
    // TODO - do I need put setInputDevice in useEffect? It may be a bit inefficient
    logger.log({
      level: 'INFO',
      description: 'Running setInputDevice()'
    })
    setInputDevice()
    return function cleanup() {
      clearInterval(interval)
    }
  }, [])

  async function setInputDevice() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()

      const inputDevice = await devices.filter(
        (device: MediaDeviceInfo) => device.kind == 'videoinput'
      )
      // TODO - find a way to change camera from front to back
      if (inputDevice.length < 2) {
        setCameraFacingMode('user')
      } else {
        setCameraFacingMode('environment')
      }
      logger.log({
        level: 'INFO',
        description: 'Running startCapture().'
      })
      startCapture()
    } catch (error) {
      logger.log({
        level: 'ERROR',
        description: error
      })
    }
  }

  function startCapture() {
    interval = setInterval(() => {
      detectFaceAndExpression()
    }, 100)
  }

  async function detectFaceAndExpression() {
    console.log('detectFace',webcamRef.current);

    if (!!webcamRef.current) {
      console.log('inside IF of detectFace',!!webcamRef.current);

      const result = await detectFacesAndExpression(
        webcamRef.current.getScreenshot(),
        INPUT_SIZE
      )

      if (result.length) {
        setFaceRecog(result)
      }
    }
  }

  const captureImage = useCallback(() => {
    logger.log({
      level: 'INFO',
      description: 'Running getScreenShot()'
    })
    const imageSrc = webcamRef.current.getScreenshot()
    setDataUri(imageSrc)
    logger.log({
      level: 'INFO',
      description: 'Running dataUriToBlod()'
    })
  }, [webcamRef])

  let videoConstraints
  let camera
  if (cameraFacingMode) {
    videoConstraints = {
      width: WIDTH,
      height: HEIGHT,
      facingMode: cameraFacingMode == 'user' ? 'user' : { exact: cameraFacingMode }
    }
    if (cameraFacingMode === 'user') {
      camera = 'Front'
    } else {
      camera = 'Back'
    }
  }

  let drawBox
  if (faceRecog.length) {
    drawBox = faceRecog.map((faceObj: any) => (
      <div>
        <div
          style={{
            position: 'absolute',
            border: 'solid',
            borderColor: 'blue',
            height: faceObj.detection.box.height,
            width: faceObj.detection.box.width,
            transform: `translate(${faceObj.detection.box._x}px,${faceObj.detection.box._y}px)`
          }}
        ></div>
      </div>
    ))
  }

  return (
    <>
      {dataUri ? (
        <>
          <ImagePreview dataUri={dataUri} faceRecog={faceRecog} />
          <FbInitAndToken>
          {() => (
            <FbGroupShare imageSrc={dataUri} />
          )}
          </FbInitAndToken>
        </>
      ) : (
        <div>
          <div
            className="Camera"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <p>Camera: {camera}</p>
            <div
              style={{
                width: WIDTH,
                height: HEIGHT
              }}
            >
              <div style={{ position: 'relative', width: WIDTH }}>
                {!!videoConstraints ? (
                  <div style={{ position: 'absolute' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                  </div>
                ) : null}
                {!!drawBox ? drawBox : null}
              </div>
            </div>
          </div>
          <button onClick={captureImage}>Capture photo</button>
        </div>
      )}
    </>
  )
}
