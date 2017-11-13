function ClockController() {

    var clockService = new ClockService()

    function updateClock() {
        var hourElem = document.getElementById('hour')
        var minuteElem = document.getElementById('minute')
        var secondElem = document.getElementById('second')
        hourElem.innerText = clockService.getCurrentHour()
        minuteElem.innerText = clockService.getCurrentMinute()
        secondElem.innerText = clockService.getCurrentSecond()
        setTimeout(updateClock, 1000)
    }
    updateClock()
}