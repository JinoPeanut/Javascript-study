// number, string, boolean, null, undefined
let age = 2;
let num = '2';
let number = 2;
let number2 = number;

// 변수에 값 할당하면 메모리에 변수를위한 공간이 할당됨, 2를 넣으면 2를 그 공간에 적재함
// number2 변수를 만들면 공간이 할당되고 number를 넣었기때문에 number를 복사에서 공간에 할당
number2 = 3;

// number2 에 3을 넣으면 이제 number2 값만 변하고 number는 변하지않음

// object
let obj = {
    name: 'ellie',
    age: 5,
};

console.log(obj.name); // ellie 출력

let obj2 = obj; // obj2 메모리공간에 obj의 값이 복사되어 들어감

console.log(obj2.name); // 결국 복사된값이기 때문에 ellie가 출력됨

// number, string, boolean 이런 타입은 값이 복사되어 들어오지만
// 오브젝트 같은 경우엔 값이 아닌 그 주소가 복사되어 들어온다.

obj.name = 'james';
console.log(obj.name);
console.log(obj2.name); // 둘다 james가 된다. 왜냐하면 obj2 obj 둘다 가리키고있는 주소가 같기때문

