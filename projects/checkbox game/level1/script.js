const height = document.querySelector('#game-area').offsetHeight-50;
const width = document.querySelector('#game-area').offsetWidth-50;
console.log(width);
let count = 0;
var target = 50;
const checkBox = document.getElementById('check');
    checkBox.addEventListener('click',() =>{
        if(count==target-1){
            modal.classList.add('is-active');
            document.getElementById('next-level').classList.remove('is-hidden');
            return;
        }
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
    const modal2 = document.querySelector("#modal2");
let minutes = 1;
    let timer = document.getElementById('timer');
    
//timer
let seconds = 0;

document.getElementById('restart').addEventListener('click',()=>{
    location.reload();
})


const makeIteration = () => {
    
    if(minutes == 0 && seconds==0){
        document.getElementById('final').innerHTML= `Sorry, please try again`
        modal.classList.add('is-active');
        document.getElementById('restart').classList.remove('is-hidden');
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






