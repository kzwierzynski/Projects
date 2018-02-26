document.getElementById("analyseButton").addEventListener("click", analyze);

let access_key = '892740d95bf14027bd5ce20c432c66fe';
let uri = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender';

function analyze(){
	let inurl= document.getElementById("input").value;
	document.getElementById("image").src = inurl;
	var reqBody = {
				url: inurl
	};

	var myHeader =  new Headers({
		'Content-Type': 'application/json',
		'Ocp-Apim-Subscription-Key': access_key,
		'returnFaceAttributes': 'age,gender'
	});

	var initObject = {
		method: 'POST',
		body: JSON.stringify(reqBody),
		headers: myHeader
		// returnFaceAttributes: age,gender
	};

	var request = new Request(uri, initObject);

	fetch(request).then( (response) => {
		console.log(response);
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(new Error (response.statusText));
		}
	}).then( (response) => {
		document.getElementById("output").innerHTML = "Age: " + 
			response[0].faceAttributes.age + "</br> Gender:" + response[0].faceAttributes.gender;
	}).catch(function(err){
		alert(err);  
		document.getElementById("output").innerHTML = "";
		document.getElementById("output").innerHTML = "No face detected";
	});

}