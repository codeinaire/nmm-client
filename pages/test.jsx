import React from 'react'
import Webcam from 'react-webcam'
import { loadModels, detectFacesAndExpression } from '../utils/faceRecog'

const WIDTH = 420
const HEIGHT = 420
const inputSize = 160

class VideoInput extends React.Component {
  constructor(props) {
    super(props)
    this.webcam = React.createRef()
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      match: null,
      facingMode: null
    }
  }

  componentWillMount = async () => {
    // await loadModels()
    this.setInputDevice()
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      )
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user'
        })
      } else {
        await this.setState({
          facingMode: { exact: 'environment' }
        })
      }
      console.log('devices', navigator)
      this.startCapture()
    })
  }

  startCapture = () => {
    console.log('THIS!!!!', this)
    console.log('BEFORE this.interval', this.interval)
    this.interval = setInterval(() => {
      this.capture()
    }, 1500)
    console.log('AFTER this.interval', this.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  capture = async () => {
    if (!!this.webcam.current) {
      await detectFacesAndExpression(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        if (!!fullDesc) {
          this.setState({
            detections: fullDesc.map(fd => fd.detection),
            descriptors: fullDesc.map(fd => fd.descriptor)
          })
        }
      })

      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          this.state.faceMatcher.findBestMatch(descriptor)
        )
        this.setState({ match })
      }
    }
  }

  render() {
    const { detections, match, facingMode } = this.state
    let videoConstraints = null
    let camera = ''
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      }
      if (facingMode === 'user') {
        camera = 'Front'
      } else {
        camera = 'Back'
      }
    }

    let drawBox = null
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height
        let _W = detection.box.width
        let _X = detection.box._x
        let _Y = detection.box._y
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        )
      })
    }

    return (
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
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
      </div>
    )
  }
}

export default function Test() {
  return (
    <div>
      Hello Next.js
      <VideoInput />
    </div>
  )
}
