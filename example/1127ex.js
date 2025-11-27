// 아래는 어떤 유저의 활동 기록을 기반으로 레벨을 계산하고 보상을 지급하는 로직을 만들어야 하는 상황이다.

// ✨ 요구사항
// 1. calculateLevel(user)
// 유저의 exp(경험치)를 보고 레벨을 결정한다.
// 200 이상 → 레벨 3
// 100 이상 → 레벨 2
// 1 이상 → 레벨 1
// 0 이하 → 에러 발생 (reject)
// 반환 형식 예시:
// { name: "철수", exp: 123, level: 2 }

// 2. giveReward(user)
// 유저 레벨에 따라 보상을 준다.
// 레벨 3 → 300
// 레벨 2 → 150
// 레벨 1 → 50
// 반환 형식:
// { name: "철수", exp: 123, level: 2, reward: 150 }

// 3. retryLevelCheck(user)
// calculateLevel이 실패할 수 있으므로
// 최대 2회 재시도(총 3회 시도)
// 성공하면 레벨 객체 반환
// 모두 실패하면 마지막 에러 throw

// 4. processUser(user)
// retryLevelCheck → giveReward 순서로 실행
// 어떤 단계에서든 실패하면
// 다음 형태로 에러를 throw 해야 함:
// {
//     ...user,
//     error: "레벨 계산 실패" 또는 "보상 지급 실패"
// }

// 5. main()
// 아래 배열을 users로 사용
// const users = [
//     { name: "철수", exp: 250 },
//     { name: "영희", exp: 150 },
//     { name: "민수", exp: -10 },
//     { name: "훈이", exp: 0 },
// ];
// processUser를 돌리고
// 성공은 successList
// 실패는 failList에 push
// 모든 처리 후 둘 다 콘솔에 출력

// 👉 최종 목표
// 아래 요구사항을 모두 만족하는 코드를 작성하라.
// calculateLevel
// giveReward
// retryLevelCheck
// processUser
// main
// Promise, async/await, try/catch 적절히 활용
// 함수 안에서 다른 함수 호출하는 구조 익히기 목적

// function calculateLevel(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         if (user.exp >= 200) {
//             resolve({
//                 ...user,
//                 level: (user.level ?? 0) + 3,
//             });
//         } else if (user.exp < 200 && user.exp >= 100) {
//             resolve({
//                 ...user,
//                 level: (user.level ?? 0) + 2,
//             });
//         } else if (user.exp < 100 && user.exp >= 1) {
//             resolve({
//                 ...user,
//                 level: (user.level ?? 0) + 1,
//             });
//         } else if (user.exp < 0) {
//             reject({
//                 ...user,
//                 status: [...(user.status ?? []), "경험치 없음"]
//             });
//         }
//     }, 100));
// }

// function giveReward(user) {
//     return new Promise((resolve) => setTimeout(() => {
//         if (user.level === 3) {
//             resolve({
//                 ...user,
//                 reward: (user.reward ?? 0) + 300,
//             });
//         } else if (user.level === 2) {
//             resolve({
//                 ...user,
//                 reward: (user.reward ?? 0) + 150,
//             });
//         } else if (user.level === 1) {
//             resolve({
//                 ...user,
//                 reward: (user.reward ?? 0) + 50,
//             });
//         } else if (user.level <= 0) {
//             resolve({
//                 ...user,
//                 reward: 0,
//             });
//         }
//     }, 100));
// }

// async function retryLevelCheck(user) {
//     let lastErr = null;

//     for (let i = 0; i < 3; i++) {
//         try {
//             const result = await calculateLevel(user);
//             return {
//                 ...result,
//                 status: [...(result.status ?? []), `레벨 계산 성공 (시도횟수 ${i}회)`]
//             }
//         } catch (error) {
//             lastErr = {
//                 ...error,
//                 status: [...(error.status ?? []), `레벨 계산 실패 (시도횟수 ${i + 1}회)`],
//             }
//         }
//     }
//     throw lastErr;
// }

// async function processUser(user) {
//     try {
//         const result = await retryLevelCheck(user);
//         const result2 = await giveReward(result);
//         return result2;
//     } catch (error) {
//         throw {
//             ...error,
//             status: [...(error.status ?? []), "보상 지급 실패"],
//         }
//     }
// }

// async function main() {
//     const users = [
//         { name: "철수", exp: 250 },
//         { name: "영희", exp: 150 },
//         { name: "민수", exp: -10 },
//         { name: "훈이", exp: 0 },
//     ];

//     const successList = [];
//     const failList = [];

//     const promises = users.map(user =>
//         processUser(user)
//             .then(res => successList.push(res))
//             .catch(err => failList.push(err))
//     );
//     await Promise.all(promises);

//     successList.forEach(s => console.log(s));
//     failList.forEach(f => console.log(f));

// }


// ✅ 다음 문제
// 다음은 어떤 게임 서버에서 “아이템 강화”를 시도하는 기능이다.
// 강화는 다음 규칙을 가진다.

// 1. tryEnhance(user)
// 0.5 확률로 성공, 0.5 확률로 실패

// 2. retryEnhance(user)
// 강화 실패 시 최대 3회까지 재시도
// 3회 모두 실패하면 실패 정보 그대로 throw
// 성공하면 바로 반환
// 매 시도마다 logs 에
// "재시도 n회"
// 를 추가한다.

// 3. withTimeout(promise, ms, user)
// ms 안에 끝나지 않으면 reject
// timeout 발생시 logs 에 "시간 초과" 추가

// 4. process(user)
// 다음 순서로 실행:
// retryEnhance(user)
// 성공하면 그 결과를 withTimeout 으로 감싼다
// timeout 시간은 사용자마다 다름 → user.timeout 사용
// 최종적으로 성공 또는 실패 객체를 반환한다.

// 5. main()
// users 배열을 만든 후
// 모든 유저를 비동기로 처리하여
// 성공과 실패를 나누어 출력한다.

function tryEnhance(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve({
                ...user,
                enhanceLevel: user.enhanceLevel + 1,
                logs: [...(user.logs ?? []), "강화 성공"],
            });
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "강화 실패"],
            });
        }
    }, 100));
}

async function retryEnhance(user) {
    let lastErr = null;

    for (let i = 0; i < 3; i++) {
        try {
            const result = await tryEnhance(user);
            return {
                ...result,
                logs: [...(result.logs ?? []), `강화 성공시도 (총 횟수 ${i}회)`],
            }
        } catch (error) {
            lastErr = {
                ...error,
                logs: [...(error.logs ?? []), `강화 실패시도 (총 횟수 ${i + 1}회)`],
            }
        }
    }
    throw lastErr;
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
        const result = await withTimeout(retryEnhance(user), user.timeout, user);
        return result;
    } catch (error) {
        throw {
            ...error,
            logs: [...(error.logs ?? []), "최종 실패"],
        }
    }
}

async function main() {
    const users = [
        { name: "철수", enhanceLevel: 0, timeout: 300 },
        { name: "영희", enhanceLevel: 1, timeout: 500 },
        { name: "민수", enhanceLevel: 2, timeout: 200 },
        { name: "지우", enhanceLevel: 0, timeout: 400 },
        { name: "하늘", enhanceLevel: 3, timeout: 350 }
    ]

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

// 느낀점 및 알게된 점

// 우선은 함수를 작성함에 있어서 try문 을 쓰는데도 불구하고 함수에 async await 을 붙이지
// 않아서 중간에 동작이 안되는 경우가 많았다. 특히 오늘도 실수가 있었는데 앞으로는 이런
// 실수를 꼭 try 문을 쓸때 함수명을 다시 확인해 봐야할 것 같다.

// 재시도 로직과 함수내부에서 함수를 호출하는 문제에 대해서는 어느정도 익숙해진 것 같다
// 다음 난이도의 필요성을 느낌.

// 가끔씩 for문에서 3회반복인데 for(i = 0; i < 2; i++) 이렇게 쓰는 경우가 있었다.
// 단순히 0, 1, 2 즉 3번이니까 3번 반복이 맞겠지? 하고 생각없이 써버리는 경우가 있었는데
// 0과 1만 정상적으로 반복될뿐 2가 되면 막히는데 간단한걸 간단하다고 넘겨버리며 생각한
// 경우가 많았다. 이전에도 종종 이런 실수가 있었는데 이런 실수를 없애기 위해 조건문과
// 반복문이 들어간 문제들을 지속적으로 풀면서 이런 기초적인 실수를 없애야겠다는 생각이 든다.