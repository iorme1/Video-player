// relevant elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')

 // video player functions

const togglePlay = function() {
  video.paused ? video.play() : video.pause();
}
const updateButton = function() {
  toggle.textContent == '►' ? toggle.textContent = '❚ ❚' : toggle.textContent = '►';
}
const skip = function() {
  video.currentTime += parseFloat(this.dataset.skip);
}
const handleRangeUpdate = function() {
  video[this.name] = this.value;
}
const handleProgress = function() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
const scrub = function(e) {
  const scrubPercent = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubPercent;
}

// event listeners

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach( sb => sb.addEventListener("click", skip) )

ranges.forEach( r => r.addEventListener("change", handleRangeUpdate) );
ranges.forEach( r => r.addEventListener("mousemove", handleRangeUpdate) );

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
