var first = document.getElementById('first');
var width = window.innerWidth;
var height = window.innerHeight;
first.style.marginTop =`${height/2}px`
target = 50;
var minutes = 1;
var seconds = 0;


var val = 0;
var score = 0;

const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");




document.querySelectorAll('.check').forEach((el)=>{
    el.style.transition = `transform 0.2s ease`;
    el.style.marginLeft = `100px`;
    el.style.height='fit-content'
    el.style.marginRight = `100px`
    el.style.marginBottom= `5px`
    
    el.addEventListener('click',()=>{
        if(score==target-1){
            modal.classList.add('is-active');
            document.getElementById('next-level').classList.remove('is-hidden');
            return;
        }
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0); 
    console.log(randColor);
        if(el.checked){
            score++;
            val+=22;
            first.style.marginTop = `${height/2-val}px`;
            
            var sign = Math.floor(Math.random()*10);
            if(sign%2==0) el.nextElementSibling.style.transform = `translateX(${-Math.random()*50}px)`;
            else el.nextElementSibling.style.transform = `translateX(${+Math.random()*50}px)`;
            el.style.setProperty('accent-color',`#${randColor}`);
            
        }
    else{
        score--;
        first.style.marginLeft = `${width/2-val+22}px`;
        val-=22;
    }
    document.getElementById('score').innerText= `Current Score: ${score}`;
        
    })
    // el.addEventListener('click',doOnClick);
    
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
