// Prototypes + inheritance

var Job = function(){
    this.pay="true;"
}
Job.prototype.print = function(){
    console.log(this.pay?"Yup, I want to work":"Nope, thank you");
}


var TechJob=function(pay, title){
    Job.call(this);
    this.title = "";
}

TechJob.prototype = Object.create(Job.prototype);
TechJob.prototype.constructor = TechJob;

var training = new Job;
training.print();
training.pay=false;
training.print();

var JSprogr = new TechJob("true", "JS");
JSprogr.print();

// PROMISES ----------------------------------------------------------------------
let cleanRoom = function(){
    return new Promise (function (resolve, reject){
    resolve('room is clean');
});
};
let removeGarbage = function(prevMsg){
    return new Promise (function (resolve, reject){
    resolve(prevMsg + ' garbage thrown away');
});
};
let eatIcecream = function(prevMsg){
    return new Promise (function (resolve, reject){
    resolve(prevMsg + ' Ice cream eaten:)');
});
};

cleanRoom().then(function(result){
    return removeGarbage(result);
}).then(function(result){
    return eatIcecream(result);
}).then(function(result){
    console.log("finished " + result);
});
Promise.all([cleanRoom,removeGarbage,eatIcecream]).then(function(){
    console.log("all promises resolved!");
});
Promise.race([cleanRoom,removeGarbage,eatIcecream]).then(function(){
    console.log("One of the promises resolved first!");
});



// Functional Programming //Fun Fun Function-----------------------------------------
//Functions are values -> use them in other functions (higher order functions)
// Less bugs, code written in less time (easier to reuse the code)
// easier to debug, easier to change (divided into small simple functions) 

//Higher order functions -> filter(), map(), reduce()
var animals=[{name: "A", species:"dog"},
{name: "B", species:"cat"},
{name: "C", species:"dragon"},
{name: "D", species:"dog"},
{name: "E", species:"coyote"},
{name: "F", species:"dog"}];

// document.writeln(animals[1].species);
let isDog = function(animal){
    return animal.species ==='dog';
}
var dogs = animals.filter(isDog);

console.dir(dogs);

//LONG way
// let arrayNames = function(array){
//     var names =[];
//     for (let i = 0; i < array.length; i++) {
//         names.push(array[i].name);
//     }
//     return names;
// };
//let dogsNames =arrayNames(dogs);

//SHORT way, using map()
//let dogsNames=dogs.map(function (animal){ return animal.name; });
//SHORTER version
let dogsNames = dogs.map( (animal) => animal.name ); 
// document.writeln(dogsNames);

var orders = [ {amount: 100}, 
                {amount: 250}, 
                {amount: 80},
                {amount: 300}];

// var totAmount = orders.reduce( function (sum, order){
//     return sum+order.amount;
// }, 0);
//arrow version:
var totAmount = orders.reduce( (sum, order) => sum+order.amount, 0);
console.log(totAmount);

// advanced reduce

// import fs from 'fs';
// var fs = require('fs');
// require(['fs'], function (fs) {});
// var output = fs.readFileSync('data.txt', "utf-8");
var text = "mark johansson\twaffle iron\t80\t2\nmark johansson\tblender\t200\t1\nmark johansson\tknife\t10\t4\nNikita Smith\twaffle iron\t80\t1\nNikita Smith\tknife\t10\t2\nNikita Smith\tpot\t20\t3\n";
var output = text.trim()
                .split('\n')
                .map(line => line.split('\t'))
                .reduce((customer, line) => {
                    // console.log(line);
                    customer[line[0]] =customer[line[0]] || [];
                    customer[line[0]].push({
                        product: line[1],
                        price: line[2],
                        quantity: line[3]
                    });
                    return customer;
                }, {} )
                                    
console.log('output ', JSON.stringify(output, null, 2));

// CLOSURES

// CURRYING instead of 1 function with eg. 3 parameters, we have 3 functions: 1st function called with 1st param. returns 2nd function wanting 2nd param -> returning 3rd fcn wanting 3rd param 
const dragons = [
    { name: 'fluffykins', element: 'lighting'},
    { name: 'noomi', element: 'lighting'},
    { name: 'karo', element: 'fire'},
    { name: 'doomer', element: 'timewrap'},
  ];
  
  const hasElement = (element) => (object) => {     //currying: fcn with (element) param. returns a fcn wanting (object) param. 
    return object.element === element;              //returning true/false
  };
  
  const lightingDragons = dragons.filter(hasElement('lighting'));       //thanks to currying not necessary to write 
  
  console.log(lightingDragons);


  // REKURENCJA
  let countDown = (num) => {
    console.log(num);
      if (num>0){
        countDown(num-1);
      }
    //   console.log(num);
  };

  countDown(10);

  //Tree
let categories = [
    {id: "animal", parent: null},
    {id: "mammal", parent: "animal"},
    {id: "cat", parent: "mammal"},
    {id: "dog", parent: "mammal"},
    {id: "husky", parent: "dog"},
    {id: "persian", parent: "cat"},
    {id: "siamese", parent: "cat"},
    {id: "boulterier", parent: "dog"}
];

let makeTree = (category, parent) => {
    let node = {};
    category
        .filter((c) => c.parent===parent)
        .forEach( (c) => node[c.id] = makeTree(category, c.id) );

    return node;
};

console.log(JSON.stringify(makeTree(categories, null), null, 2));

//PROMISES
let loadImage = (url) =>{
    return new Promise((resolve, reject) =>{
        let image = new Image();
        image.onload = () => {
            resolve(image)
        };
        image.onerror = () =>{
            msg="Could not load the image at" + url;
            reject (new Error(msg));
        }
    image.src = url;        
    });
};

let addImg = (src) => {
    let imgElement = document.createElement("img");
    imgElement.src = src;
    document.body.appendChild(imgElement);
};

// not fully used composability, more like callbacks
// loadImage('./img/html5.png').then( (img1) => {
//     addImg(img1.src)
//     loadImage('./img/css3.png').then( (img2) => {
//         addImg(img2.src) 
//         loadImage('./img/Web-Design.png').then( (img3) => {
//             addImg(img3.src) 
    
//         })
//     })
// });

// BETTER in this example:
Promise.all([
    loadImage('./img/html5.png'),
    loadImage('./img/css3.png'),
    loadImage('./img/Web-Design.png')
]).then( (images) => images.forEach( img => addImg(img.src) ) ).catch((error => {
    alert(error)
}));