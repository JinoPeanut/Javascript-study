// ✅ 문제 — “유저 데일리 미션 처리 시스템 만들기”
// 유저가 게임에 접속하면 아래 3가지 데일리 미션을 자동으로 처리하는 시스템을 만들어야 한다.
// 각 미션은 모두 비동기 함수로 되어 있으며, 다음 조건을 만족해야 한다.

// 📌 요구사항
// 1. 데일리 미션 목록
// 데일리 미션은 다음과 같은 세 가지이다:
// 출석 체크(attendance)
// 접속 보너스 지급(loginBonus)
// 데일리 퀘스트 보상 지급(dailyQuestReward)
// 각 함수는 성공하거나 실패할 수 있으며, 실패 시 재시도가 필요하다.

// 2. 각 미션의 기본 규칙
// 재시도 횟수: 3회
// 각각의 함수는 처리 시간이 랜덤하게 100~500ms 지연된다.
// 30 % 확률로 실패하고 reject 되어야 한다.
// 성공 시 로그 메시지 1개 추가하기
//     (예: "출석 체크 완료", "접속 보너스 지급 완료" 등)

// 3. 타임아웃 적용
// 각 미션은 user.timeout(ms) 이내에 끝나야 하고
// 타임아웃이 걸리면 재시도해야 한다.
//     단, 3회 재시도 후에도 실패하면 "xxx 최종 실패" 메시지를 반환해야 한다.

// 4. 모든 미션은 순차적으로 진행
// 출석 체크 →
// 접속 보너스 지급 →
// 데일리 퀘스트 보상 지급
// 이 순서를 반드시 유지해야 한다.
//     이유: 보상 지급 전에 출석 체크가 완료되어야 하기 때문.

// 5. 최종 반환값
// 함수 이름: processDailyMission(user)

// async function attendance(user) {
//     let lastErr = null;
//     const delay = Math.floor(Math.random() * 500 - 100 + 1) + 100;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const first = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.3;
//                 if (success) {
//                     resolve({
//                         ...user,
//                         logs: ["출석 체크 완료"],
//                         attended: true,
//                     });
//                 } else {
//                     reject({
//                         ...user,
//                         logs: ["출석 체크 실패"],
//                         attended: false,
//                     });
//                 }
//             }, delay));
//             return {
//                 ...first,
//                 logs: [...(first.logs ?? []), `재시도 성공 시도 ${i + 1}회`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `재시도 실패 시도 (${i + 1}회)`],
//             }
//         }
//     }
//     throw lastErr;
// }

// async function loginBonus(user) {
//     let lastErr = null;
//     const delay = Math.floor(Math.random() * 500 - 100 + 1) + 100;
//     const randomBonus = Math.floor(Math.random() * 301) + 100;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const second = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.3;
//                 if (success) {
//                     resolve({
//                         ...user,
//                         bonus: (user.bonus ?? 0) + randomBonus,
//                         logs: [...(user.logs ?? []), "보너스 지급 성공"],
//                     });
//                 } else {
//                     reject({
//                         ...user,
//                         logs: [...(user.logs ?? []), "보너스 지급 실패"],
//                     });
//                 }
//             }, delay));
//             return {
//                 ...second,
//                 logs: [...(second.logs ?? []), `보너스 지급시도 성공 ${i + 1}회`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `보너스 지급시도 실패 ${i + 1}회`],
//             }
//         }
//     }
//     throw lastErr;
// }

// async function dailyQuestReward(user) {
//     let lastErr = null;
//     const delay = Math.floor(Math.random() * 500 - 100 + 1) + 100;
//     for (let i = 0; i < 3; i++) {
//         try {
//             const third = await new Promise((resolve, reject) => setTimeout(() => {
//                 const success = Math.random() > 0.3;
//                 if (success) {
//                     resolve({
//                         ...user,
//                         reward: (user.reward ?? 0) + 100,
//                         logs: [...(user.logs ?? []), "리워드 지급 성공"],
//                     });
//                 } else {
//                     reject({
//                         ...user,
//                         logs: [...(user.logs ?? []), "리워드 지급 실패"],
//                     });
//                 }
//             }, delay));
//             return {
//                 ...third,
//                 logs: [...(third.logs ?? []), `리워드 지급 시도 성공 ${i + 1}회`],
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 logs: [...(error.logs ?? []), `리워드 지급 시도 실패 ${i + 1}회`],
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

// async function process(user) {
//     try {
//         const result = await withTimeout(attendance(user), user.timeout, user);
//         const result2 = await withTimeout(loginBonus(result), user.timeout, result);
//         const result3 = await withTimeout(dailyQuestReward(result2), user.timeout, result2);
//         return result3;
//     } catch (error) {
//         throw {
//             ...error,
//             logs: [...(error.logs ?? []), "최종 실패"],
//         }
//     }
// }

// async function main() {
//     const users = [
//         {
//             name: "철수",
//             timeout: 500,
//         },
//         {
//             name: "영희",
//             timeout: 600,
//         },
//         {
//             name: "민수",
//             missionsCompleted: 3,
//             failChance: 0.3,
//             timeout: 450,
//         },
//         {
//             name: "지우",
//             timeout: 550,
//         },
//         {
//             name: "하늘",
//             timeout: 500,
//         }
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

// 🎯 문제 9단계 — “유저 장비 강화 + 데일리 미션 통합 시스템 만들기”

// 이번 단계는 이전에 만든 “강화 시스템(문제 7)” + “데일리 미션 시스템(문제 8)”
// 두 개를 하나의 큰 시스템으로 통합해서 한 번에 처리하는 시스템을 만드는 문제야.

// ✅ 요구사항
// 1) 처리해야 할 기능은 총 4개
// 출석 체크 (attendance)
// 로그인 보너스 지급 (loginBonus)
// 데일리 미션 보상 지급 (dailyQuestReward)
// 장비 강화 (retryEnhance → createEnhance + verifyEnhance)

// 🧠 핵심 조건
// ① 실행 순서
// 각 기능은 반드시 아래 순서 유지:
// 1️⃣ 출석 체크
// 2️⃣ 보너스 지급
// 3️⃣ 데일리 미션 보상
// 4️⃣ 장비 강화(강화 → 검증까지 포함)

// ② 각 기능마다 최대 3회 재시도
// (너가 이미 작성한 것처럼)

// ③ 각 단계는 withTimeout으로 시간 제한 적용
// 모든 단계는 user.timeout 을 그대로 사용
// 타임아웃 발생 시 즉시 실패 처리

async function attendance(user) {
    let lastErr = null;
    const delay = Math.floor(Math.random() * 401) + 100;
    for (let i = 0; i < 3; i++) {
        try {
            const first = await new Promise((resolve, reject) => setTimeout(() => {
                const success = Math.random() > 0.3;
                if (success) {
                    resolve({
                        ...user,
                        logs: ["출석 체크 완료"],
                        attended: true,
                    });
                } else {
                    reject({
                        ...user,
                        logs: ["출석 체크 실패"],
                        attended: false,
                    });
                }
            }, delay));
            return {
                ...first,
                logs: [...(first.logs ?? []), `재시도 성공 시도 ${i + 1}회`],
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `재시도 실패 시도 (${i + 1}회)`],
            }
        }
    }
    throw lastErr;
}

async function loginBonus(user) {
    let lastErr = null;
    const delay = Math.floor(Math.random() * 401) + 100;
    const randomBonus = Math.floor(Math.random() * 301) + 100;
    for (let i = 0; i < 3; i++) {
        try {
            const second = await new Promise((resolve, reject) => setTimeout(() => {
                const success = Math.random() > 0.3;
                if (success) {
                    resolve({
                        ...user,
                        bonus: (user.bonus ?? 0) + randomBonus,
                        logs: [...(user.logs ?? []), "보너스 지급 성공"],
                    });
                } else {
                    reject({
                        ...user,
                        logs: [...(user.logs ?? []), "보너스 지급 실패"],
                    });
                }
            }, delay));
            return {
                ...second,
                logs: [...(second.logs ?? []), `보너스 지급시도 성공 ${i + 1}회`],
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `보너스 지급시도 실패 ${i + 1}회`],
            }
        }
    }
    throw lastErr;
}

async function dailyQuestReward(user) {
    let lastErr = null;
    const delay = Math.floor(Math.random() * 401) + 100;
    for (let i = 0; i < 3; i++) {
        try {
            const third = await new Promise((resolve, reject) => setTimeout(() => {
                const success = Math.random() > 0.3;
                if (success) {
                    resolve({
                        ...user,
                        reward: (user.reward ?? 0) + 100,
                        logs: [...(user.logs ?? []), "리워드 지급 성공"],
                    });
                } else {
                    reject({
                        ...user,
                        logs: [...(user.logs ?? []), "리워드 지급 실패"],
                    });
                }
            }, delay));
            return {
                ...third,
                logs: [...(third.logs ?? []), `리워드 지급 시도 성공 ${i + 1}회`],
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `리워드 지급 시도 실패 ${i + 1}회`],
            }
        }
    }
    throw lastErr;
}

async function createEnhance(user) {
    let lastErr = null;
    const delay = Math.floor(Math.random() * 401) + 100;
    for (let i = 0; i < 3; i++) {
        try {
            const create = await new Promise((resolve, reject) => setTimeout(() => {
                const success = Math.random() > 0.5;
                if (success) {
                    resolve({
                        ...user,
                        itemLevel: user.itemLevel + 1,
                        logs: [...(user.logs ?? []), "강화 성공!"],
                    });
                } else {
                    reject({
                        ...user,
                        logs: [...(user.logs ?? []), "강화 실패"],
                    });
                }
            }, delay));
            return {
                ...create,
                logs: [...(create.logs ?? []), `강화 재시도 ${i + 1}회 성공`]
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
        const mission1 = await withTimeout(attendance(user), user.timeout, user);
        const mission2 = await withTimeout(loginBonus(mission1), user.timeout, mission1);
        const mission3 = await withTimeout(dailyQuestReward(mission2), user.timeout, mission2);
        const enhance1 = await withTimeout(createEnhance(mission3), user.timeout, mission3);
        const enhance2 = await withTimeout(verifyEnhance(enhance1), user.timeout, enhance1);
        return enhance2;
    } catch (error) {
        throw {
            ...error,
            logs: [...(error.logs ?? []), "최종 실패"],
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