console.log('Can I kick it?');


// //These are the walls
// var wall = canvas.getContext('2d');
// ctx.moveTo(25,0);
// ctx.lineTo(25,50);
// ctx.stroke();
//
// var wall = canvas.getContext('2d');
// ctx.moveTo(25,50);
// ctx.lineTo(50,50);
// ctx.stroke();
//
// var wall = canvas.getContext('2d');
// ctx.moveTo(0,75);
// ctx.lineTo(30,75);
// ctx.stroke();
// var myGamePiece;
//


// This stores the game pieces
var myGamePiece;

var myGate;

var walls;


//This makes a call to creates the board and pieces
function startGame() {
    myGamePiece = new component(20, 20, "red", 10, 120);
    myGate = new component(20, 20, "black", 480, 120);
    walls = new component(5, 200, "blue", 35, 120);
    myGameArea.start();
}

// this creates the board, adds the frame refresher, adds EventListeners
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.key = e.keyCode;
      })
      window.addEventListener('keyup', function (e) {
          myGameArea.key = false;
      })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// this creates the pieces
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

// this updates the board, which is just a refresh rate. This also affects piece movement
function updateGameArea() {
  myGameArea.clear();
  myGamePiece.update();
  myGate.update();
  walls.update();
  myGamePiece.newPos();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -5; }
  if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 5; }
  if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -5; }
  if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 5; }
}
