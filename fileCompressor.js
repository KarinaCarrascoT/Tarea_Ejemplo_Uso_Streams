/* 
fileCompressor.js

Compresor de archivos utilizando ReadStream, WriteStream con la librería zlib para comprimir a formato .gz
Instalar npm -i zlib
Ejecutar: npm fileCompressor.js

*/
var fs = require('fs');
var zlib = require('zlib');

// path al archivo origen
var archivo_origen = __dirname + '/textos/texto.txt';

// tamaño del chunk
var tamano_chunk = 16 * 1024;

// definir el stream de lectura
var stream_lectura = fs.createReadStream(archivo_origen, {
    encoding : 'utf8',
    highWaterMark : tamano_chunk
});

// definir el archivo destino
var archivo_destino = __dirname + '/textos/textodestino.txt';

// crear stream de escritura
var stream_escritura = fs.createWriteStream(archivo_destino);

// definir el archivo compreso
var archivo_compreso = __dirname + '/textos/textdestino.txt.gz';

// crear stream del archivo compreso
var stream_compreso = fs.createWriteStream(archivo_compreso);

// vamos a decirle a donde hacer el pipe
var gzip = zlib.createGzip();

// emisor del stream de lectura
stream_lectura.pipe(stream_escritura);

// escribir al archivo compreso
stream_lectura.pipe(gzip).pipe(stream_compreso);