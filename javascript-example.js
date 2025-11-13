// [문제 설명] 로그인 시도 (for + try-catch)
// 사용자는 총 3번 로그인 시도를 할 수 있다.
// 매번 랜덤하게 성공(비밀번호 일치) 또는 실패(비밀번호 틀림)가 결정된다.
// 3번 모두 실패하면 "계정 잠김" 메시지를 출력하라.

// async function loginAttempt() {
//     for (let i = 1; i <= 3; i++) {
//         try {
//             const login = await new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     const success = Math.random() > 0.5; // 50% 확률
//                     if (success) {
//                         resolve("✅ 로그인 성공!");
//                     } else {
//                         reject(new Error(`❌ 로그인 실패 (${i}번째 시도)`));
//                     }
//                 }, 1000);
//             });

//             console.log(login);
//             return "🎉 환영합니다!"; // 성공하면 함수 즉시 종료

//         } catch (error) {
//             console.log(error.message);
//             if (i === 3) {
//                 console.log("🚫 3회 이상 실패 — 계정이 잠겼습니다.");
//             }
//         }
//     }
// }

// loginAttempt();

// [응용 2단계] — while문 버전으로 바꿔보기

// async function loginAttempt() {
//     let attempts = 0;
//     let success = false;

//     while (!success && attempts < 3) {
//         try {
//             const login = await new Promise((resolve, reject) => setTimeout(() => {
//                 const rate = Math.random() > 0.5;
//                 if (rate) {
//                     resolve("✅로그인 성공");
//                 } else {
//                     reject(new Error(`❌ 로그인 실패 (${attempts + 1}번째 시도)`));
//                 }
//             }, 1000));

//             console.log(login);
//             return "🎉 환영합니다!"
//         } catch (error) {
//             console.log(error.message);
//             attempts++;
//             if (attempts === 3) {
//                 console.log("🚫 3회 이상 실패 — 계정이 잠겼습니다.");
//                 return "로그인 실패!";
//             }
//         }
//     }
// }

// loginAttempt();


// 문제: “로그인 재시도 + 자동 재시작 시스템”

// 요구사항:
// loginAttempt() 함수를 만들어라.
// 로그인 시도를 시뮬레이션한다.
// 실패 확률은 failRate (예: 0.3 = 30% 확률로 실패).
// 1초(1000ms) 후에 resolve("✅ 로그인 성공") 또는 reject(new Error("❌ 로그인 실패"))를 반환한다.

// main() 함수를 만들어라.
// 최대 3회까지 로그인 시도를 한다.
// 실패할 때마다 "로그인 실패 (n번째 시도)"를 출력한다.
// 3회 실패 시, "🚫 계정 잠김! 5초 후 자동 재시작..." 이라는 메시지를 출력하고
// 5초(5000ms) 기다린 뒤 자동으로 다시 로그인 시도를 처음부터 반복한다.
// 한 번이라도 성공하면 "🎉 로그인 성공, 시스템에 접속했습니다!"를 출력하고 프로그램을 종료한다.


// 연습풀이(함수가 하나일 경우)
// async function loginAttempt(failRate, time) {
//     let attempts = 0;
//     let success = false;

//     while (!success && attempts < 3) {
//         try {
//             const login = await new Promise((resolve, reject) => setTimeout(() => {
//                 const rate = Math.random() > failRate;

//                 if (rate) {
//                     resolve("✅ 로그인 성공");
//                 } else {
//                     reject(new Error(`❌ 로그인 실패 (${attempts + 1}번째 시도)`));
//                 }
//             }, time));
//             console.log(login);
//             return "🎉 로그인 성공, 시스템에 접속했습니다!";

//         } catch (error) {
//             attempts++;
//             if (attempts > 3) {
//                 console.log("🚫 계정 잠김! 5초 후 자동 재시작...", error.message);
//             }
//         }
//     }
// }

// async function loginAttempt() {
//     const login = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.9;
//         if (success) {
//             resolve("✅ 로그인 성공");
//         } else {
//             reject(new Error("❌ 로그인 실패"));
//         }
//     }, 1000));
//     return login;
// }

// async function main() {
//     let attempts = 0;
//     let loginSuccess = false;

//     while (!loginSuccess && attempts < 3) {
//         console.log(`🔐 로그인 시도 중... (${attempts + 1}번째)`)
//         try {
//             const result = await loginAttempt();
//             console.log(result);
//             console.log("🎉 로그인 성공, 시스템에 접속했습니다");
//             return;
//         } catch {
//             attempts++;
//             console.log(`❌ 로그인 실패 (${attempts}번째 시도)`);
//             if (attempts === 3) {
//                 console.log("🚫 계정 잠김! 5초 후 자동 재시작...");
//                 console.log("🔄 시스템 재시작...");
//             }
//         }
//     }
// }

// 메인함수 해답

// 루프 안에 루프를 만들어서 성공하면 루프가 중단 실패하면 자연스레 무한루프 되는 구조
// async function main() {
//     while (true) { // 시스템 전체 루프
//         let attempts = 0;
//         let loginSuccess = false;

//         while (!loginSuccess && attempts < 3) {
//             console.log(`🔐 로그인 시도 중... (${attempts + 1}번째)`);
//             try {
//                 const result = await loginAttempt();
//                 console.log(result);
//                 console.log("🎉 로그인 성공, 시스템에 접속했습니다");
//                 return;
//             } catch {
//                 attempts++;
//                 console.log(`❌ 로그인 실패 (${attempts}번째 시도)`);
//                 if (attempts === 3) {
//                     console.log("🚫 계정 잠김! 5초 후 자동 재시작...");
//                     await new Promise(r => setTimeout(r, 5000));
//                     console.log("🔄 시스템 재시작...");
//                 }
//             }
//         }
//     }
// }