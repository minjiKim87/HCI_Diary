function initAudio() {
  const audio = document.getElementById("myAudio");
  const currentTime = localStorage.getItem("audioTime");

  if (currentTime) {
    audio.currentTime = parseFloat(currentTime);
  }

  audio.addEventListener("timeupdate", function () {
    localStorage.setItem("audioTime", audio.currentTime);
  });

  const playButton = audio.querySelector("[title='Play']");
  if (playButton) {
    playButton.click();
  }
}
