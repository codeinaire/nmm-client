import React from 'react'
import { createPortal } from 'react-dom'
import FocusTrap from 'focus-trap-react'

import { ModalContentProps } from './types'

export default (props: ModalContentProps) => {
  return createPortal(
    <FocusTrap>
      <aside
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        className="modal-cover"
        onClick={props.onClickOutside}
        onKeyDown={props.onKeyDown}
      >
        <div className="modal-area" ref={props.modalRef}>
          <button
            ref={props.buttonRef}
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={props.closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">{props.content}</div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  )
}

