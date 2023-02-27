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
input.session.on('change',()=>{
    
    let row = input.selection.getCursor().row;
    let col = input.selection.getCursor().column;
    
    pointer1.innerHTML = `Ln: ${row+1} Col: ${col}`;

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

// var missing = document.getElementById('missingTag')
// missing.addEventListener('click',() =>{
//     let htmlCode = input.getValue();
//     document.getElementById("isMissing").innerText = findMissingEndTag(htmlCode);
//     // console.log(findMissingEndTag(htmlCode));
// })


// //Find Missing Tag
// function findMissingEndTag(htmlCode) {
//   // Define an array to store the open tags
//   const stack = [];

//   // Split the HTML code into lines and iterate over each line
//   htmlCode.trim().split('\n').forEach(line => {
//     // Iterate over each character in the line
//     for (let i = 0; i < line.length; i++) {
//       // Check if the current character is a '<' symbol
//       if (line[i] === '<') {
//         // Check if the next character is a '/' symbol
//         if (i + 1 < line.length && line[i + 1] === '/') {
//           // Extract the tag name from the end tag
//           const tagName = [];
//           i += 2;
//           while (i < line.length && line[i] !== '>') {
//             tagName.push(line[i]);
//             i++;
//           }

//           // Check if the tag is at the top of the stack
//           if (stack.length > 0 && stack[stack.length - 1] === tagName.join('')) {
//             stack.pop();
//           } else {
//             return `Missing end tag </${tagName.join('')}>`;
//           }
//         } else {
//           // Check if the current tag is a self-closing tag
//           const selfClosingTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
//           const isSelfClosingTag = selfClosingTags.includes(line.slice(i + 1).split(' ')[0]);
//           if (!isSelfClosingTag) {
//             // Extract the tag name from the start tag
//             const tagName = [];
//             i++;
//             while (i < line.length && line[i] !== '>' && line[i] !== ' ') {
//               tagName.push(line[i]);
//               i++;
//             }

//             // Add the tag to the stack
//             stack.push(tagName.join(''));
//           }
//         }
//       }
//     }
//   });

//   // Check if there are any tags left in the stack
//   if (stack.length > 0) {
//     return `Missing end tag </${stack[stack.length - 1]}>`;
//   } else {
//     return 'All tags are balanced';
//   }
// }






