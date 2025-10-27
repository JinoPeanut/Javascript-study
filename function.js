"use strict";
// 1. Function
// 함수의 이름은 무언가를 명령하듯 동사의 형태로 짓는다
// 함수는 오브젝트다
function printHello() {
    console.log('Hello');
}
printHello();

function log(message) {
    console.log(message);
}
log('Hello@');

// 2. Parameters
function changeName(obj) {
    obj.name = 'coder';
}
const ellie = { name: 'ellie' };
changeName(ellie); // 위 함수로 ellie 의 이름이 coder로 변경됨
console.log(ellie);

// 3. Default parameters
// from 옆에 언노운은 해당 파라미터의 디폴트값을 설정해둔 상태이다
function showMessage(message, from = 'unknown') {
    console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // 하나만 있기때문에 Hi! by undefined 라고 출력됨 (message, from 2개)
// 하지만 from 파라미터의 디폴트값을 unknown 으로 설정했기때문에 Hi! by unknown 으로 출력된다

// 4. Rest parameters
// 파라미터 자리에 ... 을 붙이면 rest parameters 라고 함
// 배열형태로 전달된다
function printAll(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }
}
printAll('dream', 'coding', 'ellie');

// 5. Local scope
// 블럭안에서 변수를 선언하면 안에서만 선언할 수 있지만
// 밖에서 변수를 선언하면 블럭 안에서도 선언할 수 있다.
let globalMessage = 'global';
function printMessage() {
    let message = 'hello';
    console.log(message);
    console.log(globalMessage);
}
printMessage();

// 6. Return a value
function sum(a, b) {
    return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`);

// 7. Early return
//안좋은 예
function upgradeUser(user) {
    if (user.point > 10) {
        // long upgrade logic...
    }
}

//좋은 예
// 조건이 맞지않을때 빨리 리턴하고 조건이 맞을때만 필요한 로직을 써놓는것이 좋다
function upgradeUser(user) {
    if (user.point <= 10) {
        return;
    }
    // long upgrade logic...
}

// Function expression
// 아래와 같이 이름이 없는 함수를 anonymous function 이라고 한다
const print = function () {
    console.log('print');
}
print(); // print
const printAgain = print;
printAgain(); // print
const sumAgain = sum;
console.log(sumAgain(1, 3)); // 4

// Callback
// printYes, printNo 는 콜백함수
// 아래처럼 answer 에 love you 가 맞으면 printYes 함수를
// 실행하고 아니면 printNo 함수를 실행한다
function randomQuiz(answer, printYes, printNo) {
    if (answer === 'love you') {
        printYes();
    } else {
        printNo();
    }
}

//anonymous function
const printYes = function () {
    console.log('yes!');
}
//named function
const printNo = function print() {
    console.log('no!');
    //print();
}

randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);

// Arrow function (always anonymous)
// 밑에 함수는 평소에 보던 함수
const simplePrint1 = function () {
    console.log('simplePrint!');
}

const add1 = function (a, b) {
    return a + b;
}

//arrow 함수
const simplePrint2 = () => console.log('simplePrint!');

const add2 = (a, b) => a + b;

//아래와 같이 블럭을 쓰는경우엔 return 을 넣어줘야함
const simpleMultiply = (a, b) => {
    return a * b;
}

//IIFE
// 원래 함수호출은 아래와같이 하지만
function hello() {
    console.log('IIFE');
}
hello();

//선언함 과 동시에 호출을 하려면
//함수를 괄호로 묶고 괄호로 다시 호출한다.
(function hello() {
    console.log('IIFE');
})();

// Quiz time
// 함수 계산기 (command, a, b)
// command: 더하기, 빼기, 곱하기, 나누기 중 하나

function quizTime(command, a, b) {
    if (command == 'add') {
        console.log(`a + b: ${a + b}`);
    } else if (command == 'sub') {
        console.log(`a - b: ${a - b}`);
    } else if (command == 'mul') {
        console.log(`a * b: ${a * b}`);
    } else if (command == 'div') {
        console.log(`a / b: ${a / b}`);
    }
}

quizTime('mul', 5, 2);

// 드림코딩 해답

function calculate(command, a, b) {
    switch (command) {
        case 'add':
            return a + b;
        case 'sub':
            return a - b;
        case 'div':
            return a / b;
        case 'mul':
            return a * b;
        default:
            throw Error('unknown command');
    }
}
console.log(calculate('add', 2, 3));