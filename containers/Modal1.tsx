import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import ModalContent from '../components/ModalContent'
import ModalTrigger from '../components/ModalTrigger'

export default (props: any) => {
  const [isShown, setIsShown] = useState(false)

  const showModal = () => {
    // may have to useEffect here
    // this.setState({ isShown: true }, () => {
    //   this.closeButton.focus()
    // })
    setIsShown(true)
    this.closeButton.focus()
    toggleScrollLock()
  }
  const closeModal = () => {
    setIsShown(false)
    this.TriggerButton.focus()
    toggleScrollLock()
  }
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 27) {
      closeModal()
    }
  }
  const onClickOutside = (event: MouseEvent<HTMLInputElement>) => {
    if (this.modal && this.modal.contains(event.target)) return
    closeModal()
  }

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock')
  }

  return (
    <React.Fragment>
      <ModalTrigger
        showModal={showModal}
        buttonRef={n => (this.TriggerButton = n)}
        triggerText={props.modalProps.triggerText}
      />
      {isShown ? (
        <ModalContent
          modalRef={n => (this.modal = n)}
          buttonRef={n => (this.closeButton = n)}
          closeModal={closeModal}
          content={props.modalContent}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
        />
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  )
}
