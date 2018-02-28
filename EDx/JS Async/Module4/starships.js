const ships = [{ val:"2", name:"CR90 Corvette"},
	{ val:"75", name:"V-wing"},
	{ val:"74", name:"Belbullab-22 Starfighter"},
	{ val:"65", name:"Jedi Interceptor"},
	{ val:"3", name:"Star Destroyer"},
	{ val:"59", name:"Trade Fedaration Cruiser"},
	{ val:"58", name:"Solar Sailer"},
	{ val:"63", name:"Republic Attack Cruiser"},
	{ val:"28", name:"A-wing"},
	{ val:"29", name:"B-wing"},
	{ val:"39", name:"Naboo Fighter"},
	{ val:"10", name:"Millenium Falcon"}
];

const attrIds = ['name','cost', 'speed', 'cargo', 'pass'];
const attrNames = ['name','cost_in_credits', 'max_atmosphering_speed', 'cargo_capacity', 'passengers'];


document.getElementById("button").addEventListener("click", searchShips);
populateLists();

function run(genFunc) {
	const genObj = genFunc();

	function iterate(it){
		if (it.done == true) {
			return Promise.resolve(it.value);
		}
		return Promise.resolve(it.value)
		.then( x => iterate(genObj.next(x)))
		.catch(x => iterate(genObj.throw(x)));
	}
	try {
		return iterate(genObj.next());
	} catch (err) {
		return Promise.reject(err);
	}
}


function *gen(){

	for (let i = 0; i < 2; i++) {
		//get ship' id
		let ships = document.getElementById(`ship${i+1}`);
		let ship = ships.options[ships.selectedIndex].value;
		let url = 'https://swapi.co/api/starships/' + ship + "/";
		console.log(url);
		//fetch the ship
		let shipObj = yield fetch(url);
		let shipData = yield shipObj.json();
		// console.log(shipData);
		for (let j = 0; j < attrIds.length; j++) {
			let tempId = attrIds[j]+String(i+1);
			let tempEl = document.getElementById(tempId);
			// console.log(shipData[attrNames[j]]);
			tempEl.innerHTML = shipData[attrNames[j]];
		}
	}

	for (let i = 1; i < attrIds.length; i++) {
		let tempEl1 = document.getElementById(attrIds[i]+1);
		let tempEl2 = document.getElementById(attrIds[i]+2);
		let numEl1 = Number(tempEl1.innerHTML);
		let numEl2 = Number(tempEl2.innerHTML);

		if (numEl1 > numEl2){
			tempEl1.style.backgroundColor = "red";
			tempEl2.style.backgroundColor = "white";
		} else if (numEl1 < numEl2){
			tempEl2.style.backgroundColor = "red";
			tempEl1.style.backgroundColor = "white";
		}
	}
}

function searchShips(){
	run(gen).catch( (err) => alert(err) );
}

function populateLists(){
	ships.forEach(el => {
		$("#ship1").append(`<option value="${el.val}">${el.name}</option>`);
		$("#ship2").append(`<option value="${el.val}">${el.name}</option>`);
	});
}