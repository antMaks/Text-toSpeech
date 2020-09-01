const { speechSynthesis } = window;

let voicesSelect = document.querySelector("#voices");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const text = document.querySelector("#text");
const LANG_RU = "ru-RU";

let voices = [];

// generates voices
const generateVoices = () => {
  voices = speechSynthesis.getVoices();

  const voicesList = voices
    .map(
      (voice, index) =>
        voice.lang === LANG_RU &&
        `<option value=${index}>${voice.name}(${voice.lang})</option>`
    )
    .join("");

  voicesSelect.innerHTML = voicesList;
};

// play
const speak = () => {
  if (speechSynthesis.speaking) {
    console.error("speechSynthesis.speaking");
  }

  if (text.value !== "") {
    const ssUtterance = new SpeechSynthesisUtterance(text.value);

    ssUtterance.voice = voices[voicesSelect.value];
    ssUtterance.pitch = pitch.value;
    ssUtterance.rate = rate.value;

    speechSynthesis.speak(ssUtterance);
  }
};

generateVoices();

document
  .getElementById("btn-stop")
  .addEventListener("click", () => speechSynthesis.cancel());
document.getElementById("btn-start").addEventListener("click", speak);

rate.addEventListener(
  "change",
  () => (document.querySelector(".rate-value").textContent = rate.value)
);
pitch.addEventListener(
  "change",
  () => (document.querySelector(".pitch-value").textContent = pitch.value)
);

voicesSelect.addEventListener("change", speak);

speechSynthesis.addEventListener("voiceschanged", generateVoices);
