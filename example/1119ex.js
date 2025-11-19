// [목표]

// 각 주문에 대해 재고 검사 → 결제 처리 를 하는 로직을 만들고,
// 한 번에 최대 2개씩(concurrency = 2) 처리하도록 한다.
// 모든 처리가 끝난 후:
// 성공한 주문 목록
// 실패한 주문 목록
// 을 출력해야 한다.

// 🧩 [1. 함수 기능 요구사항]
// ✔️ checkStock(order)
// 300~800ms 랜덤 지연
// 재고(stock)가 1 이상이면 성공
// 0이면 실패
// 성공 resolve 값:
// { id, product, status: "stock-ok" }
// 실패 reject 값:
// { id, product, status: "out-of-stock" }

// ✔️ processPayment(order)
// 300~800ms 랜덤 지연
// 20% 확률로 결제 실패

// 성공 resolve 값:
// { id, product, price, status: "payment-ok" }
// 실패 reject 값:
// { id, product, price, status: "payment-failed" }

// 🧩 [2. main() 요구사항]
// ✔️ concurrency = 2
// 한 번에 2개의 주문만 병렬로 진행.

// ✔️ 처리 방식
// 각 주문은 아래 순서로 처리된다:
// checkStock → processPayment

// ✔️ 성공 기준
// 두 과정 모두 성공한 주문만 성공 리스트에 들어감.

// ✔️ 실패 기준
// stock 부족이건 payment 실패건 즉시 실패 리스트에 들어감.

// async function checkStock(order) {
//     const time = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
//     const check = await new Promise((resolve, reject) => setTimeout(() => {
//         if (order.stock >= 1) {
//             resolve({
//                 id: order.id,
//                 product: order.product,
//                 price: order.price,
//                 status: "stock-ok",
//             })
//         } else {
//             reject({
//                 id: order.id,
//                 product: order.product,
//                 price: order.price,
//                 status: "out-of-stock",
//             });
//         }
//     }, time));
//     return check;
// }

// async function processPayment(order) {
//     const time = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
//     const process = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve({
//                 id: order.id,
//                 product: order.product,
//                 price: order.price,
//                 status: "payment-ok",
//             });
//         } else {
//             reject({
//                 id: order.id,
//                 product: order.product,
//                 price: order.price,
//                 status: "payment-failed",
//             });
//         }
//     }, time));
//     return process;
// }

// async function main() {
//     const orders = [
//         { id: 1, product: "키보드", price: 35000, stock: 3 },
//         { id: 2, product: "마우스", price: 22000, stock: 0 },
//         { id: 3, product: "모니터", price: 210000, stock: 5 },
//         { id: 4, product: "USB허브", price: 12000, stock: 2 },
//         { id: 5, product: "스피커", price: 45000, stock: 0 },
//         { id: 6, product: "헤드셋", price: 58000, stock: 4 }
//     ];

//     const concurrency = 2;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < orders.length; i += concurrency) {
//         const chunk = orders.slice(i, i + concurrency);

//         const promises = chunk.map(order =>
//             checkStock(order)
//                 .then(() => processPayment(order))
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         );
//         await new Promise.all(promises);
//     }

//     console.log("===성공한 주문===");
//     successList.forEach(item => console.log(`[${item.id}] ${item.product} (${item.price}원) - 결제완료`));

//     console.log("");

//     console.log("===실패한 주문===");
//     failList.forEach(item => console.log(`[${item.id}] ${item.product} (${item.price}원) - ${item.status === "out-of-stock" ? "재고없음" : "결제 실패"}`));
// }


// 문제
// 온라인 쇼핑몰에서 재고를 관리하는 시스템을 만든다고 가정하자.
// 다음 products 배열을 기반으로 여러 작업을 순차/병렬로 처리해야 한다.    

// 1) checkStock(product)
// 재고가 1개 이상이면 resolve, 아니면 reject 하는 Promise 함수를 만들어라.

// 2단계 — 병렬 처리
// concurrency = 2 로 설정하고
// products를 2개씩 잘라서 병렬로 checkStock() 처리하라.
// 성공은 successList 배열에,
// 실패는 failList 배열에 push 해라.

// 3단계 — 결과 출력하기
// 출력 형식은 아래처럼 해야 한다.
// === 재고 있음 ===
// [1] 모니터: OK
// [3] 마우스: OK
// [4] 스피커: OK

// === 재고 없음 ===
// [2] 키보드: OUT
// [5] 헤드셋: OUT

// 4단계 — 덤 과제 (선택)
// 성공 리스트만 골라서
// 이름만 모은 배열을 reduce로 아래 형태로 변환하라:
// "판매 가능한 제품: 모니터, 마우스, 스피커"

async function checkStock(product) {
    const time = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
    const check = await new Promise((resolve, reject) => setTimeout(() => {
        if (product.stock >= 1) {
            resolve({
                id: product.id,
                name: product.name,
                status: "Ok",
            });
        } else {
            reject({
                id: product.id,
                name: product.name,
                status: "Out",
            });
        }
    }, time));
    return check;
}

async function main() {
    const products = [
        { id: 1, name: "모니터", stock: 3 },
        { id: 2, name: "키보드", stock: 0 },
        { id: 3, name: "마우스", stock: 5 },
        { id: 4, name: "스피커", stock: 1 },
        { id: 5, name: "헤드셋", stock: 0 }
    ];

    const concurrency = 2;
    const successList = [];
    const failList = [];

    for (let i = 0; i < products.length; i += concurrency) {
        const chunk = products.slice(i, i + concurrency);
        const promises = chunk.map((product =>
            checkStock(product)
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        ));
        await Promise.all(promises);
    }

    console.log("=== 재고 있음 ===");
    successList.forEach(p => console.log(`[${p.id}] ${p.name}: ${p.status}`));

    console.log("");

    console.log("=== 재고 없음 ===");
    failList.forEach(e => console.log(`[${e.id}] ${e.name}: ${e.status}`));

    successList.reduce(r => console.log(`판매 가능한 제품: ${r.name}`));
}