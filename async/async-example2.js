// 예제 문제: “온라인 주문 처리 시스템”

// 너는 온라인 쇼핑몰의 주문 로직을 구현해야 해.
// 고객이 상품을 주문하면 다음 순서로 비동기 작업이 진행된다.

// ✅ 요구사항
// 재고 확인 (checkStock)
// “재고 확인중...” 로그 출력
// 1초 후 70% 확률로 성공
// 성공 시 "✅ 재고 있음" 리턴
// 실패 시 "❌ 품절되었습니다." 에러 발생

// 결제 처리 (processPayment)
// “결제 진행중...” 로그 출력
// 1.5초 후 60% 확률로 성공
// 성공 시 "💳 결제 완료" 리턴
// 실패 시 "💥 결제 실패" 에러 발생

// 배송 시작 (startDelivery)
// “배송 준비중...” 로그 출력
// 1초 후 80% 확률로 성공
// 성공 시 "🚚 배송 시작!" 리턴
// 실패 시 "❌ 배송 오류" 에러 발생

// main 함수
// try~catch 구문으로 세 단계를 순서대로 실행.
// 하나라도 실패하면 즉시 에러 메시지를 콘솔에 출력하고 종료.
// 모두 성공하면 "🎉 주문 완료!" 출력.

// async function checkStock() {
//     console.log("재고 확인중...");
//     const stock = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;

//         if (success) {
//             resolve("✅ 재고 있음");
//         } else {
//             reject(new Error("❌ 품절되었습니다."));
//         }
//     }, 1000))
//     return stock;
// }

// async function processPayment() {
//     console.log("결제 진행중...");
//     const payment = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.4;

//         if (success) {
//             resolve("💳 결제 완료");
//         } else {
//             reject(new Error("💥 결제 실패"));
//         }
//     }, 1500))
//     return payment;
// }

// async function startDelivery() {
//     console.log("배송 준비중...");
//     const delivery = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;

//         if (success) {
//             resolve("🚚 배송 시작!");
//         } else {
//             reject(new Error("❌ 배송 오류"));
//         }
//     }, 1000))
//     return delivery;
// }

// async function main() {
//     try {
//         const start = await checkStock();
//         console.log(start);
//         const process = await processPayment(start);
//         console.log(process);
//         const deliver = await startDelivery(process);
//         console.log(deliver);
//         console.log("🎉 주문 완료!");
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// main();

// 문제: “영화관 준비 시스템”

// cleanHall() — 2초 걸리며 70% 확률로 성공

// makePopcorn() — 1.5초 걸리며 80% 확률로 성공

// prepareProjector() — 2초 걸리며 90% 확률로 성공

// 이 세 가지 작업을 동시에(Promise.all) 실행해서
// 모두 성공하면 "🎬 모든 준비 완료! 영화 시작!"
// 하나라도 실패하면 "❌ 준비 중 오류 발생: {에러 메시지}"를 출력하도록 만들어보세요.

// async function cleanHall() {
//     const hall = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류 발생"));
//         }
//     }, 2000));
//     return hall;
// }

// async function makePopcorn() {
//     const popcorn = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류 발생"));
//         }
//     }, 1500));
//     return popcorn;
// }

// async function prepareProjector() {
//     const projector = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.1;
//         if (success) {
//             resolve();
//         } else {
//             reject(new Error("오류발생"));
//         }
//     }, 2000));
//     return projector;
// }

// async function randomTask(taskName, failRate, time) {
//     const result = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve(`${taskName} 완료`);
//         } else {
//             reject(new Error(`${taskName} 실패`));
//         }
//     }, time));
//     return result;
// }

// async function main() {
//     try {
//         const results = await Promise.all([
//             randomTask("홀 청소", 0.3, 2000),
//             randomTask("팝콘 만들기", 0.2, 1500),
//             randomTask("상영 준비", 0.1, 2000),
//         ]);

//         results.forEach(msg => console.log(msg));

//         console.log("🎬 모든 준비 완료! 영화 시작!");
//     } catch (error) {
//         console.log(`❌ 준비 중 오류 발생: ${error.message}`);
//     }
// }
// main();

// 문제: 서버 점검 시스템 만들기
// 💻 시나리오

// 당신은 3개의 서버를 동시에 점검해야 하는 엔지니어입니다.
// 서버들은 각각 불안정해서 점검 중 실패할 수도 있습니다.

// 아래 세 가지 함수를 만들어보세요 👇

// checkDatabase()
// 2초 후 "✅ Database 연결 성공"
// 실패 확률 20% (failRate = 0.2)

// checkAPI()
// 1.5초 후 "✅ API 서버 응답 정상"
// 실패 확률 30%

// checkFrontend()
// 1초 후 "✅ 프론트엔드 서버 정상"
// 실패 확률 10%

// 🧠 요구사항
// 세 함수를 동시에 실행해야 함 → Promise.all() 사용.
// 모든 서버가 성공하면
// 👉 console.log("🎉 모든 서버가 정상적으로 작동 중입니다!")
// 하나라도 실패하면
// 👉 console.log("🚨 서버 점검 중 오류 발생:", error.message)
// 성공한 서버들의 로그는 각각 콘솔에 출력되어야 함
// (예: “✅ Database 연결 성공”)

// async function checkDatabase(failRate) {
//     const check = await new Promise((resolve, reject) =>
//         setTimeout(() => {
//             const success = Math.random() > failRate;
//             if (success) {
//                 resolve("✅ Database 연결 성공");
//             } else {
//                 reject(new Error("연결 실패"));
//             }
//         }), 2000);
//     return check;
// }

// async function checkAPI(failRate) {
//     const api = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve("✅ API 서버 응답 정상");
//         } else {
//             reject(new Error("응답 없음"));
//         }
//     }, 1500));
//     return api;
// }

// async function checkFrontend(failRate) {
//     const front = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve("✅ 프론트엔드 서버 정상");
//         } else {
//             reject(new Error("서버 비정상"));
//         }
//     }, 1000));
//     return front;
// }

// async function checkTotal(failRate, successMsg, failMsg, time) {
//     const total = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve(successMsg);
//             // resolve 내에서 백택 `` 을 쓰는경우는
//             // resolve(`메세지: ${successMsg}`); 같이 추가적인 문자열이 들어왔을때다.
//             // 그게 아니라면 successMsg 는 기본적으로 문자열이 들어갈테니 백텍이 필요없음
//         } else {
//             reject(new Error(failMsg));
//         }
//     }, time));
//     return total;
// }

// async function main() {
//     try {
//         const results = await Promise.all([
//             checkTotal(0.2, "✅ Database 연결 성공", "연결 실패", 2000),
//             checkTotal(0.3, "✅ API 서버 응답 정상", "응답 없음", 1500),
//             checkTotal(0.1, "✅ 프론트엔드 서버 정상", "서버 비정상", 1000),
//         ]);
//         results.forEach(msg => console.log(msg));
//         console.log("🎉 모든 서버가 정상적으로 작동 중입니다!");
//     } catch (error) {
//         console.log(`🚨 서버 점검 중 오류 발생: ${error.message}`);
//     }
// }
// main();

// 예제 문제: "서버 응답 경쟁 시스템"

// 세 개의 서버 중 가장 먼저 응답한 서버의 결과만 사용하려고 한다.
// (예: CDN, 백업 서버 등 여러 서버 중 빠른 서버만 채택하는 상황)

// 🧩 요구사항
// randomServer(serverName, failRate, time) 함수를 만들어라.
// 일정 시간이 지난 뒤 Math.random()을 이용해 성공/실패를 결정한다.
// 성공 시: "✅ ${serverName} 서버 응답 성공"
// 실패 시: Error("${serverName} 서버 응답 실패")

// failRate 는 실패 확률(예: 0.2 → 20% 확률로 실패)
// main() 함수 안에서 Promise.race() 를 사용하라.
// 세 개의 서버 (서버A, 서버B, 서버C) 를 동시에 요청 보낸다.
// 가장 먼저 응답한 서버의 결과만 출력한다.
// 실패한 경우에는 "❌ 모든 서버에서 오류 발생" 이라고 출력한다.

// async function randomServer(serverName, failRate, time) {
//     const server = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;
//         if (success) {
//             resolve(`✅ ${serverName} 서버 응답 성공 (${(time / 1000).toFixed(1)})초`);
//             // 몇초가 걸렸는지 표시하는 방식으로 .toFixed 를 사용했다.
//             // 괄호 안에 1은 소숫점 1자리까지 표시한다는 뜻이며
//             // 0으로 하면 소숫점없이 보여준다.
//         } else {
//             reject(new Error(`${serverName} 서버 응답 실패`));
//         }
//     }, time));
//     return server;
// }

// async function main() {
//     try {
//         const results = await Promise.race([
//             randomServer("A", 0.2, 1000),
//             randomServer("B", 0.2, 1300),
//             randomServer("C", 0.2, 1600),
//         ]);
//         console.log(results);
//     } catch (error) {
//         console.log("❌ 모든 서버에서 오류 발생");
//     }
// }
// main();

// 문제

// 다음 코드를 완성하시오.
// 세 개의 Promise 함수 (taskA, taskB, taskC)가 각각 1초, 2초, 3초 뒤에 성공(resolve)되도록 만들고,

// Promise.all과 Promise.race를 각각 이용해 어떤 차이가 있는지 출력하는 프로그램을 만들어라.

// function taskA() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("✅ A 완료");
//         }, 1000);
//     });
// }

// function taskB() {
//     return new Promise((resolve) => setTimeout(() => {
//         resolve("✅ B 완료");
//     }, 2000));
// }

// function taskC() {
//     return new Promise((resolve) => setTimeout(() => {
//         resolve("✅ C 완료");
//     }, 3000))
// }

// async function runAllTasks() {
//     console.log("=== Promise.all 시작 ===");
//     const allResult = await Promise.all([taskA(), taskB(), taskC()]);
//     console.log(allResult);

//     console.log("=== Promise.race 시작 ===");
//     const raceResult = await Promise.race([taskA(), taskB(), taskC()]);
//     console.log(raceResult);
// }

// runAllTasks();

function fakeServer(name, failRate, time) {
    return new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > failRate;
        if (success) {
            resolve(`✅ 서버 ${name} 응답 성공 (${time / 1000}초)`);
        } else {
            reject(new Error(`❌ 서버 ${name} 응답 실패 (${time / 1000}초)`));
        }
    }, time));
}

// async function testAll() {
//     try {
//         const result = await Promise.all([
//             fakeServer("A", 0.2, 1000),
//             fakeServer("B", 0.5, 1500),
//             fakeServer("C", 0.2, 2000)
//         ]);
//         console.log("✅ 모든 서버 성공:", result);
//     } catch (error) {
//         console.log("💥 하나라도 실패하면 전체 실패:", error.message);
//     }
// }

// async function testRace() {
//     try {
//         const result = await Promise.race([
//             fakeServer("A", 0.7, 1000),
//             fakeServer("B", 0.5, 1500),
//             fakeServer("C", 0.2, 2000)
//         ]);
//         console.log("🏁 가장 먼저 응답한 서버:", result);
//     } catch (error) {
//         console.log("💥 가장 먼저 실패한 서버:", error.message);
//     }
// }

// testRace();

// 요구사항

// getUserData(failRate, time) 함수를 작성하시오.
// 랜덤으로 성공/실패하도록 하며,
// 성공 시: "👤 유저 데이터 불러오기 성공"
// 실패 시: "🚨 유저 데이터 불러오기 실패"
// 이 함수를 이용해 아래 두 가지 버전을 각각 작성하시오: try-catch, then-catch

// async function getUserData(failRate, time) {
//     const getuser = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > failRate;

//         if (success) {
//             resolve("👤 유저 데이터 불러오기 성공");
//         } else {
//             reject(new Error("🚨 유저 데이터 불러오기 실패"));
//         }
//     }, time));
//     return getuser;
// }

// // try-catch 버전
// async function main() {
//     try {
//         const user = await getUserData(0.2, 1500);
//         console.log("유저 데이터 불러오기 성공");
//     } catch (error) {
//         console.log("유저 데이터 불러오기 실패", error.message);
//     }
// }

// // then-catch 버전
// getUserData(0.2, 1500)
//     .then(msg => console.log(msg))
//     .then(console.log("유저 데이터 불러오기 성공"))
//     .catch((error) => console.log("유저데이터 불러오기 실패", error.message))

// 문제: “데이터 처리 파이프라인 만들기”

// 어떤 프로그램이 아래 3단계를 수행해야 한다고 하자.
// 각 단계는 비동기 작업(Promise) 으로 작동한다.

// 1️⃣ 데이터 로드 (loadData)
// 1.5초 후에 "📦 데이터 로드 완료"를 resolve
// 단, Math.random() < 0.2면 실패 (reject(new Error("데이터 로드 실패")))

// 2️⃣ 데이터 처리 (processData)
// 1초 후에 "⚙️ 데이터 처리 완료"를 resolve
// 단, Math.random() < 0.3면 실패 (reject(new Error("데이터 처리 실패")))

// 3️⃣ 데이터 저장 (saveData)
// 2초 후에 "💾 데이터 저장 완료"를 resolve
// 단, Math.random() < 0.1면 실패 (reject(new Error("데이터 저장 실패")))

// 요구사항

// 각 단계를 Promise로 구현한다.
// 두 가지 버전으로 작성한다.

// (1) .then() / .catch() 체인 버전
// (2) async / await + try / catch 버전
// 각 단계의 결과를 console.log()로 출력해야 한다.

// 마지막에 성공 시 "✅ 모든 작업 완료!"
// 실패 시 "❌ 작업 중 오류 발생: [오류 메시지]"를 출력한다.

// async function loadData() {
//     const load = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.2;
//         if (success) {
//             resolve("📦 데이터 로드 완료");
//         } else {
//             reject(new Error("데이터 로드 실패"));
//         }
//     }, 1500));
//     return load;
// }

// async function processData() {
//     const process = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             resolve("데이터 처리 완료");
//         } else {
//             reject(new Error("데이터 처리 실패"));
//         }
//     }, 1000));
//     return process;
// }

// async function saveData() {
//     const save = await new Promise((resolve, reject) => setTimeout(() => {
//         const success = Math.random() > 0.1;
//         if (success) {
//             resolve("💾 데이터 저장 완료");
//         } else {
//             reject(new Error("데이터 저장 실패"));
//         }
//     }, 2000));
//     return save;
// }

// try-catch
// async function main(){
//     try{
//         const dataload = await loadData();
//         console.log(dataload);
//         const dataprocess = await processData();
//         console.log(dataprocess);
//         const datasave = await saveData();
//         console.log(datasave);
//         console.log("✅ 모든 작업 완료!");
//     }catch(error){
//         console.log("❌ 작업 중 오류 발생: ", error.message);
//     }
// }

// main()
//     .then(dataload => loadData(dataload))
//     .then(dataprocess => processData(dataprocess))
//     .then(datasave => saveData(datasave))
//     .catch((error) => console.log("❌ 작업 중 오류 발생: ", error.message));

// then-catch 해답
// function main() {
//     loadData()
//         .then(result1 => {
//             console.log(result1);
//             return processData(); //다음단계 실행을 위한 리턴
//         })
//         .then(result2 => {
//             console.log(result2);
//             return saveData();
//         })
//         .then(result3 => {
//             console.log(result3);
//             console.log("✅ 모든 작업 완료!");
//         })
//         .catch(error => {
//             console.log("❌ 작업 중 오류 발생:", error.message);
//         })
// }

// .then 이후에 console.log가 바로 나오는 이유는 try-catch 문으로 보면 loadData().then은
// 결국 const result = await loadData(); 이후에 console.log 가 나오는거랑 같기때문이다.
// 결과적으로는 문법의 차이와 약간의 줄바꿈만 있을뿐 코드의 순차적인 모습은 같다고 볼 수 있음

// .catch 에서 error => {} 방법이나 (error) => console.log(""); 방법이나 똑같다.
// {} 블록을 쓰는건 console.log 외에 여러줄을 쓸 일이 있으면 사용하도록 한다.

// {} 블록을 쓰면 return 을 사용해줘야 하지만 .catch 에서 리턴이 없는 이유는
// 단순 출력만을 위해 사용되었기때문이며 .catch 이후로 .then 이 나오면 다음으로 넘겨줘야
// 하기 때문에 return 을 사용해야한다.



// 문제: “영화 예매 시스템 확장판”

// 영화 예매 시스템에는 다음 4가지 과정이 있어 👇
// selectMovie() – 영화 선택 (1.5초, 실패 확률 20%)
// bookSeat() – 좌석 예약 (2초, 실패 확률 25%)
// processPayment() – 결제 진행 (1.5초, 실패 확률 30%)
// sendTicket() – 티켓 전송 (1초, 실패 확률 10%)

// 🎯 요구사항
// 각 함수는 Promise를 반환해야 하며, 성공 시 "✅ (단계이름) 완료", 실패 시 Error("❌ (단계이름) 실패")를 반환해야 한다.
// selectMovie() 와 bookSeat() 은 .then() 체이닝을 이용해 순차적으로 실행해야 한다.
// 그 다음 processPayment() 와 sendTicket() 은 async/await 으로 순차 실행해야 한다.
// 전체 흐름은 다음 순서로 실행되어야 한다.

async function selectMovie() {
    const select = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            resolve("✅ 영화 선택 완료");
        } else {
            reject(new Error("❌ 영화 선택 실패"));
        }
    }, 1500));
    return select;
}

async function bookSeat() {
    const book = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.25;
        if (success) {
            resolve("✅ 좌석 예약 완료");
        } else {
            reject(new Error("❌ 좌석 예약 실패"));
        }
    }, 2000));
    return book;
}

async function processPayment() {
    const process = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            resolve("✅ 결제 진행 완료");
        } else {
            reject(new Error("❌ 결제 진행 실패"));
        }
    }, 1500));
    return process;
}

async function sendTicket() {
    const send = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
            resolve("✅ 티켓 전송 완료");
        } else {
            reject(new Error("❌티켓 전송 실패"));
        }
    }, 1000));
    return send;
}

// try-catch
// async function main() {
//     try {
//         const result1 = await selectMovie();
//         console.log(result1);
//         const result2 = await bookSeat();
//         console.log(result2);
//         const result3 = await processPayment();
//         console.log(result3);
//         const result4 = await sendTicket();
//         console.log(result4);
//         console.log("🎬 예매가 성공적으로 완료되었습니다!");
//     } catch (error) {
//         console.log("🚨 예매 중 오류 발생: ", error.message);
//     }
// }

// then-catch
// function main() {
//     selectMovie()
//         .then(result1 => {
//             console.log(result1);
//             return bookSeat();
//         })
//         .then(result2 => {
//             console.log(result2);
//             return processPayment();
//         })
//         .then(result3 => {
//             console.log(result3);
//             return sendTicket();
//         })
//         .then(result4 => {
//             console.log(result4);
//             console.log("🎬 예매가 성공적으로 완료되었습니다!");
//         })
//         .catch((error) => console.log("🚨 예매 중 오류 발생: ", error.message));
// }

async function totalMovie(failRate, stateMsg, time) {
    const total = await new Promise((resolve, reject) => setTimeout(() => {
        const success = Math.random() > failRate;
        if (success) {
            resolve(`✅ ${stateMsg} 완료`);
        } else {
            reject(new Error(`❌ ${stateMsg} 실패`));
        }
    }, time));
    return total;
}

//try-catch
async function main() {
    try {
        const results = await Promise.all([
            totalMovie(0.2, "영화 선택", 1500),
            totalMovie(0.25, "좌석 예약", 2000),
            totalMovie(0.3, "결제 진행", 1500),
            totalMovie(0.1, "티켓 전송", 1000),
        ]);
        results.forEach((msg) => console.log(msg));
        console.log("🎬 예매가 성공적으로 완료되었습니다!");
    } catch (error) {
        console.log("🚨 예매 중 오류 발생: ", error.message);
    }
}

// then-catch
function main() {
    totalMovie(0.2, "영화선택", 1500)
        .then(result1 => {
            console.log(result1);
            return totalMovie(0.25, "좌석 예약", 2000);
        })
        .then(result2 => {
            console.log(result2);
            return totalMovie(0.3, "결제 진행", 1500);
        })
        .then(result3 => {
            console.log(result3);
            return totalMovie(0.1, "티켓 전송", 1000);
        })
        .then(result4 => {
            console.log(result4);
            console.log("🎬 예매가 성공적으로 완료되었습니다!");
        })
        .catch((error) => console.log("🚨 예매 중 오류 발생: ", error.message));
}