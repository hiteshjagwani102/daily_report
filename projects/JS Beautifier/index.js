    var editor1 = ace.edit("editor1");
    editor1.setOptions({
        placeholder: "Type or copy you code here...",
    })
    document.getElementById('editor1').style.fontSize='15px';
    editor1.session.setMode("ace/mode/javascript");
    var editor2 = ace.edit("editor2");
    document.getElementById('editor2').style.fontSize='15px';
    editor2.session.setMode("ace/mode/javascript");
    var beautify = document.getElementById('beautify');
    beautify.addEventListener('click',() =>{
        const options = { indent_size: 4, space_in_empty_paren: true,}
        let js = editor1.getValue();
        editor2.setValue(js_beautify(js,options));
    });

    var clear1 = document.getElementById("clear1");
    clear1.addEventListener('click',()=>{
        editor1.session.setValue("");
    })

    var copy1 = document.getElementById("copy1");
    copy1.addEventListener('click',()=>{
        editor1.selectAll();
        editor1.focus();
        document.execCommand('copy');
    })

    document.getElementById("download1").addEventListener("click", ()=>{
      var file = new File([editor1.getValue()], "sample.js", {type: "text/plain;charset=utf-8"});
      saveAs(file);
})