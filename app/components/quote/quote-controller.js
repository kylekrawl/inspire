function QuoteController(){

	var quoteService = new QuoteService()

	//pass draw function into getQuote as callback
	function drawQuote(quoteObj) {
		console.log('What is the quote', quoteObj)
		var elem = document.getElementById('quote')
		var template = `<p>${quoteObj.quote}</p>
						- ${quoteObj.author}`
		elem.innerHTML = template
	}

	quoteService.getQuote(drawQuote)
}
