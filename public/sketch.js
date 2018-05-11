var socket;


function setup() {
 createCanvas(200,200);
 background(51);
 //socket = io.connect('localhost:3000');
 var currentLocation = window.location.host;
 console.log(currentLocation);
 socket = io.connect('http://djenodedrawapp.azurewebsites.net:3000');
 socket = io.connect(currentLocation);
 socket.on('mouse', newDrawing);
}

function draw() {

}

function newDrawing(data){
    noStroke();
    fill(255,0,100);
    ellipse(data.x, data.y,20,20);
}

function mouseDragged(){
    var data = {
        x: mouseX,
        y: mouseY
    }

    //console.log(data);

    socket.emit('mouse',data);
    
    noStroke();
    fill(255);
    ellipse(mouseX,mouseY,20,20);
}