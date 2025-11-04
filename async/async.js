// async & await
// 연속으로 promise를 쓰지않고 async와 await 으로 가시성좋게 만들수있다

// 1. async
// Promise 를 쓰는경우.
function fetchUser1() {
    return new Promise((resolve, reject) => {
        resolve('ellie');
    })
}
// async 를 쓰면 {} 블럭이 Promise 로 자동으로 바뀐다.
async function fetchUser2() {
    return 'ellie';
}

const user = fetchUser2();
user.then(console.log);

// 2. await
// async 가 붙은 함수 안에서만 쓸 수 있다

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(2000); // 2초가 끝날때까지 기다려준다.
    return 'apple';
}

async function getBanana() {
    await delay(3000);
    return 'banana';
}

// 아래같은 경우는 콜백지옥
// function pickFruits() {
//     return getApple()
//         .then(apple => {
//             return getBanana()
//                 .then(banana => `${apple} + ${banana}`);
//         })
// }
// pickFruits().then(console.log);

// async await 사용하면
async function pickFruits() {
    //const apple = await getApple(); // 2초 경과
    //const banana = await getBanana(); // 3초 경과 (순차적임 하지만 비효율적임)
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise; //이렇게 하면 동시에 2개의 작업을 병렬수행 한다
    return `${apple} + ${banana}`;
}
pickFruits().then(console.log);

// 3. Promise API
// 위에보다 더 간단한게 promise.all 를 사용
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])
        .then(fruits => fruits.join(' + '));
}
pickAllFruits().then(console.log);

// Promise.race 는 배열에 전달된 프로미스 중에서 가장먼저 값을리턴하는 것만 전달된다.
function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log); // 사과가 2초기 때문에 혼자 출력됨

// 예제1.
// 아래 코드를 async, await를 사용해서 간단하게 고쳐보자
class UserStorage {
    async loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if ((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }
    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (user === 'ellie') {
                    resolve({ name: 'ellie', role: 'admin' });
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(id, password)
    .then(userStorage.getRoles)
    .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
    .catch(console.log);
