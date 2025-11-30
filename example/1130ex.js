// 🧩 문제 — "포인트 충전 + 결제 시스템"
// ✅ 1. 충전하기 (chargePoint)
// 0.4 확률로 실패
// 성공하면 user.point += 1000
// logs 에 "포인트 충전 성공" 추가
// 실패하면 logs 에 "포인트 충전 실패" 추가
// 200ms 후 resolve 또는 reject

// ✅ 2. 충전 3회 재시도 (retryCharge)
// 최대 3번까지 충전 시도
// 성공하면 즉시 반환
// 실패하면 마지막 에러를 throw
// 성공/실패 횟수를 logs 에 모두 기록
// 예: "충전 시도 1회 성공" 또는 "충전 시도 2회 실패"

// ✅ 3. 포인트로 결제하기 (pay)
// 0.5 확률로 성공
// 성공 시:
// point -= 500
// logs 에 "결제 성공"
// 실패 시:
// logs 에 "결제 실패"
// 150ms 후 resolve/reject

// ✅ 4. 전체 timeout 적용 (withTimeout)
// 기존 문제처럼 동일하게 사용
// 일정 시간 안에 모든 작업을 완료하지 못하면 "시간 초과" 로 처리

// ✅ 5. process 함수 구조
// retryCharge(user) 를 timeout 으로 감싸서 실행
// 충전 성공 후 → pay(result) 실행
// 결제까지 성공하면 user 반환
// 과정 중 실패 시 logs 에 "최종 실패" 추가하여 throw

// ✅ 6. main 함수
// 사용자 배열 5명
// 각 user 는 { name, point, timeout }
// 성공 / 실패 목록에 push
// 마지막에 콘솔에 두 목록 출력

// function chargePoint(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.4;
//         if (success) {
//             resolve({
//                 ...user,
//                 point: user.point + 1000,
//                 logs: ["포인트 충전 성공"],
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: ["포인트 충전 실패"],
//             });
//         }
//     }, 200));
// }

// async function retryCharge(user) {
//     for (let i = 0; i < 3; i++) {
//         try {
//             const result = await chargePoint(user);
//             return {
//                 ...result,
//                 logs: [...(result.logs ?? []), `충전 시도 ${i + 1}회 성공`],
//             }
//         } catch (error) {
//             throw {
//                 ...error,
//                 logs: [...(error.logs ?? []), `충전 시도 ${i + 1}회 실패`],
//             }
//         }
//     }
// }

// function pay(user) {
//     return new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.5;
//         if (success) {
//             resolve({
//                 ...user,
//                 point: user.point - 500,
//                 logs: [...(user.logs ?? []), "결제 성공"]
//             });
//         } else {
//             reject({
//                 ...user,
//                 logs: [...(user.logs ?? []), "결제 실패"],
//             });
//         }
//     }, 150));
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
//         const result = await withTimeout(retryCharge(user), user.timeout, user);
//         const result2 = await pay(result);
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
//         { name: "철수", email: "chulsoo@test.com", timeout: 500, age: 25 },
//         { name: "영희", email: "younghee@test.com", timeout: 600, age: 17 },
//         { name: "민수", email: "minsu@test.com", timeout: 400, age: 31 },
//         { name: "지우", email: "jiwoo@test.com", timeout: 550, age: 22 },
//         { name: "하늘", email: "haneul@test.com", timeout: 450, age: 15 },
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

// ✅ 문제 — 회원 등급별 보상 지급 시스템 만들기
// 아래 조건에 맞춰 sendReward → verifyReward → process → main 구조를 가진 프로그램을 만들어라.

// 📌 1. sendReward(user)
// 200ms 후 동작
// 성공 확률 60%
// 성공 시:
// reward 필드에 등급별 포인트 지급
// logs에 "보상 지급 성공" 추가
// 실패 시:
// logs에 "보상 지급 실패" 추가
// 등급별 지급 포인트
// 등급	지급 포인트
// bronze	100
// silver	300
// gold	700
// platinum	1500

// 📌 2. retryReward(user)
// 최대 3회 재시도
// 성공 시:
// 성공한 user 반환
// logs 에 보상 시도 X회 성공 추가
// 3회 모두 실패 시:
// 마지막 실패 객체를 throw
// logs 에 보상 시도 3회 실패 추가

// 📌 3. verifyReward(user)
// 150ms 후 동작
// 보상 포인트 존재하면:
// logs 에 "보상 검증 성공"
// user 반환
// 없으면:
// logs 에 "보상 검증 실패"
// reject

// 📌 4. withTimeout(promise, ms, user)
// 기존 문제들과 동일
// 시간 초과 시 "시간 초과" 로그 추가하고 reject

// 📌 5. process(user)
// 아래 순서대로 진행:
// retryReward
// verifyReward
// 모두 성공하면 user 반환
// 실패 시 logs 에 "최종 실패" 추가하고 throw

// 📌 6. main()
// 아래 users 배열을 사용해라 👇
// (요청한 문제5에 쓸 배열)
// const users = [
//     { name: "철수", grade: "bronze", timeout: 500 },
//     { name: "영희", grade: "silver", timeout: 600 },
//     { name: "민수", grade: "gold", timeout: 400 },
//     { name: "지우", grade: "platinum", timeout: 550 },
//     { name: "하늘", grade: "silver", timeout: 450 },
// ];
// 성공 유저는 successList
// 실패 유저는 failList에 push
// 모두 Promise.all로 처리
// 마지막에 성공/실패 출력

// ✨ 요구사항 핵심
// async/await 사용
// try/catch 흐름 익히기
// 재시도 로직 정확히 구현
// Promise + async 섞어서 다루기
// 배열 객체 잘 구성하기

function sendReward(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.4;

        const gradeReward = {
            bronze: 100,
            silver: 300,
            gold: 700,
            platinum: 1500,
        }

        if (success) {
            resolve({
                ...user,
                reward: (user.reward ?? 0) + gradeReward[user.grade],
                logs: ["보상 지급 성공"],
            });
        } else {
            reject({
                ...user,
                logs: ["보상 지급 실패"],
            });
        }
    }, 100));
}

async function retryReward(user) {
    for (let i = 0; i < 3; i++) {
        try {
            const result = await sendReward(user);
            return {
                ...result,
                logs: [...(result.logs ?? []), `보상 시도 ${i + 1}회 성공`],
            }
        } catch (error) {
            throw {
                ...error,
                logs: [...(error.logs ?? []), `보상 시도 ${i + 1}회 실패`]
            }
        }
    }
}

function verifyReward(user) {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (user.reward !== null) {
            resolve({
                ...user,
                logs: [...(user.logs ?? []), "보상 검증 성공"],
            });
        } else {
            reject({
                ...user,
                logs: [...(user.logs ?? []), "보상 검증 실패"],
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
        const result = await withTimeout(retryReward(user), user.timeout, user);
        const result2 = await verifyReward(result);
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
        { name: "철수", grade: "bronze", timeout: 500 },
        { name: "영희", grade: "silver", timeout: 600 },
        { name: "민수", grade: "gold", timeout: 400 },
        { name: "지우", grade: "platinum", timeout: 550 },
        { name: "하늘", grade: "silver", timeout: 450 },
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

// resolve 내부에 logs나 reward 를 적을때 [...(user.reward ?? 0)] 이런식일때
// 안에 ?? 의 뜻이 조건문의 물음표연산자 즉 삼항연산자 인 줄 알았는데 그게 아니라
// ?? 의 왼쪽이 null 인지 undefined 인지 확인하는 Null 병합 연산자(?) 라는 것 이었다.
// 그래서 두번째 문제에서 sendReward 함수에서 등급에 따라 점수를 다르게 매기는 식을
// reward: (user.grade === "bronze" ?? user.reward + 100) 이런식으로 적었는데
// 당연히 삼항연산자가 아니기때문에 저 식 그대로 보면 왼쪽은 null 이 아니기때문에
// 그대로 값이 반환되어버리니까 결국 나오는값이 없어서 오류가 나오는것이었다.
// ?? 자리 대신에 && (AND 연산자) 를 넣어서
// (user.grade === "bronze" && user.reward + 100) || .... 이런식으로 적으면
// 내가 의도했던 것처럼 나오게 되었다. 하지만 이런식으로 적게되면 코드의 길이가 너무 쓸데없이
// 길어졌기에 예전에 vip 등급에 따른 순서처리 문제에서 {vip: 1 normal: 2} 이런식으로 만든 것
// 처럼 등급들고 오브젝트 형태로 만들어서 간단하게 한줄로 끝낼 수 있는 방법이 있었다.
// 오브젝트를 만들어서 코드를 줄이는것도 좋은 코딩중 하나라고 생각이 들었다. 심지어 가독성도
// 좋아보였다. 앞으로는 이런식의 코딩을 습관들이는게 좋을거같다.

// 오늘 코딩하면서 보면 오타가 많이 줄은 것 같다. 다시 코드를 고친경우가 아예 틀린문제 빼고는
// 오타때문에 고친적은 없었던 것 같다. 앞으로도 오타를 조심하면서
// 논리적인 오류 부분에서 공부하고 보완해 나가야 할 것 같다.