function ImageController() {
	var imageService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?

	//pass getImage draw function as callback: 
	function drawBackgroundImage(image) {
		console.log('Image data: ', image)
		var elem = document.getElementById('body')
		elem.style.cssText = `background: url("${image.url}") center no-repeat; background-size: cover;`
	}

	//Test Image API
	imageService.getImage(drawBackgroundImage)
}


