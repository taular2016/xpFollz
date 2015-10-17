var colorsImg = [{
	'border-color': '#b71c1c',
	'background-color': '#ff8a80'
}, {
	'border-color': '#0d47a1',
	'background-color': '#82b1ff'
}, {
	'border-color': '#1b5e20',
	'background-color': '#b9f6ca'
}, {
	'border-color': '#212121',
	'background-color': '#bdbdbd'
}, {
	'border-color': '#ff6f00',
	'background-color': '#ffe57f'
}];
var colorsTitle = [{
	'color': '#ff8a80'
}, {
	'color': '#82b1ff'
}, {
	'color': '#b9f6ca'
}, {
	'color': '#bdbdbd'
}, {
	'color': '#ffe57f'
}];

$(document).on('ready', function() {
	var changePlaceCSS = function(colorsArray) {
		return function() {
			this.currentColor = this.currentColor || 0;
			$(this).css(colorsArray[this.currentColor]);
			this.currentColor++;
			if (this.currentColor > colorsArray.length - 1) {
				this.currentColor = 0;
			}
		};
	};
	$('.place-box > img').on('click', changePlaceCSS(colorsImg));
	$('.place-box > h2').on('click', changePlaceCSS(colorsTitle));
});