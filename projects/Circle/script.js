const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


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

let radius;
let currDist;

const midX = canvas.width/2;
const midY = canvas.height/2;
var audio = new Audio('./drawing-a-line-69277_V5YFddyG.mp3');

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
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    ctx.strokeStyle = `rgb(${(sum)*20},${255-12*(sum)},0)`;
    // ctx.shadowBlur = 10;
    ctx.shadowColor = `rgb(${(sum)*20},${255-12*(sum)},0)`;
    currDist = getDistance(e.clientX,e.clientY,midX,midY);
    sum=Math.abs((radius-currDist)/radius)*100;
    console.log(radius+" "+currDist);
    count++;
    final_Sum += 100-sum;
    ans = (final_Sum)/(count);
    document.getElementById('percentage').innerText = ans.toFixed(2);
    [lastX, lastY] = [e.clientX, e.clientY];

    if(Math.abs(startY-e.clientY)<radius && Math.abs(startX-e.clientX)==0 && count>20){
        isPainting = false;
        document.getElementById('message').innerText = `Accuracy = ${ans.toFixed(2)}`;
    }
    if(count>300){
        isPainting = false;
        document.getElementById('message').innerText = "You are too slow";

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
    
});

canvas.addEventListener('mouseup',(e)=>{
    isPainting= false;
    ctx.stroke();
    ctx.beginPath();
    audio.load();
    document.getElementById('message').innerText = `Accuracy = ${ans.toFixed(2)}`;
    ans=100;


});


canvas.addEventListener('mousemove',draw);

canvas.addEventListener('mousemove', function(event) {
    draw(event);
    
  });

  

