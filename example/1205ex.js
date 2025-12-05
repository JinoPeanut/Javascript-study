// ⭐ Level 1 — 구조 분해, 스프레드, 얕은 복사·깊은 복사
// 배우는 것
// 객체/배열 구조분해
// spread/rest
// 얕은복사/깊은복사
// Object.assign 의 한계

// 문제
// 구조분해를 이용해 user 안의 name, level, item.name 을 뽑아 console.log 해라.
// 객체를 깊은복사하여 원본을 수정해도 복사본이 영향받지 않게 만들어라.
// rest 연산자를 이용해 배열 앞 두 개를 제외한 나머지를 새로운 배열에 담아라

//풀이1
console.log(`${user.name} ${user.level} ${user.item.name}`);
//풀이2
const copy = structuredClone(user);
//풀이3
const [first, second, ...others] = users;

// ⭐ Level 2 — 고급 함수(콜백, 클로저)문제
// “계속 증가하는 addCounter()” 함수를 만들어 addCounter()()() 를 하면 3이 나오도록 구현해라.
// setTimeout 콜백 내부에서 for문 인덱스를 제대로 출력하도록 고쳐라.

//풀이
// function addCounter() {
//     let count = 0;
//     count++;
//     return function addCounter() {
//         count++;
//         return function addCounter() {
//             count++;
//         }
//     }
// }

//해답
function addCounter() {
    let count = 0;
    count++;
    return function () {
        count++;
        return function () {
            count++;
            return count;
        };
    };
}

console.log(addCounter()()()); // 2

// ⭐ Level 3 — 커링(Currying)
// 문제
// multiply 함수로 multiply(2)(3)(4) → 24 만들기
// logWithDate(level)(msg) 형태로 커링하여 콘솔 출력 포맷 만들기

//풀이1
function multiply(x) {
    return function (y) {
        return function (z) {
            return x * y * z;
        }
    }
}

//풀이2
function logWithDate(a) {
    console.log(a);
    return function (b) {
        console.log(b);
    }
}

// ⭐ Level 4 — 고차함수(Higher-order Function)
// ❗문제 1 — "유저 목록을 정렬·필터링·변환하는 파이프라인 만들기"
// 아래 유저 배열이 있을 때:

// const users = [
//     { name: "철수", level: 12, exp: 1500, vip: true },
//     { name: "영희", level: 5,  exp: 300,  vip: false },
//     { name: "민수", level: 20, exp: 5000, vip: true },
//     { name: "지우", level: 7,  exp: 800,  vip: false },
// ];

// 조건
// level이 10 이상인 유저만 필터링
// exp를 2배로 변환
// vip 유저만 정렬해서(내림차순) 출력
// map(), filter(), sort() 조합해서 한 줄로 만들기

const users = [
    { name: "철수", level: 12, exp: 1500, vip: true },
    { name: "영희", level: 5, exp: 300, vip: false },
    { name: "민수", level: 20, exp: 5000, vip: true },
    { name: "지우", level: 7, exp: 800, vip: false },
];

users
    .filter(item => item.level >= 10)
    .map(item => ({
        ...item,
        exp: item.exp * 2,
    }))
    .sort((a, b) => a.vip - b.vip)


// ❗문제 2 — “동적으로 정렬 기준을 만드는 고차함수 만들기”

// 요구사항
// makeSorter(key, direction) 이라는 함수를 만들 것
// direction은 "asc" 또는 "desc"
// 반환값은 배열 sort에 바로 넣을 수 있는 함수 comparator

function makeSorter(key, direction = "asc") {
    return function (a, b) {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
    }
}

//❗문제 3 — reduce 연습 (고급)
// users 배열로부터 다음 객체를 만들어라.
// {
//     totalLevel: 모든 level 합,
//     highLevelNames: level 10 이상 유저 이름 배열,
//     vipCount: vip === true 인 유저 수
// }

// users.reduce((acc, user) => {
//     acc.totalLevel += user.level;
//     if (user.level >= 10) acc.highLevelNames.push(user.name);
//     if (user.vip) acc.vipCount++;
//     return acc;
// }, { totalLevel: 0, highLevelNames: [], vipCount: 0 });

// const transactions = [
//     { id: 1, type: "income", amount: 500 },
//     { id: 2, type: "expense", amount: 200 },
//     { id: 3, type: "income", amount: 150 },
//     { id: 4, type: "expense", amount: 1200 },
//     { id: 5, type: "income", amount: 900 },
// ];

// transactions.reduce((acc, trans) => {
//     if (trans.type === "income") acc.totalIncome += trans.amount;
//     if (trans.type === "expense") acc.totalExpense += trans.amount;
//     if (trans.amount >= 500 && trans.type === "expense") {
//         acc.highExpenseIds.push(trans.id);
//     }
//     return acc;
// }, { totalIncome: 0, totalExpense: 0, highExpenseIds: [] });

// 🔹 Level 5 — 문자열 변환
// 문제
// 문자열을 입력받아
// 모든 공백 제거
// 첫 글자는 대문자
// 나머지는 소문자
// 로 변환하는 함수를 만들어라.
// format("   hELlo   WoRLd ")
// → "Hello world"

function normalizeName(s) {
    if (typeof s !== "string") return s;
    // 1) 앞뒤 공백 제거
    s = s.trim();
    // 2) 연속된 공백(스페이스, 탭, 개행 등)을 하나의 스페이스로 바꿈
    s = s.replace(/\s+/g, " ");
    // 3) 첫 글자만 대문자, 나머지 소문자
    if (s.length === 0) return s;
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

// 예시
console.log(normalizeName("   aLIcE   \n\t  boB  ")); // "Alice bob"
console.log(normalizeName("john"));                   // "John"
console.log(normalizeName("   "));                    // ""


// 느낀점 및 알게된 점

// 내가 기초적인 문법에 대해서 많이 약하다는것을 알게되었다. 최근들어 Promise 와 관련된
// 비동기 문제만 오랫동안 풀었던 것 같다. 그래서 시간이 아까웠던것 같다.
// 지금은 또 문자열 변환이나 삭제 삽입 등 공부를 계속 해야할 것 같다. Promise 때 처럼
// 오래 걸리진 않겠지만 적어도 하나를 다 완료하고 다음 레벨로 넘어가야겠다는 생각이 든다.
// 까먹는일이 없도록 중간중간 이전에 했던 공부들을 다시 복습할 필요가 있을듯 하다.

// filter는 배열에 변화를 주지않지만 map은 변화를 주는것을 알게됐다.
// 그래서 그런지 map 에 Promise 때의 resolve 처럼 ...user 를 넘겨줘서 특정 개체만 쓴다고 해도
// 나머지 사용하지않는 객체들이 삭제되는일이 없게끔 한 것을 볼 수 있었다.