import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { BsArrowRepeat } from 'react-icons/bs'
import { deleteFile, downloadFile, getFiles } from '../api/FileApi'
import ConfirmationModal from '../components/ConfirmationModal'

import FileList from '../components/FileList'
import FileUploader from '../components/FileUploader'

export default class HomePage extends Component {
  state = {
    audioFiles: [],
    isUploading: false,
    isLoading: true,
    isShowConfirmationModal: false,
    currentFileId: null,
  }

  componentDidMount() {
    this.loadFiles()
  }

  loadFiles = () => {
    this.setState({ isLoading: true })
    getFiles()
      .then(files => {
        this.setState({ audioFiles: files, isLoading: false })
      })
      .catch(err => {
        console.err(err)
      })
  }

  showModal = () => this.setState({ isShowConfirmationModal: true })
  closeModal = () => this.setState({ isShowConfirmationModal: false })

  handleUpload = file => {

  }

  handleDownload = fileId => {
    downloadFile(fileId)
  }

  handleDelete = fileId => {
    this.closeModal()
    deleteFile(this.state.currentFileId)
      .then(response => {
        this.loadFiles()
      })
  }

  render() {
    const { audioFiles, isLoading, isShowConfirmationModal } = this.state

    return (
      <Container data-testid="homepage">
        <h1 className="my-5">E-Mastered Online Audio Manager</h1>
        <Row><Col><h2>Upload New File</h2></Col></Row>
        <Row>
          <Col>
            <FileUploader />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm="9"><h2>Uploaded Audio files</h2></Col>
          <Col sm="3" className="text-right pt-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={this.loadFiles}
            >
              <BsArrowRepeat />
            </Button>
          </Col>
        </Row>
        <FileList
          isLoading={isLoading}
          files={audioFiles}
          onDelete={fileId => {
            this.setState({ currentFileId: fileId })
            this.showModal()
          }}
          onDownload={this.handleDownload}
        />
        <ConfirmationModal
          show={isShowConfirmationModal}
          title="Wait!"
          message="Are you sure to remove this file?"
          handleClose={this.closeModal}
          handleSubmit={this.handleDelete}
        />
      </Container>
    )
  }
}
