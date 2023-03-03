//navbar_responsiveness
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () =>{
    navbarMenu.classList.toggle('is-active');
    event.preventDefault();
})

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
var conversion = document.getElementById('conversion');
input.session.on('change',()=>{
    
    const options = { indent_size: 0,eol: ""}
    let row = input.selection.getCursor().row;
    let col = input.selection.getCursor().column;
    
    pointer1.innerHTML = `Ln: ${row+1} Col: ${col}`;
    size1.innerHTML = byte(input.getValue());
    let initial = byte(input.getValue());
    let final = byte(html_beautify(input.getValue(),options))
    if(initial==0 || final==0) conversion.innerText = "";
    else conversion.innerText = initial + " kb"+ " --> " + final + " kb"; 

})

//beautify HTML
beautify.addEventListener('click',() =>{
    document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    const options = {indent_size: 4}
    let html = input.getValue();
    output.setValue(html_beautify(html,options));
    
});

//minify HTML
var minify = document.getElementById('minify');
    minify.addEventListener('click',() =>{
        document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
        const options = { indent_size: 0,eol: ""}
        let html = input.getValue();
        output.setValue(html_beautify(html,options));
        conversion.innerText = "minified ✓"
    });

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
    });


// output_config
var output = ace.edit("output");
output.setOptions({
    placeholder: "Type or copy you code here...",
})
output.setTheme("ace/theme/ambiance")

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
const toggleSwitch = document.querySelector('input[type="checkbox"]')
toggleSwitch.addEventListener('change',()=> {
    if(event.target.checked){
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
    mode.textContent = 'Light';
}

function darkMode(){
    input.setTheme("ace/theme/ambiance");
    output.setTheme("ace/theme/ambiance");
    var mode = document.getElementById('theme');
    mode.textContent = 'Dark';
}

const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'light') {
        toggleSwitch.checked = true;
        lightMode();
    }
}












