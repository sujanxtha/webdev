// Exercise 1 - Developer Tools and Console

console.log("Hello World!");
alert("Hello World!");


// Exercise 2 - Variables

const uName = "Sujan";
let age = 25;
const favouriteAnimal = "Dog";

console.log(uName);
console.log(age);
console.log(favouriteAnimal);

const sentence = "Hello! My name is " + uName + " and my favourite animal is the " + favouriteAnimal + ".";
console.log(sentence);


// Exercise 3 - User Input

const userName = prompt("What is your name?");

console.log("Hello " + userName + "! Welcome to JavaScript.");


// Exercise 4 - Conditionals

const userAge = Number(prompt("How old are you?"));

if (userAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}


// Exercise 5 - Functions

function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Sujan");



// Exercise 6 - Button

const messageButton = document.getElementById("messageButton");

messageButton.addEventListener("click", function() {
    alert("JavaScript works!");
});