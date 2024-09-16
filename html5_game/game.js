console.log("js game ");

var myGamePiece;
var myBackground;

function startGame() {
    myGamePiece = new component(30, 30, "blender.png", 10, 120, "image");//sprite
    myBackground = new component(656,270, "ecran.jpg", 0, 0, "image");//arriere plan
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");//créé la fenêtre du jeu
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {//touche du clavier appuyée
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {//touche du clavier relachée
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    // this.gamearea = myGameArea;
    this.type = type;
    if(type== "image"){
        this.image = new Image();
        this.image.src = color; 
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        // ctx.fillStyle = color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        if(type== "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}

function updateGameArea() {
    myGameArea.clear(); // efface le jeu quand la page est rechargée
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; } //touche flêche de droite
    
    else if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }//touche fleche de gauche
    
    else if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }//touche flêche du haut 
    
    else if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1;}//touche flêche du bas
    
   
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}
