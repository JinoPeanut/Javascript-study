// ✅ 문제: 상품 주문 처리 시스템 만들기 (중급)
// 온라인 쇼핑몰에서 여러 상품 주문을 처리해야 한다.
// 각 주문은 다음과 같은 3단계를 거친다:

// 1. validateOrder(order)
// order.amount > 0 이면 성공
// 아니면 실패
// 지연시간: 200~600ms 랜덤

// 2. processPayment(order)
// 결제는 최대 3번까지 자동 재시도
// 매 시도마다 성공 확률: 60%
// 3번 모두 실패 시 실패 처리
// 지연시간: 300~700ms 랜덤
// 성공 시 반환 값
// 기존 status 뒤에 "결제 성공" 추가
// 실패 시 반환 값
// 기존 status 뒤에 "결제 실패 (3회 실패)" 추가

// 3. shipProduct(order)
// 배송 준비는 100~300ms 랜덤 지연 후 성공으로 처리
// 기존 status 뒤에 "배송 완료" 추가

// 4. main() 로직 조건
// 주문 목록을 concurrency = 2 로 병렬 처리
// → 즉, 2개씩 동시에 처리하고 기다렸다가 다음 2개 실행
// 성공한 주문은 successList, 실패한 주문은 failList에 넣기

// 출력 형식 예시:
// 성공 예시 출력
// === 성공한 주문 ===
// [1] 노트북 - 유효성 검사 성공 / 결제 성공 / 배송 완료
// 실패 예시 출력
// === 실패한 주문 ===
// [3] 마우스 - 유효성 검사 성공 / 결제 실패 (3회 실패)

// function vaildateOrder(order) {
//     const time = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
//     return new Promise((resolve, reject) => setTimeout(() => {
//         if (order.amount > 0) {
//             resolve({
//                 ...order,
//                 status: ["유효성 검사 성공"],
//             });
//         } else {
//             reject({
//                 ...order,
//                 status: ["유효성 검사 실패"],
//             });
//         }
//     }, time));
// }

// async function processPayment(order) {
//     for (let i = 0; i < 3; i++) {
//         const time = Math.floor(Math.random() * (700 - 300 + 1)) + 300;
//         const result = await new Promise((resolve) => setTimeout(() => {
//             const success = Math.random() > 0.4;
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
//                 status: [...order.status, "결제 실패 (3회 실패)"],
//             }
//         }
//     }
// }

// function shipProduct(order) {
//     const time = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
//     return new Promise((resolve) => setTimeout(() => {
//         resolve({
//             ...order,
//             status: [...order.status, "배송 완료"],
//         });
//     }, time));
// }

// async function main() {
//     const orders = [
//         { id: 1, name: "노트북", amount: 1500 },
//         { id: 2, name: "키보드", amount: 200 },
//         { id: 3, name: "마우스", amount: 0 },
//         { id: 4, name: "모니터", amount: 800 },
//         { id: 5, name: "스피커", amount: 100 },
//     ];

//     const concurrency = 2;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < orders.length; i += concurrency) {
//         const chunk = orders.slice(i, i + concurrency);
//         const promises = chunk.map(order =>
//             vaildateOrder(order)
//                 .then(processPayment)
//                 .then(shipProduct)
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         )
//         await Promise.all(promises);
//     }

//     console.log("=== 성공한 주문 ===");
//     successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

//     console.log("");

//     console.log("=== 실패한 주문 ===");
//     failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
// }



// 문제 — “동시에 처리되는 주문 + 우선순위 + 재시도 + 타임아웃”

// 온라인 쇼핑몰에서 주문을 처리하려고 한다.
// 각 주문은 우선순위(priority: 높음=1, 낮음=2) 를 갖으며,
// 우선순위가 높은 주문부터 먼저 처리되어야 한다.

// 각 주문은 다음 단계를 거친다:
// 재고 확인(checkStock)
// 랜덤 지연(300~700ms)
// 80% 확률로 성공 → resolve
// 20% 확률로 실패 → reject
// 결제(processPayment)
// 랜덤 지연(200~600ms)
// 50% 확률로 성공
// 실패 시 최대 2회까지 재시도 (총 3번)
// 3번 실패 시 최종 실패로 reject
// 배송(ship)
// 150~300ms 지연
// 무조건 성공 (resolve)

// 📌 요구사항
// 🟢 1. 우선순위 처리
// priority=1 (긴급 주문) 먼저 처리
// 그 다음 priority=2
// 즉, 전체 orders 배열을 우선순위 정렬해서 처리해야 함.

// 🟢 2. 동시 처리(concurrency = 3)
// 한 번에 최대 3개 주문만 병렬로 처리할 수 있다.

// 🟢 3. 각 주문의 전체 처리에 2초 타임아웃 적용
// checkStock + processPayment + ship
// 전체 과정이 2초를 넘으면 자동 실패 처리
// 힌트:
// Promise.race / Promise.timeout 구현 필요

// 🟢 4. 최종 출력
// 성공한 주문 목록(successList)
// 실패한 주문 목록(failList)
// 각각 [id] name - status 로그 형태로 출력
// 🔥 추가 조건 (헷갈리면 말해!)
// status 배열을 단계별로 push하면서 유지
// throw/reject 섞여도 무방하지만 일관성 있게 작성하기
// async/await 적극 사용

function checkStock(order) {
    const time = Math.floor(Math.random() * (700 - 300 + 1)) + 300;

    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            resolve({
                ...order,
                status: ["재고 있음"],
            });
        } else {
            reject({
                ...order,
                status: ["재고 없음"],
            });
        }
    }, time));
}

async function processPayment(order) {
    for (let i = 0; i < 3; i++) {
        const time = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
        const result = await new Promise((resolve) => setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, time));
        if (result === true) {
            return {
                ...order,
                status: [...order.status, "결제 성공!"],
            }
        }
        if (i === 2) {
            throw {
                ...order,
                status: [...order.status, "결제 실패"],
            }
        }
    }
}

function ship(order) {
    const time = Math.floor(Math.random() * (300 - 150 + 1)) + 150;
    return new Promise((resolve) => setTimeout(() => {
        resolve({
            ...order,
            status: [...order.status, "배송 성공"],
        });
    }, time));
}

function withTimeout(promise, ms, order) {

    // 타임아웃 Promise 생성
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
        reject({
            ...order,
            status: [...order.status, "시간 초과"],
        })
    }, ms));

    //Promise.race로 먼저 완료된 Promise 반환
    return Promise.race([promise, timeoutPromise]);
}

async function main() {
    const orders = [
        { id: 1, name: "노트북", amount: 1500, priority: 1 },
        { id: 2, name: "키보드", amount: 200, priority: 2 },
        { id: 3, name: "모니터", amount: 800, priority: 1 },
        { id: 4, name: "마우스", amount: 50, priority: 2 },
        { id: 5, name: "헤드셋", amount: 120, priority: 1 },
        { id: 6, name: "USB 허브", amount: 40, priority: 2 },
        { id: 7, name: "스탠드", amount: 90, priority: 2 },
        { id: 8, name: "웹캠", amount: 130, priority: 1 },
    ];

    orders.sort((a, b) => {
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        } return a.id - b.id;
    })

    const concurrency = 3;
    const successList = [];
    const failList = [];

    for (let i = 0; i < orders.length; i += concurrency) {
        const chunk = orders.slice(i, i + concurrency);
        const promises = chunk.map(order =>
            checkStock(order)
                .then(processPayment)
                .then(ship)
                .then(result => withTimeout(Promise.resolve(result), 2000, result))
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        )
        await Promise.all(promises);
    }

    console.log("=== 성공한 주문 ===");
    successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

    console.log("");

    console.log("=== 실패한 주문 ===");
    failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
}


// 공부하면서 느낀점 및 알게된 점

// 일단 객체를 스프레드 연산자로 넘겨주는것은 익숙해진듯 하다.
// 하지만 기존에 객체를 계승하는 부분에 대해서 resolve 와 reject 에서 무조건적으로 객체를
// 넘겨줘야 한다는 생각을 하고 있었기에 withTimeout 부분에서 reject 만 써야하는데 resolve
// 를 써서 함수의 의미를 퇴색시켜렸다.

// 그리고 Promise 내부에서 reject 만 사용할때 첫번째 칸은 resolve 지만 사용하지 않기때문에
// _ 를 넣어주는것은 오늘 처음알게 됐다. 원래는 resolve 만 사용하던 경험은 많았기때문에
// 두번째에 _ 를 넣어줄 필요가없었기 때문이었다.

// withTimeout 함수에서 마지막에 Promise.race([promise, timeoutPromise]) 를 넣었기때문에
// Promise 를 감지하는 함수가 만들어졌으며 main 함수 내에서
// .then 에 withTimeout을 사용할때는 파라미터 3개를 사용했기때문에
// Promise 를 감지하는 Promise.resolve(result) 와 타임아웃 커트라인을 위한 2000(2초)
// 그리고 마지막으로 result 가 들어가 3개의 파라미터를 채웠던 모습이다.

// 그리고 나는 생각보다 오타가 많은것을 알았다. 빠르게 타이핑을 치는것은 중요하지만
// 현재로써는 코드들이 전체적으로 짧아서 크게 문제없이 찾을 수 있었지만
// 향후 큰 프로젝트를 맏게 되면 조금 천천히 하더라도 오타를 줄이는 습관을 들여야할 것 같다.

// 배열을 정렬하는 과정에서 조건문과 같이쓸때 실수하는 모습이 많이 보인것 같다. 특히
// 조건문 사용시에 한번씩 스스로 헷갈릴때가 많은 듯 하다. 논리적으로 이해할 수 있게 공부가
// 필요할것으로 보인다.
// 현재 main 내부에 있는 정렬함수는 priority 가 같지않으면 priority가 낮은거부터 정렬하고
// 아니라면 id 가 낮은 순서로 정렬하게 만들었기때문에
// priority 가 1부터 시작해서 1이어도 id가 낮은거부터 정렬이 되게 만들었다