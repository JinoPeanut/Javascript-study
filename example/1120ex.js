// 문제: 알림(Notification) 스케줄러 구현하기
// 회사 서버에서 하루 동안 여러 개의 알림을 보내야 한다.
// 각 알림은 다음 3단계를 거쳐야 한다:

// validateNotification(notification)
// 알림 내용이 비어있으면 실패
// 내용이 있으면 성공
// 랜덤 딜레이 300~800ms
// 성공 → resolve({ id, message })
// 실패 → reject({ id, error })

// sendNotification(notification)
// 실제 전송 시도
// 성공 확률 70%
// 랜덤 딜레이 500~1000ms
// 성공 → resolve({ id, message })
// 실패 → reject({ id, error })
// logResult(notification)
// 로그 저장 (무조건 성공)
// delay 100~200ms
// resolve({ id, log: "saved" })

// 🟦 요구사항
// ✔ 1. concurrency = 3 (동시에 3개씩만 처리)
// ✔ 2. 각 알림(notification)은 반드시 순서대로 처리:
// validate → send → log
// ✔ 3. 성공 리스트 / 실패 리스트 구분해서 저장
// ✔ 4. 최종 출력 형식:
// === 성공한 알림 ===
// [1] 메시지: "긴급공지" - 전송 완료
// [3] 메시지: "업데이트 안내" - 전송 완료
// ...

// === 실패한 알림 ===
// [2] 메시지: " " - 검증 실패
// [5] 메시지: "파일 업로드 알림" - 전송 실패
// ...
// 총 요청: n개
// 성공: x개
// 실패: y개

// async function vaildateNotification(notification) {
//     const time = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
//     const vail = await new Promise((resolve, reject) => setTimeout(() => {
//         if (notification.message !== "") {
//             resolve({
//                 id: notification.id,
//                 message: notification.message,
//                 status: "검증 성공",
//             });
//         } else {
//             reject({
//                 id: notification.id,
//                 message: notification.message,
//                 status: "검증 실패",
//             })
//         }
//     }, time));
//     return vail;
// }

// async function sendNotification(notification) {
//     const time = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
//     const send = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve({
//                 id: notification.id,
//                 message: notification.message,
//                 status: "전송 성공",
//             });
//         } else {
//             reject({
//                 id: notification.id,
//                 message: notification.message,
//                 status: "전송 실패",
//             });
//         }
//     }, time));
//     return send;
// }

// async function logResult(notification) {
//     const time = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
//     const log = await new Promise(resolve =>
//         setTimeout(() => resolve({
//             id: notification.id,
//             message: notification.message,
//             status: notification.status, // 이전 함수의 status 를 유지하기 위해서 추가
//             log: "saved",
//         }), time));
//     return log;
// }

// async function main() {
//     const notifications = [
//         { id: 1, message: "긴급 공지" },
//         { id: 2, message: "" },
//         { id: 3, message: "업데이트 안내" },
//         { id: 4, message: "서버 점검 예정" },
//         { id: 5, message: "파일 업로드 알림" },
//         { id: 6, message: "신규 이벤트" }
//     ];

//     const concurrency = 3;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < notifications.length; i += concurrency) {
//         const chunk = notifications.slice(i, i + concurrency);

//         const promises = chunk.map(notification =>
//             vaildateNotification(notification)
//                 .then(vail => sendNotification(vail))
//                 .then(send => logResult(send))
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         );
//         await Promise.all(promises);
//     }

//     console.log("=== 성공한 알림 ===");
//     successList.forEach(s => console.log(`[${s.id}] 메세지: "${s.message}" - ${s.status}`));

//     console.log("");

//     console.log("=== 실패한 알림 ===");
//     failList.forEach(f => console.log(`[${f.id}] 메세지: "${f.message}" - ${f.status}`));

//     console.log("");

//     console.log(`총 요청: ${notifications.length}`);
//     console.log(`성공: ${successList.length} 개`, successList.map(s => s.id));
//     console.log(`실패: ${failList.length} 개`, failList.map(f => f.id));
// }

// main();


// JavaScript 비동기 실습 문제

// 📌 문제 설명
// 온라인 쇼핑몰에서 **여러 개의 주문(order)**을 한 번에 처리하려고 한다.
// 각 주문은 아래 단계를 순서대로 거쳐야 한다:
// checkStock(order)
// 재고가 있으면 resolve
// 재고가 없으면 reject

// processPayment(order)
// 결제 성공 확률 70%
// 성공하면 resolve
// 실패하면 reject

// shipOrder(order)
// 배송 처리는 100~300ms 랜덤 지연
// 무조건 resolve (배송 실패 없음)

// 📌 목표
// orders 배열을 3개씩 동시에 처리(concurrency = 3) 하면서,
// 성공 리스트(successList) 와 실패 리스트(failList) 를 기록해라.
// 성공한 주문 출력 예시:
// === 성공한 주문 ===
// [3] 상품명: "키보드" - 배송 완료
// [5] 상품명: "모니터" - 배송 완료
// ...

// 실패한 주문 출력 예시:
// === 실패한 주문 ===
// [2] 상품명: "마우스" - 사유: 재고 부족
// [4] 상품명: "헤드셋" - 사유: 결제 실패
// ...

// 📌 필수 요구사항
// ✔ 1. 각 단계는 반드시 이전 단계의 return 값을 받아서 다음 단계에게 전달해야 한다.
// 즉:
// checkStock(order)
//   → processPayment(order)
//   → shipOrder(order)
//   → successList.push()
// 이렇게 데이터를 이어줘야 함.

// ✔ 2. 실패하면 그 시점에서 즉시 reject 되어 .catch()로 들어가야 한다.
// 재고 없음 → 결제/배송 건너뛰고 실패 처리
// 결제 실패 → 배송 건너뛰고 실패 처리

// ✔ 3. 병렬 3개(concurrency = 3)로 처리할 것
// 힌트:
// for (let i = 0; i < orders.length; i += concurrency) {
//     const chunk = orders.slice(i, i + concurrency);
//     const promises = chunk.map(order => {
//         return (체인 연결)
//     });
//     await Promise.all(promises);
// }

// 📌 제공 데이터
// const orders = [
//     { id: 1, name: "노트북", stock: true },
//     { id: 2, name: "마우스", stock: false },
//     { id: 3, name: "키보드", stock: true },
//     { id: 4, name: "헤드셋", stock: true },
//     { id: 5, name: "모니터", stock: true },
//     { id: 6, name: "웹캠", stock: true },
// ];

// 📌 구현해야 하는 함수
// 이미 만들어져 있다고 가정
// async function checkStock(order) {}
// async function processPayment(order) {}
// async function shipOrder(order) {}
// async function main() {}

// 너가 직접 내부 로직 구현해야 한다.

function checkStock(order) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (order.stock === true) {
            resolve({
                id: order.id,
                name: order.name,
                stock: order.stock,
            });
        } else {
            reject({
                id: order.id,
                name: order.name,
                stock: order.stock,
                status: "재고 없음",
            });
        }
    }, 100));
}

function processPayment(order) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            resolve({
                id: order.id,
                name: order.name,
                stock: order.stock,
            });
        } else {
            reject({
                id: order.id,
                name: order.name,
                stock: order.stock,
                status: "결제 실패",
            });
        }
    }, 100));
}

function shipOrder(order) {
    const time = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    return new Promise(resolve => setTimeout(() =>
        resolve({
            id: order.id,
            name: order.name,
            stock: order.stock,
            status: "배송 완료",
        }), time));
}

async function main() {
    const orders = [
        { id: 1, name: "노트북", stock: true },
        { id: 2, name: "마우스", stock: false },
        { id: 3, name: "키보드", stock: true },
        { id: 4, name: "헤드셋", stock: true },
        { id: 5, name: "모니터", stock: true },
        { id: 6, name: "웹캠", stock: true },
    ];

    const concurrency = 3;
    const successList = [];
    const failList = [];

    for (let i = 0; i < orders.length; i += concurrency) {
        const chunk = orders.slice(i, i + concurrency);
        const promises = chunk.map(ord =>
            checkStock(ord)
                .then(cs => processPayment(cs))
                .then(so => shipOrder(so))
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        );
        await Promise.all(promises);
    }

    console.log("=== 성공한 주문 ===");
    successList.forEach(s => console.log(`[${s.id}] 상품명: ${s.name} - ${s.status}`));

    console.log("");

    console.log("=== 실패한 주문 ===");
    failList.forEach(f => console.log(`[${f.id}] 상품명: ${f.name} - ${f.status}`));
}

main();