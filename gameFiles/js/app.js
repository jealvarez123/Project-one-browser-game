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

var wall1;
var wall2;
var wall3;
var wall4;




//This makes a call to creates the board and pieces
function startGame() {
//                      (width, heigth, color, x, y)
    myGamePiece = new component(20, 20, "red", 0, 0);
    myGate = new component(20, 20, "black", 480, 280);
    wall3 = new component(200, 5, "purple", 0, 21);
    wall2 = new component(5, 200 , "pink", 200, 21);
    wall1 = new component(5, 200, "blue", 400, 25);
    wall4 = new component(200, 5, "grey", 200, 220);

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
    },
      stop : function() {
        clearInterval(this.interval);
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



    // Allows the box to stay where its at when it stops moving
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
        this.hitRight();
        this.hitLeft();
        this.hitTop();
        // this.hitwall();

    }

// this prevents the player from leaving the board
this.hitTop = () => {
  var tiptop = this.height - 20;
  if ( this.y <= tiptop) {
    this.y = tiptop;
  }

}
this.hitBottom = () => {
  var rockbottom = myGameArea.canvas.height - this.height;
    if ( this.y > rockbottom) {
        this.y = rockbottom;
    }

}
this.hitRight = () => {
  var myRight = myGameArea.canvas.width - this.width;
    if ( this.x > myRight) {
        this.x = myRight;
    }

}
this.hitLeft = () => {
  var myleft = this.width - 20;
    if ( this.x < myleft) {
        this.x = myleft;
    }

}
//This allows the player to hit the gate and end the game.
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
      }
    return crash;

  }

}














// this updates the board, which is just a refresh rate. This also affects piece movement
function updateGameArea() {
  if (myGamePiece.crashWith(myGate)) {
        myGameArea.stop();
        startGame();
    } else {
        myGameArea.clear();
        myGamePiece.update();
        myGate.update();
        wall1.update();
        wall2.update();
        wall3.update();
        wall4.update();
        myGamePiece.newPos();
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -5; }
        if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 5; }
        if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -5; }
        if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 5; }
            }
}
