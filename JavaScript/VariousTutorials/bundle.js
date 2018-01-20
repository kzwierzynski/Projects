(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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
var fs = require('fs');
// require(['fs'], function (fs) {});
// var output = fs.readFileSync('data.txt');
var text = fs.readFileSync("./data.txt", "utf-8");

console.log(text);
},{"fs":1}]},{},[2]);
