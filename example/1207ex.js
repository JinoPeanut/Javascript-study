// LEVEL 1 — 문자열 앞뒤 공백 제거

// 입력: " hello world "
// 출력: "hello world"

console.log(" hello world ").trim();

// LEVEL 2 — 모든 문자 소문자로 변환

// 입력: "HeLLo"
// 출력: "hello"

console.log("HeLLo").toLowerCase();

// LEVEL 3 — 모든 문자 대문자로 변환

// 입력: "JavaScript"
// 출력: "JAVASCRIPT"

console.log("JavaScript").toUpperCase();

// LEVEL 4 — 문자열 중복 공백 하나로 줄이기

// 입력: "hello world !!"
// 출력: "hello world !!"

console.log("hel lo wor ld !!").replace(/\s+/g, " ");

// LEVEL 5 — 문자열의 첫 글자만 대문자로 만들기

// 입력: "hello world"
// 출력: "Hello world"

const a = "hello world";
result5 = a[0].toUpperCase();
console.log(result5);

// LEVEL 6 — 문자열의 마지막 문자만 제거하기

// 입력: "Hello!"
// 출력: "Hello"

const b = "Hello!";
console.log(b.slice(0, -1));

// LEVEL 7 — 특정 문자 모두 제거

// 입력: ("aabbaac", "a")
// 출력: "bbbc"

const c = "aabbaac";
console.log(c.replace(/a/g, ""));

// LEVEL 8 — 문자열에서 숫자만 남기기

// 입력: "ab12c3d45"
// 출력: "12345"

const level8 = "ab12c3d45";
console.log(level8.replace(/\D/g, ""));

// LEVEL 9 — 문자열 단어 순서 뒤집기

// 입력: "hello world javascript"
// 출력: "javascript world hello"

const level9 = "hello world javascript";
console.log(level9.split(" ").reverse().join(" "));

// LEVEL 10 — 문자열에서 중복 문자 제거

// 입력: "aabbccddaa"
// 출력: "abcd"

const level10 = "aabbccddaa";
const result10 = [...new set(level10)].join("");
console.log(result10);

// LEVEL 11 — 문자열 중 특정 단어 포함 여부 확인

// 입력: "hello javascript", "java"
// 출력: true

const level11 = "hello javascript";
const text11 = "java";
console.log(level11.includes(text));

// LEVEL 12 — 문자열에서 특정 단어를 다른 단어로 모두 바꾸기

// 입력: "I like apple. apple is good", "apple", "banana"
// 출력: "I like banana. banana is good"

const level12 = "I like apple. apple is good";
const target12 = "apple";
const word12 = "banana";
console.log(level12.replaceAll(target12, word12));

// LEVEL 13 — 문자열을 단어 기준으로 배열로 변환

// 입력: "hello world javascript"
// 출력: ["hello", "world", "javascript"]

const level13 = "hello world javascript";
console.log(level13.split(" "));

// LEVEL 14 — 배열을 문자열로 합치기

// 입력: ["a", "b", "c"]
// 출력: "a b c"

const level14 = ["a", "b", "c"];
console.log(level14.join(" "));

// LEVEL 15 — 문자열에서 가장 많이 등장한 문자 찾기

// 입력: "aabbbcddddeee"
// 출력: "d"

// const level15 = "aabbbcddddeee";
// const count = {};

// for (let char of level15) {
//     if (count[char]) {
//         count[char]++;
//     } else {
//         count[char] = 1;
//     }
// }

// let maxChar = "";
// let maxCount = 0;

// for (let char in count) {
//     if (count[char] > maxCount) {
//         maxCount = count[char];
//         maxChar = char;
//     }
// }
// console.log(maxChar);

// LEVEL 16 — 문자열이 숫자로만 되어 있는지 확인

// 입력: "12345"
// 출력: true

function isOnlyNumber(str) {
    return /^[0-9]+$/.test(str);
}
console.log(isOnlyNumber("12345")); //true

// LEVEL 17 — 문자열이 이메일 형식인지 확인

// 입력: "test@example.com"
// 출력: true

function isOnlyEmail(str) {
    return /^\S+@\S+\.\S+$/.test(str);
    //해석: ^문자열 시작 \S 문자열 + @ 그리고 \S 문자열 + \. 점 그리고 \S 문자열로 된 문자열 $끝
}
console.log(isOnlyEmail("test@example.com"));

// LEVEL 18 — 문자열에서 가장 앞의 단어만 가져오기

// 입력: "hello javascript world"
// 출력: "hello"

const level18 = "hello javascript world";
console.log(level18.split(" ")[0]);

// LEVEL 19 — 문자열에서 가장 뒤의 단어만 가져오기

// 입력: "hello javascript world"
// 출출: "world"

const level19 = "hello javascript world";
// console.log(level19.split(" ")[-1]); // [-1]은 동작하지않음

// const arr19 = level19.split(" ");
// console.log(arr19[arr19.length - 1]); //이 방식이나

console.log(level19.split(" ").at(-1)); //최신 방식

// LEVEL 20 — 문자열에서 특정 문자 개수 세기

// 입력: ("aabbaac", "a")
// 출력: 4

// const level20 = "aabbaac";
// const target20 = "a";
// const count = {};

// for (let char of level20) {
//     //level20 안에서 char에다가 문자 하나씩 반복
//     count[char] = (count[char] || 0) + 1;
//     // a차례 일때 처음보는 문자면 0이고 아니면 +1 을 더해라는 뜻
// }
// console.log(count["a"]); //4

// 오답 복습문제
// LEVEL R1 — 문자열 앞뒤 공백 제거하기

// 입력: " javascript "
// 출력: "javascript"

const r1 = " javascript ";
console.log(r1.trim());

// LEVEL R2 — 모든 문자 대문자로 변환하기

// 입력: "hello WORLD"
// 출력: "HELLO WORLD"

const r2 = "hello WORLD";
console.log(r2.toUpperCase());

// LEVEL R3 — 문자열의 모든 중복 공백을 하나로 줄이기

// 입력: "hel lo js wor ld"
// 출력: "hello js world"

const r3 = "hel lo js wor ld";
console.log(r3.replace(/\s+/g, " "));

// LEVEL R4 — 문자열의 첫 글자만 대문자로 만들기

// 입력: "javascript is fun"
// 출력: "Javascript is fun"

const r4 = "javascript is fun";
console.log(r4[0].toUpperCase() + r4.slice(1));

// LEVEL R5 — 문자열의 마지막 문자 제거하기

// 입력: "coding!"
// 출력: "coding"

const r5 = "coding!";
console.log(r5.slice(0, -1));

// LEVEL R6 — 특정 문자 모두 제거하기

// 입력: ("xxaaxx", "x")
// 출력: "aa"

const r6 = "xxaaxx";
const rTarget6 = "x";
console.log(r6.replace(rTarget6, ""));

// LEVEL R7 — 문자열에서 숫자만 남기기

// 입력: "a1b2c300d4"
// 출력: "123004"

const r7 = "a1b2c300d4";
console.log(r7.replace(/[^0-9]/g, ""));

// LEVEL R8 — 문자열 단어 순서를 뒤집기

// 입력: "I love javascript"
// 출력: "javascript love I"

const r8 = "I love javascript";
console.log(r8.split(" ").reverse().join(" "));

// LEVEL R9 — 문자열에서 중복 문자 제거 (Set 활용)

// 입력: "abbbccccddaa"
// 출력: "abcd"

const r9 = "abbbccccddaa";
const r9result = [...new Set(r9)].join("");
console.log(r9result);

// LEVEL R10 — 특정 단어 포함 여부 확인하기

// 입력: "learning javascript", "script"
// 출력: true

const r10 = "learning javascript";
const r10target = "script";
console.log(r10.includes(r10target));

// LEVEL R11 — 문자열에서 특정 단어를 다른 단어로 모두 바꾸기

// 입력: ("apple banana apple", "apple", "orange")
// 출력: "orange banana orange"

const r11 = "apple banana apple";
const r11text = "apple";
const r11change = "orange";
console.log(r11.replaceAll(r11text, r11change));

// LEVEL R12 — 문자열을 단어 배열로 분리하기

// 입력: "coding is fun"
// 출력: ["coding", "is", "fun"]

const r12 = "coding is fun";
console.log(r12.split(" "));

// LEVEL R13 — 배열을 문자열로 합치기

// 입력: ["x", "y", "z"]
// 출력: "x y z"

const r13 = ["x", "y", "z"];
console.log(r13.join(" "));

// LEVEL R14 — 문자열에서 가장 많이 사용된 문자 찾기

// 입력: "aaabbccccddeee"
// 출력: "c"

const r14 = "aaabbccccddeee";
let count = {};

for (let char of r14) {
    if (count[char]) {
        count[char]++;
    } else {
        count[char] = 1;
    }
}
let maxChar = "";
let maxCount = 0;

for (let char in count) {
    if (count[char] > maxChar) {
        maxChar = char;
        maxCount = count[char];
    }
}
console.log(maxChar);


// LEVEL R15 — 이메일 형식인지 확인하기 (정규식)

// 입력: "hello@test.co.kr"
// 출력: true
const r15 = "hello@test.co.kr";
function onlyEmail(str) {
    return /^\S+@\S+\.\S+$/.test(str);
}
console.log(onlyEmail(r15));

// LEVEL R16 — 가장 앞 단어만 가져오기

// 입력: "super fast coding"
// 출력: "super"

const r16 = "super fast coding";
console.log(r16.split(" ")[0]);

// LEVEL R17 — 가장 뒤 단어만 가져오기

// 입력: "super fast coding"
// 출력: "coding"

const r17 = "super fast coding";
console.log(r17.split(" ").at(-1));

// LEVEL R18 — 문자열에서 특정 문자 개수 세기

// 입력: ("aabbacccaa", "a")
// 출력: 5

const r18 = "aabbacccaa";
const r18target = "a";
count = {}

for (let char of r18) {
    count[char] = (count[char] || 0) + 1;
}
console.log(count[r18target]);