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

async function loginAttempt() {
    let attempts = 0;
    let success = false;

    while (!success && attempts < 3) {
        try {
            const login = await new Promise((resolve, reject) => setTimeout(() => {
                const rate = Math.random() > 0.5;
                if (rate) {
                    resolve("✅로그인 성공");
                } else {
                    reject(new Error(`❌ 로그인 실패 (${attempts + 1}번째 시도)`));
                }
            }, 1000));

            console.log(login);
            return "🎉 환영합니다!"
        } catch (error) {
            console.log(error.message);
            attempts++;
            if (attempts === 3) {
                console.log("🚫 3회 이상 실패 — 계정이 잠겼습니다.");
                return "로그인 실패!";
            }
        }
    }
}

loginAttempt();