const arrImg = ["ciri.png", "geralt.png", "jaskier.png", "iorweth.png", "triss.png", "yen.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png"];

let pairs = 6;
storagePairs = sessionStorage.getItem("storagePairs");	// after reload check for stored value
if (storagePairs) {
	pairs = Number(storagePairs);
}

let bestResult=0;
storageResult = localStorage.getItem("storageResult"+pairs);	// after reload check for stored value
console.log(storageResult);
if (storageResult) {
	bestResult = Number(storageResult);
}


let actArray;
let shuffle = (array) => {			//randomize array's elements with Durstenfeld shuffle
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];	//swap 2 numbers in 1 row
	}
}

let secondCard = false, lock = false, count = 0, prevCard, prevId;
let pairsLeft = pairs;
let coverCards = (id1, id2) => {	//cards not identical -> cover them, and restore proper values
	$('#c'+id1).css('background-image', 'url("img/karta.png")')
				.removeClass('cardActive')
				.addClass('card');
	$('#c'+id2).css('background-image', 'url("img/karta.png")')
				.removeClass('cardActive')
				.addClass('card');
	lock = secondCard = false;
	prevId = prevCard = null;
	count +=1;
	$(".result").html('Turns used: '+ count)
};

let hideCards = (id1, id2) => {		//cards identical -> hide them, and restore proper values
	$('#c'+id1).css('opacity', '0');
	$('#c'+id2).css('opacity', '0');
	lock = secondCard = false;
	prevId = prevCard = null;
	count+=1;
	$(".result").html('Turns used: '+ count);
	pairsLeft-=1;
	if (pairsLeft===0) {		// if all cards hidden, show the result
		$(".board").html('<h1 class="win">You Win!</h1>');
		// $("#win").css("color", "#E9B64A");
		if ( (!bestResult) || (count<bestResult) ) {
			bestResult = count;
			localStorage.setItem("storageResult" +pairs, bestResult);	//store the value
			$(".board").append('<h2>You set a new record for ' + pairs + ' pairs to ' + bestResult + ' turns!</h2>');
		} else {
			$(".board").append('<h2>Your current record for ' + pairs + ' pairs is ' + bestResult + ' turns.</h2>');
		}

		$(".board").append('<button id="pair'+pairs+'">Play Again</button>');
		$('#pair'+pairs).addClass('btnPair')
						.click(function(){ location.reload(); });
	}
};


let uncoverCards = (id, array) => {
	let cardOpacity = Number($('#c'+id).css('opacity'));
	// console.log(cardOpacity);
	if ((!lock) && (id !== prevId) &&(cardOpacity===1)) {
		lock=true;
		let imgUrl='url("img/'+actArray[id]+'")';
		$('#c'+id).css('background-image', imgUrl)
				.removeClass('card')
				.addClass('cardActive');

		if (!secondCard){
			prevId = id;
			prevCard=array[id];
			secondCard=true;
			lock=false;
		} else if (array[id]!==prevCard) {
			setTimeout(function() { coverCards(id, prevId); }, 1000);
		} else if (array[id]===prevCard) {
			setTimeout(function() { hideCards(id, prevId); }, 800);
		}
	}
};

let populate = (pairNo) =>{
	if(pairNo>6){
		let a=630+(2*150) -(12-pairNo)*150/2;	//adjustment of board's width
		$(".board").css("width", String(a));
	}

	for (let i = 0; i < pairNo*2; i++) {
		$(".board").append('<div id="c'+i+'"></div>');
		$('#c'+i).addClass('card')
				.click(function(){ uncoverCards(i, actArray); });
	}
}

$(document).ready(function() {		//event handling from jQuery
    $(".btnPair").click(function(event) {
		let p = event.target.id.slice(4);	//get number of pairs from button id
		sessionStorage.setItem("storagePairs", p);	//store the value	
		location.reload();	//reload the page
    });
});


actArray = arrImg.slice(0, pairs);
actArray = actArray.concat(actArray);	//extend the array by itself -> pairs
shuffle(actArray);
// console.log(actArray);

populate(pairs);
