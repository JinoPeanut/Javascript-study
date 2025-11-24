// 프로그래밍 문제 (중급 난이도 1단계 상승)
// 📦 “프리미엄 고객 우선 주문 처리 시스템 만들기”
// 1️⃣ 기본 주문 배열
// 아래 orders 배열을 사용해라:
// const orders = [
//     { id: 1, name: "노트북", amount: 1500, vip: true },
//     { id: 2, name: "키보드", amount: 200, vip: false },
//     { id: 3, name: "마우스", amount: 0, vip: false },
//     { id: 4, name: "모니터", amount: 800, vip: true },
//     { id: 5, name: "스피커", amount: 100, vip: false },
//     { id: 6, name: "헤드셋", amount: 120, vip: true },
// ];
// VIP(true)인 고객은 항상 먼저 처리해야 한다.
// VIP 우선 → VIP 내부는 id 낮은 순 → 일반 고객은 id 낮은 순

// 2️⃣ checkStock(order)
// 재고 확인 함수 만들기.
// 300~600ms 랜덤 지연
// 80% 확률로 성공
// 성공 → status: ["재고 확인 성공"]
// 실패 → reject로 오류 던지고 status: ["재고 없음"]

// 3️⃣ processPayment(order)
// 결제 처리
// 최대 3회 재시도
// 각 시도는 200~500ms 랜덤 지연
// 성공 확률 50%
// 성공 시:
// status: [...order.status, "결제 성공"]
// 3번 실패하면:
// throw { ...order, status: [...order.status, "결제 실패(3회)"] }

// 4️⃣ ship(order)
// 배송 처리
// 200~400ms 랜덤 지연
// 항상 성공
// 성공 시:
// status: [...order.status, "배송 완료"]

// 5️⃣ withTimeout(promise, ms, order)
// 타임아웃 처리
// ms 안에 promise가 끝나면 그 값 그대로 반환
// 시간이 초과되면:
// throw { ...order, status: [...order.status, "시간 초과"] }
// 반드시 Promise.race를 사용할 것

// 6️⃣ 병렬 처리 기능 추가
// 동시에 처리 가능한 주문 개수 = 2
// 병렬로 2개씩 처리하되, VIP 우선 정렬한 뒤 묶어서 처리할 것

// 7️⃣ 결과 출력
// 마지막에 다음 두 리스트 출력:
// ✔ 성공한 주문
// [id] name - 재고 확인 성공 / 결제 성공 / 배송 완료
// ✔ 실패한 주문
// [id] name - 재고 확인 성공 / 결제 실패(3회)

// function checkStock(order) {
//     const time = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve({
//                 ...order,
//                 status: ["재고 확인 성공"],
//             });
//         } else {
//             reject({
//                 ...order,
//                 status: ["재고 없음"],
//             });
//         }
//     }, time));
// }

// async function processPayment(order) {
//     for (let i = 0; i < 3; i++) {
//         const time = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
//         const success = Math.random() > 0.5;
//         const result = await new Promise((resolve) => setTimeout(() => {
//             if (success) {
//                 resolve(true);
//             } else {
//                 resolve(false);
//             }
//         }, time));
//         if (result === true) {
//             return {
//                 ...order,
//                 status: [...order.status, "결제 성공"],
//             }
//         }
//         if (i === 2) {
//             throw {
//                 ...order,
//                 status: [...order.status, "결제 실패 (3회)"],
//             }
//         }
//     }
// }

// function ship(order) {
//     const time = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
//     return new Promise((resolve) => setTimeout(() => {
//         resolve({
//             ...order,
//             status: [...order.status, "배송완료"],
//         });
//     }, time));
// }

// function withTimeout(promise, ms, order) {
//     const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
//         reject({
//             ...order,
//             status: [...order.status, "시간 초과"],
//         })
//     }, ms));
//     return Promise.race([promise, timeoutPromise]);
// }

// async function main() {
//     const orders = [
//         { id: 1, name: "노트북", amount: 1500, vip: true },
//         { id: 2, name: "키보드", amount: 200, vip: false },
//         { id: 3, name: "마우스", amount: 0, vip: false },
//         { id: 4, name: "모니터", amount: 800, vip: true },
//         { id: 5, name: "스피커", amount: 100, vip: false },
//         { id: 6, name: "헤드셋", amount: 120, vip: true },
//     ];

//     orders.sort((a, b) => {
//         if (a.vip !== b.vip) {
//             return a.vip - b.vip;
//         } return a.id - b.id;
//     })

//     const concurrency = 2;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < orders.length; i += concurrency) {
//         const chunk = orders.slice(i, i + concurrency);
//         const promises = chunk.map(order =>
//             checkStock(order)
//                 .then(processPayment)
//                 .then(ship)
//                 .then(result => withTimeout(Promise.resolve(result), 1200, result))
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         );
//         await Promise.all(promises);
//     }

//     console.log("=== 성공한 주문 ===");
//     successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

//     console.log("");

//     console.log("=== 실패한 주문 ===");
//     failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
// }

// 📘 문제 6 — 파일 처리 시뮬레이터
// 서버가 여러 개의 파일을 동시에 처리하는 시뮬레이터를 만들어라.
// 파일 객체는 다음과 같은 형태다:
// { id: number, size: number, type: string }

// ⭐ 요구사항
// 1. 파일 종류 type 에 따라 처리 시간 규칙이 있음
// "image" → 300~500ms
// "video" → 800~1200ms
// "text" → 100~200ms

// 2. 파일 처리 과정은 두 단계로 이루어진다
// ① validateFile(file)
// 90% 확률 성공, 10% 확률 실패
// 성공하면 "검증 성공" 메시지 추가
// 실패하면 "검증 실패"로 reject

// ② uploadFile(file)
// 파일 크기 size(숫자)로 업로드 성공/실패가 갈림
// size < 500 → 80% 성공
// size ≥ 500 → 50% 성공
// 성공하면 "업로드 성공"
// 실패하면 "업로드 실패"
// 각 함수는 반드시 Promise 를 리턴해야 함.

// ⭐ 3. 파일 처리 전체에 대해 타임아웃(Timeout) 적용해야 함.
// 하나의 파일을 처리할 때(검증 + 업로드)
// 1500ms 를 초과하면 "시간 초과" 로 실패 처리해야 한다.
// 타임아웃은 Promise.race() 를 반드시 활용할 것.

// ⭐ 4. 정렬 기준
// 다음 규칙으로 파일 리스트를 먼저 정렬하라:
// type 이 "video" 인 파일을 가장 먼저
// 그 다음 "image"
// 마지막 "text"
// 같은 타입에서는 id 오름차순
// 즉 정렬 우선순위는 다음과 같음:
// video → image → text

// ⭐ 5. 동시 처리(concurrency = 3)
// 한 번에 최대 3개의 파일만 동시에 처리할 수 있다.
// 3개 처리 완료 후 다음 3개를 처리하라.

// ⭐ 6. 결과 저장
// 각 결과에 따라 다음 구조로 분류하라:
// 성공 배열(successList)
// 실패 배열(failList)
// 각 처리된 파일에는 다음 필드를 포함해야 한다:
// {
//     id,
//     type,
//     size,
//     status: [ "검증 성공", "업로드 성공" ] 
// }
// 또는 실패 시:
// {
//     id,
//     type,
//     size,
//     status: [ "검증 성공", "업로드 실패" ]
// }

// ⭐ 7. 출력 형식
// 마지막에 다음과 같은 형식으로 출력:
// === 성공한 파일 ===
// [3] image (120KB) - 검증 성공 / 업로드 성공
// ...
// === 실패한 파일 ===
// [5] video (800KB) - 검증 성공 / 시간 초과
// ...

function getTime(file) {
    if (file.type === "video") {
        return Math.floor(Math.random() * (1200 - 800 + 1)) + 800;
    } else if (file.type === "image") {
        return Math.floor(Math.random() * (500 - 300 + 1)) + 300;
    } else {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    }
}

function vaildateFile(file) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            const success = Math.random() > 0.1;
            if (success) {
                resolve({
                    ...file,
                    status: ["검증 성공"],
                });
            } else {
                reject({
                    ...file,
                    status: ["검증 실패"],
                });
            }
        }, time(file)));
}

function uploadFile(file) {
    return new Promise((resolve, reject) => setTimeout(() => {
        let success = false;

        if (file.size < 500) {
            success = Math.random() > 0.2;
        } else {
            success = Math.random() > 0.5;
        }

        if (success) {
            resolve({
                ...file,
                status: [...file.status, "업로드 성공"],
            });
        } else {
            reject({
                ...file,
                status: [...file.status, "업로드 실패"],
            });
        }
    }, getTime(file)));
}

function withTimeout(promise, ms, file) {
    const timeout = new Promise((_, reject) => setTimeout(() => {
        reject({
            ...file,
            status: [...file.status, "시간 초과"],
        });
    }, ms));
    return Promise.race([promise, timeout]);
}

async function main() {
    const files = [
        { id: 1, size: 100, type: "text" },
        { id: 2, size: 800, type: "video" },
        { id: 3, size: 300, type: "image" },
        { id: 4, size: 1000, type: "video" },
        { id: 5, size: 120, type: "text" },
        { id: 6, size: 450, type: "image" },
        { id: 7, size: 200, type: "text" },
        { id: 8, size: 600, type: "video" },
    ];

    const priority = { video: 1, image: 2, text: 3 };
    files.sort((a, b) => {
        if (priority[a.type] !== priority[b.type]) {
            return priority[a.type] - priority[b.type];
        }
        return a.id - b.id;
    })

    const concurrency = 3;
    const successList = [];
    const failList = [];

    for (let i = 0; i < files.length; i += concurrency) {
        const chunk = files.slice(i, i + concurrency);
        const promises = chunk.map(file =>
            vaildateFile(file)
                .then(uploadFile)
                .then(result => withTimeout(Promise.resolve(result), 1500, result))
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        );
        await Promise.all(promises);
    }
    console.log("=== 성공한 파일 ===");
    successList.forEach(s =>
        console.log(`[${s.id}] ${s.type} (${s.size}) - ${s.status.join(" / ")}`));

    console.log("");

    console.log("=== 실패한 파일 ===");
    failList.forEach(f =>
        console.log(`[${f.id}] ${f.type} (${f.size}) - ${f.status.join(" / ")}`));
}

// 느낀점 및 알게된 점

// 배열정렬이 생각보다 어려웠는데 위 main 함수처럼 변수를 통해서 다른배열의 우선순위를
// 정하는 방법도 알 수 있었다. 나는 단순히 a.type - b.type 이 두개의 대상만 놓고 본다고
// 생각했는데 그게 아니라 정렬하는 그 순간 배열은 0번과 1번 1번과 2번 ... 계속 가능성을
// 여러가지 보고 정렬을 수행하는 것을 알게되었다.
