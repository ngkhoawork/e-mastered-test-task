export const generateID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * create range [min .. max]
 */
export const range = (min, max) =>
  Array
    .apply(null, { length: max - min + 1 })
    .map((v, i) => i + min)

/**
 * decode arrayBuffer of audio file to AudioBuffer
 * @param {ArrayBuffer} arrayBuffer
 * @return {Promise<AudioBuffer>}
 * @deprecated use AudioContext.decodeAudioData directly
 */
export const decodeAudioArrayBuffer = (arrayBuffer) => {
  return new AudioContext().decodeAudioData(arrayBuffer)
}

/**
 * slice AudioBuffer from start byte to end byte
 * @param {AudioBuffer} audioBuffer
 * @return {AudioBuffer}
 */
export const sliceAudioBuffer = (audioBuffer, start = 0, end = audioBuffer.length) => {
  const newBuffer = new AudioContext().createBuffer(
    audioBuffer.numberOfChannels,
    end - start,
    audioBuffer.sampleRate
  )

  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    newBuffer.copyToChannel(audioBuffer.getChannelData(i).slice(start, end), i)
  }

  return newBuffer
}

/**
 * serialize AudioBuffer for message send
 * @param {AudioBuffer} audioBuffer
 */
export const serializeAudioBuffer = (audioBuffer) => {
  return {
    channels: audioBuffer.numberOfChannels,
    buffers: range(0, audioBuffer.numberOfChannels - 1)
      .map(channelId => {
        const data = audioBuffer.getChannelData(channelId);
        let len = data.length, i = 0;
        let dataAsInt16Array = new Int16Array(len);

        while(i < len){
            dataAsInt16Array[i] = convert(data[i++]);
        }
        function convert(n) {
            let v = n < 0 ? n * 32768 : n * 32767;       // convert in range [-32768, 32767]
            return Math.max(-32768, Math.min(32768, v)); // clamp
        }
        return dataAsInt16Array;
      }),
    sampleRate: audioBuffer.sampleRate,
    length: audioBuffer.length,
  }
}

export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array( buffer );
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

export const base64ToArrayBuffer = (base64) => {
  const binary_string =  window.atob(base64);
  const len = binary_string.length;
  let bytes = new Uint8Array( len );
  for (let i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export const download = (url, name) => {
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
}

export const rename = (filename, ext, stamp) =>
  `${filename.replace(/\.\w+$/, '')}${stamp || ''}.${ext}`
