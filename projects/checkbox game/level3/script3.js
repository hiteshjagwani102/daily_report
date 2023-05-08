var score = 0;
let root = document.documentElement;





document.querySelectorAll('.check').forEach((el)=>{

    
    el.addEventListener('click',()=>{
        if(el.checked){
            score++;            
        }
    else{
        score--;

    }if(score%20==0){
        var prev = root.style.getPropertyValue('--speed')
        root.style.setProperty('--speed',`${--speed-0.5}s`)
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