import _ from 'lodash'

import { sliceAudioBuffer, serializeAudioBuffer, base64ToArrayBuffer, download, rename } from '../utils'
import { encodeStereo } from '../utils/lame'

const FILE_LIST_KEY = 'audioFiles'
const getFiles = () => {
  return new Promise((resolve) => {
    // simulating downloading time...
    setTimeout(() => {
      const filesStr = localStorage.getItem(FILE_LIST_KEY)
      if (filesStr) {
        const files = JSON.parse(filesStr)
        resolve(files.map(f => ({
          ...f,
          data: undefined,
        })))
      } else {
        resolve([])
      }
    }, 1500)
  })
}

const uploadFile = file => {
  return new Promise((resolve) => {
    const filesStr = localStorage.getItem(FILE_LIST_KEY)
    let files = []
    if (filesStr) {
      files = JSON.parse(filesStr)
    }

    files.push(file)
    localStorage.setItem(FILE_LIST_KEY, JSON.stringify(files))

    resolve({ success: true, fileId: file.id })
  })
}

const downloadFile = fileId => {
  return new Promise((resolve, reject) => {
    const filesStr = localStorage.getItem(FILE_LIST_KEY)
    let files = []
    if (filesStr) {
      files = JSON.parse(filesStr)
    }

    const file = files.find((f, index) => f.id === fileId )
    if (file) {

      
      // var fileReader  = new FileReader();

      // fileReader.onload  = function(event) {
        const audioCtx = new AudioContext()
        const audioData = base64ToArrayBuffer(file.data);
        audioCtx.decodeAudioData(
          audioData,
          function(audioBuffer) {
            const { length, duration } = audioBuffer

            const audioSliced = sliceAudioBuffer(
              audioBuffer,
              ~~(length * 0 / duration),
              ~~(length * 5 / duration),
            )
            const audioData = serializeAudioBuffer(audioSliced)
            const blobUrl = encodeStereo(audioData.channels, audioData.sampleRate, audioData.buffers)
            download(blobUrl, rename(`mastered-${file.name}`, 'mp3'))
          },
          function(e){ 
            console.log("Error with decoding audio data" + e.err)
          }
        );

        
      // };
      // fileReader.readAsArrayBuffer(new Blob(file.data));

      // resolve(file)
    }
    else {
      reject(new Error('Invalid file id'))
    }
  })
}

const deleteFile = fileId => {
  return new Promise((resolve, reject) => {
    try {
      const filesStr = localStorage.getItem(FILE_LIST_KEY)
      let files = []
      if (filesStr) {
        files = JSON.parse(filesStr)
      }
      let newFiles = _.filter(files, f => f.id !== fileId)
        localStorage.setItem(FILE_LIST_KEY, JSON.stringify(newFiles))
      resolve({ success: true, fileId })
    } catch (e) {
      reject(e)
    }
  })
}

export {
  getFiles,
  uploadFile,
  downloadFile,
  deleteFile,
}
