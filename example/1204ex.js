// ✅ LEVEL 1 — 필수 중급 문법 다지기
// 문제 1. 구조 분해 할당 연습

// 유저 객체

const user = {
    id: 1,
    name: "철수",
    items: { weapon: "나무검", armor: "천갑옷" },
    stats: { str: 10, dex: 5 }
};

// ➡ name, weapon, str을 구조 분해로 꺼내서 출력하는 코드를 작성해라.

// 풀이
console.log(`${user.id} ${user.name} ${user.items.armor} ${user.stats.dex}`);

// 문제 2. 스프레드 연산자 연습

// 다음 배열을 깊은 복사(deep copy)해서 원본이 변하지 않게 새로운 배열을 만들어라.

const inventory = [{ id: 1 }, { id: 2 }];

// 풀이
// const copy = Object.assign({}, inventory); //오답
const copy = structuredClone(inventory); //정답


// 문제 3. 배열 고급 메서드 연습

// 다음 데이터에서 bonus가 200 이상인 유저만 추출해라.

const list = [
    { name: "철수", bonus: 100 },
    { name: "영희", bonus: 500 },
    { name: "민수", bonus: 230 },
];


// ➡ filter, map, some 중 자유롭게 선택해서 해결해라.

// 풀이 
// if (list.bonus > 200) {
//     list.map(res => console.log(res));
// } //오답
list.filter(item => item.bonus > 200).forEach(item => console.log(item)); //정답

// ✅ LEVEL 2 — Promise 기초 심화
// 문제 4. Promise 체인 변환

// 다음 코드를 async/await 형태로 바꿔라.

getUser()
    .then(getInventory)
    .then(getQuest)
    .then(console.log);


//풀이
async function getUser() {
    const result = await getInventory();
    const result2 = await getQuest(result);
    console.log(result2);
}

// 문제 5. Promise.all vs Promise.race 차이 문제
// 3개의 API를 불러오려고 한다.

const p1 = api("유저 정보");
const p2 = api("인벤토리");
const p3 = api("친구 목록");

// 다음 조건을 만족하는 코드를 작성하라:
// 3개 중 하나라도 실패하면 전체 실패 → 어떤 메서드 쓰면 될까?
// 가장 빨리 끝나는 하나만 필요 → 어떤 메서드를 쓰면 될까?

//풀이
// 3개중 하나라도 실패하면 전체실패면 Promise.all 을 사용
// 이유는 병렬실행이기 때문에
Promise.all([p1, p2, p3]);

// 가장빨리끝나는 하나만 필요한건 Promise.race
// 이유는 작업이 가장빨리 끝난것만 반환하기때문
Promise.race([p1, p2, p3]);

// ✅ LEVEL 3 — 실무용 비동기 처리 패턴
// 문제 6. 타임아웃 + 재시도 기능 하나로 합치기

// 현재 너는
// attendance(), loginBonus(), dailyQuestReward()
// 처럼 재시도 로직이 중복되어 있어.

// ➡ 실무에서는 이걸 retryWrapper(fn, retryCount) 같은 함수로 감싸서 재사용해.

// 📌 문제:
// 아래처럼 사용할 수 있는 재시도용 래퍼 함수를 직접 만들어라.

// await retry(() => loginBonus(user), 3);
// await retry(() => dailyQuestReward(user), 3);

// async function retry(user, stateMsg, retryNum, retryMsg, failRate, onSuccess) {
//     let lastErr = null;
//     for (let i = 0; i < retryNum; i++) {
//         try {
//             const tryagain = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > failRate;
//                 if (success) {
//                     resolve(onSuccess(user));
//                 } else {
//                     reject({
//                         ...user,
//                         logs: [...(user.logs ?? []), `${stateMsg} 실패`]
//                     });
//                 }
//             }));
//             return {
//                 ...tryagain,
//                 logs: [...(tryagain.logs ?? []), `${retryMsg} 성공 (${i + 1}회)`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `${retryMsg} 실패 (${i + 1}회)`],
//             }
//         }
//     }
// }

// ✅ LEVEL 4 — 고급 문법 / 함수형 & 유틸리티 설계
// 문제 7. 커링(currying) 개념 적용

// 실무에서 많이 쓰는 패턴이다.

// 다음 함수를 커링된 버전으로 만들어라:

// function add(a, b) {
//     return a + b;
// }

// //풀이
// function add(x) {
//     return function (a) {
//         return add(a, x);
//     }
// }

// //정답
// function add(x) {
//     return function (y) {
//         return x + y;
//     }
// }

// // 결과 사용 예시:

// const add10 = add(10);
// console.log(add10(5)); // 15

// 문제 8. 고차 함수(Higher-order function) 만들기

// 유저 처리 전에 로그를 자동으로 붙이는 **withLogger()**라는 고차 함수를 만들어라.

// 사용 예:

// const f = withLogger(loginBonus);
// const result = await f(user);


// 결과:

// 함수 시작: loginBonus
// 함수 끝: loginBonus

// ✅ LEVEL 5 — 실무 시뮬레이션 문제(미쳤다 난이도)
// 문제 9. 비동기 파이프라인 만들기
// 유저가 게임에 접속하면 다음 순서로 동작된다:
// 유저 정보 로드
// 버프 적용
// 데일리 보상 지급
// 최종 검증

// ➡ 각 단계를 서로 다른 비동기 함수로 만들고
// ➡ 실패 시 즉시 종료하고
// ➡ 성공 시 결과 객체는 다음 함수로 전달되며
// ➡ 마지막에 "로그 배열"을 출력하는 구조로 만들어라.

// 조건:
// 각 단계는 100~300ms 랜덤 딜레이
// 20 % 확률로 실패
// 로그는 배열 형태로 누적
// async / await 적용

function userTotal(user, stateMsg, failRate, onSuccess) {
    const delay = Math.floor(Math.random() * 201) + 100;
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > failRate;
        if (success) {
            resolve(onSuccess(user));
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), `${stateMsg} 실패`],
            });
        }
    }, delay));
}

function loadUserInfo(user) {
    return userTotal(
        user,
        "유저 정보확인",
        0.2,
        (u) => ({
            ...u,
            logs: [...(u.logs ?? []), "유저 정보확인 성공"],
            attended: true,
        })
    );
}

function buffUser(user) {
    return userTotal(
        user,
        "버프 활성화",
        0.2,
        (u) => ({
            ...u,
            logs: [...(u.logs ?? []), "버프 활성화 성공"],
            buff: true,
        })
    );
}

function dailyReward(user) {
    return userTotal(
        user,
        "리워드 지급",
        0.2,
        (u) => ({
            ...u,
            logs: [...(u.logs ?? []), "리워드 지급 성공"],
            reward: (u.reward ?? 0) + 100,
        })
    );
}

function verifyUser(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.attended === true) {
            resolve({
                ...user,
                logs: [...(user.logs ?? []), "인증 성공"],
            })
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "인증 실패"],
            });
        }
    }, 100));
}

async function main() {
    const users = [
        { name: "철수", itemLevel: 2 },
        { name: "영희", itemLevel: 4 },
        { name: "민수", itemLevel: 1 },
        { name: "지우", itemLevel: 3 },
        { name: "하늘", itemLevel: 0 },
    ];

    const successList = [];
    const failList = [];

    const promises = users.map(user =>
        loadUserInfo(user)
            .then(buffUser)
            .then(dailyReward)
            .then(verifyUser)
            .then(res => successList.push(res))
            .catch(err => failList.push(err))
    );

    await Promise.all(promises);

    console.log("===성공===");
    successList.forEach(s => console.log(s));
    console.log("===실패===");
    failList.forEach(f => console.log(f));
}


// 느낀점 및 알게된 점

// 커링 이라는걸 처음 알게됐는데 함수를 여러번 만들걸 완전히 줄여서 만든다 라는 느낌이었다.
// 근데 솔직히 아직까진 크게 와닿진 않았다. 아직 실무를 하지못해서 경험이 없어서 그런걸수도
// 있다고 생각한다. 그래도 계속 할 수 있는데 까지는 해보려고한다. 처음 커링을 인터넷에서
// 쳐보고 공부했을땐 하나같이 블로그들이 무슨말인지 어렵게 설명을 해놨는데
// 결국엔 gpt 와 문답을 통해서 어느정도 알게됐고 결국 내가 느낀것은 커링도
// 리팩토링의 하나가 아닌가 라는 생각이 들었다. 코딩을 하면서 알게됐는데 간결한게 최고인것
// 같다. 그러나 그 간결함을 위해서면 문법이 점점 더 어려워지는 느낌을 받았다.
// 익숙해질때 까지 시간을 들여야 할 것 같다.