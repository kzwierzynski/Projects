document.getElementById("analyseButton").addEventListener("click", analyze);

let access_key = '42499f59e5ee4ceca8d7293523a2f245';
let uri = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases';

function analyze(){
	console.log(document.getElementById("input").value);
	var reqBody = {
		"documents": [
			{
				"language":"en",
				"id" : 1,
				"text": document.getElementById("input").value
			}
		]
	};

	var myHeader =  new Headers({
		'Content-Type': 'application/json',
		'Ocp-Apim-Subscription-Key': access_key
	});

	var initObject = {
		method: 'POST',
		body: JSON.stringify(reqBody),
		headers: myHeader
	};

	var request = new Request(uri, initObject);

	fetch(request).then( (response) => {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(new Error (response.statusText));
		}
	}).then( (response) => {
		document.getElementById("output").innerHTML = "Total Key Phrases: " + 
			response.documents[0].keyPhrases.length + "</br>" + response.documents[0].keyPhrases;
	}).catch(function(err){
		alert(err);  
		document.getElementById("output").innerHTML = "";
	});

}