import lamejs from 'lamejs'

export function encodeStereo(channels, sampleRate, samples) {
  const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, 128);
  var mp3Data = [];
  
  const sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
  
  for (var i = 0; i < samples[0].length; i += sampleBlockSize) {
    const leftChunk = samples[0].subarray(i, i + sampleBlockSize);
    const rightChunk = samples[1].subarray(i, i + sampleBlockSize);
    const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }
  let mp3buf = mp3encoder.flush();   //finish writing mp3
  
  if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
  }
  var blob = new Blob(mp3Data, {type: 'audio/mp3'});
  var url = window.URL.createObjectURL(blob);
  return url
}

