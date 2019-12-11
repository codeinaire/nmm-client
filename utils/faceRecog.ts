import * as faceapi from 'face-api.js'
import logger from './logger'
import { FaceRecogProperties } from '../components/types'

export async function loadModels() {
  try {
    // TODO - maybe load models on recipe page load
    // TODO - maybe load models SSR which requires the polyfill monkeypatch
    logger.log({
      level: 'INFO',
      description: 'Loading models'
    })
    // TODO - maybe change the paths when going into prod.
    await faceapi.loadTinyFaceDetectorModel('/models')
    await faceapi.loadFaceExpressionModel('/models')
  } catch (error) {
    logger.log({
      level: 'ERROR',
      description: error
    })
  }
}

export async function detectFacesAndExpression(dataUri: string, inputSize = 320) {
  // tiny_face_detector options
  const scoreThreshold = 0.5
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  })

  // convert dataUri into html image element
  let img: HTMLImageElement = await faceapi.fetchImage(dataUri)

  logger.log({
    level: 'INFO',
    description: 'Running detection & expression analysis'
  })
  // detect all faces and generate expressions
  const facesAndExpressionDetected: Array<FaceRecogProperties> = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceExpressions()

  return facesAndExpressionDetected
}
