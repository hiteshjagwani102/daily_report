var canvasWidth;
var canvasHeight;
var vertical = false;
var options = document.getElementById("options");
var mergedImage;

document.getElementById("horizontal").addEventListener('click',()=>{
  vertical = false;
  document.getElementById("horizontal").style.backgroundColor = "blue";
  document.getElementById("vertical").style.backgroundColor = null;
})
document.getElementById("vertical").addEventListener('click',()=>{
  vertical = true;
  document.getElementById("vertical").style.backgroundColor = "blue";
  document.getElementById("horizontal").style.backgroundColor = null;
})
function mergeImages() {
  const image1 = document.getElementById("image1").files[0];
  const image2 = document.getElementById("image2").files[0];

  if (!image1 || !image2) {
    alert("Please select both images");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const reader1 = new FileReader();
  const reader2 = new FileReader();
  const img1 = new Image();
  const img2 = new Image();

  reader1.onload = function (e) {
    img1.onload = function () {
      
      if(vertical){
      if(options.value==0){
        canvas.height = img1.height+img2.height;
        canvas.width = Math.max(img1.width, img2.width);
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, img1.height);
      }
      else if(options.value==1){
        if(img1.width>img2.width){
          canvas.width = img2.width;
          canvas.height = 2*img2.height;
          ctx.drawImage(img1,0,0,img2.width,img1.height*(img2.width/img1.width));
          ctx.drawImage(img2, 0, img2.height);

        }
        else{
          canvas.height = 2*img1.height;
          canvas.width = img1.width;
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2, 0, img1.height,img1.width,img2.height*(img1.width/img2.width));

        }
      }
      else{
        if(img1.width>img2.width){
          canvas.width = img2.width;
          canvas.height = 2*img2.height;
          ctx.drawImage(img1,50,50,img2.width,img2.height,0,0,img2.width,img2.height);
          ctx.drawImage(img2, 0, img2.height);

        }
        else{
          canvas.height = 2*img1.height;
          canvas.width = img1.width;
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2,50,50,img1.width,img1.height, 0, img1.height,img1.width,img1.height);

        }
      }

      
      }
      else{
        if(options.value==0){
          canvas.height = Math.max(img1.height,img2.height);
          canvas.width = img1.width + img2.width;
          ctx.drawImage(img1, 0, 0);
          ctx.drawImage(img2, img1.width, 0);
        }
        else if(options.value==1){
          if(img1.height>img2.height){
            canvas.height = img2.height;
            canvas.width = 2*img2.width;
            ctx.drawImage(img1,0,0,img1.width*(img2.height/img1.height),img2.height);
            ctx.drawImage(img2, img2.width, 0);
  
          }
          else{
            canvas.width = 2*img1.width;
            canvas.height = img1.height;
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, img1.width,0,img2.width*(img1.height/img2.height),img1.height);
  
          }
        }
        else{
          if(img1.height>img2.height){
            canvas.height = img2.height;
            canvas.width = 2*img2.width;
            ctx.drawImage(img1,50,50,img2.width,img2.height,0,0,img2.width,img2.height);
            ctx.drawImage(img2, img2.width, 0);
  
          }
          else{
            canvas.width = 2*img1.width;
            canvas.height = img1.height;
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2,50,50,img1.width,img1.height, img1.width, 0,img1.width,img1.height);
  
          }
        }
      }

      

      
      mergedImage = canvas.toDataURL("image/png");

      const mergedPreview = document.getElementById("merged-image-preview");
      mergedPreview.src = mergedImage;
      mergedPreview.style.display = 'block'
      
    };
    img1.src = e.target.result;
  };

  

  reader2.onload = function (e) {
    img2.onload = function () {
      reader1.readAsDataURL(image1);
    };
    img2.src = e.target.result;
  };

  reader2.readAsDataURL(image2);
}

document.getElementById('download').addEventListener('click',()=>{
  downloadLink = document.createElement("a");
  downloadLink.id = "downloadLink";
  downloadLink.href = mergedImage;
  downloadLink.download = 'merged_image.png';
  downloadLink.click();
})

document.getElementById("image1").addEventListener("change", function (e) {
  document.getElementById("image1-preview").src = URL.createObjectURL(
    e.target.files[0]
  );
  document.getElementById("image1-preview").style.display = "block"
});

document.getElementById("image2").addEventListener("change", function (e) {
  document.getElementById("image2-preview").src = URL.createObjectURL(
    e.target.files[0]
  );
  document.getElementById("image2-preview").style.display = "block"
});
