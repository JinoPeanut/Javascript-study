// 🔥 문제: 알림 재전송 시스템 만들기 (난이도 ↑)
// 1. 고객 정보 구조
// {
//   id,
//   name,
//   type,        // "vip" or "normal"
//   retryLimit,  // 최대 재시도 횟수
//   network      // 네트워크 속도 (처리 시간)
// }

// 2. sendAlert(user) 함수
// 이미 만들어져 있다고 가정해.
// 성공 확률: 70%
// 실패하면 reject
// user.network * 300ms 뒤에 resolve/reject 결정됨
// 성공 시:
// { ...user, status: ["전송 성공"] }
// 실패 시:
// { ...user, status: ["전송 실패"] }

// ✔ 3. 처리 규칙
// (1) VIP → NORMAL 순서로 우선 정렬
// 동일 타입이면:
// 네트워크 빠른 순서 (작은 숫자 먼저)
// id 오름차순

// (2) 최대 동시 처리 개수는 3명
// 즉, 3명씩 묶어서 병렬로 처리하는 구조로 진행.

// (3) 각 알림은 timeout 1500ms 적용
// 시간 초과 시:
// { ...user, status: [...?, "시간 초과"] }
// status가 없을 수도 있으니 안정적으로 작성할 것.

// (4) 실패 또는 시간초과가 일어나면 재시도(retry)
// 각 user는 최대 retryLimit 만큼 재시도할 수 있다.
// 재시도 규칙:
// 실패할 때마다 status에 "재시도 N회" 를 push
// retryLimit 회수를 모두 소진하면 failList로 들어감
// 성공하면 successList로 들어감
// 예:
// 기존 실패 → "재시도 1회"
// 다시 실패 → "재시도 2회"
// 마지막 실패 → failList로 이동

// (5) 최종 출력
// 아래 형태로 출력:
// 성공 리스트:
// [3] 민수 - 전송 성공 / 재시도 1회
// 실패 리스트:
// [5] 지훈 - 전송 실패 / 재시도 3회 / 시간 초과

// function sendAlert(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve({
//                 ...user,
//                 status: ["전송 성공"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 status: ["전송 실패"],
//             });
//         }
//     }, user.network * 300));
// }

// function withTimeout(promise, ms, user) {
//     const timeout = new Promise((_, reject) => setTimeout(() => {
//         reject({
//             ...user,
//             status: [...(user.status ?? []), "시간 초과"],
//         });
//     }, ms));
//     return Promise.race([promise, timeout]);
// }

// async function retryLogic(user) {
//     let lastErr = null;

//     for (let i = 0; i < user.retryLimit; i++) {
//         try {
//             const result = await sendAlert(user);
//             return {
//                 ...result,
//                 status: [...(result.status ?? []), `재시도 ${i}회`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 status: [...(error.status ?? []), `재시도 실패 ${i + 1}회`],
//             }
//         }
//     }
//     throw lastErr;
// }

// async function main() {
//     const users = [
//         { id: 1, name: "철수", type: "vip", retryLimit: 2, network: 3 },
//         { id: 2, name: "영희", type: "normal", retryLimit: 3, network: 8 },
//         { id: 3, name: "민수", type: "vip", retryLimit: 1, network: 2 },
//         { id: 4, name: "수지", type: "normal", retryLimit: 2, network: 6 },
//         { id: 5, name: "지훈", type: "normal", retryLimit: 3, network: 4 },
//         { id: 6, name: "하늘", type: "vip", retryLimit: 2, network: 5 },
//         { id: 7, name: "도윤", type: "vip", retryLimit: 3, network: 7 },
//         { id: 8, name: "서윤", type: "normal", retryLimit: 1, network: 3 },
//         { id: 9, name: "가람", type: "normal", retryLimit: 2, network: 9 },
//     ];

//     priority = { vip: 1, normal: 2 };
//     users.sort((a, b) => {
//         if (priority[a.type] !== priority[b.type]) {
//             return priority[a.type] - priority[b.type];
//         }
//         if (a.network !== b.network) {
//             return a.network - b.network;
//         }
//         return a.id - b.id;
//     })

//     const concurrency = 3;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < users.length; i += concurrency) {
//         const chunk = users.slice(i, i + concurrency);
//         const promises = chunk.map(user =>
//             retryLogic(user)
//                 .then(time => withTimeout(Promise.resolve(time), 1500, time))
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         );
//         await Promise.all(promises);
//     }

//     console.log("=== 성공 ===");
//     successList.forEach(s =>
//         console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

//     console.log("=== 실패 ===");
//     failList.forEach(f =>
//         console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
// }


// ✅ 문제
// 아래 조건을 모두 만족하는 requestWithRetryAndTimeout(user) 함수를 직접 작성하라.

// 📌 요구사항
// 요청 함수 fetchData(user) 를 사용한다.
// 재시도 횟수는 user.retryLimit
// 한 번의 요청은 타임아웃(ms) 이 있다 → user.timeout

// 요청 성공 시:
// 결과 객체에 status 배열이 있을 수 있으므로,
// status 에 "재시도 X회" 를 추가한 뒤 반환한다.

// 요청 실패 시:
// 오류 객체의 status 에 "재시도 실패 X회" 추가
// 모든 재시도가 실패하면 마지막 오류를 throw
// timeout 기능은 직접 구현해야 하며,
// Promise.race() 를 사용하여 타임아웃 시도는 실패로 처리해야 한다.

// function fetchData(user) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const success = Math.random() > 0.5;
//             if (success) {
//                 resolve({
//                     ...user,
//                     data: "서버 응답 데이터",
//                     status: ["요청 성공"]
//                 });
//             } else {
//                 reject({
//                     ...user,
//                     status: ["요청 실패"]
//                 });
//             }
//         }, user.network * 200);
//     });
// }

// async function requestWithRetryAndTimeout(user) {
//     let lastErr = null;

//     for (let i = 0; i < user.retryLimit; i++) {
//         try {
//             const result = await withTimeout(fetchData(user), user.timeout, user);
//             return {
//                 ...result,
//                 status: [...(result.status ?? []), `재시도 ${i}회`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 status: [...(error.status ?? []), `재시도 실패 ${i + 1}회`],
//             }
//         }
//     }
//     throw lastErr;
// }

// function withTimeout(promise, ms, user) {
//     const timeout = new Promise((_, reject) => setTimeout(() => {
//         reject({
//             ...user,
//             status: [...(user.status ?? []), "시간 초과"],
//         });
//     }, ms));
//     return Promise.race([promise, timeout]);
// }

// async function main() {
//     const users = [
//         { name: "철수", network: 1, retryLimit: 2, timeout: 300 },
//         { name: "영희", network: 2, retryLimit: 3, timeout: 500 },
//         { name: "민수", network: 3, retryLimit: 1, timeout: 200 },
//         { name: "지우", network: 1, retryLimit: 5, timeout: 400 },
//         { name: "하늘", network: 4, retryLimit: 2, timeout: 350 }
//     ];

//     const concurrency = 2;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < users.length; i += concurrency) {
//         const chunk = users.slice(i, i + concurrency);
//         const promises = chunk.map(user =>
//             requestWithRetryAndTimeout(user)
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         )
//         await Promise.all(promises);
//     }

//     console.log("===성공===");
//     successList.forEach(s => console.log(`[${s.name}] - ${s.status.join(" / ")}`));

//     console.log("");

//     console.log("===실패===");
//     failList.forEach(f => console.log(`[${f.name}] - ${f.status.join(" / ")}`));
// }

// 📘 문제: 유저 포인트 계산
// 1️⃣ 상황
// 온라인 게임에서 유저 포인트를 계산하는 시스템이 있어.
// 유저 객체는 아래처럼 생겼어:

// const users = [
//   { name: "철수", points: 120 },
//   { name: "영희", points: 80 },
//   { name: "민수", points: 200 },
// ];

// 2️⃣ 함수 요구사항
// calculateBonus(user) 함수 만들기
// user 객체를 받아서 포인트에 따라 보너스 계산
// 100점 이상 → 20점 추가
// 50~99점 → 10점 추가
// 50점 미만 → 5점 추가
// 최종 보너스를 적용한 새 객체 반환
// 예: { name: "철수", points: 120, bonus: 20 }
// applyMultiplier(user) 함수 만들기
// user 객체를 받아서 보너스 포인트에 1.5배 곱
// 새 객체 반환
// 예: { name: "철수", points: 120, bonus: 20, finalPoints: 50 }
// processUser(user) 함수 만들기
// 내부에서 calculateBonus(user) 호출
// 이어서 applyMultiplier() 호출
// 최종 객체 반환

// 3️⃣ 목표
// processUser 안에서 함수 호출 순서와 결과 활용 연습
// map이나 for..of로 여러 유저를 처리할 수 있어야 함
// 예시 결과:
// [
//   { name: "철수", points: 120, bonus: 20, finalPoints: 30 },
//   { name: "영희", points: 80, bonus: 10, finalPoints: 15 },
//   { name: "민수", points: 200, bonus: 20, finalPoints: 30 },
// ]

function calculateBonus(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.points > 100) {
            resolve({
                ...user,
                bonus: (user.bonus ?? 0) + 20
            });
        } else if (user.points < 100 && user.points <= 50) {
            resolve({
                ...user,
                bonus: (user.bonus ?? 0) + 10
            });
        } else if (user.points < 50 && user.points > 0) {
            resolve({
                ...user,
                bonus: (user.status ?? 0) + 5
            });
        } else if (user.points <= 0) {
            reject({
                ...user,
                bonus: [...(user.status ?? []), "점수가 없습니다"]
            });
        }
    }, 100));
}

function applyMultiplier(user) {
    return new Promise((resolve) => setTimeout(() => {
        resolve({
            ...user,
            finalPoints: user.bonus * 1.5,
        });
    }, 100));
}

async function processUser(user) {
    try {
        const result = await calculateBonus(user);
        const result2 = await applyMultiplier(result);
        return result2;
    } catch (error) {
        throw {
            ...error,
            status: [...(error.status ?? []), "최종 점수 없음"],
        }
    }
}

async function main() {
    const users = [
        { name: "철수", points: 120 },
        { name: "영희", points: 80 },
        { name: "민수", points: 200 },
        { name: "훈이", points: 0 },
    ];

    const successList = [];
    const failList = [];

    const promises = users.map(user =>
        processUser(user)
            .then(res => successList.push(res))
            .catch(err => failList.push(err))
    )
    await Promise.all(promises);

    successList.forEach(s => console.log(s));
    failList.forEach(f => console.log(f));

}

// 느낀점 및 알게된 점

// 객체속성을 문자열로 계승할때는 bonus: [...(user.bonus ?? []), "문자열"] 이 가능했지만
// 단순히 숫자의 값만 늘리려고 할때는 bonus: (user.bouns ?? 0) + 20 와 같이
// bonus 값이 존재하지 않을땐 [] 배열이 아닌 0으로 설정해줘서 0부터 시작하도록 만들고
// 문자열을 쓸때와 비슷하게 20의 값을 더하기 위해 +20 을 해준 모습을 보았다.

// 재시도(retry) 함수를 만들때 지문을 읽어보니 재시도 -> 타임아웃 -> 응답
// 순서였는데 단순히 main 에서 then 문으로 차례대로 함수를 호출하는것만 생각하고
// 재시도 함수 내부에서 함수를 호출해볼 생각을 못했다.
// main 함수에서 하던 const result = await withTimeout(fetchData(user), user.timeout, user);
// 와 같은 문장이 문제의 지문에서 단순 함수의 순서호출이 아닌 작업 처리 후 호출하는 구조라면
// 위 문장과 같이 하나의 함수에서 작업을 다 처리한 후에 main 함수에서 마지막 출력을 담당할
// 수도 있겠구나 라는걸 깨닳았다.