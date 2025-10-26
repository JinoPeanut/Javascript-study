// 1. String concatenation

console.log('my' + 'cat');
console.log('1' + 2);
//literals 의 장점은 줄바꿈을 하거나 특수기호를 이용해도 그대로 문자열로 변환되서 출력된다
console.log(`string literals: 

''''
1 + 2 = ${1 + 2}`);

// \n은 줄바꿈 \t는 탭키
console.log("jinho's \n\tbook");

// 2. Numeric operators
console.log(1 + 1); //더하기
console.log(1 - 1); //빼기
console.log(1 / 1); //나누기
console.log(1 * 1); //곱하기
console.log(5 % 2); //나머지
console.log(2 ** 3) //제곱

// 3. Increment and decrement operators
let counter = 2;
// ++를 앞에다 붙이면 preincrement 라고 함
// counter = counter + 1
// postIncrement = counter; 와 동일함
const preIncrement = ++counter; // preIncrement = 3, counter = 3

// ++를 뒤에다 붙이면 postincrement 라고 함
// postIncrement = counter;
// counter = counter + 1 와 동일
const postIncrement = counter++; //preIncrement = 3, counter = 4

// --도 ++처럼 동일하다

// 4. Assignment operator
let x = 3;
let y = 6;
x += y; // x = x + y
x -= y;
x *= y;
x /= y;

// 5. Comparison operator 비교 연산자
console.log(10 < 6);
console.log(10 <= 6);
console.log(10 > 6);
console.log(10 >= 6);

// 6. Logical operator ||(or), &&(and), !(not)
const value1 = false;
const value2 = 4 < 2;

// or 연산자는 하나라도 true 가 나오면 통과
// check 함수같이 무거운 계산이 필요한것이 맨 뒤로 가야함
// 왜냐하면 가벼운 계산을 하는 value1, 2 가 true 일때 check 까지 갈 필요가 없기때문
console.log(`or: ${value1 || value2 || check()}`);

function check() {
    for (let i = 0; i < 10; i++) {
        console.log('hi');
    }
    return true;
}

// and 는 null 을 체크할때도 쓰임
// null오브젝트가 null이 아닐경우 something 값을 받아옴
//if (nullableObject != null) {
//    nullableObject.something;
//}

// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == 는 loose equality 라고 불림
console.log(stringFive == numberFive); // true
console.log(stringFive != numberFive); // false

// === 는 strict equality 라고 불림 (왠만하면 이걸 사용함)
console.log(stringFive === numberFive); // false = 타입이 다르기때문
console.log(stringFive !== numberFive); // true

// object equality
const ellie1 = { name: 'ellie' };
const ellie2 = { name: 'ellie' };
const ellie3 = ellie1;
console.log(ellie1 == ellie2); // false = 서로 레퍼런스 값이 다르기때문
console.log(ellie1 === ellie2); // false
console.log(ellie1 === ellie3); // true

console.log(0 == false); //true
console.log(0 === false); //false = 타입이 다르기때문에
console.log('' == false); //true
console.log('' === false); //false
console.log(null == undefined); //true
console.log(null === undefined); //false = 타입이 달라서

// 8. Conditional operator : if
// if, else if, else
const name = 'df';
if (name === 'ellie') {
    console.log('Welcome, Ellie!'); //name이 ellie 일때 출력
} else if (name === 'coder') {
    console.log('You are amazing coder'); //name이 coder 일때 출력
} else {
    console.log('unknown'); // 그 외 모든것일때 출력
}

// 9. Ternary operator : ?
// condiition ? value1 : value2
// name 이 true 면 ? 오른쪽값을 false 면 : 오른쪽 값을 출력
console.log(name === 'ellie' ? 'yes' : 'no');

// 10. Switch statement
const browser = 'IE';
switch (browser) {
    case 'IE':
        console.log('go away!');
        break;
    case 'Chrome':
    case 'FireFox':
        console.log('love you!');
        break;
}

// 11. Loops
let i = 3;
while (i > 0) {
    console.log(`while: ${i}`);
    i--;
}

//do while
// 먼저 {} 블럭을 실행한 다음에 조건이 맞는지 아닌지 검사
do {
    console.log(`do while: ${i}`);
    i--;
} while (i > 0);

// for loop
for (i = 3; i > 0; i--) {
    console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
    console.log(`inline variable for: ${i}`);
}

// nested loops
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        console.log(`i: ${i}, j: ${j}`);
    }
}

// Q1. 숫자 0~10 까지 짝수만 프린트 하도록 만들어라(continue 사용)
for (let i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log(`i: ${i}`);
    } else {
        continue;
    }
}

// Q2. 주어진 숫자 0~10 까지 작성하되 숫자 8을 만나면 그만두도록(break 사용)
for (let i = 0; i <= 10; i++) {
    if (i == 8) {
        console.log(`i는 ${i} 입니다`);
        break;
    } else {
        console.log(`i: ${i}`);
    }
}