var score = 0;
let root = document.documentElement;
var target = 60;
var minutes = 1;
var seconds = 30;


const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");


document.querySelectorAll('.check').forEach((el)=>{

    
    el.addEventListener('click',()=>{
        if(score==target-1){
            modal.classList.add('is-active');
            document.getElementById('next-level').classList.remove('is-hidden');
            return;
        }
        if(el.checked){
            score++;            
        }
    else{
        score--;
    
        
    }
    

    if(score==30){
        
        root.style.setProperty('--speed',`${1.5}s`)
    }
    if(score==20){
        root.style.setProperty('--x50','0px');
        root.style.setProperty('--y50','20px');
    }
    if(score==40){
        root.style.setProperty('--x50','20px');
        root.style.setProperty('--y50','20px');
    }
    document.getElementById('score').innerText= `Current Score: ${score}`;
        
    })
    // el.addEventListener('click',doOnClick);
    
})

if(score==10){
root.style.setProperty('--x50','0px');
root.style.setProperty('--y50','20px');
}







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
document.getElementById('restart').addEventListener('click',()=>{
    location.reload();
})

setTimeout(makeIteration, 1000); // 1 second waiting
