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

// 🧩 문제: 서버 연결 재시도 시스템 만들기
// 당신은 "게임 서버 접속 시스템"을 만들고 있다.

// 🎯 요구사항
// 🔹 1. 서버 연결 함수 만들기 (connectServer)
// 1초 후에 성공 또는 실패를 반환하는 Promise 사용
// 성공 확률: 70% (Math.random() > 0.3)
// 성공 시: "🟢 서버 접속 성공"
// 실패 시: Error("🔴 서버 접속 실패") reject

// 🔹 2. 접속 시스템 (main) 만들기
// 조건:
// ✔ 한 번의 접속 시도는 최대 5회까지 허용
// 실패할 때마다 다음 메시지 출력:
// "⛔ 접속 실패 (n번째 시도)"
// ✔ 5회 실패하면 3초 대기 후 자동으로 재접속을 다시 시작

// 메시지 출력:
// "🔄 5회 실패 — 3초 후 재시도합니다..."
// ✔ 연결 성공 시 프로그램 종료
// "🎉 서버 접속 완료!" 출력하고 종료.

// async function connectServer() {
//     const connect = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve("🟢 서버 접속 성공");
//         } else {
//             reject(new Error("🔴 서버 접속 실패"));
//         }
//     }, 1000));
//     return connect;
// }

// async function main() {
//     while (true) {
//         let attempts = 0;
//         while (attempts < 5) {
//             try {
//                 const result = await connectServer();
//                 console.log(result);
//                 console.log("🎉 서버 접속 완료!");
//                 return;
//             } catch {
//                 attempts++;
//                 console.log(`⛔ 접속 실패 (${attempts}번째 시도)`);
//                 if (attempts == 5) {
//                     console.log("🔄 5회 실패 — 3초 후 재시도합니다...");
//                     await new Promise(resolve => setTimeout(resolve, 3000));
//                 }
//             }
//         }
//     }
// }

// 🔥 문제: 자동 업데이트 시스템 구현하기
// 어떤 프로그램이 자동으로 업데이트를 진행하는데, 업데이트 과정은 아래 3단계를 거쳐야 한다.

// 📌 Step 1: 서버에서 최신 버전 확인
// 성공 확률: 70%
// 실패 시: 다시 시도 (최대 3회)
// 3회 모두 실패 → 업데이트 중단

// 📌 Step 2: 업데이트 파일 다운로드
// 성공 확률: 60%
// 실패 시: 다시 시도 (최대 5회)
// 5회 모두 실패 → Step1로 돌아가지 않음 (업데이트 중단)

// 📌 Step 3: 설치 진행
// 성공 확률: 80%
// 실패 시: 다시 시도 (최대 3회)
// 그래도 실패하면:
// "설치 오류 — 업데이트 취소" 출력 후 종료

// 요구사항

// 각 단계는 비동기 Promise + setTimeout 으로 만들 것
// 성공하면 “성공 메시지" 출력, 실패하면 (n번째 재시도 중...) 출력
// 단계별 재시도 횟수 초과 시 업데이트 실패 메시지 출력 후 종료
// 전체 업데이트 성공 시: 🎉 업데이트가 모두 완료되었습니다!

// async function checkVersion() {

//     let attempts = 0;
//     console.log(`버전 확인중...`);
//     while (attempts < 3) {
//         try {
//             const check = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.9;
//                 if (success) {
//                     resolve("✅ 최신버전 입니다!");
//                 } else {
//                     reject(new Error("실패!"));
//                 }
//             }, 1000));
//             return check;
//         } catch (error) {
//             attempts++;
//             console.log(`❌ 버전 확인실패 (${attempts}번째)`, error.message);
//             if (attempts === 3) {
//                 console.log(`⛔ 3회 전부 실패! 작업을 중단합니다.`);
//                 throw error;
//             }
//         }
//     }
// }

// async function downloadUpdate() {

//     console.log("업데이트 파일 확인중...");
//     for (let i = 0; i < 5; i++) {
//         try {
//             const download = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.4;
//                 if (success) {
//                     resolve("✅ 업데이트 파일 확인 완료!");
//                 } else {
//                     reject(new Error("실패!"));
//                 }
//             }, 1000));
//             return download;
//         } catch (error) {
//             console.log(`❌ 업데이트 실패 (${i}번째)`, error.message);
//             if (i === 4) {
//                 console.log(`⛔ 5회 전부 실패! 작업을 중단합니다.`);
//                 throw error;
//             }
//         }
//     }

// }

// async function installUpdate() {

//     console.log("설치중...");
//     for (let i = 0; i < 3; i++) {
//         try {
//             const install = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.2;
//                 if (success) {
//                     resolve("✅ 설치 완료!");
//                 } else {
//                     reject(new Error("실패!"));
//                 }
//             }, 1000));
//             return install;
//         } catch (error) {
//             console.log(`❌설치 실패 (${i}번째)`, error.message);
//             if (i === 2) {
//                 console.log("⛔설치 오류 — 업데이트 취소");
//                 throw error;
//             }
//         }
//     }

// }

// async function main() {
//     try {
//         const result1 = await checkVersion();
//         console.log(result1);
//         const result2 = await downloadUpdate();
//         console.log(result2);
//         const result3 = await installUpdate();
//         console.log(result3);
//         console.log("🎉 업데이트가 모두 완료되었습니다!");
//     } catch (error) {
//         console.log("⛔작업을 다시 시작해주세요.", error.message);
//     }
// }


// 문제 설명
// 웹 서비스에서 파일 업로드를 시도하는 상황을 시뮬레이션하는 코드 작성하기.
// 업로드는
// 1회 시도 시간: 1초
// 성공 확률: 70% (Math.random() > 0.3)
// 으로 설정한다.

// 🎯 요구사항
// 1. uploadFile() 함수 만들기
// 1초 후 랜덤하게 성공/실패
// 성공 시 "📁 업로드 성공!" 문자열 resolve
// 실패 시 "❌ 업로드 실패" Error 로 reject

// 2. main() 함수 만들기
// 업로드는 다음 규칙으로 이뤄진다:
// ✔ 규칙 1: 업로드는 최대 4번까지 시도
// 1~4회
// 성공하면 즉시 끝내고 "🎉 업로드 완료!" 출력 후 종료

// ✔ 규칙 2: 실패하면 시도 횟수 증가
// 실패할 때마다
// console.log("⛔ 업로드 실패 (N번째 시도)")

// ✔ 규칙 3: 4회 모두 실패하면
// "🚫 업로드 4회 실패 — 작업 중단"
// 출력하고 종료

// 🧩 추가 조건
// 반드시 async/await + try/catch + 반복문(for 또는 while) 포함
// return 또는 throw 를 적절히 활용해 흐름 제어

async function uploadFile() {
    const upload = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            resolve("📁 업로드 성공!");
        } else {
            reject(new Error("❌ 업로드 실패"));
        }
    }, 1000));
    return upload;
}

async function main() {
    for (let i = 0; i < 4; i++) {
        console.log(`📤 업로드 시도 중... (${i + 1}번째)`)
        try {
            const result = await uploadFile();
            console.log(result);
            console.log("🎉 업로드 완료!");
            return;
        } catch (error) {
            console.log(`⛔ 업로드 실패 (${i + 1}번째 시도)`, error.message);
            if (i === 3) {
                console.log("🚫 업로드 4회 실패 — 작업 중단");
            }
        }
    }
}