// 🧩 문제 7 — 배달 주문 처리 시스템 만들기
// ✔️ 요구사항
// 1) 먼저 정렬하기
// 아래 우선순위로 주문 배열을 정렬해라:
// type이 "vip"인 주문을 먼저 배치
// type이 같다면 time(조리시간)이 짧은 순서
// time도 같다면 id가 낮은 순서

// 2) 정렬된 순서대로 주문 조리하기(비동기)
// 아래 함수를 제공한다고 가정해:
// function cook(order) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(`조리 완료: #${order.id}`);
//     }, order.time * 1000);
//   });
// }

// 정렬된 순서대로 cook()을 실행하되…
// 📌 각 주문은 최대 4초 안에 완성되어야 한다!
// 4초가 넘으면: "시간초과: #id" 로 reject 처리해야 한다.
// 4초 이내에 끝나면 정상 resolve.

// 3) 결과를 배열 형태로 출력
// 출력 형태:
// [
//   "조리 완료: #2",
//   "조리 완료: #5",
//   "시간초과: #7",
//   ...
// ]

// 📝 조건
// withTimeout(promise, ms) 함수를 만들어서 timeout 처리할 것
// sort와 비동기 순서 보장을 정확히 지킬 것
// async/await 사용 가능
// Promise.all 사용은 금지 (순서 깨질 수 있기 때문)

// function cook(order) {
//     return new Promise(resolve => setTimeout(() => {
//         resolve(`조리 완료: #${order.id}`);
//     }, order.time * 1000));
// }

// function withTimeout(promise, ms, order) {
//     const timeout = new Promise((_, reject) => setTimeout(() => {
//         reject(new Error(`시간 초과: #${order.id}`));
//     }, ms));
//     return Promise.race([promise, timeout]);
// }

// async function main() {
//     const orders = [
//         { id: 10, type: "normal", time: 3 },
//         { id: 2, type: "vip", time: 5 },
//         { id: 7, type: "normal", time: 1 },
//         { id: 5, type: "vip", time: 2 },
//         { id: 19, type: "normal", time: 4 }
//     ];
//     const priority = { vip: 1, normal: 2 }
//     orders.sort((a, b) => {
//         if (priority[a.type] !== priority[b.type]) {
//             return priority[a.type] - priority[b.type];
//         }
//         if (a.time !== b.time) {
//             return a.time - b.time;
//         }
//         if (a.id !== b.id) {
//             return a.id - b.id;
//         }
//     })

//     const results = [];

//     for (const order of orders) {
//         try {
//             const cooked = await withTimeout(cook(order), 4000, order);
//             results.push(cooked);
//         } catch (error) {
//             results.push(error.message);
//         }
//     }
//     results.forEach(r => console.log(r));
// }


// 🔥 문제: "알림(Notification) 전송 시스템 만들기"
// 📌 요구사항
// 어떤 서비스에서 유저들에게 “알림 메시지"를 전송하는 시스템을 만든다고 하자.
// 유저마다 설정이 다르고, 전송 방식도 다르다.✔️ 1. 데이터(유저 목록)
// 유저는 다음 필드를 가진다:
// {
//     id: number,
//     name: string,
//     type: "vip" | "normal",
//     method: "sms" | "email" | "push",
//     network: number    // 1~10 숫자. 숫자가 클수록 네트워크 속도가 느린 유저.
// }

// 예시 배열:
// [
//     { id: 1, name: "철수", type: "vip", method: "sms", network: 3 },
//     { id: 2, name: "영희", type: "normal", method: "email", network: 9 },
//     { id: 3, name: "민수", type: "vip", method: "push", network: 2 },
//     { id: 4, name: "수지", type: "normal", method: "sms", network: 6 },
//     { id: 5, name: "지훈", type: "normal", method: "push", network: 4 },
//     { id: 6, name: "하늘", type: "vip", method: "email", network: 7 },
// ]

// ✔️ 2. 정렬 기준(우선순위)
// 알림은 다음 순서로 먼저 처리해야 한다:
// VIP 먼저, normal 나중
// network 숫자가 작은 사람(빠른 네트워크)이 먼저
// id가 작은 사람이 먼저

// ✔️ 3. 전송 함수 (sendNotification)
// 전송은 다음 조건을 갖는다:
// 기본 전송시간 = network * 200ms
// 실패 확률 = 20%
// 성공하면:
// { ...user, status: ["전송 성공"] }
// 실패하면:
// { ...user, status: ["전송 실패"] }

// ✔️ 4. Timeout 기능
// 전송 한 명당 최대 1200ms까지만 기다린다.
// 1200ms 초과하면 무조건 실패로 처리:
// { ...user, status: ["시간 초과"] }

// ✔️ 5. 동시 처리(concurrency)
// 한 번에 2명만 동시에 전송할 수 있다.
// 즉:
// index 0~1 → 동시에 처리
// index 2~3 → 동시에 처리
// index 4~5 → 동시에 처리

// ✔️ 6. 결과 출력
// 마지막에 다음 두 목록을 출력해야 한다:

// === 성공 ===
// [1] 철수 - 전송 성공
// ...

// === 실패 ===
// [4] 수지 - 전송 실패
// ...

function sendNotification(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            resolve({
                ...user,
                status: ["전송 성공!"],
            });
        } else {
            reject({
                ...user,
                status: ["전송 실패"],
            });
        }
    }, user.network * 200));
}

function withTimeout(promise, ms, user) {
    const timeout = new Promise((_, reject) => setTimeout(() => {
        reject({
            ...user,
            status: [...(user.status ?? []), "시간 초과"],
        });
    }, ms));
    return Promise.race([promise, timeout]);
}


async function main() {
    const users = [
        { id: 1, name: "철수", type: "vip", method: "sms", network: 3 },
        { id: 2, name: "영희", type: "normal", method: "email", network: 9 },
        { id: 3, name: "민수", type: "vip", method: "push", network: 2 },
        { id: 4, name: "수지", type: "normal", method: "sms", network: 6 },
        { id: 5, name: "지훈", type: "normal", method: "push", network: 4 },
        { id: 6, name: "하늘", type: "vip", method: "email", network: 7 },
    ]

    const priority = { vip: 1, normal: 2 };

    users.sort((a, b) => {
        if (priority[a.type] !== priority[b.type]) {
            return priority[a.type] - priority[b.type];
        }
        if (a.network !== b.network) {
            return a.network - b.network;
        }
        return a.id - b.id;
    })

    const concurrency = 2;
    const successList = [];
    const failList = [];

    for (let i = 0; i < users.length; i += concurrency) {
        const chunk = users.slice(i, i + concurrency);
        const promises = chunk.map(user =>
            sendNotification(user)
                .then(result => withTimeout(Promise.resolve(result), 1200, result))
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        );
        await Promise.all(promises);
    }

    console.log("=== 성공 ===");
    successList.forEach(s =>
        console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

    console.log("=== 실패 ===");
    failList.forEach(f =>
        console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
}

// 느낀점 및 알게된 점

// withTimeout 함수를 .then 문으로 쓰냐 try-catch 문으로 쓰냐에 대한 차이점을 알게되었는데
// try문은 then 문과 다르게 호출 자체가 Promise 이기 때문에 withTimeout 함수를 사용할때
// withTimeout(cook(order), 4000, order) 이런식으로 함수를 내부에 넣어서 같이 돌리는 느낌이면
// then 문은 r => withTimeout(Promise.resolve(r), 4000, r) 이런식으로
// Promise 자체를 호출해줘야 감지할 수 있기때문에 넣어준 모습이다.
// try문 에서 cook 함수는 Promise 반환되어있어서 withTimeout 함수 내에 넣어서 사용한 모양이다

// 그리고 2번째 문제에 withTimeout이 reject 하는 status 값이 다른데 그 이유가
// sendNotification 함수가 만약 main 함수에서 지정한 1200ms 보다 넘게 지연될 경우
// withTimeout 은 병렬실행으로 먼저 실행되어야 하는데 sendNotification이 작업이 끝나지 않아
// 개체속성이 받아지지않았기 때문에 오류가 발생할 수 있었다.
// 그렇기때문에 withTimeout 에 reject로 반환하는 status 값을 user.status (sendNotification)
// 이 먼저 작업이 끝났을 경우 또는 빈 배열 [] 로 반환하게 한 것이다.
// ?? 의 뜻은 || 와 다르게 null 과 undefined 만 [] 빈 배열로 인정한다는 것 이다.