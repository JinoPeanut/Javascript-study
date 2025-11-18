// 문제 — 배치 파일 처리기 (Batch File Processor)

// 여러 파일을 받아 병렬로 처리(압축/업로드 등)를 시뮬레이션하는 프로그램을 만들자.
// 각 파일은 이름과 크기(size, MB)를 가진 객체로 주어진다.

// 요구사항 (꼭 지켜야 함)
// 1) 입력 데이터
// 다음처럼 파일 목록(배열)을 사용한다:
// const files = [
//   { name: "fileA.mp4", size: 120 },
//   { name: "fileB.jpg", size: 5 },
//   { name: "fileC.zip", size: 300 },
//   { name: "fileD.pdf", size: 2 },
//   { name: "fileE.mov", size: 200 },
//   // 필요하면 더 추가해도 됨
// ];

// 2) processFile(file) 함수
// 입력: { name, size } 객체
// 동작: 랜덤 지연(time) + 성공/실패 시뮬레이션
// 처리 시간: Math.floor(Math.random() * (2000 - 500 + 1)) + 500 ms (500~2000ms)
// 성공 확률: Math.random() > 0.25 (25% 실패 확률)
// 반환값: 성공 시 resolve({ name, size, time, status: "success", message })
// 실패 시 reject({ name, size, time, status: "fail", message })
// — 즉, 항상 객체를 사용해 정보를 반환/거절해야 함.

// 3) 재시도 (retry)
// 파일 처리 실패하면 최대 2번(총 3회 시도) 재시도 하라.
// 재시도 전 500ms 대기.
// 각 시도는 processFile을 다시 호출한다.
// 최종적으로 성공하면 해당 파일은 성공 처리, 3회 모두 실패하면 실패 처리.

// 4) 동시 처리(concurrency) 제한
// 한 번에 동시에 처리할 파일은 최대 3개다.
// 즉, 파일들이 있을 때 동시 실행 수를 3으로 제한하는 작업 스케줄러(풀)을 구현해야 함.
// 새 작업은 이전 작업 하나가 끝나면 시작한다.

// 5) 진행 로그 (콘솔 출력)
// 각 파일의 시도마다 다음 형식으로 출력:
// 시도 시작: ⏳ [fileA.mp4] 시도 1/3 — 처리중...
// 성공: ✅ [fileA.mp4] 성공 (time ms)
// 실패(재시도 가능): ❌ [fileA.mp4] 실패 (time ms) — 재시도 중...
// 실패(최종): ⛔ [fileA.mp4] 최종 실패 (time ms)
// 전체 진행상황(남은/완료/실패 개수)는 적절히 보여줘도 좋다.

// 6) 최종 요약 리포트
// 모든 파일 처리가 끝난 뒤(성공이든 실패든) 콘솔에 아래 정보를 출력:
// 총 파일 수: N
// 성공: X개 (배열로 성공한 파일명 목록도 출력)
// 실패: Y개 (배열로 실패한 파일명 + 마지막 실패 시간도 출력)
// 총 소요 시간: Z ms (처리 시작부터 모든 파일 끝날 때까지)

// 7) 코드 제약 / 권장사항
// 반드시 async/await 사용 (Promise 직접 생성도 허용)
// 반복문: for, for...of, 또는 while 중 최소 하나는 사용
// 객체 속성 접근과 조작(예: map/filter/reduce 등) 을 활용해서 요약 통계 만들기
// 동시성 제어는 Promise.all만으로 해결하지 말고(직접 풀을 구현하거나 큐를 사용) 동시 실행 제한을 구현할 것
// 가독성 좋게 함수/모듈로 분리하면 가산점

// async function processFile(name, size) {
//     const time = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

//     while (true) {
//         for (let i = 0; i < 3; i++) {
//             console.log(`⏳[${name}] 시도${i + 1}/3 - 처리중...`);
//             try {
//                 const process = await new Promise((resolve, reject) => setTimeout(() => {
//                     const success = Math.random() > 0.25;
//                     if (success) {
//                         resolve({
//                             name,
//                             size,
//                             time,
//                             status: "success",
//                             message: `✅${name} 성공! (${time}ms)`,
//                         });
//                     } else {
//                         reject({
//                             name,
//                             size,
//                             time,
//                             status: "fail",
//                             message: `❌${name} 실패 (${time}ms)`,
//                         });
//                     }
//                 }, time));
//                 return process;
//             } catch (error) {
//                 console.log("재시도 대기중...");
//                 await new Promise(resolve => setTimeout(resolve, 500));
//                 if (i == 2) {
//                     console.log(`⛔ [${name}] 최종 실패 (${time}ms)`);
//                     throw error;
//                 }
//             }
//         }
//     }
// }

// async function main() {
//     const files = [
//         { name: "fileA.mp4", size: 120 },
//         { name: "fileB.jpg", size: 5 },
//         { name: "fileC.zip", size: 300 },
//         { name: "fileD.pdf", size: 2 },
//         { name: "fileE.mov", size: 200 },
//     ];
//     const concurrency = 3; // 동시 실행 3개
//     const successList = [];
//     const failList = [];
//     const startTime = Date.now();

//     for (let i = 0; i < files.length; i += concurrency) {
//         const chunk = files.slice(i, i + concurrency);

//         console.log(`\n🚀 새로운 작업 시작 (총 ${chunk.length}개)`);

//         const promises = chunk.map(file =>
//             processFile(file.name, file.size)
//                 .then(res => {
//                     successList.push(res);
//                 })
//                 .catch(err => {
//                     failList.push(err);
//                 })
//         );

//         // 3개가 모두 끝날 때까지 기다림
//         await Promise.all(promises);
//     }

//     const endTime = Date.now();
//     const totalTime = endTime - startTime;

//     console.log("\n🎯 최종 요약 ===================");
//     console.log(`총 파일 수: ${files.length}`);
//     console.log(`성공: ${successList.length}`, successList.map(f => f.name));
//     console.log(`실패: ${failList.length}`, failList.map(f => f.name));
//     console.log(`총 소요 시간: ${totalTime}ms`);
// }



// 문제

// 아래와 같은 유저 데이터 목록이 있다:
// const users = [
//   { id: 1, name: "철수", age: 28 },
//   { id: 2, name: "영희", age: 17 },
//   { id: 3, name: "민수", age: 15 },
//   { id: 4, name: "지연", age: 33 },
//   { id: 5, name: "하준", age: 40 },
//   { id: 6, name: "소영", age: 16 }
// ];


// 유저를 DB에 등록하는 가상의 비동기 함수가 있다:
// function registerUser(user) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (user.age >= 20) {
//         resolve({ id: user.id, message: "등록 성공!" });
//       } else {
//         reject({ id: user.id, message: "나이가 어려서 등록 실패" });
//       }
//     }, 100);
//   });
// }

// 🧩 당신의 미션
// 요구사항
// users 배열을 concurrency = 2 로 나누어 병렬 처리하라.
// 각 chunk(2명)에 대해
// registerUser(user) 를 실행하여
// 성공 → successList 에 push
// 실패 → failList 에 push
// 모든 chunk 처리가 완료되면
// 아래와 같은 형식으로 출력하라:

// === 성공 리스트 ===
// 1번 사용자: 등록 성공!
// 4번 사용자: 등록 성공!
// 5번 사용자: 등록 성공!

// === 실패 리스트 ===
// 2번 사용자: 나이가 어려서 등록 실패
// 3번 사용자: 나이가 어려서 등록 실패
// 6번 사용자: 나이가 어려서 등록 실패

function registerUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user.age >= 20) {
                resolve({ id: user.id, message: "등록 성공!" });
            } else {
                reject({ id: user.id, message: "나이가 어려서 등록 실패" });
            }
        }, 100);
    });
}

async function main() {
    const users = [
        { id: 1, name: "철수", age: 28 },
        { id: 2, name: "영희", age: 17 },
        { id: 3, name: "민수", age: 15 },
        { id: 4, name: "지연", age: 33 },
        { id: 5, name: "하준", age: 40 },
        { id: 6, name: "소영", age: 16 }
    ];

    const concurrency = 2;
    const successList = [];
    const failList = [];

    for (let i = 0; i < users.length; i += concurrency) {
        const chunk = users.slice(i, i + concurrency);

        const promises = chunk.map(user =>
            registerUser(user)
                .then(res => {
                    successList.push(res)
                })
                .catch(err => {
                    failList.push(err)
                })
        );
        await Promise.all(promises);
    }

    console.log("=== 성공 리스트 ===");
    promises.forEach(item =>
        console.log(`${item.id}번 사용자: ${item.message}`)
    );

    console.log("");

    console.log("=== 실패 리스트 ===");
    promises.forEach(item =>
        console.log(`${failList.id}번 사용자: ${item.message}`)
    );
}