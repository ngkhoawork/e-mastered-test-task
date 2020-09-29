import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../api/FileApi'
import { generateID, arrayBufferToBase64 } from '../../utils'

import './styles.css'

const FileUploader = () => {
  const [isUploading, setIsUploading] = useState(false)

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    })
  }
  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true)
    const uploadPromises = acceptedFiles.map((file) => {
      return readFileAsync(file)
        .then(buffer => {
          const fileObj = {
            id: generateID(),
            name: file.name,
            size: file.size,
            data: arrayBufferToBase64(buffer),
            created: Date.now()
          }
          return uploadFile(fileObj)
        })
    })

    Promise.all(uploadPromises)
    .then(response => {
      setIsUploading(false)
    })
    .catch(e => {
      console.log(e)
      setIsUploading(false)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive, } = useDropzone({
    accept: 'audio/*',
    onDrop,
  })

  return (
    <div  data-testid="file-uploader">
      <div {...getRootProps({
        className: 'dropzone',
      })}>
        <input {...getInputProps()} data-testid="file-input" />
        
        {isUploading
          ? (<h4>Uploading files...</h4>)
          : isDragActive
            ? <p>Drop the files here ...</p>
            : [
              <p key="description">Drag 'n' drop some files here, or click to select files</p>,
              <em key="type-description">(Only audio files will be accepted)</em>
              ]
        }
      </div>
    </div>
  )
}

export default FileUploader
