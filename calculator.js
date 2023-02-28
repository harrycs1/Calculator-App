const calculator = {
    displayValue: '0', // holds string value that represents user input or result of operation
    firstOperand: null, // will store first operand
    waitingForSecondOperand: false, // checks if both first operand and operator has been inputted
    operator: null, // stores operator
    previousOperator: null,
    modValue: null,
    modOperator: null,
  };

  function inputDigit(digit) {
    const {displayValue, waitingForSecondOperand} = calculator;

    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      if (displayValue.length < 7) {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; // overwrite displayvalue if current value is 0 otherwise append to it
      }
    }
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = '0.'
      calculator.waitingForSecondOperand = false;
      return
    }

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator, previousOperator, modValue, modOperator}  = calculator // destructure the properties on the calculator object
    const inputValue = parseFloat(displayValue); // converts the string contents of displayValue to floating point number

    if (nextOperator !== '=') {
      calculator.previousOperator = nextOperator;
      calculator.modOperator = nextOperator;

    } else {
      if (previousOperator === '=') {
        let result = calculate(firstOperand, modOperator, modValue)

        if (result > 9999999) {
          result = result.toExponential(5);
          calculator.displayValue = result;
          calculator.firstOperand = result;
          return;
        }

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result; // value of firstOperand is updated to the result of calculation so that it may be used in next calculation
      }

      calculator.previousOperator = nextOperator;
    }


    if (operator && calculator.waitingForSecondOperand) { // checks if an operator has already been clicked, if so replaces operator with new
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue; // when operator is clicked, displayed value is stored as firstoperand
    } else if (operator) {

      let result = calculate(firstOperand, operator, inputValue)

      if (result > 9999999) {
        result = result.toExponential(5);
        calculator.displayValue = result;
        calculator.firstOperand = result;
        return;
      }

      calculator.displayValue = `${parseFloat(result.toFixed(7))}`
      calculator.firstOperand = result; // value of firstOperand is updated to the result of calculation so that it may be used in next calculation
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    calculator.modValue = parseFloat(displayValue);
    console.log(calculator)
  }

  function calculate(firstOperand, operator, secondOperand) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '÷') {
      return firstOperand / secondOperand;
    } else if (operator === '×') {
      return firstOperand * secondOperand;
    }

    return secondOperand;
  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function updateDisplay() {
    const display = document.querySelector('.calculatorDisplay') // select the element with class 'calculatorDisplay'
    display.textContent = calculator.displayValue // update the value of element with contents of displayValue
  }

  const keys = document.querySelector('.calculatorKeys');
  keys.addEventListener('click', event => {
    const { target } = event;
    const { textContent } = target;
    if (!target.matches('button')) {
      return;
    }

    Array.from(target.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    switch (textContent) {
      case '+':
      case '-':
      case '×':
      case '÷':
        handleOperator(textContent);
        target.classList.add('is-depressed')
        break;
      case '=':
        handleOperator(textContent);
        break;
      case '.':
        inputDecimal(textContent);
        break;
      case 'CE':
        target.textContent = "AC"
        resetCalculator();
        break;
      default:
        // check if the key is an integer
        if (Number.isInteger(parseFloat(textContent))) {
          inputDigit(textContent);
        }
    }

    if (target.textContent !== 'AC') {
      const clearButton = document.querySelector('.ACKey')
      clearButton.textContent = "CE"
    }
    updateDisplay();
  });