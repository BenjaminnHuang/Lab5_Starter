// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();

function init() {
  // TODO
  const horns = document.getElementById("horn-select");
  const myAudio = document.querySelector(".hidden");

  horns.addEventListener('change', (event) => {
    const myImg = document.querySelector('img[alt="No image selected"]');
    myImg.src = `assets/images/${event.target.value}.svg`;
    myAudio.setAttribute('src', `assets/audio/${event.target.value}.mp3`);
  });

  const audioVal = document.getElementById("volume");

  audioVal.addEventListener('input', (event)=>{
    const audioImg = document.querySelector('img[alt="Volume level 2"]');
    audioVal.value = event.target.value;
  
    if(audioVal.value < 33 && audioVal.value > 0){
      audioImg.src = "assets/icons/volume-level-1.svg";
    
    }
    else if(audioVal.value >= 33 && audioVal.value < 67){
      audioImg.src = "assets/icons/volume-level-2.svg";
    }
    else if(audioVal.value >= 67){
      audioImg.src = "assets/icons/volume-level-3.svg";
    }
    else{
      audioImg.src = "assets/icons/volume-level-0.svg";
    }
  });

  const soundBtn = document.querySelector("button");
  soundBtn.addEventListener("click", ()=>{
    const audio = new Audio(myAudio.getAttribute("src"));
    audio.volume = audioVal.value / 100;
    audio.play();
    if(audio.getAttribute('src') == "assets/audio/party-horn.mp3"){
      jsConfetti.addConfetti();
    }
  });
}