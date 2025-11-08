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

// async function randomTask(taskName, failRate, time) {
//     const result = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve(`${taskName} 완료`);
//         } else {
//             reject(new Error(`${taskName} 실패`));
//         }
//     }, time));
//     return result;
// }

// async function main() {
//     try {
//         const results = await Promise.all([
//             randomTask("홀 청소", 0.3, 2000),
//             randomTask("팝콘 만들기", 0.2, 1500),
//             randomTask("상영 준비", 0.1, 2000),
//         ]);

//         results.forEach(msg => console.log(msg));

//         console.log("🎬 모든 준비 완료! 영화 시작!");
//     } catch (error) {
//         console.log(`❌ 준비 중 오류 발생: ${error.message}`);
//     }
// }
// main();

// 문제: 서버 점검 시스템 만들기
// 💻 시나리오

// 당신은 3개의 서버를 동시에 점검해야 하는 엔지니어입니다.
// 서버들은 각각 불안정해서 점검 중 실패할 수도 있습니다.

// 아래 세 가지 함수를 만들어보세요 👇

// checkDatabase()
// 2초 후 "✅ Database 연결 성공"
// 실패 확률 20% (failRate = 0.2)

// checkAPI()
// 1.5초 후 "✅ API 서버 응답 정상"
// 실패 확률 30%

// checkFrontend()
// 1초 후 "✅ 프론트엔드 서버 정상"
// 실패 확률 10%

// 🧠 요구사항
// 세 함수를 동시에 실행해야 함 → Promise.all() 사용.
// 모든 서버가 성공하면
// 👉 console.log("🎉 모든 서버가 정상적으로 작동 중입니다!")
// 하나라도 실패하면
// 👉 console.log("🚨 서버 점검 중 오류 발생:", error.message)
// 성공한 서버들의 로그는 각각 콘솔에 출력되어야 함
// (예: “✅ Database 연결 성공”)

// async function checkDatabase(failRate) {
//     const check = await new Promise((resolve, reject) =>
//         setTimeout(() => {
//             const success = Math.random() > failRate;
//             if (success) {
//                 resolve("✅ Database 연결 성공");
//             } else {
//                 reject(new Error("연결 실패"));
//             }
//         }), 2000);
//     return check;
// }

// async function checkAPI(failRate) {
//     const api = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve("✅ API 서버 응답 정상");
//         } else {
//             reject(new Error("응답 없음"));
//         }
//     }, 1500));
//     return api;
// }

// async function checkFrontend(failRate) {
//     const front = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve("✅ 프론트엔드 서버 정상");
//         } else {
//             reject(new Error("서버 비정상"));
//         }
//     }, 1000));
//     return front;
// }

// async function checkTotal(failRate, successMsg, failMsg, time) {
//     const total = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve(successMsg);
//             // resolve 내에서 백택 `` 을 쓰는경우는
//             // resolve(`메세지: ${successMsg}`); 같이 추가적인 문자열이 들어왔을때다.
//             // 그게 아니라면 successMsg 는 기본적으로 문자열이 들어갈테니 백텍이 필요없음
//         } else {
//             reject(new Error(failMsg));
//         }
//     }, time));
//     return total;
// }

// async function main() {
//     try {
//         const results = await Promise.all([
//             checkTotal(0.2, "✅ Database 연결 성공", "연결 실패", 2000),
//             checkTotal(0.3, "✅ API 서버 응답 정상", "응답 없음", 1500),
//             checkTotal(0.1, "✅ 프론트엔드 서버 정상", "서버 비정상", 1000),
//         ]);
//         results.forEach(msg => console.log(msg));
//         console.log("🎉 모든 서버가 정상적으로 작동 중입니다!");
//     } catch (error) {
//         console.log(`🚨 서버 점검 중 오류 발생: ${error.message}`);
//     }
// }
// main();

// 예제 문제: "서버 응답 경쟁 시스템"

// 세 개의 서버 중 가장 먼저 응답한 서버의 결과만 사용하려고 한다.
// (예: CDN, 백업 서버 등 여러 서버 중 빠른 서버만 채택하는 상황)

// 🧩 요구사항
// randomServer(serverName, failRate, time) 함수를 만들어라.
// 일정 시간이 지난 뒤 Math.random()을 이용해 성공/실패를 결정한다.
// 성공 시: "✅ ${serverName} 서버 응답 성공"
// 실패 시: Error("${serverName} 서버 응답 실패")

// failRate 는 실패 확률(예: 0.2 → 20% 확률로 실패)
// main() 함수 안에서 Promise.race() 를 사용하라.
// 세 개의 서버 (서버A, 서버B, 서버C) 를 동시에 요청 보낸다.
// 가장 먼저 응답한 서버의 결과만 출력한다.
// 실패한 경우에는 "❌ 모든 서버에서 오류 발생" 이라고 출력한다.

async function randomServer(serverName, failRate, time) {
    const server = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > failRate;
        if (success) {
            resolve(`✅ ${serverName} 서버 응답 성공 (${(time / 1000).toFixed(1)})초`);
            // 몇초가 걸렸는지 표시하는 방식으로 .toFixed 를 사용했다.
            // 괄호 안에 1은 소숫점 1자리까지 표시한다는 뜻이며
            // 0으로 하면 소숫점없이 보여준다.
        } else {
            reject(new Error(`${serverName} 서버 응답 실패`));
        }
    }, time));
    return server;
}

async function main() {
    try {
        const results = await Promise.race([
            randomServer("A", 0.2, 1000),
            randomServer("B", 0.2, 1300),
            randomServer("C", 0.2, 1600),
        ]);
        console.log(results);
    } catch (error) {
        console.log("❌ 모든 서버에서 오류 발생");
    }
}
main();