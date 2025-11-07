// 예제 문제: “온라인 주문 처리 시스템”

// 너는 온라인 쇼핑몰의 주문 로직을 구현해야 해.
// 고객이 상품을 주문하면 다음 순서로 비동기 작업이 진행된다.

// ✅ 요구사항
// 재고 확인 (checkStock)
// “재고 확인중...” 로그 출력
// 1초 후 70% 확률로 성공
// 성공 시 "✅ 재고 있음" 리턴
// 실패 시 "❌ 품절되었습니다." 에러 발생

// 결제 처리 (processPayment)
// “결제 진행중...” 로그 출력
// 1.5초 후 60% 확률로 성공
// 성공 시 "💳 결제 완료" 리턴
// 실패 시 "💥 결제 실패" 에러 발생

// 배송 시작 (startDelivery)
// “배송 준비중...” 로그 출력
// 1초 후 80% 확률로 성공
// 성공 시 "🚚 배송 시작!" 리턴
// 실패 시 "❌ 배송 오류" 에러 발생

// main 함수
// try~catch 구문으로 세 단계를 순서대로 실행.
// 하나라도 실패하면 즉시 에러 메시지를 콘솔에 출력하고 종료.
// 모두 성공하면 "🎉 주문 완료!" 출력.

// async function checkStock() {
//     console.log("재고 확인중...");
//     const stock = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;

//         if (success) {
//             resolve("✅ 재고 있음");
//         } else {
//             reject(new Error("❌ 품절되었습니다."));
//         }
//     }, 1000))
//     return stock;
// }

// async function processPayment() {
//     console.log("결제 진행중...");
//     const payment = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.4;

//         if (success) {
//             resolve("💳 결제 완료");
//         } else {
//             reject(new Error("💥 결제 실패"));
//         }
//     }, 1500))
//     return payment;
// }

// async function startDelivery() {
//     console.log("배송 준비중...");
//     const delivery = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;

//         if (success) {
//             resolve("🚚 배송 시작!");
//         } else {
//             reject(new Error("❌ 배송 오류"));
//         }
//     }, 1000))
//     return delivery;
// }

// async function main() {
//     try {
//         const start = await checkStock();
//         console.log(start);
//         const process = await processPayment(start);
//         console.log(process);
//         const deliver = await startDelivery(process);
//         console.log(deliver);
//         console.log("🎉 주문 완료!");
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// main();

// 문제: “영화관 준비 시스템”

// cleanHall() — 2초 걸리며 70% 확률로 성공

// makePopcorn() — 1.5초 걸리며 80% 확률로 성공

// prepareProjector() — 2초 걸리며 90% 확률로 성공

// 이 세 가지 작업을 동시에(Promise.all) 실행해서
// 모두 성공하면 "🎬 모든 준비 완료! 영화 시작!"
// 하나라도 실패하면 "❌ 준비 중 오류 발생: {에러 메시지}"를 출력하도록 만들어보세요.

// async function cleanHall() {
//     const hall = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류 발생"));
//         }
//     }, 2000));
//     return hall;
// }

// async function makePopcorn() {
//     const popcorn = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류 발생"));
//         }
//     }, 1500));
//     return popcorn;
// }

// async function prepareProjector() {
//     const projector = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.1;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류발생"));
//         }
//     }, 2000));
//     return projector;
// }

async function randomTask(taskName, failRate, time) {
    const result = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > failRate;
        if (success) {
            resolve(`${taskName} 완료`);
        } else {
            reject(new Error(`${taskName} 실패`));
        }
    }, time));
    return result;
}

async function main() {
    try {
        const results = await Promise.all([
            randomTask("홀 청소", 0.3, 2000),
            randomTask("팝콘 만들기", 0.2, 1500),
            randomTask("상영 준비", 0.1, 2000),
        ]);

        results.forEach(msg => console.log(msg));

        console.log("🎬 모든 준비 완료! 영화 시작!");
    } catch (error) {
        console.log(`❌ 준비 중 오류 발생: ${error.message}`);
    }
}
main();