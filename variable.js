// 드림코딩 1회차
'use strict';
//console.log('Hello world');

//let a;
//a = 6;

// javascript 공식사이트 = ECMAscript 지만 복잡하니 MDN web docs 에서 찾아봄

// async, defer
// async 는 다수의 js를 다운받을때 먼저 다운받아진것 부터 바로 실행함
// defer 는 다운받아도 배치한 순서에따라 실행함

// use strict 를 쓰는 이유는 바닐라 자바스크립트로 개발시 정의되지않은
// 단순 a=6 이라는 변수는 브라우저에서 경고가 없지만 use strict를 맨 윗줄에 적어두면
// a 라는 변수는 let, const 등 키워드를 선언하지 않았기때문에 브라우저에서도 경고가 뜸

// 드림코딩 2회차
// 2. Variable 에 대해서

let name = 'jinho';
console.log(name);

// {} 는 blockscope 라고 하며 안에있는것은 바깥에서 호출할 수 없다
// ES6 부터는 var 보다는 let 를 사용함
// var hoisting = 어디에 선언했냐에 상관없이 항상 위로 끌어올려주는것
// var는 block scope가 없다
// 즉 호출할 수 없는함수를 호출하게 되버려 꼬이는경우가 생길 수 있음

// 3. constant = 값을할당하면 바뀌지않는것 (const / read only)
// 쓰는 이유
// (1) 보안때문에
// (2) 스레드 안정성
// (3) 코드 변경시 편함

// 데이터타입 (Mutable data, Immutable data 2가지)
// Immutable data = 데이터 자체를 절대 변경하지 못하는것
// Mutable data = 변경이 가능한 데이터 타입

// 4. Variable types (read / write)
// number, bigint, string, boolean

// number
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;

console.log(infinity); //결과값 infinity
console.log(negativeInfinity); //결과값 -infinity
console.log(nAn); //결과값 NaN

// bigInt
const bigInt = 1234567890123456789012345678901234567890n;
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);
// 넘버는 -2의53승 ~ 2의53승 까지만 표현되는데 숫자값 끝에 n을 붙이면 숫자도 표현되며
// 타입또한 bigint 로 표시됨.

// String
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello' + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);

const helloBob = `hi ${brendan}!`;
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);
console.log('value: ' + helloBob + 'type: ' + typeof helloBob);

// 위 console는 둘다 똑같지만 백태그(`) 를 쓰냐 태그(') 를 쓰냐에 따라 문법의 간단함이
// 달라진다.

// boolean
// false: 0, null, undefined, NaN, ''
// true: 그 외 값들

const canRead = true;
const test = 3 < 1;
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null
// null 은 완전히 텅텅 비어있는 값일때
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// undefined
// 선언은 되어있지만 값이 들어가 있지 않을때
let x;
console.log(`value: ${x}, type: ${typeof x}`);

// symbol
// 맵이나 자료구조에서 고유한 식별자가 필요하거나 아니면 동시에 다발적으로
// 발생하는 코드에서 우선순위를 주고싶을때 (고유한 식별자) 쓰는 것
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); //둘의 값은 같지만 심볼의 변수가 다르니 다른값이라고 나옴

const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); //for 을 사용하면 똑같다고 나옴

// symbol은 바로 출력하면 에러가 발생하지만 description 을 붙여서
// string 으로 변환해서 출력해야 한다.
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

// object
// jinho 의 값은 const 로 변경이 불가능할지 몰라도
const jinho = { name: 'jinho', age: 26 };
jinho.age = 20; // 이런식으로 변경이 가능함


// 5. Dynamic typing
let text = 'hello';
console.log(text.charAt(0)); // h (0번째 문자)
console.log(`value: ${text}, type: ${typeof text}`); // hello , string

text = 1;
console.log(`value: ${text}, type: ${typeof text}`); // 1 , number

//문자열과 숫자값인데 자동변환 되어서 문자열끼리 더해져 75가 된다.
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`); // 75 , string

// 둘다 문자열이지만 숫자값에만 쓰이는 나누기를 인식하고 넘버값으로 변환해서 4가 된다.
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`); // 4 , number

// 다이나믹 타이핑은 자동변환으로 인해 나중에 변수값을 바꾸고
// console.log(text.charAt(0)); 같이 특정 문자를 출력하려고 할때
// 에러가 발생할 수 있으니 조심해야한다.

// 드림코딩 3회차
