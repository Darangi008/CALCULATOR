/*it hold the total of what u type*/
let runningTotal = 0;
/*buffer used to track what the user is doing i.e inputing*/
let buffer = "0";
/*i had issue fixing this buffer i found solution, my mistake was it wasnt in quotes to be called a string*/
/*so let buffer = 0; is a decleration of .screem input to become a string (that is the 0 there becomes a string)

/*previousOperator is used to keep track of what ever was pressed last/previously*/
let previousOperator= null;
const screen = document.querySelector(".screen");
/*i faced a hard time trying to make the Zero on .screen disappear after a new input is inserted*/
document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
})
/*IsNan is not a number:used for pointing out NOT numbers*/
/*created a function for buttoClick so it can beused for an action*/
function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);}
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if(buffer === "0"){
        buffer = value;
    }
    else{
        buffer += value;
    }
    
} 
/* a tip nothing rellated to this code tho, the equals sign is considered to be IS ASIGN so it means im assigning something to an element i called*/

function handleSymbol(value) {
    /*the switch tag is used instead of a bunch of if this else this statements*/
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
    
        case "=":
            if (previousOperator === null)/*null is the absense of nothing, its not zero but nothing like a black hole*/ {
                return;
            }
            /*flushoperation is used continue or  to commit to an operation*/
            flushOperation(parseInt(buffer))
            previousOperator = null;
            /*the quotation used for string concartination*/
            buffer= "" + runningTotal;
            runningTotal = 0;
            break
        case "←": 
            if(buffer.length === 1){
                buffer = "0";
            } else{
                /*this part of the code is simply saying when u backspace it takes away one string ir numbers*/
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
            /*and then default which is the default thing u want it to do if none of this cases*/
            default:
                handleMaths(value);
                break;    
    }
}
function handleMaths(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal ===0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    }else if(previousOperator === "-") {
        runningTotal -= intBuffer; 
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {previousOperator === "÷"
        runningTotal /= intBuffer;
  }
}
function rerender() {
    screen.innerText = buffer;
}   

function init(){
    document.querySelector("calc-button").addEventListener("click", function (event){
        buttonClick(event.target.innerText);
    });
}

init();

