/* streamVideo.js

Reproducir video utilizando ReadStream usando Tubería pipe y controlando error

Se crea un stream  con el contenido de un video en el encabezado del http
para reproducirlo en navegador

Primero correr el servidor -> node streamVideo.js
y luego abrir en navegador http://localhost:3030

*/
var fs = require('fs');
var http =  require('http');
var file = './origen/video.mp4';

http.createServer((req, res) => {

    res.writeHeader(200, { 'Content-Type': 'video/mp4' });
    fs.createReadStream(file)
        .pipe(res)
        .on('error', console.error);

}).listen(3030, () => console.log('stream - http://localhost:3030'));
