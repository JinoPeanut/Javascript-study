'use strict';

// 호이스팅: var, 함수선언들이 자동으로 제일위로 올라가는것
// 호이스팅이 된 이후부터 코드가 나타는 순서대로 실행된다.

// async: 언제 실행될지 모르는 것
// setTimeout이 1000ms 후 실행되기때문에 비동기 라고 한다
console.log('1'); //동기 실행
setTimeout(function () {
    console.log('2');
}, 1000); //비동기 실행
console.log('3');

// Synchronous callback
function printImmediately(print) {
    print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);


// callback 예제
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if ((id === 'ellie' && password === 'dream') || (id === 'coder' && password === 'academy')) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }
    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

// 1. id, password 를 이용해서 서버에 로그인
// 2. 성공이면 아이디를 받아와서 id로 role를 요청
// 3. 성공이면 사용자의 오브젝트를 출력

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            error => {
                console.log(error)
            },
        )

    }, (error) => { console.log(error) })