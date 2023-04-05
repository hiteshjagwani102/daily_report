//navbar_responsiveness
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () =>{
//     navbarMenu.classList.toggle('is-active');
//     event.preventDefault();
// })

//size
const byte = (str) => {
    let size = new Blob([str]).size;
    return size;
 }

// input_config
var input = ace.edit("input");
input.setOptions({
    placeholder: "Type or copy you code here...",
})
input.setTheme("ace/theme/ambiance")
var size1 = 15;
document.getElementById('input').style.fontSize=`${size1}px`;
input.session.setMode("ace/mode/html");
input.session.setUseWrapMode(true);

//clear
var clear1 = document.getElementById("clear1");
    clear1.addEventListener('click',()=>{
        document.getElementById('url-input').value = "";
        document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
        input.session.setValue("");
    document.getElementById('isMissing').innerText = "";
    })
    

//sample
var sample = document.getElementById('sample');
sample.addEventListener('click',() =>{
    input.session.setValue('<section class="section"><div class="container"><div class="columns is-centered has-text-centered"><div class="column is-6 has-text-centered"><ion-icon name="sparkles-sharp" style="font-size: 30px; margin-bottom: 3px; color: #26a3e2;"></ion-icon><p class="title is-5 is-italic has-text-white has-text-left">Information is a source of learning. But unless it is organized, processed, and available to theright people in a format for decision making, it is a burden, not a benefit.</p><p class=" title is-4 has-text-white has-text-right has-text-weight-bold text-gradient"> - WILLIAMPOLLARD</p></div><div class="column is-6 has-text-centered"><lord-icon src="https://cdn.lordicon.com/qkmmvfdj.json" trigger="hover" style="width:250px;height:250px"></lord-icon></div></div></div></section>')
    
})

//copy from input
var copy2 = document.getElementById("copy2");
copy2.addEventListener('click',()=>{
    output.selectAll();
    output.focus();
    document.execCommand('copy');
})

//increase and decrease input font
var increaseFont1 = document.getElementById('increase1');
increaseFont1.addEventListener('click',()=>{
    size1+=2;
    document.getElementById('input').style.fontSize=`${size1}px`;

})

var decreaseFont1 = document.getElementById('decrease1');
decreaseFont1.addEventListener('click',()=>{
    size1-=2;
    document.getElementById('input').style.fontSize=`${size1}px`;

})

//pointer Position
var pointer1 = document.getElementById("pointer1");
var size1 = document.getElementById('size1');
var conversion1 = document.getElementById('conversion1');
var conversion2 = document.getElementById('conversion2');
var percentage1 = document.getElementById('percentage1');
var percentage2 = document.getElementById('percentage2');

input.session.on('change',()=>{
    
    const options1 = {indent_size: 4}
    const options2 = { indent_size: 0,eol: ""}
    let row = input.selection.getCursor().row;
    let col = input.selection.getCursor().column;
    
    pointer1.innerHTML = `Ln: ${row+1} Col: ${col}`;
    size1.innerHTML = byte(input.getValue());
    let initial = byte(input.getValue());
    let final1 = byte(html_beautify(input.getValue(),options1));
    let final2 = byte(html_beautify(input.getValue(),options2));
    let percent1 = (((final1-initial)/initial)*100).toFixed(2);
    let percent2 = (((final2-initial)/initial)*100).toFixed(2);
    if(percent1>0){
        percentage1.style.color = '#ed0c22';
    }
    else percentage1.style.color = '#0cf232';
    if(percent2>0){
        percentage2.style.color = '#ed0c22';
    }
    else percentage2.style.color = '#0cf232';
    if(initial==0 || final1==0){
        conversion1.innerText = "";
        percentage1.innerText = "";
    }
    else{
        conversion1.innerText = (initial/1000).toFixed(2) + " kb"+ " --> " + (final1/1000).toFixed(2) + " kb";
        percentage1.innerText = "("+ percent1 +"%)";
    } 
    if(initial==0 || final2==0){
        conversion2.innerText = "";
        percentage2.innerText="";
    }
    else{
        conversion2.innerText = (initial/1000).toFixed(2) + " kb"+ " --> " + (final2/1000).toFixed(2) + " kb";
        percentage2.innerText = "("+ percent2 +"%)";

    }

})

//beautify HTML
var beautify = document.getElementById('beautify');
beautify.addEventListener('click',() =>{
    document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    const options = {indent_size: 4}
    let html = input.getValue();
    output.setValue(html_beautify(html,options));
    
});

// beautify.addEventListener("mouseover",()=>{
//     document.getElementById("conversion1").style.display = "inline";
//     document.getElementById("percentage1").style.display = "inline";
// })
// beautify.addEventListener("mouseout",()=>{
//     document.getElementById("conversion1").style.display = "none";
//     document.getElementById("percentage1").style.display = "none";
// })





//minify HTML
var minify = document.getElementById('minify');
    minify.addEventListener('click',() =>{
        document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
        const options = { indent_size: 0,eol: ""}
        let html = input.getValue();
        output.setValue(html_beautify(html,options));
        conversion2.innerText = "minified ✓"
    });

    // minify.addEventListener("mouseover",()=>{
    //     document.getElementById("conversion2").style.display = "inline";
    //     document.getElementById("percentage2").style.display = "inline";
    // })
    // minify.addEventListener("mouseout",()=>{
    //     document.getElementById("conversion2").style.display = "none";
    //     document.getElementById("percentage2").style.display = "none";
    // })

//upload through URL
const fetchButton = document.getElementById('fetch-button');
    const htmlContent = document.getElementById('html-content');

    fetchButton.addEventListener('click', () => {
      const urlInput = document.getElementById('url-input');
      const url = urlInput.value;

      fetch(url)
        .then(response => response.text())
        .then(html => {
          input.setValue(html);
        })
        .catch(error => {
          console.error('Error fetching HTML:', error);
        });
        document.querySelector('.modal').classList.remove("is-active");
    });


// output_config
var output = ace.edit("output");
output.setOptions({
    placeholder: "Type or copy you code here...",
})
output.setTheme("ace/theme/ambiance");

var size2 = 15;
document.getElementById('output').style.fontSize=`${size2}px`;
output.session.setMode("ace/mode/html");
output.session.setUseWrapMode(true);


// upload
var inputFile = document.getElementById('inputFile')
inputFile.addEventListener('change',handleFiles,false);
function handleFiles() {
    const fileList = this.files
    var file = fileList[0];
    if (!file) return;
    var modelist = ace.require("ace/ext/modelist")
    var modeName = modelist.getModeForPath(file.name).mode 
    input.session.setMode(modeName)
    var reader = new FileReader();
    reader.onload = function() {
        input.session.setValue(reader.result)
        
    }  
    reader.readAsText(file) 
} 


//Output_size
var size2 = document.getElementById('size2');
output.session.on('change',()=>{
    
    size2.innerHTML = byte(output.getValue());

})


//viewer
var viewer = document.getElementById('viewer');
viewer.addEventListener('click',()=>{
    document.getElementById('output').style.display = "none";
    document.getElementById('myiframe').style.display = "block"
    document.getElementById('myiframe').srcdoc = input.getValue();
})

//reset
var reset = document.getElementById('reset2');
reset.addEventListener('click',()=>{
    document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    output.session.setValue("");
    input.session.setValue("");
    
    
})

//output-download
document.getElementById("download2").addEventListener("click", ()=>{
    var file = new File([output.getValue()], "sample.html", {type: "text/html;charset=utf-8"});
    saveAs(file);
})






//light them dark theme
const logo = document.getElementById("main_logo")
const toggleSwitch = document.querySelector('#theme_icon')
const icon = document.querySelector("#t_icon")
toggleSwitch.addEventListener('click',()=> {
    if(icon.getAttribute('xlink:href')=='#dark'){
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('theme','light');
        lightMode();
        
        
        
    }else{
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark');
        darkMode();
        
        
    }
})

function lightMode(){
    input.setTheme("ace/theme/chrome");
    output.setTheme("ace/theme/chrome");
    var mode = document.getElementById('theme');
    var sym = document.getElementsByClassName('change');
    // mode.textContent = 'Light Mode';
    logo.src = "/logo.png"
    icon.setAttribute('xlink:href','#light');
    for(let i=0;i<sym.length;i++){
        sym[i].setAttribute("fill", "darkslategrey");
    }

}

function darkMode(){
    input.setTheme("ace/theme/ambiance");
    output.setTheme("ace/theme/ambiance");
    var mode = document.getElementById('theme');
    var sym = document.getElementsByClassName('change');
    // mode.textContent = 'Dark Mode';
    logo.src = "/Add_a_heading__5_-removebg-preview.png"
    icon.setAttribute('xlink:href','#dark');
    for(let i=0;i<sym.length;i++){
        sym[i].setAttribute("fill", "lightgrey");
    }
}

const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'light') {
        toggleSwitch.checked = true;
        lightMode();
    }
}

var layout1 = document.getElementById("layout1");
layout1.addEventListener("click",() =>{
    document.getElementById('inputEditor').style.display = 'block';
    document.getElementById("main_content").classList.remove("columns");
    document.getElementById('inputEditor').style.width = "95%"
    document.getElementById('input').style.height = "400px"
    document.getElementById('outputEditor').style.width = "95%"
    document.getElementById('output').style.height = "400px"
    document.getElementById('myiframe').style.height = "400px"
})

var layout2 = document.getElementById("layout2");
layout2.addEventListener("click",() =>{
    document.getElementById('inputEditor').style.display = 'block';
    document.getElementById("main_content").classList.add("columns");
    document.getElementById('inputEditor').removeAttribute("style")
    document.getElementById('input').style.height = "400px"
    document.getElementById('outputEditor').removeAttribute("style")
    document.getElementById('output').style.height = "400px"
    document.getElementById('myiframe').style.height = "400px"
})

var layout3 = document.getElementById('layout3');
layout3.addEventListener('click',()=>{
    document.getElementById('inputEditor').style.display = 'none';
    document.getElementById('outputEditor').style.width = "95%";
    document.getElementById('output').style.height = "600px"
    document.getElementById('myiframe').style.height = "600px"

})

//modal
const url = document.getElementById("url");
const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");

url.addEventListener('click',()=>{
    modal.classList.add('is-active');
});

modalBg.addEventListener('click',()=>{
    modal.classList.remove('is-active');
});

//autorun
var auto = document.getElementById('autorun');
auto.addEventListener('click',event =>{
    if(event.target.checked){
        document.getElementById('output').style.display = "none";
        document.getElementById('myiframe').style.display = "block"
        input.session.on('change',()=>{
            document.getElementById('myiframe').srcdoc = input.getValue();
        })
    }
    else{
        document.getElementById('output').style.display = "block";
        document.getElementById('myiframe').style.display = "none"
    }
})