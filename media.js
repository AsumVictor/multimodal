const audio = document.getElementById("myAudio");
const playPauseBtns = document.querySelectorAll(".play-icon");
// const volumeControl = document.getElementById("volumeControl");
// const timer = document.getElementById("timer");
// const canvas = document.getElementById("waveform");
// const ctx = canvas.getContext("2d");

console.log(playPauseBtns);
// Function to toggle play/pause
function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    // playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause symbol
  } else {
    audio.pause();
    // playPauseBtn.innerHTML = '&#9658;'; // Play symbol
  }
}

// Function to update volume
// function updateVolume() {
//   audio.volume = volumeControl.value;
// }

// Function to update timer
// function updateTimer() {
//   const minutes = Math.floor(audio.currentTime / 60);
//   let seconds = Math.floor(audio.currentTime % 60);
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   timer.textContent = minutes + ":" + seconds;
// }

// Function to draw audio waveform

// Event listeners
playPauseBtns.forEach((playPauseBtn) => {
  playPauseBtn.addEventListener("click", ()=> togglePlayPause());
});
// volumeControl.addEventListener('input', updateVolume);
// audio.addEventListener('timeupdate', updateTimer);

// Create audio context for Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// // Update volume and timer on page load
// updateVolume();
// updateTimer();
// drawWaveform();
