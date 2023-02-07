const buttons = document.querySelectorAll(".btn");
const resultContent = document.querySelector(".container-result");

let input = '';
let operator = '';
let firstNum;
let secondNum;
let result;

const handlePercent = () => {
    if(result !== ''){
        firstNum = +firstNum / 100;
        appendHtml(firstNum)
    }
    input = (+input / 100).toString();
    appendHtml(input);
    operator = '';
}

const handlePlusMinus = () => {
    if (result !== ''){
        firstNum = +firstNum * -1;
        appendHtml(firstNum)
    }
    input = (+input * -1).toString();
    appendHtml(input);
    operator = '';
}

const clear = () => {
    firstNum = null;
    secondNum = null;
    operator = '';
    input = '';
    resultContent.textContent = '';
}
const appendHtml = (result) => {
    resultContent.textContent = result;
}

const appendFirstSecond = () => {
    if (firstNum){
        secondNum = +input;
    }else{
        firstNum = +input;
    }
    input ='';
}

const calculate = () => {
    switch(operator){
        case "+":
            return firstNum + secondNum;
        case "-":
            return firstNum - secondNum;
        case "x":
            return firstNum * secondNum;
        case "/":
            return firstNum / secondNum;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(e.currentTarget.id);
        const value = e.currentTarget.textContent;
        const id = e.currentTarget.id;


        if (input === '' && value === '0') return;
        if (id!== 'operation' && input !== '0'){
            input += value;
            appendHtml(input)
        }

        if (id === "operation") {
            value !== '=' ? operator = value : null;


            if (value === "+/-") {
                handlePlusMinus(input);
            } else if (value === "%") {
                handlePercent();
            } else {
                operator === "AC" && clear();
                appendFirstSecond();
                appendHtml(input);

                if (value === '=' && !secondNum) return;
                if (value === "=" && firstNum && secondNum) {
                    result = calculate();
                    firstNum = result;
                    secondNum = null;
                    appendHtml(result)
                }
            }
        }
    })
})

if (value.length > 15){
    resultContent.style.fontSize = '20px'
}
