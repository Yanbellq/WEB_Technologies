console.log("Hello World");

const printHello = document.getElementsByTagName('span')[0];

printHello.innerHTML = "Hello World";

function changeText() {
    printHello.innerHTML = "Hrushko is the best!";
}
