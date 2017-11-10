function ImageController() {
	var imageService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?

	//Test Image API
	imageService.getImage(function(image) {
		console.log('Image data: ', image)
	})
}


