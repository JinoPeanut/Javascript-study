// ⭐ 다음 문제: “쿠폰 발급 시스템 만들기”
// 📌 지문
// 어떤 사용자에게 쿠폰을 발급하는 시스템을 만든다.

// generateCoupon(user)
// 0.6 확률로 성공
// 성공하면:
// { ...user, coupon: "DISCOUNT10", logs: [...(user.logs ?? []), "쿠폰 발급 성공"] }
// 실패하면:
// { ...user, logs: [...(user.logs ?? []), "쿠폰 발급 실패"] }
// 로 reject 한다.

// retryCoupon(user)
// 쿠폰 발급이 실패하면 최대 3번까지 재시도
// 성공하면 즉시 반환
// 3번 모두 실패하면 마지막 실패 정보를 throw
// 각 시도 마다 logs 에:
// 성공 시 "쿠폰 발급 시도 성공(i회)"
// 실패 시 "쿠폰 발급 시도 실패(i회)"
// ※ i는 1부터 시작 (1,2,3)

// withTimeout(promise, ms, user)
// ms 시간 안에 promise가 완료되지 않으면 reject
// reject 시 logs 에 "시간 초과" 추가

// validateCoupon(user)
// coupon 값에 따라 다른 보상을 설정해라:
// "DISCOUNT10" → reward: 10
// 이 외의 쿠폰 → reward: 0

// processUser(user)
// retryCoupon(user)를 timeout과 함께 실행
// 이후 validateCoupon(user) 실행
// 오류 발생 시 logs에 "최종 실패" 추가하고 throw

// main()
// users 배열을 돌면서
// 성공/실패를 분리해 콘솔에 출력

// 📌 요구사항 정리
// try/catch 반드시 async 함수 안에서만 사용
// await 빠뜨리지 말 것
// logs는 항상 배열로 누적
// 재시도 횟수 i는 1부터 시작
// timeout과 retry 순서 헷갈리지 말기
// validateCoupon은 쿠폰이 없을 수도 있으므로 안전하게 처리

// function generateCoupon(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.4;
//         if (success) {
//             resolve({
//                 ...user,
//                 coupon: "10% 할인",
//                 logs: ["쿠폰 발급 성공"]
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: ["쿠폰 발급 실패"],
//             });
//         }
//     }, 100));
// }

// async function retryCoupon(user) {
//     let lastErr = null;
//     for (i = 1; i <= 3; i++) {
//         try {
//             const result = await generateCoupon(user);
//             return {
//                 ...result,
//                 logs: [...(user.logs ?? []), `쿠폰 발급 시도 성공 (${i}회)`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `쿠폰 발급 시도 실패(${i}회)`],
//             }
//         }
//     }
//     throw lastErr;
// }

// function withTimeout(promise, ms, user) {
//     const timeout = new Promise((_, reject) => setTimeout(() => {
//         reject({
//             ...user,
//             logs: [...(user.logs ?? []), "시간 초과"],
//         });
//     }, ms));
//     return Promise.race([promise, timeout]);
// }

// function validateCoupon(user) {
//     return new Promise((resolve) => setTimeout(() => {
//         if (user.coupon === "10% 할인") {
//             resolve({
//                 ...user,
//                 reward: 10,
//             });
//         } else {
//             resolve({
//                 ...user,
//                 reward: 0,
//             });
//         }
//     }, 100));
// }

// async function process(user) {
//     try {
//         const result = await withTimeout(retryCoupon(user), user.timeout, user);
//         const result2 = await validateCoupon(result);
//         return result2;
//     } catch (error) {
//         throw {
//             ...error,
//             logs: [...(error.logs ?? []), "최종 실패"],
//         }
//     }
// }

// async function main() {
//     const users = [
//         { name: "철수", timeout: 300 },
//         { name: "영희", timeout: 400 },
//         { name: "민수", timeout: 200 },
//         { name: "지우", timeout: 350 },
//     ];

//     const successList = [];
//     const failList = [];

//     const promises = users.map(user =>
//         process(user)
//             .then(res => successList.push(res))
//             .catch(err => failList.push(err))
//     )
//     await Promise.all(promises);

//     console.log("===성공===");
//     successList.forEach(s => console.log(s));

//     console.log("===실패===");
//     failList.forEach(f => console.log(f));
// }


// 🔥 문제  — “회원가입 + 이메일 인증 흐름 만들기”

// ✅ 요구사항
// 🔹 1. sendEmail(user)
// 70% 확률로 성공
// 성공 시 결과 객체에 "이메일 전송 성공" 로그 남김
// 실패 시 "이메일 전송 실패" 로그 남김
// 200ms 딜레이 후 resolve/reject

// 🔹 2. verifyEmail(user)
// user.emailSent === true 일 때만 성공
// 성공 시 "인증 성공" 로그 추가
// 실패 시 "인증 실패" 로그 추가
// 150ms 딜레이

// 🔹 3. retryEmail(user)
// 이메일 전송을 최대 2번까지 재시도(총 3회)
// 성공하면 emailSent: true 추가
// 실패하면 마지막 error를 throw
// ❗ 오타 금지, async/await 필수, 반복 횟수 정확히 3회

// 🔹 4. withTimeout(promise, ms, user)
// 주어진 promise가 ms 안에 끝나지 않으면 "시간 초과" 로그와 함께 reject
// Promise.race 사용

// 🔹 5. process(user)
// 순서:
// retryEmail → (성공 or 실패)
// verifyEmail → (성공 or 실패)
// 실패할 경우 "최종 실패" 로그 추가 후 throw

// 🔹 6. main()
// 다음 users 배열을 순회
// 각 user는 다음 속성을 가짐:
// { name: "철수", timeout: 500 }
// 성공/실패 리스트에 분류
// 마지막에 성공/실패 콘솔 출력

function sendEmail(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            resolve({
                ...user,
                logs: ["이메일 전송 성공"],
            });
        } else {
            reject({
                ...user,
                logs: ["이메일 전송 실패"],
            });
        }
    }, 200));
}

async function retryEmail(user) {
    let lastErr = null;
    for (i = 0; i < 2; i++) {
        try {
            const result = await sendEmail(user);
            return {
                ...result,
                emailSent: true,
            }
        } catch (error) {
            lastErr = {
                ...error,
                emailSent: false,
            }
        }
    }
    throw lastErr;
}

function verifyEmail(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.emailSent === true) {
            resolve({
                ...user,
                logs: [...(user.logs ?? []), "인증 성공"],
            });
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "인증 실패"],
            });
        }
    }, 150));
}

function withTimeout(promise, ms, user) {
    const timeout = new Promise((_, reject) => setTimeout(() => {
        reject({
            ...user,
            logs: [...(user.logs ?? []), "시간 초과"],
        });
    }, ms));
    return Promise.race([promise, timeout]);
}

async function process(user) {
    try {
        const result = await withTimeout(retryEmail(user), user.timeout, user);
        const result2 = await verifyEmail(result);
        return result2;
    } catch (error) {
        throw {
            ...error,
            logs: [...(error.logs ?? []), "최종 실패"],
        }
    }
}

async function main() {
    const users = [
        { name: "철수", timeout: 500 },
        { name: "영희", timeout: 600 },
        { name: "민수", timeout: 400 },
        { name: "지우", timeout: 550 },
        { name: "준호", timeout: 450 },
    ];

    const successList = [];
    const failList = [];

    const promises = users.map(user =>
        process(user)
            .then(res => successList.push(res))
            .catch(err => failList.push(err))
    )
    await Promise.all(promises);

    console.log("===성공===");
    successList.forEach(s => console.log(s));

    console.log("===실패===");
    failList.forEach(f => console.log(f));
}

// 느낀점 및 알게된점

// 오늘도 비슷한 문제로 복습한 것 뿐이라 크게 달라진점은 없었으나 아직까지
// 함수 호출중에 await을 빼먹는다던가 자잘한 문자열을 잘못쓴다던가 그런 실수가 많았다.
// 요즘들어서 코딩할때 넋을 놓고 코딩을 하는게 잦아진거같다. 난이도가 이젠 좀 쉬워진건지
// 아니면 생활패턴에 문제가 있는건지 집중이 되지않는다. 어려운문제를 풀던지
// 밥먹기 전에 공부를 하던지 해야할 것 같다. 공부는 하고있지만 습득은 50%밖에 되지않는
// 느낌이다. 조금 더 집중할 필요성을 느낀다.