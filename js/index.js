const video = document.querySelector(".video");
const videoPlayer = document.querySelector(".video-player");
const container = document.querySelector(".video-player-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const currTime = document.getElementById("currTime");
const durTime = document.getElementById("durTime");
const skip = document.querySelectorAll("[data-skip]");

progress.style.width = `${0}%`;

const videos = [
  "JavaScript-Introduction",
  "CSS-Introduction",
  "HTML-Introduction",
];

let videoIndex = videos.length - 1;

// load the video
loadVideo(videos[videoIndex]);

function loadVideo(videoName) {
  video.src = `video/${videoName}.mp4`;
}

// play
function playVideo() {
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");
  video.play();
}

function pauseVideo() {
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
  video.pause();
}

playBtn.addEventListener("click", () => {
  if (playBtn.querySelector("i").classList.contains("fa-play")) {
    playVideo();
  } else {
    pauseVideo();
  }
});

// prev
function prevVideo() {
  videoIndex--;

  if (videoIndex < 0) videoIndex = videos.length - 1;

  loadVideo(videos[videoIndex]);

  playVideo();
}

// next

function nextVideo() {
  videoIndex++;

  if (videoIndex > videos.length - 1) videoIndex = 0;

  loadVideo(videos[videoIndex]);

  playVideo();
}

prevBtn.addEventListener("click", prevVideo);
nextBtn.addEventListener("click", nextVideo);

// progress
video.addEventListener("timeupdate", updateProgress);

function updateProgress(event) {
  const { currentTime, duration } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

progressContainer.addEventListener("click", setProgress);

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}

// skip loading
skip.forEach((item) => {
  item.addEventListener("click", () => {
    const skipvalue = parseInt(item.dataset.skip);

    if (skipvalue === 10) {
      video.currentTime += +skipvalue;
    } else {
      video.currentTime += skipvalue;
    }
  });
});

// video time
video.addEventListener("timeupdate", () => {
  const { currentTime, duration } = video;
  const minutesCurrent = Math.floor(currentTime / 60);
  const secondsCurrent = Math.floor(currentTime % 60);
  const minutesTotal = Math.floor(duration / 60);
  const secondsTotal = Math.floor(duration % 60);

  currTime.textContent = `${minutesCurrent}:${String(secondsCurrent).padStart(
    2,
    "0"
  )}`;

  durTime.textContent = `${minutesTotal}:${String(secondsTotal).padStart(
    2,
    "0"
  )}`;
});

// video click event
video.addEventListener("click", () => {
  if (playBtn.querySelector("i").classList.contains("fa-play")) {
    playVideo();
  } else {
    pauseVideo();
  }
});

// video hidden item
videoPlayer.addEventListener("mouseout", () => {
  container.setAttribute("style", "opacity: 0");
  skip.forEach((item) => {
    item.setAttribute("style", "opacity: 0");
  });
});

videoPlayer.addEventListener("mouseover", () => {
  container.setAttribute("style", "opacity: 1");
  skip.forEach((item) => {
    item.setAttribute("style", "opacity: 1");
  });
});
