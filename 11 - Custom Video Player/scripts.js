// 定义变量
const video = document.querySelector('video')
const toggleBtn = document.querySelector('.toggle')
const ranges = document.querySelectorAll('.player__slider')
const skipBtns = document.querySelectorAll('[data-skip]');
const fullScreenBtn = document.querySelector('#full')
const progressBar = document.querySelector('.progress__filled')
const progress = document.querySelector('.progress')

// 编写功能函数
function toggleVideoPlay() {
    const state = video.paused ? 'play' : 'pause';
    video[state]();
}

function updateButton(e) {
    const state = e.type == 'pause' ? '►' : 'II';
    toggleBtn.textContent = state
}

function handleUpdate() {
    video[this.name] = this.value
    console.log(this.value)
}

function handleSkip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function toggleFullScreen() {
    video.webkitRequestFullScreen()
}

function handleProgress(e) {
    let newTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = newTime
}

function updateTime(e) {
    let persent = video.currentTime / video.duration * 100
    progressBar.style.flexBasis = `${persent}%`
}

// 编写事件监听
video.addEventListener('click', toggleVideoPlay)
video.addEventListener('pause', updateButton)
video.addEventListener('play', updateButton)
video.addEventListener('timeupdate', updateTime)

ranges.forEach(range => range.addEventListener('change', handleUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleUpdate))

toggleBtn.addEventListener('click', toggleVideoPlay)

skipBtns.forEach(skipBtn => skipBtn.addEventListener('click', handleSkip))

fullScreenBtn.addEventListener('click', toggleFullScreen)


let mouseDown = false
progress.addEventListener('click', handleProgress)
progress.addEventListener('mousemove', (e) => mouseDown && handleProgress(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

// let mousedown = false;
// progressBar.addEventListener('click', handleProgress);
// progressBar.addEventListener('mousemove', (e) => mousedown && handleProgress(e));
// progressBar.addEventListener('mousedown', () => mousedown = true);
// progressBar.addEventListener('mouseup', () => mousedown = false);
