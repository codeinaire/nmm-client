import React, { Component } from 'react'
import ModalContent from '../components/ModalContent'
import ModalTrigger from '../components/ModalTrigger'

export class Modal extends Component {
  constructor() {
    super()
    this.state = {
      isShown: false
    }
  }
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus()
    })
    this.toggleScrollLock()
  }
  closeModal = () => {
    this.setState({ isShown: false })
    this.TriggerButton.focus()
    this.toggleScrollLock()
  }
  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal()
    }
  }
  onClickOutside = event => {
    if (this.modal && this.modal.contains(event.target)) return
    this.closeModal()
  }

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock')
  }
  render() {
    return (
      <React.Fragment>
        <ModalTrigger
          showModal={this.showModal}
          buttonRef={n => (this.TriggerButton = n)}
          triggerText={this.props.modalProps.triggerText}
        />
        {this.state.isShown ? (
          <ModalContent
            modalRef={n => (this.modal = n)}
            buttonRef={n => (this.closeButton = n)}
            closeModal={this.closeModal}
            content={this.props.modalContent}
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
