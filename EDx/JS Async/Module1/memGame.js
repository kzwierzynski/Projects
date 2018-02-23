//global variables go here:
let tilesClicked=[];
let started = false;
let numCompleted = 0;
let ready = true;
let interval;
let timer = 0;
//execute functions here:
setUp();


//function definitions go here:
function randAns(answers){
	answers.sort( () => {
		return .5 - Math.random();
	});
	return answers;
}

function reveal(cell){
	cell.clicked=true;
	cell.style.background = "red";
	cell.innerHTML = cell.value;
}
function hide(cell){
	cell.clicked = false;
	cell.style.background = "blue";
	cell.innerHTML = "";
}
function complete(cell){
	numCompleted +=1;
	cell.completed = true;
	cell.style.background = "purple";
}

function startTimer(){
	// let timer = 0;
	if (started === false) {
		interval = setInterval(() => {
			timer +=1;
			document.getElementById("timer").innerHTML = `Time elapsed: ${timer}s`;
		}, 1000);
		started = true;	
	}
}


function setUp(){
	let answers=[1,1,2,2,3,3,4,4,5];
	randAns(answers);
	console.log(answers);
	tiles=document.getElementsByTagName("td");

	for (let i = 0; i < tiles.length; i++) {
		let cell = tiles[i];
		cell.value = answers[i];
		cell.clicked = false;
		cell.completed = false;

		cell.addEventListener("mouseenter", function() {
			if ( !this.clicked && !this.completed ) {
				this.style.background = "orange";
			}
		});
		cell.addEventListener("mouseleave", function() {
			if ( !this.clicked && !this.completed ) {
				this.style.background = "blue";
			}
		});
		cell.addEventListener("click", function() {
			if (ready === false) {
				return;
			}
			if ( !this.clicked && !this.completed ) {
				startTimer();
				tilesClicked.push(cell);
				reveal(this);
				if (tilesClicked.length == 2 ){
					if (tilesClicked[0].value === tilesClicked[1].value) {
						complete(tilesClicked[0]);
						complete(tilesClicked[1]);
						tilesClicked = [];
						if (numCompleted>=8) {
							clearInterval(interval);
							setTimeout(() => {
								alert(`You finished the game in ${timer}s`)
								ready = false;
							}, 500);
						}
					} else {
						ready = false;
						document.getElementById("board").style.borderColor = "red";
						setTimeout(() => {
							// console.log(tilesClicked);
							hide(tilesClicked[0]);
							hide(tilesClicked[1]);
							tilesClicked = [];
							ready = true;
							document.getElementById("board").style.borderColor = "black";
						}, 800)
						
					}
				}	
			}
		});

	}
	document.addEventListener("keypress", (e) => {
		if (e.key >=1 && e.key <=9) {
			tiles[e.key-1].click();
			// document.getElementById(`c${e.key}`).click();
		}
	})
	document.getElementById("res-btn").addEventListener("click", () => {
		location.reload();
	});
	
}