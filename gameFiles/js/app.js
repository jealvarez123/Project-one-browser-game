console.log('Can I kick it?');
// This stores the game pieces
var myGamePiece;
var myGate;
var myBadguy;
var wall1;
var wall2;
var wall3;
var wall4;
var wall5;
var wall6;
var wall7;
var wall8;
var wall9;
var wall10;
var wall11;
var wall12;
var wall13;
var wall14;
var wall15;
var wall16;
var wall17;
var wall18;
var wall19;
var wall20;
var wall21;
var wall22;
// var wall23;
// var wall24;
// var wall25;
// var wall26;
// var wall27;
// var wall28;
// var wall29;
// var wall30;
var mySound;
var mySoundStep;
var mySoundDead;
var myBackgroundSound;
let walls;
//This makes a call to creates the board and pieces
function GameOver (){
  var myGamePiece;
}
function startGame() {
  //                      (width, heigth, color, x, y)
  myGamePiece = new component(20, 20, "guy.png", 0, 0,"image");
  myGate = new component(25, 45, "doorway.png", 472, 270,"image");

// first box
  wall1 = new component(120, 120, "border.png",0, 21, 'image');
  wall2 = new component(100, 100, "lavafall.gif", 10, 30, 'image');

  //second box
  wall3 = new component(110, 120, "border.png", 149, 0, 'image');
  wall4 = new component(90, 100, "lavafall.gif", 159, 10, 'image');

  // third box
  wall5 = new component(110, 95, "border.png", 300, 25, 'image');
  wall6 = new component(90, 75, "lavafall.gif", 310, 35, 'image');

//fourth box
  wall7 = new component(110, 100, "border.png", 80, 170, 'image');
  wall8 = new component(90, 80, "lavafall.gif", 90, 180, 'image');

// fifth box
  wall20 = new component(120, 120, "border.png", 220, 150, 'image');
  wall21 = new component(100, 100, "lavafall.gif", 230, 160, 'image');

//sxth box
  wall9 = new component(105, 120, "border.png", 370, 150, 'image');
  wall10 = new component(85, 100, "lavafall.gif", 380, 160, 'image');

  wall11 = new component(20, 20, "badguyblue.png", 150, 130, 'image');

  wall12 = new component(26, 26, "dragon.png", 20, 150, 'image');

  wall13 = new component(20, 20, "necro.png", 450, 130, 'image');

  wall14 = new component(20, 20, "eyeball.png", 270, 275, 'image');

  wall15 = new component(26, 26, "bonedragon.png", 450, 100, 'image');

  wall16 = new component(20, 20, "bonefist.png", 470, 50, 'image');

  wall17 = new component(22, 26, "trap.png", 475, 240, 'image');

  wall18 = new component(22, 26, "cobra.png", 285, 124, 'image');

  wall19 = new component(22, 26, "bosstop.png", 50, 205, 'image');
  wall22 = new component(22, 26, "bossfeet.png", 52, 230, 'image');

  // wall23 = new component(200, 5, "grey", 200, 220);
  // wall24 = new component(200, 5, "grey", 200, 220);
  // wall25 = new component(200, 5, "grey", 200, 220);
  // wall26 = new component(200, 5, "grey", 200, 220);
  // wall27 = new component(200, 5, "grey", 200, 220);
  // wall28 = new component(200, 5, "grey", 200, 220);
  // wall29 = new component(200, 5, "grey", 200, 220);
  // wall30 = new component(200, 5, "grey", 200, 220);

  mySound = new sound("door.mp3");
  mySoundStep = new steps("walk.mp3");
  mySoundDead = new dead("dead.mp3");
  myBackgroundSound = new background("background.mp3");
  myScore = new component("10px", "Consolas", "black", 450, 20, "text");
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
    // window.removeEventListener('keydown', function (e) {
      // this.crashWith()

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
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
      }
      // else if
      //      (this.type == "text") {
      //   ctx.font = this.width + " " + this.height;
      //   ctx.fillStyle = color;
      //   ctx.fillText(this.text, this.x, this.y);
      // }
      else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }



    // Allows the box to stay where its at when it stops moving
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.hitBottom();
      this.hitRight();
      this.hitLeft();
      this.hitTop();


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
    this.crashWithWall = function(otherobj,) {
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

function  clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedy = 0;

}
  // this updates the board, which is just a refresh rate. This also affects piece movement
  var currentScore = 0;
  function updateGameArea() {
    myBackgroundSound.play()
    myScore.text="SCORE: " + currentScore;
    if (myGamePiece.crashWith(myGate)) {

      mySound.play();
      myGameArea.stop();

      currentScore += 1;
      startGame();
      window.confirm("Congatulations! You've escaped. ")

    }
    else if(myGamePiece.crashWithWall(wall1)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall2)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall3)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall4)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall5)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall6)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall7)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall8)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall9)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall10)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall11)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall12)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall13)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall14)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall15)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall16)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall17)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall18)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall19)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall20)) {
      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall21)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    else if(myGamePiece.crashWithWall(wall22)) {

      mySoundDead.play();
      myGameArea.stop();
      // currentScore += 1;
      startGame();

    }
    // else if(myGamePiece.crashWithWall(wall23)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall24)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall25)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall26)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall27)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall28)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall29)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }
    // else if(myGamePiece.crashWithWall(wall30)) {
    //
    //   mySoundDead.play();
    //   myGameArea.stop();
    //   // currentScore += 1;
    //   startGame();
    //
    // }

    else {
      myGameArea.clear();
      myGamePiece.update();
      myGate.update();
      wall1.update();
      wall2.update();
      wall3.update();
      wall4.update();
      wall5.update();
      wall6.update();
      wall7.update();
      wall8.update();
      wall9.update();
      wall10.update();
      wall11.update();
      wall12.update();
      wall13.update();
      wall14.update();
      wall15.update();
      wall16.update();
      wall17.update();
      wall18.update();
      wall19.update();
      wall20.update();
      wall21.update();
      wall22.update();
      // wall23.update();
      // wall24.update();
      // wall25.update();
      // wall26.update();
      // wall27.update();
      // wall28.update();
      // wall29.update();
      // wall30.update();
      myScore.update();
      myGamePiece.newPos();
      myGamePiece.speedX = 0;
      myGamePiece.speedY = 0;

      if (myGameArea.key && myGameArea.key == 65) {myGamePiece.speedX = -2;
          mySoundStep.play();

       }
      if (myGameArea.key && myGameArea.key == 68) {myGamePiece.speedX = 2;
          mySoundStep.play();
       }
      if (myGameArea.key && myGameArea.key == 87) {myGamePiece.speedY = -2;
          mySoundStep.play();

        }


      if (myGameArea.key && myGameArea.key == 83) {myGamePiece.speedY = 2;
          mySoundStep.play();
        }
    }
  }
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  function steps(src) {
    this.steps = document.createElement("audio");
    this.steps.src = src;
    this.steps.setAttribute("preload", "auto");
    this.steps.setAttribute("controls", "none");
    this.steps.style.display = "none";
    document.body.appendChild(this.steps);
    this.play = function(){
      this.steps.play();
    }
    this.stop = function(){
      this.steps.pause();
    }
  }
  function dead(src) {
    this.dead = document.createElement("audio");
    this.dead.src = src;
    this.dead.setAttribute("preload", "auto");
    this.dead.setAttribute("controls", "none");
    this.dead.style.display = "none";
    document.body.appendChild(this.dead);
    this.play = function(){
      this.dead.play();
    }
    this.stop = function(){
      this.dead.pause();
    }
  }
  function background(src) {
    this.background = document.createElement("audio");
    this.background.src = src;
    this.background.setAttribute("preload", "auto");
    this.background.setAttribute("controls", "none");
    this.background.style.display = "none";
    document.body.appendChild(this.background);
    this.play = function(){
      this.background.play();
    }
    this.stop = function(){
      this.background.pause();
    }
  }
