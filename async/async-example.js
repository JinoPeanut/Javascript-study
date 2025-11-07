
// 문제1.
// orderPizza()
// 2초 후에 피자 주문 결과를 랜덤하게 성공/실패로 반환한다.
// 성공 시 "pizza ready 🍕"를 resolve()로 전달
// 실패 시 "oven is broken 💥"을 reject()로 전달

// deliverPizza()
// 1초 후 "pizza delivered 🚗" 문자열을 resolve()로 반환

// main()
// orderPizza() 실행 → 성공 시 deliverPizza() 실행
// 모든 결과를 순서대로 console.log로 출력
// 실패 시 에러 메시지를 catch로 출력

// async function orderPizza() {
//     console.log("피자 주문중...");

//     const readypizza = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.5;
//         if (success) {
//             resolve("pizza ready🍕");
//         } else {
//             reject(new Error("oven is broken💥"));
//         }
//     }, 2000));
//     return readypizza;
// }

// async function deliverPizza() {
//     console.log("배달중...");
//     const deliver = await new Promise(resolve =>
//         setTimeout(() => resolve("pizza delivered🍕"), 2000));
//     return deliver;
// }

// async function main() {
//     try {
//         const ready = await orderPizza();
//         console.log(ready);
//         const goPizza = await deliverPizza();
//         console.log(goPizza);

//     } catch (error) {
//         console.log("에러발생: ", error.message);
//     }
// }
// main();

// 문제 2.
// makeJuice()
// 2초 후에 주스를 만들기 시작함을 출력
// 랜덤으로 50% 확률로 성공 / 실패 결정
// 성공 시: "Juice is ready 🧃"를 resolve()
// 실패 시: "Out of fruits 🍌"를 reject()

// serveJuice()
// 1초 후 "Serving juice to customer 🍹"를 resolve()로 반환

// main()
// makeJuice() 실행
// 성공 시 결과를 출력하고 serveJuice() 호출
// 모든 과정의 결과를 출력
// 실패 시 에러 메시지를 catch로 출력

// async function makeJuice() {
//     console.log("주스 만드는 중...");
//     const make = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.5;
//         if (success) {
//             resolve("Juice is ready 🧃");
//         } else {
//             reject(new Error("Out of fruits 🍌"));
//         }
//     }, 2000));
//     return make;
// }

// async function serveJuice() {
//     const serve = await new Promise(resolve =>
//         setTimeout(resolve("Serving juice to customer 🍹"), 1000));
//     return serve;
// }

// async function main() {
//     try {
//         const juicemake = await makeJuice();
//         console.log(juicemake);
//         const juiceserve = await serveJuice();
//         console.log(juiceserve);
//     } catch (error) {
//         console.log("에러발생: ", error.message);
//     }
// }

// main();

// 문제3.
// 아래 코드는 서버에서 사용자 정보를 불러오는 함수를 Promise로 흉내 낸 것이다.
// 이 함수를 수정해서 조건에 맞게 resolve 또는 reject를 호출하시오.

// 요구사항
// userId가 1~5 사이의 숫자면,
// 1.5초 후 resolve({ id: userId, name: "User" + userId })
// 형태로 반환해야 한다.

// 그 외의 숫자가 들어오면
// 1.5초 후 reject(new Error("유효하지 않은 사용자입니다."))
// 를 반환해야 한다.

// function fetchUserData(userId) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // 아래 코드를 작성하시오.
//             // 원래 코드: if(userId === 1 || userId === 2 || userId...) 이런식
//             // includes 는 숫자뿐만 아니라 ["안녕", "하세요"].includes(userId) 처럼
//             // 여러개의 문자열, bool 등 모든타입을 비교할 수 있다.
//             if ([1, 2, 3, 4, 5].includes(userId)) {
//                 resolve(`id: ${userId}, name: 'User${userId}'`);
//             } else {
//                 reject(new Error("유효하지 않은 사용자 입니다."));
//             }
//         }, 1500);
//     });
// }

// // 실행 예시
// fetchUserData(3)
//     .then((user) => console.log("✅ 사용자 정보:", user))
//     .catch((err) => console.log("❌ 오류:", err.message));

// fetchUserData();

// 몰랐던것: prompt 는 항상 문자열로 반환된다.
// 그래서 내가 3값을 입력으로 받고싶으면
// const id = prompt("enter your id"); 이후에
// fetchUserData(Number(id)) 처럼 Number를 붙여주지않으면 prompt 가 항상 문자열로 반환하기
// 때문에 실행오류가 생길 수 있다. 그래서 Number로 변환하기위해 적어둠

// includes 대소문자 구분없이 사용하고 싶을때는
// if(["안녕","하세요"].map(x => x.toLowerCase()).includes(userId.toLowerCase()))
// 이런식으로도 가능하다.

// 문제4.
// 영화 티켓 예매 시뮬레이터

// 🎬 당신은 온라인 영화관 시스템을 만들고 있습니다.
// 사용자가 영화 티켓을 예매하면:
// 좌석을 확인하고,
// 결제 진행 후,
// 성공하면 "🎟️ 예매 완료! 영화 즐감하세요!" 문구를 출력합니다.
// 단, 좌석이 없거나 결제가 실패할 수 있습니다.
// 아래 조건에 맞게 async / await 문법을 사용해서 작성하세요.

// 🎯 요구사항
// 1️⃣ checkSeat()
// 1초 후 좌석이 있는지 확인합니다.
// 랜덤으로 50% 확률로 성공(resolve("✅ 좌석 확인 완료")) 또는 실패(reject(new Error("❌ 좌석이 모두 찼습니다."))).

// 2️⃣ processPayment()
// 1.5초 후 결제 진행합니다.
// 랜덤으로 70% 확률로 성공(resolve("💳 결제 성공")) 또는 실패(reject(new Error("💥 결제 실패"))).

// 3️⃣ main()
// 위 두 함수를 순서대로 실행하고,
// 성공 시 "🎟️ 예매 완료! 영화 즐감하세요!" 출력
// 실패 시 에러 메시지를 출력하세요.

// async function checkSeat() {
//     console.log("좌석 확인중...");
//     const seat = await new Promise((resolve, reject) =>
//         setTimeout(() => {
//             const success = Math.random() > 0.5;
//             if (success) {
//                 resolve("✅ 좌석 확인 완료");
//             } else {
//                 reject(new Error("❌ 좌석이 모두 찼습니다."));
//             }
//         }, 1000))
//     return seat;
// }

// async function processPayment() {
//     console.log("결제 진행중...");
//     const payment = await new Promise((resolve, reject) =>
//         setTimeout(() => {
//             const success = Math.random() > 0.3;
//             if (success) {
//                 resolve("💳 결제 성공");
//             } else {
//                 reject(new Error("💥 결제 실패"));
//             }
//         }, 1500))
//     return payment;
// }

// async function main() {
//     try {
//         const check = await checkSeat();
//         console.log(check);
//         const process = await processPayment(check);
//         console.log(process);
//         console.log("🎟️ 예매 완료! 영화 즐감하세요!");
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// main();