console.log('Can I kick it?');

let canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = '#ff0000';
ctx.fillRect(0,0,75,75);


var ctx2 = canvas.getContext('2d');
ctx.fillStyle = '#000000';
ctx.fillRect(125,125,75,75);
