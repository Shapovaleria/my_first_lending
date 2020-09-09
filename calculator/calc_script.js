const calculator = document.createElement('div');
calculator.className = 'calculator';
document.body.prepend(calculator);

const output = document.createElement('output');
output.className = 'calc-output';
output.setAttribute('readonly', 'readonly');
output.value = 0;
calculator.append(output);

const rows = ['row0', 'row1', 'row2', 'row3', 'row4'];
function createRow() {
  let row = document.createElement('div');
  row.className = 'row';
  return calculator.append(row)
}

for (let i = 0; i < rows.length; i++) {
 createRow(rows[i]);
}

function createNumberButton(row, textContent) {
  const btnNum = document.createElement('button');
  btnNum.className = 'number button';
  btnNum.textContent = textContent;
  return row.append(btnNum)
}

const domRow = document.querySelectorAll('.row');

const rowsNum = [domRow[1], domRow[1], domRow[1], domRow[2], domRow[2], domRow[2], domRow[3], domRow[3],domRow[3], domRow[4]]
const numbersContent = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

for (let j = 0; j < numbersContent.length; j++) {
  createNumberButton(rowsNum[j], numbersContent[j])
}

const point = document.createElement('button');
point.className = 'button decimal';
point.textContent = '.'
domRow[4].append(point)

function createOperationsButton(row, textContent) {
  const btnOperation = document.createElement('button');
  btnOperation.className = 'operations button';
  btnOperation.textContent = textContent;
  return row.append(btnOperation)
}

const rowsOp = [domRow[1], domRow[2], domRow[3], domRow[4],domRow[4]]
const operationsContent = [`/`, `*`, `-`, `=`, `+`]

for (let i = 0; i < operationsContent.length; i++) {
  createOperationsButton(rowsOp[i], operationsContent[i])
}

const clear = document.createElement('button');
clear.className = 'button operations clear';
clear.textContent = 'C';
clear.style.marginRight = '18px';
domRow[0].append(clear);
domRow[0].classList.add('text-right')

const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operations');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear')
let currentNum = '';
let newNum = false;
let operator = '';
let results = [];
let finalResults = [];

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', numberClick(number.textContent))
};

for (let i = 0; i < operations.length; i++) {
  let operation = operations[i];
  operation.addEventListener('click', operationClick(operation.textContent))
}

decimalBtn.addEventListener('click', decimalClick)
clearBtn.addEventListener('click', clearClick)

function numberClick(num) {
  return function() {
    if (newNum) {
      output.value = num;
      newNum = false;
    } else {
      if (output.value === "0") {
        output.value = num;
      } else {
        output.value += num;
      };
    };
  }
};

function operationClick(op) {
  return function() {
    let localCalc = output.value;
    if (newNum && operator !== "=") {
      output.value = currentNum;
    }
    else {
      newNum = true;
      switch (operator) {
        case '+': currentNum += +localCalc;
          results.push(operator)
          results.push(localCalc)
          break;
        case '-': currentNum -= +localCalc;
          results.push(operator)
          results.push(localCalc)
          break;
        case '*': currentNum *= +localCalc;
          results.push(operator)
          results.push(localCalc)
          break;
        case '/': currentNum /= +localCalc;
          results.push(operator)
          results.push(localCalc)
          break;
        default: currentNum = +localCalc;
      }
      output.value = currentNum;
      results.push(currentNum)
      operator = op;
    };
  }
};

function decimalClick() {
  if (newNum) {
    output.value = '0.';
    newNum = false
  }
  else {
    if (output.value.includes('.') === false) {
      output.value += '.'
    }
  }
}

function clearClick() {
  makeFinalResult(results)
  displayResult(finalResults)
  finalResults = [];
  results = [];
  output.value = '0';
  operator = '';
  currentNum = ''
  newNum = true;
}

const historyOfCalc = document.createElement('div');
historyOfCalc.className = 'history';
calculator.after(historyOfCalc)

const historyTitle = document.createElement('button');
historyTitle.className = 'history-title';
historyTitle.innerText = 'Показать историю вычислений';
historyTitle.title = 'Вычисление считается законченным после нажатия кнопки "C"';
historyOfCalc.append(historyTitle);

const historyList = document.createElement('div');
historyList.className = 'history-list hidden';
historyOfCalc.append(historyList)

historyTitle.addEventListener('click', showList)

function showList() {
  if (historyList.classList.contains('hidden')) {
    historyTitle.textContent = 'Скрыть историю вычислений'
  }
  else {
    historyTitle.textContent = 'Показать историю вычислений'
  }
  historyList.classList.toggle('hidden')
}

let ul = document.createElement('ul');
historyList.append(ul);

function displayResult(finalResults) {
  let ulItem = document.createElement('li');
  ulItem.innerText = `${finalResults.join(' ').toString()} = ${results.slice(-1)}`
  ul.append(ulItem)
}

function makeFinalResult(results) {
  finalResults.push(results[0]);
  for (let i = 1; i < results.length - 1; i++) {
    if (i % 3 == 0) continue;
    finalResults.push(results[i])
  }
}