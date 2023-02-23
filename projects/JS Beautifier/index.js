    var input = ace.edit("input");
    input.setOptions({
        placeholder: "Type or copy you code here...",
    })
    var size1 = 15;
    document.getElementById('input').style.fontSize=`${size1}px`;
    input.session.setMode("ace/mode/javascript");
    var size2 = 15;
    input.session.setUseWrapMode(true);
    var output = ace.edit("output");
    document.getElementById('output').style.fontSize=`${size2}px`;
    output.session.setMode("ace/mode/javascript");
    output.session.setUseWrapMode(true);
    var beautify = document.getElementById('beautify');
    beautify.addEventListener('click',() =>{
        const options = { indent_size: 4, space_in_empty_paren: true}
        let js = input.getValue();
        output.setValue(js_beautify(js,options));
    });
    var minify = document.getElementById('minify');
    minify.addEventListener('click',() =>{
        const options = { indent_size: 0,
                space_in_empty_paren: false,
                preserve_newlines: false,end_with_newline: false,
                keep_array_indentation: false,
                eol: "",
                brace_style: "collapse",
                break_chained_methods: false,
                jslint_happy: true

            
            }
        let js = input.getValue();
        output.setValue(js_beautify(js,options));
    });

    var clear1 = document.getElementById("clear1");
    clear1.addEventListener('click',()=>{
        input.session.setValue("");
    })

    var copy1 = document.getElementById("copy1");
    copy1.addEventListener('click',()=>{
        input.selectAll();
        input.focus();
        document.execCommand('copy');
    })

    var increaseFont = document.getElementById('increase');
    increaseFont.addEventListener('click',()=>{
        size1+=2;
        document.getElementById('input').style.fontSize=`${size1}px`;

    })

    var decreaseFont = document.getElementById('decrease');
    decreaseFont.addEventListener('click',()=>{
        size1-=2;
        document.getElementById('input').style.fontSize=`${size1}px`;

    })

    var pointer = document.getElementById("pointer");
    input.session.on('change',()=>{
        
        let row = input.selection.getCursor().row;
        let col = input.selection.getCursor().column;
        
        pointer.innerHTML = `Ln: ${row+1} Col: ${col}`;

    })

    document.getElementById("download1").addEventListener("click", ()=>{
      var file = new File([input.getValue()], "sample.html", {type: "text/plain;charset=utf-8"});
      saveAs(file);
})


