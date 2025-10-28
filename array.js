'use strict';

// Array
// 1. Declaration 배열 선언
const arr1 = new Array(); // 방법1
const arr2 = [1, 2]; // 방법2

// 2. Index position
const fruits = ['apple', 'banana'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]); // 0번째인 사과를 불러옴
console.log(fruits[3]); // 배열에 없는걸 불러서 undefined
console.log(fruits[fruits.length - 1]); // 배열의 마지막을 출력

// 3. Loopimg over an array
// fruits 의 모두를 출력하기
// 1번째 방법
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// 2번째 방법
for (let fruit of fruits) {
    console.log(fruit);
}

// 3번째 방법 (forEach)
fruits.forEach(function (fruit, index, array) {
    console.log(fruit, index);
});
//arrow 이용시
fruits.forEach((fruit, index) => console.log(fruit, index));

// 4. add, delete, copy
// 아이템을 배열의 제일 뒤로 넣고싶다 = push
fruits.push('strawberry', 'pair');
console.log(fruits);

// 배열 맨뒤부터 아이템을 지우고싶을때 = pop
fruits.pop(); // pair 지워짐
fruits.pop(); // strawberry 지워짐
console.log(fruits);

// 앞에서 아이템을 넣고싶을때 = unshift
fruits.unshift('strawberry', 'lemon');
console.log(fruits); // strawberry가 0번 lemon이 1번자리가 된다.

// 앞에서 아이템을 빼고싶을때 = shift
fruits.shift();
console.log(fruits); // strawberry가 빠짐
// shift와 unshift 는 매우 느림: 배열 전체가 움직여야하기 때문

// 정해진 포지션에서 아이템을 지우고싶을때 = splice
fruits.push('pair', 'kiwi');
console.log(fruits);
//fruits.splice(1) //갯수를 지정하지 않았기 때문에 인덱스번호 1번부터 끝까지 전부삭제함
fruits.splice(1, 1);
console.log(fruits);
fruits.splice(1, 1, 'grape', 'watermelon'); // 1번이 지워진 자리에 2개의 과일이 들어감
console.log(fruits);

// 두가지 배열 묶기
const fruits2 = ['coconut', 'melon'];
const newFruits = fruits.concat(fruits2); // fruits 와 fruits2 를 concat 으로 묶음
console.log(newFruits);

// 5. Searching
// 인덱스를 찾을때
console.log(fruits);
console.log(fruits.indexOf('lemon')); // 0번쨰
console.log(fruits.indexOf('coconut')); //없어서 -1 이 뜸

// includes (배열에 아이템이 있는지 true false 로 알려줌)
console.log(fruits.includes('watermelon')); // true
console.log(fruits.includes('coconut')); // false

// lastIndexOf
console.clear();
fruits.push('lemon'); //똑같은 값을 넣음
console.log(fruits.indexOf('lemon')); // 먼저 만난 lemon 의 index를 알려주기때문에 0이라고 뜸
console.log(fruits.lastIndexOf('lemon')); //마지막으로 만난 lemon 의 인덱스를 알려줌

