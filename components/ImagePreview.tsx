import React from 'react'

export default (props: any) => {
  let drawBox = null
  if (props.liveVid.length) {
    drawBox = props.liveVid.map((faceObj: any) => (
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
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <img src={props.dataUri} alt="imageURL" />
          {!!drawBox ? (props.liveVid.map((faceObj: any) => (
            <div>
            <p>Neutral:{faceObj.expressions.neutral}</p>
            <p>Happy:{faceObj.expressions.happy}</p>
            <p>Sad:{faceObj.expressions.sad}</p>
            <p>Angry:{faceObj.expressions.angry}</p>
            <p>Surprised:{faceObj.expressions.surprised}</p>
          </div>
          ))
          ) : null}
        </div>
        {!!drawBox ? drawBox : null}
      </div>
    </div>
  )
}
