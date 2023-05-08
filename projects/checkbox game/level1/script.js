const height = document.querySelector('#game-area').offsetHeight-50;
const width = document.querySelector('#game-area').offsetWidth-50;
console.log(width);
let count = 0;
const checkBox = document.getElementById('check');
    checkBox.addEventListener('click',() =>{
        var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
        var top = Math.random()*height *0.8;
        var left = Math.random()*width *0.8;
        checkBox.style.marginTop = `${top}px`;
        checkBox.style.marginLeft = `${left}px`;
        checkBox.checked = false;
        count++;
        document.getElementById('points').innerHTML=`Current Score: ${count}`;
    }, delayInMilliseconds);

    })
    const modalBg = document.querySelector(".modal-background");
    const modal = document.querySelector(".modal");
let minutes = 1;
    let timer = document.getElementById('timer');
    
//timer
let seconds = 0;

document.getElementById('restart').addEventListener('click',()=>{
    modal.classList.remove('is-active');
    minutes = timer.value;
    seconds = 0;
    document.getElementById('time').innerHTML = `0${minutes}:00`;
})


const makeIteration = () => {
    if(minutes == 0 && seconds==0){
        document.getElementById('final').innerHTML= `Final Score: ${count}`
        document.getElementById('speed').innerHTML=`Your speed is ${count/timer.value} clicks/minute`
        modal.classList.add('is-active');
        return;
    }
  if (seconds >= 0)  {
    if(seconds==0){
        minutes--;
        seconds=59;
      }
    if(seconds>9) document.getElementById('time').innerHTML = `0${minutes}:${seconds}`;
    else document.getElementById('time').innerHTML = `0${minutes}:0${seconds}`;
    seconds -= 1;

    setTimeout(makeIteration, 1000); // 1 second waiting
  }
  
  
}
document.getElementById('begin').addEventListener('click',()=>{
    setTimeout(makeIteration, 1000); // 1 second waiting
    count = 0;
    document.getElementById('points').innerHTML=`Current Score: ${count}`;


})






