function ImageController() {
	var imageService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?

	function validImageUrl(url) {
		var valid = false
		var extensions = ['.jpg', 'jpeg', '.png']
		for (var i in extensions) {
			var extension = extensions[i]
			if (url.toLowerCase().substring(url.length - extension.length) === extension) {
				valid = true
				break
			}
		}
		return valid
	}

	//pass getImage draw function as callback: 
	function drawBackgroundImage(image) {
		console.log('Image data: ', image)
		var elem = document.getElementById('body')
		if (image.large_url) {
			if (validImageUrl(image.large_url)) {
			elem.style.cssText = `background: url("${image.large_url}") center no-repeat; background-size: cover;`
			console.log('Large image url: ', image.large_url)
			} else {
				console.log('Image url failed validity test, fetching new image.')
				imageService.getImage(drawBackgroundImage)
			}
		} else {
			console.log('No large image url, fetching new image.')
			imageService.getImage(drawBackgroundImage)
		}
	}

	this.getImage = function () {
		imageService.getImage(drawBackgroundImage)
	}

	this.getImage()
}


