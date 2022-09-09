const {createReadStream, createWriteStream} = require('fs');
const readStream = createReadStream('./origen/video.mp4');
const writeStream = createWriteStream('./destino/copy.mp4', {
});

readStream.on('data', (chunk) => {
  const result = writeStream.write(chunk);
  //problema con buffer 
  if(!result) {
    console.log('backpressure');
    readStream.pause();
  }
})

readStream.on('error', (err) => {
  console.log("An error has occured");
  console.error(err);
})

readStream.on('end', () => {
  writeStream.end();
})
//evento para continuar la escrutura
writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume();
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n');
})