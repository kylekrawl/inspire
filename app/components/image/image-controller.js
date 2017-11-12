function ImageController() {
	var imageService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?

	//pass getImage draw function as callback: 
	function drawBackgroundImage(image) {
		console.log('Image data: ', image)
		var elem = document.getElementById('body')
		if (image.large_url) {
			elem.style.cssText = `background: url("${image.large_url}") center no-repeat; background-size: cover;`
			console.log('Large image url: ', image.large_url)
		} else {
			console.log('No large image url, fetching new image.')
			imageService.getImage(drawBackgroundImage)
			
		}
	}

	this.getImage = function() {
		imageService.getImage(drawBackgroundImage)
	}
	
	this.getImage()
}


