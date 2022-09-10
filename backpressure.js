/*
backpressure.js

Ejercicio de ReadStream y WriteStream Control el caso llamado Backpressure
Pausando la lectura si hay el error para acumular(dained) y escribir

Backpressure => Contrapresión en streams
Hay un problema general que ocurre durante el manejo de datos llamado contrapresión y describe 
una acumulación de datos detrás de un búfer durante la transferencia de datos.
Cuando el extremo receptor de la transferencia tiene operaciones complejas, o es más lento
por la razón que sea, hay una tendencia a que los datos de la fuente de entrada se acumulen.

Ejecutar: node backpressure.js
*/

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

/*evento 'drain' para continuar la escritura
Evento: 'drain' #función () { } Emitido después de que 
se llamó a un método write() que devolvió falso para indicar que es seguro volver a escribir.
*/
writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume();
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n');
})