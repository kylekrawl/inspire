function ClockService() {

    this.getCurrentHour = function() {
        var date = new Date()
        return date.getHours()
    }

    this.getCurrentMinute = function() {
        var date = new Date()
        return date.getMinutes()
    }

    this.getCurrentSecond = function() {
        var date = new Date()
        return date.getSeconds()
    }

}