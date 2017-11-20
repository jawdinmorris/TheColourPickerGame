//color variables
var color = "rgb(247, 299, 218)";
var secretColor = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
//DOM variables
var firstSquare = document.querySelectorAll(".colorSquare");
var squareHolder = document.querySelector("#squareHolder");
var titleColor = document.querySelector("#titleColor");
var resultText = document.querySelector("#result");
var topBar = document.querySelector("#topBar");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var activeSelect = document.querySelector(".active");
//can player click
var gameOver = false;
//tileCount was added so that the random square chosen is correct for the difficulty level. 
var tileCount = 6;
//Upon start begin Game Logic
resetGlobal();

function createRandomColor() {
	//Create a random RGB value each call.
	color = "RGB(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
}
//go through each square and assign a random background.
function assignRandomColor() {
	for (i = 0; i < firstSquare.length; i++) {
		createRandomColor();
		firstSquare[i].style.backgroundColor = color;
	}
}
//Go through and create an event listener for each square
function createEventListeners() {
	for (i = 0; i < firstSquare.length; i++) {
		firstSquare[i].addEventListener("click", function() {
			//if correct 
			if (this.style.background == secretColor && gameOver == false) {
				result.innerText = "SUCCESS!";
				resetButton.innerText = "PLAY AGAIN?";
				gameOver = true;
				//graphical updates to displaybar
				topBar.style.backgroundColor = secretColor;
				activeSelect = document.querySelector(".active");
				activeSelect.style.backgroundColor = secretColor;
				//make remaining squares match in color
				for (i = 0; i < firstSquare.length; i++) {
					if (firstSquare[i].style.backgroundColor != "black") {
						firstSquare[i].style.backgroundColor = secretColor;
					}
				}
			}
			//if already correct before
			else if (gameOver == true) {
				result.innerText = "YOU SUCCEEDED!";
			}
			//if failed
			else {
				this.style.backgroundColor = "black";
				result.innerText = "FAIL!";
			}
		});
	}
}
// upon reset click
resetButton.addEventListener("click", function() {
	this.style.color = "#6492db";
	this.style.backgroundColor = "white";
	resetGlobal();
});

//upon easy click
easyButton.addEventListener("click", function() {
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
hardButton.addEventListener("click", function() {
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
resetButton.addEventListener("mouseover", function() {
	//if games playing display normal colours
	if (gameOver == false) {
		this.style.color = "white";
		this.style.backgroundColor = "#6492db";
	} else {
		//if games over show secret color
		this.style.backgroundColor = secretColor;
		this.style.color = "white";
	}
});
//get rid of graphical updates when leaving hover
resetButton.addEventListener("mouseout", function() {
	this.style.color = "#6492db";
	this.style.backgroundColor = "white";
});
//reset game logic
function resetGlobal() {
	//create secret colour variable
	secretColor = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
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
	resetButton.innerText = "NEW COLORS";
	topBar.style.backgroundColor = "#6492db";
	//NOTE to others - wiping the midBar and updating each button to be active in this way may seem weird. Honestly I couldn't figure out the logic another way.
	//if easy mode is on highlight button
	if (tileCount == 3) {
		easyButton.style.color = "white";
		easyButton.style.backgroundColor = "#6492db";
		hardButton.style.color = "#6492db";
		hardButton.style.backgroundColor = "white";
		//if hard mode is on highlight button
	} else if (tileCount == 6) {
		hardButton.style.color = "white";
		hardButton.style.backgroundColor = "#6492db";
		easyButton.style.color = "#6492db";
		easyButton.style.backgroundColor = "white";
	}
	createEventListeners();
}