document.getElementById("button").addEventListener("click", searchMovie);

function run(genFunc) {
	const genObj = genFunc();

	function iterate(i){
		if (i.done == true) {
			return Promise.resolve(i.value);
		}
		return Promise.resolve(i.value)
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

    //check if input is valid
	let searchId = Number(document.getElementById("input").value);
	if ( !(searchId >= 1 && searchId <= 7) ){
		throw new Error("Invalid Input - Enter a number between 1 and 7");
	}

    //fetch the film
	let url = 'https://swapi.co/api/films/' + searchId + "/"; 
	let filmObj = yield fetch(url);
	let film = yield filmObj.json();
	// console.log(url);

	//fetch the characters
	let characters = film.characters;
	let charStr = "Characters: <br>";

	for (let id = 0; id < characters.length; id++) {
		let respTemp = yield fetch(characters[id]);
		let charTemp = yield respTemp.json();
		charStr += charTemp.name + "<br>";
	}
	// console.log(charStr);


    //display film title and characters in the film
	document.getElementById("filmsText").innerHTML = "Film: <br>" + film.title;
	document.getElementById("peopleText").innerHTML = charStr;
}

function searchMovie(){
	run(gen).catch( (err) => alert(err) );
}