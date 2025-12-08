// LEVEL 21 — 문자열에서 알파벳만 남기기

// 입력: "a1b2#c!d3"
// 출력: "abcd"
// 힌트: 정규식 [^a-zA-Z]

const level21 = "a1b2#c!d3";
console.log(level21.replace(/[^a-zA-Z]/g, ""));

// LEVEL 22 — 문자열에서 대문자만 남기기

// 입력: "AbCdEf12G!"
// 출력: "ACEG"

const level22 = "AbCdEf12G!";
console.log(level22.replace(/[^A-Z]/g, ""));

// LEVEL 23 — 문자열에서 단어 수 세기

// 입력: "hello world javascript"
// 출력: 3

const level23 = "hello world javascript";
const word23 = level23.trim().split(/\s+/);
console.log(word23.length);

// LEVEL 24 — 문자열 첫 글자와 마지막 글자 서로 바꾸기

// 입력: "apple"
// 출력: "epp la" → 아니고 "e ppl a" → 아니고 정확히는:
// 출력: "eppla"
// (첫 글자 a ↔ 마지막 글자 e)

const level24 = "apple";

function changeWord(str) {
    if (str.length <= 1) {
        return str;
    }
    const firstChar = level24[0];
    const lastChar = level24[level24.length - 1];
    const middleChar = level24.slice(1, -1);

    return lastChar + middleChar + firstChar;
}
console.log(changeWord(level24));


// LEVEL 25 — 모든 단어의 첫 글자를 대문자로 만들기

// 입력: "hello world javascript"
// 출력: "Hello World Javascript"

const level25 = "hello world javascript";
const result25 =
    level25.split(" ")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
console.log(result25);


// LEVEL 26 — 문자열을 반대로 뒤집기

// 입력: "coding"
// 출력: "gnidoc"

const level26 = "coding";
console.log(level26.split("").reverse().join(""));

// LEVEL 27 — 특정 단어가 몇 번 등장하는지 세기

// 입력: "apple banana apple grape apple", "apple"
// 출력: 3

const level27 = "apple banana apple grape apple";
const target27 = "apple";

function wordCount(str, word) {
    return str.split(" ").filter(item => item === word).length;
}
console.log(wordCount(level27, target27));

// LEVEL 28 — 특정 문자로 시작하는 단어만 배열로 추출하기

// 입력: "banana apple avocado apricot grape", "a"
// 출력: ["apple", "avocado", "apricot"]

const level28 = "banana apple avocado apricot grape";
const target28 = "a";

function wordA(str, word) {
    return str.split(" ").filter(item => item[0] === word);
}
console.log(wordA(level28, target28));

// LEVEL 29 — 문자열에서 가장 긴 단어 찾기

// 입력: "I love programming in javascript"
// 출력: "programming"

const level29 = "I love programming in javascript";
function longWord(str) {
    const words = str.split(" ");
    let longest = words[0];

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}
console.log(level29);

// LEVEL 30 — 문자열에서 괄호 안의 내용만 추출하기

// 입력: "Hello (world)!"
// 출력: "world"
// 힌트: /\((.*?)\)/

const level30 = "Hello (world)!";
console.log(level30.replace(/ \((.*?)\) /, ""));

//또는

console.log(level30.match(/ \((.*?)\) /)[1]);

// 괄호를 정규식으로 쓰게 되면 캡처 그룹이라는게 생성되며 2개의 출력이 나오는데
// "(world)",
// "world"
// 이런식으로 나온다. 근데 이제 순수 문자열만 얻고싶기 때문에
// match의 괄호가 끝나는 옆에 [1] 을 붙여 world 만 얻고자 한것.

// / \((.*?)\) / 에서 괄호를 두번 쓴 이유는
// 첫번째 괄호는 지문에서 괄호 안 내용만 추출하기 위해서고
// 두번째 괄호는 괄호안에 내용을 캡처하는 그룹인 .*? 를 사용하기 위해서다.