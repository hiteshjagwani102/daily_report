const timer = ms => new Promise(res => setTimeout(res, ms))
async function load () {
    for(var i=1;i<=25;i++){
        var check = document.getElementById(`check${i}`);
        check.style.animationName = 'floating';
        await timer(100);
    }
}

let minutes = 1;
let score = 0;
let target = 2;

    
//timer
let seconds = 0;

load();

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

        document.getElementById('score').innerText= `Current Score: ${score}`;

            
    })
    
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

document.getElementById('restart').addEventListener('click',()=>{
    location.reload();
})

setTimeout(makeIteration, 1000);