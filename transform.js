/* 
transform.js

Transform stream, transforma el stream de cadena de entrada a mayúsculas en la salida

Ejecutar: node transform.js

*/
var stream = require('stream');
var util = require('util');

// usa Transform nativa
var Transform = stream.Transform ||
  require('readable-stream').Transform;

function Upper(options) {
  // allow use without new
  if (!(this instanceof Upper)) {
    return new Upper(options);
  }

  // init Transform
  Transform.call(this, options);
}
util.inherits(Upper, Transform);

Upper.prototype._transform = function (chunk, enc, cb) {
  var upperChunk = chunk.toString().toUpperCase();
  this.push(upperChunk);
  cb();
};

// try it out
var upper = new Upper();
upper.pipe(process.stdout); // output to stdout
upper.write('hello world\n'); // input line 1
upper.write('another line');  // input line 2
upper.end();  // finish