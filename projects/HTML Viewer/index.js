//navbar_responsiveness
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () =>{
    navbarMenu.classList.toggle('is-active');
    event.preventDefault();
})

// input_config
var input = ace.edit("input");
input.setOptions({
    placeholder: "Type or copy you code here...",
})
input.setTheme("ace/theme/ambiance")
var size1 = 15;
document.getElementById('input').style.fontSize=`${size1}px`;
input.session.setMode("ace/mode/html");

//clear
var clear1 = document.getElementById("clear1");
    clear1.addEventListener('click',()=>{
        document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
        input.session.setValue("");
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
input.session.on('change',()=>{
    
    let row = input.selection.getCursor().row;
    let col = input.selection.getCursor().column;
    
    pointer1.innerHTML = `Ln: ${row+1} Col: ${col}`;

})

//beautify HTML
beautify.addEventListener('click',() =>{
    const options = {indent_size: 4}
    let html = input.getValue();
    output.setValue(html_beautify(html,options));
});

//minify HTML
var minify = document.getElementById('minify');
    minify.addEventListener('click',() =>{
        const options = { indent_size: 0,eol: ""}
        let html = input.getValue();
        output.setValue(html_beautify(html,options));
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


//viewer
var viewer = document.getElementById('viewer');
viewer.addEventListener('click',()=>{
    document.getElementById('output').style.display = "none";
    document.getElementById('myiframe').style.display = "block"
    document.getElementById('myiframe').srcdoc = input.getValue();
})

//output-reset
var reset = document.getElementById('reset2');
reset.addEventListener('click',()=>{
    document.getElementById('myiframe').style.display = 'none';
    document.getElementById('output').style.display = 'block';
    output.setValue() = "";
})

//output-download
document.getElementById("download2").addEventListener("click", ()=>{
    var file = new File([output.getValue()], "sample.html", {type: "text/html;charset=utf-8"});
    saveAs(file);
})


