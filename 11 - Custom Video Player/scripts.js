'use strict';

// getting elements
const player  = document.querySelector('.player');
const video   = player.querySelector('.viewer');

const progress  = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const buttonFull    = player.querySelector('.full_screen');
const buttonToggle  = player.querySelector('.toggle');
const buttonsRanges = player.querySelectorAll('.player__slider');
const buttonsSkip   = player.querySelectorAll('[data-skip]');


// functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
  updateButton.call(video);
}

function updateButton() {
  buttonToggle.textContent = this.paused ? '►' : '❚❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function setNewTime(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

function showFullScreen() {
  if (video.webkitRequestFullScreen || video.mozRequestFullScreen) {
    if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen()
    } else {
      video.mozRequestFullScreen();
    }
  } else {
    alert('),: sorry');
  }
}


// calls
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
buttonToggle.addEventListener('click', togglePlay);
buttonsSkip.forEach(x => x.addEventListener('click', skip));
buttonsRanges.forEach(x => x.addEventListener('change', rangeUpdate));
buttonsRanges.forEach(x => x.addEventListener('mousemove', rangeUpdate));
progress.addEventListener('click', setNewTime);
buttonFull.addEventListener('click', showFullScreen);
