const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
let speed = 0;


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

let isPainting = false;
let lineWidth = 10;
let startX;
let startY;
let count = 0;
let sum = 0;
let final_Sum = 0;
let ans = 100
let color = 255-7*(100-ans);
let lastX = startX;
let lastY = startY;
let hs = 0;
localStorage.setItem(hs,0);

let radius;
let currDist;

let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;
let totalDistance = 0;



function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}


const midX = canvas.width/2;
const midY = canvas.height/2;
var audio = new Audio('./drawing-a-line-69277_V5YFddyG.mp3');
var audio2 = new Audio('mixkit-achievement-bell-600.wav');


function collinear(x1,  y1,  x2, y2,  x3,  y3)
{
 
    var a = x1 * (y2 - y3) +
            x2 * (y3 - y1) +
            x3 * (y1 - y2);

    console.log(a);
 
    if (a>0 && a <100)
        return true;
    else
        return false;
}

var prevEvent, currentEvent;
document.documentElement.onmousemove=function(event){
  currentEvent=event;
}

setInterval(function(){
    if(prevEvent && currentEvent){
      var movementX=Math.abs(currentEvent.screenX-prevEvent.screenX);
      var movementY=Math.abs(currentEvent.screenY-prevEvent.screenY);
      var movement=Math.sqrt(movementX*movementX+movementY*movementY);
      
      let speed=10*movement;
      if(speed==0) audio.pause();
        }
      prevEvent=currentEvent;},50)


const draw = (e) => {
    audio.play();
    if(!isPainting){
        audio.pause();
        count = 0;
        sum = 0;
        final_Sum = 0;
        return;
    }
    document.getElementById('message').innerText = "";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    ctx.lineWidth = 10;
    ctx.strokeStyle = `rgb(0,${255-12*(sum)},${(sum)*20})`;
    ctx.shadowColor = `rgb(0,${255-12*(sum)},${(sum)*20})`;
    currDist = getDistance(e.clientX,e.clientY,midX,midY);
    sum=Math.abs((radius-currDist)/radius)*100;
    count++;
    final_Sum += 100-sum;
    ans = (final_Sum)/(count);
    document.getElementById('percentage').innerText = ans.toFixed(2);
    [lastX, lastY] = [e.clientX, e.clientY];

    if(Math.abs(startY-e.clientY)<radius && Math.abs(startX-e.clientX)==0 && count>20){
        isPainting = false;
        document.getElementById('message').innerText = `Accuracy = ${ans.toFixed(2)}`;
    }
    console.log(totalDistance);
    console.log(2*Math.PI*radius);

    if(totalDistance-2*Math.PI*radius>500){
        isPainting = false;
        document.getElementById('message').innerText = "Not a cicle";

    }


    //distance
    if (isMouseDown) {
        const currentMouseX = event.clientX;
        const currentMouseY = event.clientY;
        const segmentDistance = calculateDistance(lastMouseX, lastMouseY, currentMouseX, currentMouseY);
        totalDistance += segmentDistance;
        lastMouseX = currentMouseX;
        lastMouseY = currentMouseY;
      }
    
    
}


canvas.addEventListener('mousedown',(e)=>{
    isPainting= true;
    startX = e.clientX-canvasOffsetX;
    startY = e.clientY-canvasOffsetY;
    radius = getDistance(startX,startY,midX,midY);
    [lastX, lastY] = [startX, startY];
    ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.getElementById('percentage').innerText = ans.toFixed(2);
        document.getElementById('highscore').innerText = "";
        document.getElementById('confetti').style.display = 'none';


        isMouseDown = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  totalDistance = 0;

        

    
});

canvas.addEventListener('mouseup',(e)=>{
    isPainting= false;
    ctx.stroke();
    ctx.beginPath();
    if(2*Math.PI*radius-totalDistance<400){
        document.getElementById('message').innerText = `Accuracy = ${ans.toFixed(2)}`;
        if(localStorage.getItem(hs)<ans){
            localStorage.setItem(hs,ans);
            document.getElementById('highscore').innerText = "New Highscore";
            document.getElementById('confetti').style.display = 'flex';
            audio2.play();
            
        }

    }
    else  document.getElementById('message').innerText = `Not a complete circle`;

    
    
    ans=100;

    //distnce
    isMouseDown = false;



});


canvas.addEventListener('mousemove',draw);












  

