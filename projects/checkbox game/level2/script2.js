var first = document.getElementById('first');
var width = window.innerWidth;
var height = window.innerHeight;
first.style.marginTop =`${height/2}px`


var val = 0;
var score = 0;




document.querySelectorAll('.check').forEach((el)=>{
    el.style.transition = `transform 0.2s ease`;
    el.style.marginLeft = `100px`;
    el.style.height='fit-content'
    el.style.marginRight = `100px`
    el.style.marginBottom= `5px`
    
    el.addEventListener('click',()=>{
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
