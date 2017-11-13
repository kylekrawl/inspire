function ClockController() {

    var clockService = new ClockService()

    function updateClock() {
        var hourElem = document.getElementById('hour')
        var minuteElem = document.getElementById('minute')
        var secondElem = document.getElementById('second')
        var dayPeriodElem = document.getElementById('day-period')
        var hourVal =  clockService.getCurrentHour()
        var minuteVal = clockService.getCurrentMinute()
        var secondVal = clockService.getCurrentSecond()
        var dayPeriod = (hourVal > 12 && hourVal < 23) ? "PM" : "AM"
        hourVal = (hourVal > 0 && hourVal < 13) ? hourVal : Math.abs(12 - hourVal)
        minuteVal = String(minuteVal).length < 2 ? `0${minuteVal}` : minuteVal
        secondVal = String(secondVal).length < 2 ? `0${secondVal}` : secondVal
        hourElem.innerText = hourVal
        minuteElem.innerText = minuteVal
        secondElem.innerText = secondVal
        dayPeriodElem.innerText = dayPeriod
        setTimeout(updateClock, 1000)
    }
    updateClock()
}