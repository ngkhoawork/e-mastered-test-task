import React, { PureComponent } from 'react'
import { Button, Table } from 'react-bootstrap'
import { BsTrash, BsDownload } from 'react-icons/bs'

export default class FileList extends PureComponent {
  render() {
    const { files, isLoading } = this.props
    return (
      <Table striped bordered hover size="sm" responsive  data-testid="file-list">
        <thead>
          <tr>
            <th>File Id</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? (
              <tr>
                <td colSpan={5} align="center">Loading...</td>
              </tr>
            )
            : files.map(f => {
              return (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.name}</td>
                  <td>{`${(f.size / 1024).toFixed(2)} KB`}</td>
                  <td>{new Date(f.created).toDateString()}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className='mr-2'
                      onClick={() => this.props.onDownload(f.id)}
                    >
                      <BsDownload />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => this.props.onDelete(f.id)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

