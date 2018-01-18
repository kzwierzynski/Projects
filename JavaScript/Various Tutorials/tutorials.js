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



// Functional Programming-----------------------------------------
var animals=[{name: "A", species:"dog"},
{name: "B", species:"dog"},
{name: "C", species:"dog"},
{name: "D", species:"dog"},
{name: "E", species:"dog"},
{name: "F", species:"dog"}];

document.writeln(animals[1].species);