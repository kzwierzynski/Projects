

function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
          .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
          .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function *gen(){

	var post1Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
	var post1 = yield post1Stream.json();
	console.log(post1.title); 
	//post1.title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
	var post2Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/2");
	var post2 = yield post2Stream.json();
	console.log(post2.title);
	//post2.title = "qui est esse"

	var number = yield 12345;
	console.log(number)
	//number = 12345

	var string = yield "abc";
	console.log(string)
	//string = "abc"

	var obj = yield {id:123,name:"xyz"};
	console.log(obj)
	//obj = Object {id:123,name:"xyz"}

	var a = yield 54434337746;
	console.log(a);
	return "done";

}

// run(gen).then(x => console.log(x)) //logs "done"
// 	.catch(x => console.log(x.message));

function *gen2(){

	var post1Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/1");
	var post1 = yield post1Stream.json();
	console.log(post1.title); 
	//post1.title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
	var post2Stream = yield fetch("https://jsonplaceholder.typicode.com/posts/2");
	var post2 = yield post2Stream.json();
	console.log(post2.title);
	//post2.title = "qui est esse"

	var error = yield Promise.reject(Error("error message!"));
	//error thrown here, generator function terminates

	var number = yield 12345;
	console.log(number); //doesn't occur because an earlier promise was rejected 

	return 'done'; //doesn't occur because an earlier promise was rejected

}

run(gen2).then(x => console.log(x))
        .catch(err => console.log(err.message)); //logs "error message!" from the rejected Promise