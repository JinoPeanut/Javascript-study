"use strict";

// Objecgt
// object = { key : value }
// key 는 항상 string 타입으로 전달해야한다
const obj1 = {}; // object literal 이라고함
const obj2 = new Object(); // 'object constructor' 문법 (new 가 들어가면)

const name = 'ellie';
const age = 4;
print(name, age);
function print(person) {
    console.log(person.name);
    console.log(person.age);
}

// key는 name value 는 ellie 이런식.
const ellie = { name: 'ellie', age: 4 };
print(ellie);

ellie.hasJob = true; // 이런식으로 추가할 수 있다
console.log(ellie, hasJob);
// 하지만 이런식으로 코딩하게되면 유지보수가 힘듬


// 2. Computed properties
// 아래처럼 .으로 호출하거나 배열[] 로 호출하기도 가능하다
console.log(ellie.name); // .은 코딩할때 key 에 해당하는 값을 받아오고싶을때
console.log(ellie['name']); // 정확하게 어떤키가 필요한지 모를때 쓴다
ellie['hasJob'] = true;
console.log(ellie.hasJob);

function printValue(obj, key) {
    //console.log(obj.key); 이러면 undefined 가 뜸 obj에는 key 라는 property 가 없어서
    console.log(obj[key]); // 이러면 이제 name 이 뜨는데
}
printValue(ellie, 'name');

// 3. Property value shorthand
const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 3 };
const person3 = { name: 'dave', age: 3 };
const person4 = Person('ellie', 30); // 이렇게 하면 위처럼 name age 번거롭게 칠 필요없다
console.log(person4);


// 4. Constructor function
function Person(name, age) {
    //this = {};
    this.name = name;
    this.age = age;
    // return this; 가 있는거랑 같은 문장이다.
}

// 5. in operator
// in 이라는 키워드로 해당하는 키가 오브젝트 안에 있는지 확인할 수 있다.
console.log('name' in ellie); // true
console.log('age' in ellie); // true
console.log('random' in ellie); // false
console.log(ellie.random); // undefined

// 6. for...in vs for...of
// for (key in obj)
console.clear(); // 콘솔 클리어시킴

for (key in ellie) {
    console.log(key); // ellie 안에 key들이 모두 출력
}

// for (value of iterable)
// 기존방식의 for 사용법
const array = [1, 2, 4, 5];
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

//쉬운방식 (of 를 사용)
for (value of array) {
    console.log(value);
}

// 7. Cloning
const user = { name: 'ellie', age: 20 };
const user2 = user;
user2.name = 'coder'; // name은 coder 로 바뀜
console.log(user);

// 예전방식
const user3 = {};
for (key in user) {
    user3[key] = user[key];
}
console.log(user3); // name: coder, age: 20 으로 똑같아짐

// 요즘방식(?) Object.assign()
const user4 = {};
Object.assign(user4, user);
console.log(user4);
//또는 바로
const user5 = Object.assign({}, user);
console.log(user5);

// 예시
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
const mixed = Object.assign({}, fruit1, fruit2);

// blue인 이유는 뒤에 나오는 변수일수록 앞에나오는 변수의 동일한
//  property가 있다면 계속 덮어씌운다.
console.log(mixed.color); // blue
console.log(mixed.size); // big
