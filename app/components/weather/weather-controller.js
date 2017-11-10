function WeatherController(){
	var weatherController = this;
	var weatherService = new WeatherService();

	//pass weatherService draw function as callback:
	function convertKelvinToFahrenheit(temp) {
		return 1.8 * (temp - 273) + 32
	}

	function drawWeatherInfo(weatherObj) {
		console.log(weatherObj);
		var elem = document.getElementById('weather')
		var template = `<p>Conditions: ${weatherObj.weather[0].main}</p>
						<p>Current Temperature: ${convertKelvinToFahrenheit(weatherObj.main.temp).toFixed()}</p>
						<p>High: ${convertKelvinToFahrenheit(weatherObj.main.temp_max).toFixed()}</p>
						<p>Low: ${convertKelvinToFahrenheit(weatherObj.main.temp_min).toFixed()}</p>
						`
		elem.innerHTML = template
	}
	
	weatherService.getWeather(drawWeatherInfo)

}
