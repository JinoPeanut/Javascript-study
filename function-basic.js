// 함수 선언
// 함수 호출

// 현재 함수만 선언해둔 상태
function doSomething(add) {
    console.log(add);
    const result = add(1, 2);
    console.log(result);
}

function add(a, b) {
    const sum = a + b;
    return sum;
}

//함수를 호출하는 상태
//doSomething(add);

const addFun = add;
console.log(add);
const result = addFun(1, 2);
console.log(result);