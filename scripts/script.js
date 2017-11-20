//color variables
var color = "rgb(247, 299, 218)";
var secretColor = "rgb(" + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +")";

//DOM variables
var firstSquare = document.querySelectorAll(".colorSquare");
var squareHolder = document.querySelector("#squareHolder");
var titleColor = document.querySelector("#titleColor");
var resultText = document.querySelector("#result");
//can player click
var gameOver = false;
//tileCount was added so that the random square chosen is correct for the difficulty level. 
var tileCount = 6; 


//Upon start begin Game Logic
resetGlobal();

function createRandomColor() {
	//Create a random RGB value each call.
	color = "RGB(" + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +")";
}

//go through each square and assign a random background.
function assignRandomColor() {
	for (i =0; i < firstSquare.length; i++){
	createRandomColor();
	firstSquare[i].style.background = color;
	}
}

//Go through and create an event listener for each square
function createEventListeners() {
	for (i =0; i < firstSquare.length; i++){
		firstSquare[i].addEventListener("click", function() {
			//if correct 
			if (this.style.background == secretColor && gameOver == false) {
			result.innerText = "SUCCESS!";
			gameOver = true;
		}
		//if already correct before
		else if (gameOver == true) {
			result.innerText = "YOU SUCCEEDED!"
		}
		//if failed
		else {
			this.style.background = "black";
			result.innerText = "FAIL!";
		}
			});
		}
	}


//upon new colors reset everything
document.querySelector("#reset").addEventListener("click", function() {
resetGlobal();
});

//upon easy click
document.querySelector("#easy").addEventListener("click", function() {
	//create three squares
	tileCount = 3;
	squareHolder.innerHTML = ' <div class = "colorSquare"></div> <div class = "colorSquare"></div> <div class = "colorSquare"></div>';
	firstSquare = document.querySelectorAll(".colorSquare");
	//reset game logic
	resetGlobal();
	//graphic update to tab
	this.classList.add("active");
	document.querySelector("#hard").classList.remove("active");
	});

//upon hard click
document.querySelector("#hard").addEventListener("click", function() {
	//create six squares
	tileCount = 6;
	squareHolder.innerHTML = ' <div class = "colorSquare"></div> <div class = "colorSquare"></div> <div class = "colorSquare"></div> <div class = "colorSquare"></div> <div class = "colorSquare"></div> <div class = "colorSquare"></div>';
	firstSquare = document.querySelectorAll(".colorSquare");
	//reset game logic
	resetGlobal();
	//graphics update to tab
	this.classList.add("active");
	document.querySelector("#easy").classList.remove("active");
	});

//graphical updates for reset tab on hover
document.querySelector("#reset").addEventListener("mouseover", function() {
this.classList.toggle("active");
});
document.querySelector("#reset").addEventListener("mouseout", function() {
this.classList.toggle("active");
});


//reset game logic
function resetGlobal() {
	//create secret colour variable
	secretColor = "rgb(" + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +", " + Math.floor(Math.random() * 256) +")";
	//Give each square a random colour
	assignRandomColor();
	//give secret colour to one square
	firstSquare[Math.floor(Math.random() * tileCount)].style.background = secretColor;
	//make title show secret colour
	titleColor.innerText = secretColor;
	//let player click again
	gameOver = false;
	//reset success text
	result.innerText = "GUESS A SQUARE!";
	//create new listeners for squares
		createEventListeners();
}