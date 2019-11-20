import React from 'react'

import { ModalTriggerProps } from './types'

export default (props: ModalTriggerProps) => {
  return (
    <button
      ref={props.buttonRef}
      onClick={props.showModal}
      className="modal-button"
    >
      {props.triggerText}
    </button>
  )
}
