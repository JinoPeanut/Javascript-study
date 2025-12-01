// ✅ 문제 7 — 유저 경험치(Exp) 업데이트 및 레벨업 검증 시스템 구현하기
// 🧩 지문
// 서버에서는 유저의 경험치(exp)를 업데이트하는 기능을 제공한다.
// 경험치는 100 이상이 될 경우 자동으로 레벨(level)이 1 상승한다.
// 하지만 경험치 업데이트는 종종 실패하거나 지연될 수 있기 때문에 다음의 요구사항에 맞춰 로직을 작성하시오.

// 📌 요구사항
// 1️⃣ updateExp(user)
// 70% 확률로 성공한다 (Math.random() > 0.3)
// 성공 시
// user.exp 에 랜덤 경험치 30~70 추가
// logs 배열에 "경험치 업데이트 성공" 추가
// 실패 시
// logs 배열에 "경험치 업데이트 실패" 추가

// 2️⃣ retryUpdateExp(user)
// updateExp 를 최대 3번 재시도
// 성공하면 즉시 반환
// 3번 실패하면 마지막 에러를 throw
// 각 시도 시 성공/실패 로그 추가

// 3️⃣ verifyLevelUp(user)
// user.exp ≥ 100 이면
// level += 1
// logs에 "레벨업 성공" 추가
// 아니면
// "레벨업 없음" 추가

// 4️⃣ withTimeout(promise, ms, user)
// 기존과 동일
// 일정 시간(ms) 초과 시 "시간 초과" 로그와 함께 실패 처리

// 5️⃣ process(user)
// retryUpdateExp → verifyLevelUp 순서로 호출
// try/catch 로 관리
// 실패 시 마지막 logs에 "최종 실패" 추가하고 throw

// 6️⃣ main()
// users 배열을 map 하여 병렬 처리
// 성공 리스트 / 실패 리스트 나눠 출력

// function updateExp(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         const plusExp = Math.random() * 40
//         if (success) {
//             resolve({
//                 ...user,
//                 exp: user.exp + Math.floor(plusExp + 30),
//                 logs: ["경험치 업데이트 성공"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: ["경험치 업데이트 실패"],
//             });
//         }
//     }, 100));
// }

// async function retryUpdateExp(user) {
//     let lastErr = null;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const result = await updateExp(user);
//             return {
//                 ...result,
//                 logs: [...(result.logs ?? []), `재시도 성공 (${i + 1}회)`]
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `재시도 실패 (${i + 1}회)`],
//             }
//         }
//     }
//     throw lastErr;
// }

// function verifyLevelUp(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         if (user.exp >= 100) {
//             resolve({
//                 ...user,
//                 level: user.level + 1,
//                 logs: [...(user.logs ?? []), "레벨업 성공"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: [...(user.logs ?? []), "레벨업 없음"],
//             });
//         }
//     }, 100));
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

// async function process(user) {
//     try {
//         const result = await withTimeout(retryUpdateExp(user), user.timeout, user);
//         const result2 = await verifyLevelUp(result);
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
//         { name: "철수", exp: 10, level: 1, timeout: 500 },
//         { name: "영희", exp: 50, level: 2, timeout: 400 },
//         { name: "민수", exp: 90, level: 3, timeout: 600 },
//         { name: "지우", exp: 20, level: 1, timeout: 450 },
//         { name: "하늘", exp: 0, level: 1, timeout: 350 },
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

// ✅ 문제 8 — 출석 보상 지급 시스템 구현
// 유저는 하루에 한 번 출석 체크를 하면 일정 보상을 받는다.
// 하지만 서버가 불안정해서 출석 체크 API가 실패할 수 있으며,
// 보상 지급도 실패할 수 있다.
// 아래 조건에 맞게 재시도, 타임아웃, 검증 단계를 추가하여 전체 로직을 완성하라.

// 🎯 구현해야 할 함수 목록
// 1) checkAttendance(user)
// 200ms 후 랜덤으로 성공/실패한다.
// 성공일 경우:
// {
//   ...user,
//   attended: true,
//   logs: ["출석 체크 성공"]
// }
// 실패일 경우:
// {
//   ...user,
//   logs: ["출석 체크 실패"]
// }

// 2) retryAttendance(user)
// 최대 3번 재시도
// 성공하면:
// 성공 로그 추가: "출석 재시도 X회 성공"
// 실패하면:
// 실패 로그 추가: "출석 재시도 X회 실패"
// 마지막 실패는 throw

// 3) giveAttendanceReward(user)
// 출석 성공(attended === true)인 경우 일정 포인트 지급:
// 기본 200 포인트 + 랜덤 0~100 추가
// 성공 시:

// {
//   ...user,
//   point: user.point + 지급된 포인트,
//   logs: [..., "보상 지급 성공"]
// }
// 실패 시:

// {
//   ...user,
//   logs: [..., "보상 지급 실패"]
// }

// 4) verifyReward(user)
// point 변화가 0보다 크면 인증 성공
// 아니면 인증 실패

// 5) withTimeout(promise, ms, user)
// 이전 문제들과 동일하게 Promise.race 로 구성

// 6) process(user)
// 흐름은 다음과 같아야 한다:
// 출석 체크 재시도 (타임아웃 적용)
// 보상 지급
// 보상 검증
// 최종 실패 시 로그 "최종 실패" 추가

// 7) main()
// 아래 users 배열을 사용
// 성공/실패 리스트를 출력

function checkAttendance(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve({
                ...user,
                attended: true,
                logs: ["출석 체크 성공"],
            });
        } else {
            reject({
                ...user,
                attended: false,
                logs: ["출석 체크 실패"],
            });
        }
    }));
}

async function retryAttendance(user) {
    let lastErr = null;
    for (let i = 0; i < 3; i++) {
        try {
            const result = await checkAttendance(user);
            return {
                ...result,
                logs: [...(user.logs ?? []), `출석 재시도 ${i + 1}회 성공`],
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `출석 재시도 ${i + 1}회 실패`],
            }
        }
    }
    throw lastErr;
}

function giveAttendanceReward(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const pointPlus = Math.floor(Math.random() * 101);
        if (user.attended === true) {
            resolve({
                ...user,
                point: user.point + 200 + pointPlus,
                logs: [...(user.logs ?? []), "보상 지급 성공"],
            });
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "보상 지급 실패"],
            });
        }
    }))
}

function verifyReward(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.point > 0) {
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
    }))
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
        const result1 = await withTimeout(retryAttendance(user), user.timeout, user);
        const result2 = await giveAttendanceReward(result1);
        const result3 = await verifyReward(result2);
        return result3;
    } catch (error) {
        throw {
            ...error,
            logs: [...(error.logs ?? []), "최종 실패"],
        }
    }
}

async function main() {
    const users = [
        { name: "철수", point: 0, timeout: 500 },
        { name: "영희", point: 300, timeout: 600 },
        { name: "민수", point: 100, timeout: 450 },
        { name: "지우", point: 50, timeout: 400 },
        { name: "하늘", point: 0, timeout: 350 },
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