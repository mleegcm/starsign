var currentBox = 0;
var oldBox = 0;
var indexOfMaxValue = 0;
var currentText = "";
var revealText = "별별자리";
var lengthOfArray = $(".block").length+1;
var times = new Array(lengthOfArray).fill(0);

var show = false;


$(function(){
	
	scrollStuff();
	
	document.querySelector("#header").addEventListener('click', function(){
		if (!show) {
			$( ".reveal" ).html(revealText);
			reset();
			show = true;
			
		} else {
			$( ".reveal" ).html("별별자리");
			show = false;
		} 			
	});
});


function scrollStuff() {
	addToTimesArray();
	
		$(window).scroll(function(){
		
			var heightOfWindow = document.documentElement.clientHeight;
			
			$('#blocks').children('.block').each(function(i) { 
			    var pos = this.getBoundingClientRect().top+this.getBoundingClientRect().height/2;
			    if( pos > heightOfWindow/8 && pos < heightOfWindow ){
			        currentBox = i+1;
			        currentText = $(this).find($("h3")).text();
			        return false;
			    }
			});
		});
}


function reset() {
	currentBox = 0;
	oldBox = 0;
	times = new Array(lengthOfArray).fill(0);
	indexOfMaxValue = 0;
	lengthOfArray = $(".block").length+1;
	times = new Array(lengthOfArray).fill(0);
}


function addToTimesArray(){

	if (currentBox > 1) {
		times[currentBox] += 1;
		indexOfMaxValue = times.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
		if ((indexOfMaxValue > 1) && (indexOfMaxValue<lengthOfArray) && (Math.max.apply(Math, times)>9)) {
			if (oldBox != indexOfMaxValue) {
				oldBox = indexOfMaxValue;
				revealText = currentText;
				setTimeout(reset,1800);
			}
		}
	} else {
		reset();
	}
	
	setTimeout(addToTimesArray,250);
}



