// 🔥 문제 — “동시 처리 + 재시도 + 검증”
// 유저가 접속했을 때 두 가지 일을 동시에 해야 한다:
// 출석 체크(checkAttendance)
// 게임 접속 보너스 지급(giveLoginBonus)
// 두 작업 모두 비동기로 동작하고 각각 실패할 수 있다.
// 그리고 둘 중 하나라도 실패하면 그 작업은 각자 최대 3번 재시도 해야 한다.

// 📌 전체 흐름
// retryAttendance(user)
// 출석 체크 retry 로직(3번), 성공하면 결과 반환
// 실패하면 에러 throw

// retryLoginBonus(user)
// 로그인 보너스 지급 retry 로직(3번), 성공하면 결과 반환
// 실패하면 에러 throw
// 두 작업을 동시에 실행:
// const [attendanceResult, bonusResult] = await Promise.all([
//     withTimeout(retryAttendance(user), user.timeout, user),
//     withTimeout(retryLoginBonus(user), user.timeout, user),
// ]);

// verifyLogin(user)
// attendanceResult.attended === true
// bonusResult.bonus > 0
// 둘 다 만족하면 성공
// 하나라도 부족하면 실패
// process → 성공하면 최종 user 리턴
// 실패하면 logs 에 "최종 실패" 추가 후 throw

// 📌 조건
// checkAttendance
// 50 % 확률로 성공
// 성공하면 attended: true, 실패하면 attended: false
// giveLoginBonus
// 40 % 확률로 성공
// 성공하면
// bonus: user.bonus + (100~300 랜덤)

// 실패하면
// bonus 변경 없음
// retryLoginBonus(user)
// 3회 시도
// 성공 시 로그 "보너스 시도 X회 성공"
// 실패 시 로그 "보너스 시도 X회 실패"

// verifyLogin(user)
// 조건 만족 시 "인증 성공"
// 아니면 "인증 실패"

// function checkAttendance(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.5;
//         if (success) {
//             resolve({
//                 ...user,
//                 attended: true,
//                 logs: ["출석 체크 완료"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 attended: false,
//                 logs: ["출석 체크 실패"],
//             })
//         }
//     }));
// }

// function giveLoginBonus(user) {
//     const loginBonus = Math.floor(Math.random() * 200) + 1;
//     return new Promise((resolve, reject) => setTimeout(() => {
//         if (user.attended === true) {
//             resolve({
//                 ...user,
//                 point: (user.point ?? 0) + loginBonus,
//                 logs: [...(user.logs ?? []), "보너스 지급 성공"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: [...(user.logs ?? []), "보너스 지급 실패"],
//             });
//         }
//     }, 100));
// }

// async function retryAttendance(user) {
//     let lastErr = null;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const result = await checkAttendance(user);
//             return {
//                 ...result,
//                 logs: [...(result.logs ?? []), `출석체크 재시도 성공 (${i + 1}회)`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `출석체크 재시도 실패 (${i + 1}회)`],
//             }
//         }
//     }
//     throw lastErr;
// }

// async function retryLoginBonus(user) {
//     let lastErr = null;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const result = await giveLoginBonus(user);
//             return {
//                 ...result,
//                 logs: [...(result.logs ?? []), `보너스 지급 성공 : 재시도 (${i + 1}화)`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `보너스 지급 실패 : 재시도 (${i + 1}회)`],
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

// function verifyLogin(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         if (attendanceResult.attended === true && bonusResult.point > 0) {
//             resolve({
//                 ...user,
//                 logs: [...(user.logs ?? []), "인증 성공"]
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: [...(user.logs ?? []), "인증 실패"],
//             });
//         }
//     }));
// }

// async function process(user) {
//     try {
//         const [attendanceResult, bonusResult] = await Promise.all([
//             withTimeout(retryAttendance(user), user.timeout, user),
//             withTimeout(retryLoginBonus(user), user.timeout, user),
//         ]);

//         return await verifyLogin(attendanceResult, bonusResult);
//     } catch (error) {
//         throw {
//             ...error,
//             logs: [...(error.logs ?? []), "최종 실패"],
//         }
//     }
// }

// async function main() {
//     const users = [
//         { name: "철수", bonus: 0, timeout: 500 },
//         { name: "영희", bonus: 100, timeout: 600 },
//         { name: "민수", bonus: 50, timeout: 450 },
//         { name: "지우", bonus: 0, timeout: 550 },
//         { name: "하늘", bonus: 200, timeout: 400 },
//     ];

//     const successList = [];
//     const failList = [];

//     const promises = users.map(user =>
//         process(user)
//             .then(res => successList.push(res))
//             .catch(err => failList.push(err))
//     );
//     await Promise.all(promises);

//     console.log("===성공===");
//     successList.forEach(s => console.log(s));
//     console.log("===실패===");
//     failList.forEach(f => console.log(f));
// }

// 🎯 문제 — “아이템 강화 시스템 만들기”
// 게임에서 흔히 있는 아이템 강화 로직을 비동기로 구현하는 문제야.
// ✔️ 기능 요구사항
// 1) 강화 함수 createEnhance(user)
// 0~1 사이의 랜덤값으로 강화 성공 여부 판단
// 성공 확률은 50%
// 성공 시:
// itemLevel + 1
// 로그에 "강화 성공"
// 실패 시:
// 실패만 있고 페널티 없음
// 로그에 "강화 실패"
// resolve 또는 reject 둘 다 가능하게 만들 것

// 2) 재시도 함수 retryEnhance(user)
// 최대 3번 강화 시도
// 성공하면 즉시 return
// 실패하면 다음 회차 반복
// 3회 모두 실패하면 마지막 실패 결과 throw
// 로그 예:
// "강화 재시도 1회 실패"
// "강화 재시도 2회 성공"

// 3) 검증 함수 verifyEnhance(user)
// itemLevel 이 5 이상이면 성공
// 성공:
// "아이템 검증 성공"
// 실패:
// "아이템 검증 실패"

// 4) withTimeout() 사용
// 강화 재시도는 timeout 처리하도록 구성
// (지금까지 만든 withTimeout 함수 그대로 활용)

// 5) process(user)
// 전체 흐름:
// retryEnhance
// verifyEnhance
// 성공하면 결과 return
// 실패하면 “최종 실패” 로그 추가한 후 throw

function createEnhance(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve({
                ...user,
                itemLevel: user.itemLevel + 1,
                logs: ["강화 성공!"],
            });
        } else {
            reject({
                ...user,
                logs: ["강화 실패"],
            });
        }
    }));
}

async function retryEnhance(user) {
    let lastErr = null;
    for (let i = 0; i < 3; i++) {
        try {
            const result = await createEnhance(user);
            return {
                ...result,
                logs: [...(result.logs ?? []), `강화 재시도 ${i + 1}회 성공`]
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `강화 재시도 ${i + 1}회 실패`]
            }
        }
    }
    throw lastErr;
}

function verifyEnhance(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.itemLevel >= 5) {
            resolve({
                ...user,
                logs: [...(user.logs ?? []), "아이템 검증 성공"],
            });
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "아이템 검증 실패"],
            });
        }
    }));
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
        const result = withTimeout(retryEnhance(user), user.timeout, user);
        const result2 = withTimeout(verifyEnhance(result), user.timeout, result);
        return result2;
    } catch (error) {
        throw {
            ...error,
            logs: [...(error.logs ?? []), "최종 실패"]
        }
    }
}

async function main() {
    const users = [
        { name: "철수", itemLevel: 2, timeout: 500 },
        { name: "영희", itemLevel: 4, timeout: 600 },
        { name: "민수", itemLevel: 1, timeout: 450 },
        { name: "지우", itemLevel: 3, timeout: 550 },
        { name: "하늘", itemLevel: 0, timeout: 400 },
    ];

    const successList = [];
    const failList = [];

    const promises = users.map(user =>
        process(user)
            .then(res => successList.push(res))
            .catch(err => failList.push(err))
    );

    await Promise.all(promises);

    console.log("===성공===");
    successList.forEach(s => console.log(s));

    console.log("===실패===");
    failList.forEach(f => console.log(f));
}

// 느낀점 및 알게된 점

// 함수 두개를 Promise.all 하는것과 const result1 , const result2 로 나눠서 하는것에는
// 당연히 차이가 있었다. 첫번째 문제를 풀때 재시도 함수가 2개 있었고 두개는 선행작업이 필요
// 없는것이어서 process 함수에서 Promise.all 로 병렬 실행을 한 것이었는데
// 두번째 문제처럼 두개 다 타임아웃을 적용하고싶고 선행작업이 필요한 함수끼리 있다면
// 두번째 문제의 process 함수처럼 내부에 호출한 두개의 함수를 따로 분리해줄 필요가 있었다.
// 잠깐동안 Promise.all 이 병렬실행이라는 것을 까먹고 단순히 한꺼번에 실행한다는 생각만 하고
// 있었던듯 하다.

// procss 함수에서 두번째 함수를 호출할때 왜 enhancedUser.timeout 이 아니라 user.timeout 인가
// 에 대해서 생각해보았고 이유를 찾아보았는데 user.timeout 은 기본적으로 오브젝트안에 기본적으로
// 설정된 값이 들어가있기도 하며 enhancedUser 는 설정된값이 없고 로그나 상태가 추가된 가공
// 된 객체이기 때문이다. 즉 user.timeout 은 불변하는 고정된 값이기에 사용가능하지만
// enhancedUser.timeout 으로 써버리면 계속된 계승으로 항상 값이 바뀌기때문에 가공된 값으로써
// 고정된 값만 사용해야하는 타임아웃에는 맞지않는 문장이 되는것이다. 적어보면서도 솔직히
// 어렵지만 결국엔 내가 숫자를 직접 입력하든 또는 오브젝트로 고정값을 만들어놓고 user.timeout
// 을 주던 결국 둘다 고정된 값이기에 결론적으로만 보면 변화될 값이 아닌 상시 고정된 값만
// 사용 가능하다는 것 이다.

// user.timeout 은 타임아웃관련 값 1개만 들어있음.
// enhancedUser 는 logs와 itemLevel 등 변하는 값도 같이 들어있음
// user.timeout 이 신뢰할 수 있는 고정값이라 더 적합하다.