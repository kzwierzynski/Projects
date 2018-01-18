var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

// alert(stooge["first-name"]);
// alert(stooge["middle-name"]); //undefined
stooge["middle-name"] = "Brom"; //added new property and value to it
// alert(stooge["middle-name"]);

//  !! zbędne !!
// if (typeof Object.create !== 'function') {  //create method to the Object function. The create method creates a new object that uses an old object as its prototype.
    // Object.create = function (o) {
    // var F = function () {};
    // F.prototype = o;
    // return new F();
    // };
// }

var another_stooge = Object.create(stooge);
// alert(typeof another_stooge);
// alert(stooge.isPrototypeOf(another_stooge)); //checks prototype
// console.dir(another_stooge);        //prints out in console detailed info about the object (prototypes etc.)
// console.dir(stooge);
// console.dir(stooge1);   //undefined
var stooge1 = Object.create(another_stooge);    //alreayd with property .profession
another_stooge.profession = "unemployed";

// console.dir(stooge1);

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
        arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
console.log (typeof flight.departure);  //object
console.log (typeof flight.departure.city); //string
console.log (another_stooge.hasOwnProperty("first-name"));  //false (doesnt look into prototype, only directly)
console.log (stooge.hasOwnProperty("first-name"));          //true


//enumeration of all of the properties (including prototype etc), in whatever order!
var name; 
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        document.writeln(name + ': ' + another_stooge[name]);
    }
}

// enumeration of properties we want to, in given order
var i;
var properties = [
'first-name',
'middle-name',
'last-name',
'profession'
];
for (i = 0; i < properties.length; i += 1) {
document.writeln(properties[i] + ': ' +
another_stooge[properties[i]]);
}
//------------------------------

another_stooge["middle-name"] = "West";
delete another_stooge["middle-name"];       //deletes property from the object, but property of the prototype remains with its default value
console.log(another_stooge["middle-name"]);

//---------------------------------------------------------------------------------------
var add = function (a, b) {
    return a + b;
};

var myObject = {
    value: 0,
    increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function ( ) {
        return this.value;
    }
};

myObject.increment( );
document.writeln(myObject.value); // 1
myObject.increment(2);
document.writeln(myObject.value); // 3

myObject.double = function () {
    var that = this; // Workaround.
    var helper = function () {
    that.value = add(that.value, that.value);
    };
    helper(); // Invoke helper as a function.
};
// Invoke double as a method.
myObject.double();
document.writeln(myObject.getValue()); // 6

//CONSTRUCTOR, use different type of construct (later on)--------------------------------------------------
// Create a constructor function called Quo.
// It makes an object with a status property.
var Quo = function (string) {
    this.status = string;
};
// Give all instances of Quo a public method
// called get_status.
Quo.prototype.get_status = function ( ) {
    return this.status;
};
    // Make an instance of Quo.
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status( )); // confused

// APPLY---------------------------------
// Make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array); // sum is 7
// document.writeln(sum);
// Make an object with a status member.
var statusObject = {
status: 'A-OK'
};
// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
// document.writeln(status);
// status is 'A-OK'

//Arguments, dont use this way-----------------------------------------------------------
// Make a function that adds a lot of stuff.
// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.
// var sum = function ( ) {
//     var i, sum = 0;
//     for (i = 0; i < arguments.length; i += 1) {
//     sum += arguments[i];
//     }
//     return sum;
// };
// document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108
//
var add = function(a,b){
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw{
            name:  'TypeError',
            message: 'add fcn needs numbers'
        };
    }
    return a+b;
}
// Make a try_it function that calls the new add
// function incorrectly.
var try_it = function(){
    try{
        add('seven');
    } catch(e){
        document.writeln(e.name + ': ' + e.message);
    }
}
try_it();
//Augmenting types---------------------------------------------

// By augmenting Function.prototype with a method method, we no longer have to type
// the name of the prototype property. That bit of ugliness can now be hidden.
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {            //if not available by default, new method created
        this.prototype[name] = func;
        return this;
    }
};

Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
document.writeln((-10/3).integer()); // -3

if (!String.prototype.trim) {                   //condition added in method method definition, above
    String.method('trim', function() {
        return this.replace(/^\s+|\s+$/g, '');
        });
}else{
    console.log("trim already exists");
}

//Recursion, towers of Hanoi example ---------------------------------------------------------
var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};
hanoi(2, 'A', 'B', 'C');

// recursion - DOM navigation--------------------------------

// Define a walk_the_DOM function that visits every node of the tree in HTML source order, starting
// from some given node. It invokes a function, passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};
// Define a getElementsByAttribute function. It takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a function that looks for an attribute name in the
// node. The matching nodes are accumulated in a results array.
var getElementsByAttribute = function (att, value) {
    var results = [];
    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
};


var factorial = function(a){
    
    if (a>1){
        return a*factorial(a-1);
    }else{
        return 1;
    }
}
const a = 100;
document.writeln("factorial of ", a, " = ", factorial(a));

//scope--------------------------------------------------------------------------------
var foo = function ( ) {
    var a = 3, b = 5;
    var bar = function ( ) {
        var b = 7, c = 11;  // At this point, a is 3, b is 7, and c is 11
        a += b + c;         // At this point, a is 21, b is 7, and c is 11
        document.writeln("scope1: ",a,b,c);
    };                      // At this point, a is 3, b is 5, and c is not defined
    bar( );                 // At this point, a is 21, b is 5
    document.writeln("scope2: " + a + b);
};
foo();
// CLOSURE ---------------------------------------------------------------------
var myObject = function() {
    var value = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    };      //We are not assigning a function to myObject. We are assigning the result of invoking
}();        //that function. Notice the () on the last line. The function returns an object containing
            //two methods


// Create a maker function called quo. It makes an object with a get_status method and a private
// status property.
var quo = function (status) {
    return {
        get_status: function ( ) {
            return status;
        }
    };
};
// Make an instance of quo.
var myQuo = quo("amazed");
document.writeln(myQuo.get_status( ));

//  fade the background
// Define a function that sets a DOM node's color
// to yellow and then fades it to white.
var fade = function (node) {
    var level = 1;
    var step = function ( ) {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };

    setTimeout(step, 100);
};
    fade(document.body);

// BAD EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the wrong way.
// When you click on a node, an alert box is supposed to display the ordinal of the node.
// But it always displays the number of nodes instead.
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        };
    }
};
// END BAD EXAMPLE

// BETTER EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the right way.
// When you click on a node, an alert box will display the ordinal of the node.
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (i) {
            return function (e) {
                alert(e);
            };
        }(i);
    }
};

add_the_handlers(Document);










