/* 
duplex.js

Ejercicio que copia un archivo mp4 de la carpeta origen a la carpeta destino
dividendo en pedazos e imprimiendo el tamaño acumulado.

Duplex: Trabaja streams de escritura y lectura.
con Throttle (demora) y pipe (canalización) de los datos
para dar tiempo al manejo de chunk (pedazos) del stream

Ejecutar: node duplex.js

*/

const {Duplex, PassThrough} = require('stream');
const {createReadStream, createWriteStream} = require('fs');
const { domainToASCII } = require('url')
const readStream = createReadStream('./origen/video.mp4');
const writeStream = createWriteStream('./destino/copy.mp4');

class Throttle extends Duplex {

  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read(){}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final(){
    this.push(null)
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);

let total = 0;
report.on('data', (chunk) => {
  total += chunk.length;
  console.log('bytes: ', total);
})

readStream.pipe(throttle).pipe(report).pipe(writeStream);