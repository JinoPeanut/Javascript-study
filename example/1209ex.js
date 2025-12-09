// ✅ 문자열 마지막 문제 세트 (Final 10 Problems)

// 난이도: 중급 → 중상급

// FINAL 1 — 문자열에서 숫자 추출하여 모두 더하기

// 입력: "a3b10c4"
// 출력: 17
// (3 + 10 + 4)

const final1 = "a3b10c4";
function onlyNumber(str) {
    const numbers = str.match(/\d+/g); //replace 는 문자열로만 바꾸고 match는 배열로 바로 바꾼다.
    return numbers.reduce((sum, n) => sum + Number(n), 0);
}
console.log(onlyNumber(final1));

// FINAL 2 — 문자열 압축하기

// 입력: "aaabbccccd"
// 출력: "a3b2c4d1"

// 반복 문자 → 문자 + 개수

const final2 = "aaabbccccd";

function compress(str) {
    let result = "";
    let current = str[0];   // 지금 세고 있는 문자
    let count = 1;          // 지금 문자가 몇 개 등장했는지

    for (let i = 1; i < str.length; i++) {
        if (str[i] === current) {
            count++;   // 같은 문자면 +1
        } else {
            // 문자가 바뀌면, 지금까지의 문자 + 개수 저장
            result += current + count;
            current = str[i]; // 새 문자로 변경
            count = 1;        // 다시 1부터 세기
        }
    }

    // 마지막 문자도 추가해야 함
    result += current + count;

    return result;
}

console.log(compress(final2));   // "a3b2c4d1"


// FINAL 3 — 중복되지 않는 첫 문자 찾기

// 입력: "aabbcddeff"
// 출력: "c"

const final3 = "aabbcddeff";
function finals3(str) {
    const count = {};

    // 각 문자의 갯수를 센다. a = 2개 b = 2개....
    for (let char of str) {
        count[char] = (count[char] || 0) + 1;
    }

    // 1개인 문자만 리턴
    for (let char of str) {
        if (count[char] === 1) {
            return char;
        }
    }

    // 1개인 문자가없을경우는 null 리턴
    return null;
}

console.log(finals3(final3));

// FINAL 4 — 두 문자열이 애너그램인지 확인

// 입력: "listen", "silent"
// 출력: true

const final4 = "listen";
const text4 = "silent";
function finals4(str, text) {
    // 두개 다 배열로 나누고 정렬하고 다시 문자열로 만들면
    // 각각 똑같은 문자열이 나오기 때문에 true
    return str.split("").sort().join("") === text.split("").sort().join("");
}
console.log(finals4(final4, text4));

// FINAL 5 — 문자열의 괄호가 올바른지 검사

// 입력: "(()())"
// 출력: true
// 입력: "())(()"
// 출력: false

const final5 = "(()())";
const wrong5 = "())(()";
function finals5(str) {
    let count = 0;

    for (let char of str) {
        if (char === "(") {
            count++;
        } else {
            count--;
        }
        if (count < 0) {
            return false;
        }
    }
    return count === 0;
}

// FINAL 6 — 문자열에서 가장 흔한 단어 찾기

// 입력: "apple banana apple grape banana apple"
// 출력: "apple"

const final6 = "apple banana apple grape banana apple";
function finals6(str) {
    const words = str.split(" ");
    let count = {};

    for (let w of words) {
        count[w] = (count[w] || 0) + 1;
    }

    const bestWord = "";
    const bestCount = 0;

    for (let w of count) {
        if (count[w] > bestCount) {
            bestWord = w;
            bestCount = count[w];
        }
    }
    return bestWord;
}

// FINAL 7 — Palindrome(회문)인지 확인

// 입력: "racecar"
// 출력: true

const final7 = "racecar";
function palindrome(str) {
    const reverseWord = str.split("").reverse().join("");
    if (reverseWord === str) {
        return true;
    } else {
        return false;
    }
}
console.log(palindrome(final7));

// FINAL 8 — 모든 단어 뒤집기

// 입력: "hello world javascript"
// 출력: "olleh dlrow tpircsavaj"

const final8 = "hello world javascript";
function finals8(str) {
    return str
        .split(" ")
        .map(s => s.split("").reverse().join(""))
        .join(" ");
}
console.log(finals8(final8));

// FINAL 9 — 괄호 안의 내용 모두 추출하기

// 입력: "hi (a) and (b) and (c)"
// 출력: ["a", "b", "c"]

const final9 = "hi (a) and (b) and (c)";
console.log(final9.matchAll(/\((.*?)\)/g).map(m => m[1]));

// FINAL 10 — HTML 태그 제거하기

// 입력: "<p>Hello <b>world</b></p>"
// 출력: "Hello world"

const final10 = "<p>Hello <b>world</b></p>";
console.log(final10.replace(/^<[^>]+>/g, ""));