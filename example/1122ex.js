// 문제: 결제 요청 처리 + 자동 재시도 시스템 구현하기
// ⭐ 핵심 기능: retry 메커니즘 구현하기
// processPayment 단계에서 실패하면

// → 최대 2번까지 재시도 해라.

// 즉:
// 1차 실패 → 다시 결제
// 2차 실패 → 다시 결제
// 3차 실패 → 진짜 실패로 처리

// ⭐ concurrency(동시 실행 제한)
// 동시에 2명까지만 처리되도록 제한할 것.

// ⭐ 결과 출력 형식
// 성공한 유저
// [id] 이름 - 유효성 검사 성공 / 결제 성공 / 영수증 발송 성공

// 실패한 유저
// [id] 이름 - 유효성 검사 성공 / 결제 실패(3회 실패)

// 또는:
// [id] 이름 - 유효성 검사 실패
// 🎁 보너스(선택)
// 누적 status 를 문자열 또는 배열로 관리해도 됨 (너가 선택)
// retry 횟수는 user 객체에 추가하지 말고 함수 내부에서 관리하는 방식

async function vaildateUser(user) {
    const time = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
    const vail = await new Promise((resolve, reject) => setTimeout(() => {
        if (user.amount > 0) {
            resolve({
                ...user, //스프레드 연산자 user가 가르키는 users의 배열을 순서대로 전체복사
                status: ["유효성 검사 성공"],
            });
        } else {
            reject({
                ...user,
                status: ["유효성 검사 실패"],
            });
        }
    }, time));
    return vail;
}

async function processPayment(user) {
    for (let i = 1; i <= 3; i++) {
        const time = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

        const result = await new Promise((resolve) => {
            setTimeout(() => {
                const success = Math.random() > 0.4;

                if (success) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, time)
        });

        if (result === true) {
            return {
                ...user,
                status: [...user.status, "결제 성공"],
            }
        }
        //마지막 실패면 reject
        if (i === 3) {
            throw {
                ...user,
                status: [...user.status, "결제 실패(3회 실패)"],
            };
        }
    }
}

async function sendReceipt(user) {
    const time = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    const send = await new Promise(resolve => setTimeout(() => {
        resolve({
            ...user,
            status: [...user.status, "영수증 발송 성공"],
        });
    }, time));
    return send;
}

async function main() {
    const users = [
        { id: 1, name: "유진호", amount: 1500 },
        { id: 2, name: "홍길동", amount: 1000 },
        { id: 3, name: "김철수", amount: 0 },
        { id: 4, name: "나영석", amount: 2100 },
        { id: 5, name: "김동하", amount: 0 },
    ];

    const concurrency = 2;
    const successList = [];
    const failList = [];

    for (let i = 0; i < users.length; i += concurrency) {
        const chunk = users.slice(i, i + concurrency);
        const promises = chunk.map(user =>
            vaildateUser(user)
                .then(processPayment)
                .then(sendReceipt)
                .then(res => successList.push(res))
                .then(err => failList.push(err))
        )
        await Promise.all(promises);
    }

    console.log("=== 성공한 유저 ===");
    successList.forEach(s => console.log(`[${s.id}] ${s.name} - ${s.status.join(" / ")}`));

    console.log("");

    console.log("===실패한 유저===");
    failList.forEach(f => console.log(`[${f.id}] ${f.name} - ${f.status.join(" / ")}`));
}

// (공부 요약 및 느낀점)

// ...user 처럼 ...의 뜻은 스프레드 연산자다 즉 내가 함수에서 파라미터로 가리키고 있는 객체를
// 복사해서 전체를 가져온다.
// id: user.id, name: user.name 하는거보다 ...user 한번이면 배열들을 다 가져오고 심지어
// 다 가져오다보니 후에 필요한걸 따로 빼서 쓸 수도 있다

// 기존에 사용하던 status: user.status + "문자열" 방식은 내 나름대로 가시성이 좋다고 생각했지만
// 실제로는 단순 즉시출력에만 장점이 있고 후속 관리가 어렵다는 단점이 있었다.
// 그래서 앞으로는 status: ["문자열"] 또는 이후 함수에는 status: [...user.status, "문자열"]
// 과 같은 형식으로 객체속성을 지정해야겠다.

// 배열이다보니 forEach 로 console.log 출력시에 ${}내부에 join을 쓰면 더 깔끔하게 출력해서
// 표시되는것을 알았다.

// 위 processPayment 함수에서 resolve를 두번쓸 생각은 한번도 못했다.
// 60% 확률로 성공 실패를 가르고 3번의 실패시 최종실패인 2개의 거름망이 있는 지문이었는데
// 저런방식의 코딩도 가능하구나 라는것을 이번에 처음알게 되었다. 생각이 아주 조금 더 넓어진듯 하다

// processPayment 함수에서 3번째 실패시에 reject 와 throw 의 차이를 모르고 throw 를 쓰는것에
// 대한 오해가 있었는데 throw 를 쓰면 코드가 즉시 중지한다는 생각을 가지고있었고 왜 reject 를
// 쓰지않는가에 대해 알아보니
// throw 와 reject 는 Promise를 거부상태로 만들어 catch 로 전달되는것은 같지만
// reject 는 promise 내부에서만 쓸 수 있고 throw 는 아니라는 점 이다.
// 그렇기때문에 두개의 거름망으로 나눠둔 상태에서 2번째 거름망에서 catch 로 보내려면
// throw 를 써야 catch 로 전달되기 때문이다.

// promise 내부에서 throw 를 쓸 수 있지만 reject 를 쓰는 이유는
// 가시성 때문이라고 생각한다. 협업을 한다면 설계의 의도가 쉽게 드러나는게 좋다고 생각하기
// 때문이다.