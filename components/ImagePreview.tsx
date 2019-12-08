import React from 'react'

export const ImagePreview = ({ dataUri }: any) => {
  return (
    <div>
      <img src={dataUri} />
    </div>
  )
}

export default ImagePreview