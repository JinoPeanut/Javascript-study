// ⭐ LEVEL 26 — 상태를 가지는 클래스 (토글 로직)

// 문제

// Toggle 클래스를 만들기

// private 변수 #on (초기값: false)

// toggle() → on / off 상태를 반전

// isOn() → 현재 상태 반환 (true / false)

// const t = new Toggle();
// t.toggle();
// console.log(t.isOn()); // true
// t.toggle();
// console.log(t.isOn()); // false

class Toggle {
    #on = false;
    toggle() {
        if (this.#on === false) {
            this.#on = true;
        } else {
            this.#on = false;
        }
        // this.#on = !this.#on; 이렇게도 가능하다
    }
    isOn() {
        return this.#on;
    }
}

// ⭐ LEVEL 27 — 클래스 조합 (클래스 안에 클래스)

// 문제

// Engine 클래스

// power 받음

// getPower() → power 반환

// Car 클래스

// name, engine(Engine 인스턴스) 받음

// getInfo() → "차량: ___ / 출력: ___"

// const engine = new Engine(300);
// const car = new Car("BMW", engine);
// console.log(car.getInfo());
// // 차량: BMW / 출력: 300

class Engine {
    constructor(power) {
        this.power = power;
    }
    getPower() {
        return this.power;
    }
}

class Car {
    constructor({ name, engine }) {
        this.name = name;
        this.engine = engine;
    }
    getInfo() {
        return `차량: ${this.name} / 출력: ${this.engine.getPower()}`;
    }
}

// ⭐ LEVEL 28 — static + 인스턴스 혼합

// 문제

// User 클래스

// static count (총 유저 수)

// 생성자에서 name 받기

// 생성될 때마다 count 증가

// getName() → 이름 반환

// static getUserCount() → count 반환

// new User("A");
// new User("B");

// console.log(User.getUserCount()); // 2

class User {
    static count = 0;
    constructor(name) {
        this.name = name;
        User.count++;
    }
    getName() {
        return this.name;
    }
    static getUserCount() {
        return User.count;
    }
}

// ⭐ LEVEL 29 — 클래스 + Set (중복 제거 관리)

// 문제

// TagManager 클래스

// private #tags (Set)

// add(tag)

// remove(tag)

// getAll() → 배열로 반환

// const tm = new TagManager();
// tm.add("js");
// tm.add("js");
// tm.add("react");

// console.log(tm.getAll()); // ["js", "react"]

class TagManager {
    #tags = new Set();
    add(tag) {
        this.#tags.add(tag);
    }
    remove(tag) {
        this.#tags.delete(tag);
    }
    getAll() {
        return [...this.#tags];
    }
}

// ⭐ LEVEL 30 — 클래스 + 비동기 상태 관리 (실무 느낌)

// 문제

// Loader 클래스

// private #loading (false)

// load()

// loading = true

// 1초 후 loading = false

// Promise 반환

// isLoading() → 현재 상태 반환

// const l = new Loader();
// console.log(l.isLoading()); // false

// await l.load();
// console.log(l.isLoading()); // false

class Loader {
    #loading = false;

    load() {
        this.#loading = true;

        return new Promise((resolve) => setTimeout(() => {
            this.#loading = false;
            resolve();
        }, 1000));
    }

    isLoading() {
        return this.#loading;
    }
}

// ⭐ LEVEL 31 — 클래스 + 에러 처리 (throw / try)
// 문제

// Calculator 클래스를 만들기

// 요구사항

// divide(a, b) 메서드

// b가 0이면 에러를 발생시켜야 함

// 에러 메시지: "0으로 나눌 수 없습니다"

// 정상일 경우 a / b 반환

// 사용 예
// const c = new Calculator();

// try {
//     console.log(c.divide(10, 2)); // 5
//     console.log(c.divide(10, 0)); // 에러
// } catch (e) {
//     console.log(e.message); // "0으로 나눌 수 없습니다"
// }

class Calculator {
    divide(a, b) {
        if (b === 0) {
            throw new Error("0으로 나눌 수 없습니다");
        } else {
            return a / b;
        }
    }
}

// ⭐ LEVEL 32 — 클래스 + 캐싱 로직
// 문제

// DataFetcher 클래스를 만들어라.

// 요구사항

// private 변수 #cache (초기값: null)

// fetch() 메서드:

// 처음 호출되면
// → 1초 뒤 "데이터"를 resolve 하는 Promise 반환
// → 동시에 #cache 에 저장

// 두 번째부터는
// → Promise 없이 즉시 캐시된 값 반환

// hasCache() 메서드:

// 캐시가 있으면 true, 없으면 false

// 사용 예
// const d = new DataFetcher();

// console.log(d.hasCache()); // false

// await d.fetch();           // 1초 걸림
// console.log(d.hasCache()); // true

// await d.fetch();           // 즉시

class DataFetcher {
    #cache = null;

    fetch() {
        if (this.#cache !== null) {
            return this.#cache;
        } else {
            return new Promise((resolve) => setTimeout(() => {
                this.#cache = "데이터";
                resolve(this.#cache);
            }, 1000))
        }
    }

    hasCache() {
        if (this.#cache !== null) {
            return true;
        } else {
            return false;
        }
    }
}