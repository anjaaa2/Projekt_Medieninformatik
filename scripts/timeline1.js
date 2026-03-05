
const items = document.querySelectorAll('.timeline-item');

/* Scroll Reveal */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.3 }
);

items.forEach(item => observer.observe(item));

/* Klick-Interaktion */
items.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

const players = document.querySelectorAll(".audio-player");

players.forEach(player => {

  const startBtn = player.querySelector(".start-audio");

  if(startBtn){
    startBtn.addEventListener("click", () => {
      player.classList.add("active");
    });
  }

});

players.forEach(player => {

  const playBtn = player.querySelector(".play-btn");
  const audio = player.querySelector("audio");
  const progress = player.querySelector(".progress");
  const progressContainer = player.querySelector(".progress-container");
  const timeDisplay = player.querySelector(".time");

  /* Play / Pause */
  playBtn.addEventListener("click", () => {

    // Stoppt anderes Audio
    if (activeAudio && activeAudio !== audio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      document.querySelectorAll(".play-btn").forEach(btn => btn.textContent = "▶");
    }

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
      activeAudio = audio;
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  /* Fortschritt aktualisieren */
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    timeDisplay.textContent = formatTime(audio.currentTime);
  });

  /* Klick auf Fortschrittsbalken */
  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  });

  /* Wenn Audio endet */
  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    progress.style.width = "0%";
    activeAudio = null;
  });

});

/* Zeit formatieren */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

document.querySelectorAll(".audio-player").forEach(player => {

  const startBtn = player.querySelector(".start-audio");
  const playBtn = player.querySelector(".play-btn");
  const audio = player.querySelector("audio");
  const progress = player.querySelector(".progress");
  const progressContainer = player.querySelector(".progress-container");
  const timeDisplay = player.querySelector(".time");

  if(!audio) return;

  /* Aktivieren */
  startBtn.addEventListener("click", () => {
    player.classList.add("active");
  });

  /* Play / Pause */
  playBtn.addEventListener("click", () => {

    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }

  });

  /* Fortschrittsbalken */
  audio.addEventListener("timeupdate", () => {

    if(!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);

    timeDisplay.textContent =
      minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);

  });

  /* Fortschrittsbalken klicken */
  progressContainer.addEventListener("click", e => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / width) * audio.duration;

  });

});
