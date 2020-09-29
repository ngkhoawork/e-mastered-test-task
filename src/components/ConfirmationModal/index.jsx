import React from 'react'
import { Button, Modal } from "react-bootstrap"

export default ({ show, title, message, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} animation={false} data-testid="confirmation-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} data-testid="cancel-button">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} data-testid="ok-button">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}