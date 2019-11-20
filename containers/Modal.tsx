import React, { Component } from 'react'
import ModalContent from '../components/ModalContent'
import ModalTrigger from '../components/ModalTrigger'

import { ModalProps, ModalContentType } from '../components/types';

interface ModalState extends Component {
  isShown: boolean
  [others: string]: any
}

export class Modal extends Component<ModalProps, ModalContentType> {
  constructor(props: any) {
    super(props)
    this.state  = {
      isShown: false
    } as ModalState
  }
  showModal = () => {
    console.log('what is this', this)
    this.setState({ isShown: true }, () => {
      this['closeButton'].focus()
    })
    this.toggleScrollLock()
  }
  closeModal = () => {
    this.setState({ isShown: false })
    this['TriggerButton'].focus()
    this.toggleScrollLock()
  }
  onKeyDown = (event: any) => {
    if (event.keyCode === 27) {
      this.closeModal()
    }
  }
  onClickOutside = (event: any) => {
    if (this['modal'] && this['modal'].contains(event.target)) return
    this.closeModal()
  }

  toggleScrollLock = () => {
    document.querySelector('html')!.classList.toggle('scroll-lock')
  }
  render() {
    return (
      <React.Fragment>
        <ModalTrigger
          showModal={this.showModal}
          buttonRef={n => (this['TriggerButton'] = n)}
          triggerText={this.props['modalProps'].triggerText}
        />
        {this.state['isShown'] ? (
          <ModalContent
            modalRef={n => (this['modal'] = n)}
            buttonRef={n => (this['closeButton'] = n)}
            closeModal={this.closeModal}
            content={this.props['modalContent']}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    )
  }
}

export default Modal
