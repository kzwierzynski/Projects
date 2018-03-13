//global variables go here:
let started = false;
let interval;
let time=0;
//execute functions here:
setUp();


//function definitions go here:
function setUp(){
	document.addEventListener("keypress", (e)=>{
			switch(e.key){
				case "r":
				document.getElementById("res").click();
				break;
				case "s":
				document.getElementById("stst").click();
				break;
				case "t":
				document.getElementById("record").click();
				break;
			}
	});

	document.getElementById("res").addEventListener( "click", () => {
		started = false;
		clearInterval(interval);
		time=0;
		document.getElementById("timer").innerHTML = `${time.toFixed(2)} s`;
		document.getElementById("savedTime").innerHTML = "Past Times:";
	});
	document.getElementById("stst").addEventListener( "click", () => {
		if (started === false){
			interval = setInterval( () => {
				time += 0.01;
				document.getElementById("timer").innerHTML = `${time.toFixed(2)} s`;
			}, 10);
			started = true;
		} else {
			clearInterval(interval);
			started = false;
		}
	});
	document.getElementById("record").addEventListener( "click", () => {
		let str = '<br />' + time.toFixed(2);
		document.getElementById("savedTime").insertAdjacentHTML('beforeend', str);
	});
}