// 문제: 회원 인증 + 포인트 지급 + 알림 발송 시스템
// 1. 1단계: 회원 인증(checkUser)
// 회원 객체는 다음과 같다:
// { id: 1, name: "유진호", loggedIn: true, points: 10 }
// 로그인(loggedIn)이 true이면
// → resolve
// false이면
// → reject({ id, name, reason: "로그인 필요" })
// 랜덤 300~700ms 지연.

// ✔ 2. 2단계: 포인트 지급(givePoints)
// 인증에 성공한 회원에게 포인트 +10을 지급한다.
// 성공하면 resolve({ id, name, points, status: "포인트 지급 성공" })
// 20% 확률로 실패 (Math.random() < 0.2)
// → reject({ id, name, points, status: "포인트 지급 실패" })
// 랜덤 300~700ms 지연.

// ✔ 3. 3단계: 알림 발송(sendNotification)
// 포인트 지급 성공한 사람에게만 알림 발송.
// 성공하면 resolve({ id, name, message: "알림 전송 완료" })
// 실패는 없음 (항상 성공)
// 랜덤 100~300ms 지연.
// ⭐ 최종 조건 — 중요한 변화 하나!
// ❗ 인증 실패한 사용자
// → 바로 failList 에 넣기 (추가 작업 X)
// ❗ 인증은 성공했지만 포인트가 실패한 사용자
// → failList 에 넣기
// ❗ 모든 단계를 성공한 사용자
// → successList 에 넣기

// ✔ 4. 병렬 처리 조건
// concurrency = 2
// slice 를 이용해 병렬 처리 batch 로 실행

// ✔ 5. 출력 형식
// 성공한 사용자:
// === 성공 ===
// [1] 유진호 - 포인트 지급 성공 / 알림 전송 완료

// 실패한 사용자:
// === 실패 ===
// [2] 홍길동 - 로그인 필요
// [3] 김철수 - 포인트 지급 실패

// async function checkUser(user) {
//     const time = Math.floor(Math.random() * (700 - 300 + 1)) + 300;
//     const check = await new Promise((resolve, reject) => setTimeout(() => {
//         if (user.loggedIn === true) {
//             resolve({
//                 id: user.id,
//                 name: user.name,
//                 points: user.points,
//                 status: "회원 인증 성공",
//             });
//         } else {
//             reject({
//                 id: user.id,
//                 name: user.name,
//                 status: "회원 인증 실패",
//             });
//         }
//     }, time));
//     return check;
// }

// async function givePoints(user) {
//     const time = Math.floor(Math.random() * (700 - 300 + 1)) + 1;
//     const give = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve({
//                 id: user.id,
//                 name: user.name,
//                 points: user.points + 10,
//                 status: "포인트 지급 성공"
//             });
//         } else {
//             reject({
//                 id: user.id,
//                 name: user.name,
//                 status: "포인트 지급 실패",
//             });
//         }
//     }, time));
//     return give;
// }

// async function sendNotification(user) {
//     const time = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
//     const send = await new Promise(resolve => setTimeout(() => {
//         resolve({
//             id: user.id,
//             name: user.name,
//             points: user.points,
//             status: user.status,
//             message: "알림 전송 성공",
//         });
//     }, time));
//     return send;
// }

// async function main() {
//     const users = [
//         { id: 1, name: "유진호", loggedIn: true, points: 10 },
//         { id: 2, name: "홍길동", loggedIn: false, points: 8 },
//         { id: 1, name: "김철수", loggedIn: true, points: 7 },
//     ];

//     const concurrency = 2;
//     const successList = [];
//     const failList = [];

//     for (let i = 0; i < users.length; i += concurrency) {
//         const chunk = users.slice(i, i + concurrency);

//         const promises = chunk.map(user =>
//             checkUser(user)
//                 .then(givePoints)
//                 .then(sendNotification)
//                 .then(res => successList.push(res))
//                 .catch(err => failList.push(err))
//         );

//         await Promise.all(promises);
//     }

//     console.log("=== 성공 ===");
//     successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status} / ${s.message}`));

//     console.log("");

//     console.log("=== 실패 ===");
//     failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.status}`));
// }

// 문제: 쇼핑몰 쿠폰 발급 & 이메일 발송 시스템 만들기
// 쇼핑몰에서 이벤트 참가자들에게 쿠폰 발급 → 포인트 적립 → 이메일 발송을 해야 한다.
// 단, 참가자 중 일부는 이미 쿠폰을 받았거나 이메일 주소가 없어서 실패할 수 있다.

// 👤 1) 참가자 데이터
// const users = [
//     { id: 1, name: "유진호", hasCoupon: false, email: "jinho@test.com", points: 100 },
//     { id: 2, name: "홍길동", hasCoupon: true, email: "hong@test.com", points: 30 },
//     { id: 3, name: "김철수", hasCoupon: false, email: "", points: 50 },
//     { id: 4, name: "박영희", hasCoupon: false, email: "young@test.com", points: 80 },
//     { id: 5, name: "최민수", hasCoupon: false, email: "", points: 10 },
// ];

// ✔ 해야 할 작업 (순서대로)
// 1. issueCoupon(user)
// 쿠폰이 없는 유저만 발급 가능
// 이미 쿠폰이 있으면 실패
// status: "쿠폰 발급 성공"  
// 또는  
// status: "쿠폰 이미 있음"

// 2. addPoints(user)
// 랜덤 성공(70%), 실패(30%)
// 성공 시 user.points += 20
// 실패 시 그대로
// status: "포인트 지급 성공"  
// 또는  
// status: "포인트 지급 실패"

// 3. sendEmail(user)
// 이메일 주소가 없으면 실패
// 성공하면
// status: "이메일 발송 성공"
// 🧪 병렬 처리 조건
// concurrency = 2
// 즉, 2명씩 끊어서 처리 후 다음 2명으로 넘어가기

// 🗂 출력 형식
// 성공
// === 성공한 사용자 ===
// [1] 유진호 - 쿠폰 발급 성공 / 포인트 지급 성공 / 이메일 발송 성공
// ...

// 실패
// === 실패한 사용자 ===
// [3] 김철수 - 이메일 없음
// ...

// 🧠 요구사항
// Promise 체인 사용
// 중간 단계의 객체에 이전의 status 누적해서 저장하기
// 예: "쿠폰 발급 성공 → 포인트 지급 성공"
// 실패하면 해당 시점의 실패 이유를 status로 넣어서 failList에 넣기
// 성공하면 successList에 넣기
// 병렬(concurrency) 구현

async function issueCoupon(user) {
    const issue = await new Promise((resolve, reject) => setTimeout(() => {
        if (user.hasCoupon === false) {
            resolve({
                id: user.id,
                name: user.name,
                email: user.email,
                points: user.points,
                status: "쿠폰 발급 성공",
            });
        } else {
            reject({
                id: user.id,
                name: user.name,
                email: user.email,
                points: user.points,
                status: "쿠폰 이미 있음",
            });
        }
    }, 100));
    return issue;
}

async function addPoints(user) {
    const add = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            resolve({
                id: user.id,
                name: user.name,
                email: user.email,
                points: user.points + 20,
                status: user.status,
                status2: "포인트 지급 성공",
            });
        } else {
            reject({
                id: user.id,
                name: user.name,
                email: user.email,
                points: user.points,
                status: user.status,
                status2: "포인트 지급 실패",
            });
        }
    }, 100));
    return add;
}

async function sendEmail(user) {
    const send = await new Promise((resolve, reject) => setTimeout(() => {
        if (user.email !== "") {
            resolve({
                id: user.id,
                name: user.name,
                status: user.status,
                status2: user.status2,
                message: "이메일 발송 성공",
            });
        } else {
            reject({
                id: user.id,
                name: user.name,
                status: user.status,
                status2: user.status2,
                message: "이메일 발송 실패",
            });
        }
    }, 100));
    return send;
}


async function main() {
    const users = [
        { id: 1, name: "유진호", hasCoupon: false, email: "jinho@test.com", points: 100 },
        { id: 2, name: "홍길동", hasCoupon: true, email: "hong@test.com", points: 30 },
        { id: 3, name: "김철수", hasCoupon: false, email: "", points: 50 },
        { id: 4, name: "박영희", hasCoupon: false, email: "young@test.com", points: 80 },
        { id: 5, name: "최민수", hasCoupon: false, email: "", points: 10 },
    ];

    const concurrency = 2;
    const successList = [];
    const failList = [];

    for (let i = 0; i < users.length; i += concurrency) {
        const chunk = users.slice(i, i + concurrency);
        const promises = chunk.map(user =>
            issueCoupon(user)
                .then(addPoints)
                .then(sendEmail)
                .then(res => successList.push(res))
                .catch(err => failList.push(err))
        )
        await Promise.all(promises);
    }

    console.log("=== 성공한 사용자 ===");
    successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status} / ${s.status2} / ${s.message}`));

    console.log("");

    console.log("=== 실패한 사용자 ===");
    failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.message}`));
}