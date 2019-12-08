import * as faceapi from 'face-api.js'

export async function loadModels() {
  await faceapi.loadTinyFaceDetectorModel('/models')
  await faceapi.loadFaceExpressionModel('/models')
}

export async function getFullFaceExpression(blob: any, inputSize = 512) {
  // tiny_face_detector options
  let scoreThreshold = 0.5;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceExpressions()

  return fullDesc;
}