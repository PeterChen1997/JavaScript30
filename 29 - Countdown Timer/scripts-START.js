const time = document.querySelector('.display__time-left')
const note = document.querySelector('.display__end-time')
const btns = document.querySelectorAll('.timer__button')

let loopId

function timer(seconds) {
    if(loopId) {
        clearInterval(loopId)
    }
    // Date.now() get milliseconds
    let now = Date.now()
    console.log(now)
    let then = seconds * 1000 + now
    displayTime(seconds)
    displayNote(then)

    loopId = setInterval(() => {
        seconds = seconds - 1
        if(seconds < 0) {
            clearInterval(loopId)
            return
        }
        displayTime(seconds)
    }, 1000)

}


function displayTime(seconds) {
    leftSeconds = seconds % 60
    let minutes = Math.floor(seconds / 60)
    time.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${leftSeconds < 10 ? '0' : ''}${leftSeconds}`
}

function displayNote(then) {
    let date = new Date(then)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    note.textContent = `Come back at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

function handleClick() {
    timer(this.dataset.time)
}

btns.forEach(btn => btn.addEventListener('click', handleClick))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let minutes = this.minutes.value
    timer(minutes * 60)
})