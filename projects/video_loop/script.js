var player;
var isSeeking = false;
var startTime = 0;
var endTime = 0;
var started = false;
var duration = 0;




function embedVideo() {
  var videoLink = document.getElementById('video-link').value;
  var videoId = extractVideoId(videoLink);

  var embedUrl = "https://www.youtube.com/embed/" + videoId + "?" + "&loop=1" + "&autoplay=1" + "&playlist="+videoId;

  var playerContainer = document.getElementById('player-container');
  playerContainer.innerHTML = '<iframe id="player" width="560" height="315" style="border-radius:10px;" src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe>';
  document.getElementById('holder').style.display = "none";

  var playerIframe = document.getElementById('player');
  player = new YT.Player(playerIframe, {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });


}

function extractVideoId(videoLink) {
  var videoId = "";
  var match = videoLink.match(/youtube\.com.*(\?v=|\/embed\/|\/\d\/|\/vi\/|v\/|\/u\/\w\/|\/embed\/|embed\/)([^#\&\?]*).*/i);
  if (match && match[2].length == 11) {
    videoId = match[2];
  } else {
    console.error("Invalid YouTube video link");
  }
  return videoId;
}

function onPlayerReady(event) {
  player = event.target;
  duration = player.getDuration();
  startTime = 0;
  endTime = duration;

  let min = Math.floor(sliderTwo.value*player.getDuration()/60000);
  let sec = Math.floor(((sliderTwo.value*duration/1000)-(min*60)));
  displayValTwo.textContent = min+`:`+sec;
  document.getElementById('pause').innerHTML = "| |";

}
window.onload = function(){
  slideOne();
  slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
  if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  let min = Math.floor(sliderOne.value*duration/60000);
  let sec = Math.floor(((sliderOne.value*duration/1000)-(min*60)));
  displayValOne.textContent = min+`:`+sec;
  fillColor();
}
function slideTwo(){
  if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
      sliderTwo.value = parseInt(sliderTwo.value) + minGap;
  }
  let min = Math.floor(sliderTwo.value*duration/60000);
  let sec = Math.floor(((sliderTwo.value*duration/1000)-(min*60)));
  displayValTwo.textContent = min+`:`+sec;
  fillColor();
}
function fillColor(){
  percent1 = (sliderOne.value / sliderMaxValue) * 100;
  percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}


document.getElementById('slider-1').addEventListener('change',()=>{
  if(sliderOne.value/1000*player.getDuration()>player.getCurrentTime())player.seekTo(sliderOne.value/1000*player.getDuration());
  endTime = sliderTwo.value/1000*player.getDuration();
  started = true;
  
})

document.getElementById('slider-2').addEventListener('change',()=>{
  endTime = sliderTwo.value/1000*player.getDuration();
  started = true;
})

setInterval(check,1000);
function check() {
  if(started){
  if(endTime<=player.getCurrentTime()){
    player.seekTo(sliderOne.value/1000*player.getDuration());
  }
}
}


function onPlayerStateChange(event) {
  started = true;
  if (event.data == YT.PlayerState.PLAYING) {
    var currentTime = player.getCurrentTime();
    if (currentTime >= endTime) {
      player.seekTo(sliderOne.value/1000*player.getDuration());
    }
  }

}





var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var currentState = false;
document.getElementById('pause').addEventListener('click',()=>{
  currentState = !currentState;
  if(currentState){
    player.pauseVideo();
    document.getElementById('pause').innerHTML = "▶";

  }
  else{player.playVideo();
    document.getElementById('pause').innerHTML = "| |";

  }
})
document.getElementById('stop').addEventListener('click',()=>{
  player.stopVideo();
  sliderOne.value = 0;
  sliderTwo.value = 1000;
  displayValOne.innerText = "0:0";
  let min = Math.floor(sliderTwo.value*player.getDuration()/60000);
  let sec = Math.floor(((sliderTwo.value*duration/1000)-(min*60)));
  displayValTwo.textContent = min+`:`+sec; 
  fillColor();
})
document.getElementById('restart').addEventListener('click',()=>{
  player.seekTo(sliderOne.value/1000*player.getDuration());
})


