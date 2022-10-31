// explore.js

window.addEventListener('DOMContentLoaded', init);

async function waitUntil(check, val, myImg) {
  return await new Promise(resolve => {
    const interval = setInterval(() => {
      if (check(val)) {
        resolve();
        clearInterval(interval);
        myImg.setAttribute('src', "assets/images/smiling.png");
      };
    }, 100);
  });
}

function init() {
  // TODO
  const synch = window.speechSynthesis;
  synch.addEventListener("voiceschanged", () => {
    const voices = speechSynthesis.getVoices()
    
    const selected = document.getElementById("voice-select");

    for(let i = 0 ; i < voices.length; i++){
        let option = document.createElement("option");
        option.text = voices[i].name;
        option.setAttribute('value', i);
        selected.add(option);
    }

      
    let currentVoice = 0;
    let option = document.querySelector(".option");
    selected.addEventListener('change', (event) => {
      console.log(event.target.value);
      currentVoice = selected.selectedOptions[0].getAttribute('value');

    });
    

    const playBtn = document.querySelector("button");
    playBtn.addEventListener('click', (event) => {
      const text = document.getElementById("text-to-speak").value;
      let utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[currentVoice];

      const myImg = document.querySelector("img[alt='Smiling face']");
      myImg.setAttribute('src', "assets/images/smiling-open.png");
      speechSynthesis.speak(utterance);

      const checkSpeaking = (speechSynthesis) => {
        return !speechSynthesis.speaking;
      };

      waitUntil(checkSpeaking, speechSynthesis, myImg);
    });
  })
}