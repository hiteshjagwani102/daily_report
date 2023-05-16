var input = ace.edit("input");
input.setTheme("ace/theme/monokai");
input.session.setMode("ace/mode/txt");


var output = ace.edit("output");
output.setTheme("ace/theme/monokai");
output.session.setMode("ace/mode/txt");






const convert = document.getElementById('convert')

convert.addEventListener('click',()=>{
    const txt = input.getValue();
      const lines = txt.split("\n");

      let srt = "";
      let count = 1;
      for (let i = 0; i < lines.length; i += 2) {
        if(lines[i].length==1) i++;
        const timecodes = lines[i].split(" --> ");
        const startTime = timecodes[0];
        const endTime = timecodes[1];
        const caption = lines[i + 1];
        console.log(startTime);
        console.log(endTime);
        console.log(caption);

        srt += `${count}\n${startTime} --> ${endTime}\n${caption}\n\n`;
        count++;
      }
      output.setValue(srt);

      const blob = new Blob([srt], { type: "text/srt" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${file.name}.srt`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
})