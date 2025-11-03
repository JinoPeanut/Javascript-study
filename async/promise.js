'use strict';

// 비동기적인 것을 수행할떄 콜백대신 쓸 수 있는 promise
// state: 프로미스가 만들어져서 우리가 지정한 오퍼레이션을 수행중일땐 pending 상태
// 이 오퍼레이션을 성공적으로 끝내면 fulfilled 상태
// 파일을 찾을 수 없거나 네트워크에 문제가 생긴다면 rejected 상태가 된다.
// promise 에서는 우리가 원하는 기능을 수행해서 해당하는 기능을 만들어내는 producer 기능이 있다
// 원하는 데이터를 소비하는 Consumer 기능이 있다

// 1. Producer (resolve, reject)
// 네트워크 통신으로 시간이 많이 걸리는 일은 promise 를 써서 비동기적으로 처리함
// promise 를 만드는 순간 우리가 전달한 excute 콜백함수가 바로 전달됨
// 만약 네트워크 요청을 사용자가 요청했을때만 해야하는 경우라면 즉 사용자가 버튼을 눌렀을때
// 네트워크 요청을 해야되는 경우라면 아래처럼 작성하게 되면 사용자가 요구하지 않았는데
// 불필요한 네트워크 통신이 일어날 수 있음
const promise = new Promise((resolve, reject) => {
    console.log('doing something...');
    setTimeout(() => {
        //resolve('ellie');
        reject(new Error('no network'));
    }, 2000);
});

// 2. Cosumers (then, catch, finally)
// then: promise가 정상적으로 잘 수행되어서 최종적으로 resolve 라는 콜백함수를
// 통해서 전달한 값이 value에 파라미터로 전달된다.
// error: reject 일 경우 catch 를 사용함
// finally: 성공이든 실패든 그 값이 출력된 이후로 finally 의 기능을 수행함
promise
    .then((value) => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    });


// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        }); // then은 값을 보내도되고 promise 를 다시 보낼수도 있다
    })
    .then(num => console.log(num));


// 4. Error handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('chicken'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() =>
            //resolve(`${hen} => egg`)
            reject(new Error(`error! ${hen} => egg`))
            , 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => fried`), 1000);
    });

getHen()
    .then(hen => getEgg(hen))
    .catch(error => {
        return 'bread';
    }) //egg를 받을때 오류가 걸리면 대신 리턴할것
    .then(egg => cook(egg))
    .then(meal => console.log(meal))
    .catch(console.log);


// 5. 