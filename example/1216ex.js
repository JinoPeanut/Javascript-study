// ⭐ LEVEL — 클래스 + 비동기 작업 순차 실행 (실무 패턴)
// 문제

// AsyncQueue 클래스를 만들어라.

// 요구사항

// private 변수 #queue (초기값: 빈 배열)

// add(taskFn)

// taskFn 은 Promise를 반환하는 함수

// run()

// 큐에 있는 작업을 순서대로 하나씩 실행

// 앞 작업이 끝나야 다음 작업 실행

// 모든 작업이 끝나면 종료

// getSize()

// 현재 큐에 남아있는 작업 개수 반환

class AsyncQueue {
    #queue = [];

    add(taskFn) {
        this.#queue.push(taskFn);
    }
    async run() {
        while (this.#queue.length > 0) {
            const q = this.#queue.shift();
            await q();
        }
    }
    getSize() {
        return this.#queue.length;
    }
}

// ⭐ LEVEL 39 — 비동기 작업을 순서대로 실행하는 큐 (await 필수)

// 문제

// AsyncTaskQueue 클래스를 만들어라

// 요구사항

// private #tasks = []

// add(taskFn)
// - taskFn 은 반드시 Promise 를 반환하는 함수

// run()
// - 등록된 task 를 **순서대로 하나씩 await 실행**
// - 모든 task 가 끝날 때까지 기다려야 함

// getSize()
// - 남아있는 task 개수 반환

// 사용 예

// const q = new AsyncTaskQueue();

// q.add(() => new Promise(res => setTimeout(() => {
//     console.log(1);
//     res();
// }, 1000)));

// q.add(() => new Promise(res => setTimeout(() => {
//     console.log(2);
//     res();
// }, 500)));

// await q.run();

// 출력
// (1초 후) 1
// (0.5초 후) 2

class AsyncTaskQueue {
    #task = [];

    add(taskFn) {
        this.#task.push(taskFn);
    }

    async run() {
        while (this.#task.length > 0) {
            const atq = this.#task.shift();
            await atq();
        }
    }

    getSize() {
        return this.#task.length;
    }
}

// ⭐ LEVEL 39-2 — 실행 중 추가되는 비동기 작업 처리
// 문제

// AsyncTaskQueue 를 확장하라.

// 요구사항

// private #tasks = []

// private #running = false

// add(taskFn)

// taskFn은 Promise를 반환하는 함수

// run() 실행 중에도 add() 가능

// 실행 중 추가된 task도 같은 run 사이클에서 순서대로 실행

// run()

// 이미 실행 중이면 아무 것도 하지 않고 return

// 큐가 빌 때까지 모든 task를 순서대로 await 실행

// 실행 종료 시 #running = false

class AsyncTaskQueue {
    #tasks = [];
    #running = false;

    add(taskFn) {
        this.#tasks.push(taskFn);
    }

    async run() {
        if (this.#running) return;

        this.#running = true;

        while (this.#tasks.length > 0) {
            const atq = this.#tasks.shift();
            await atq();
        }

        this.#running = false;
    }
}

// 🔥 LEVEL 40 — 에러 제어 가능한 비동기 큐
// 문제

// AdvancedAsyncQueue 클래스를 만들어라.

// 요구사항

// private #tasks = []

// private #running = false

// add(taskFn)

// Promise를 반환하는 함수만 허용

// 아니면 TypeError 발생

// run(options)
// run({
//   stopOnError: boolean // default true
// })

// 동작 규칙

// 이미 실행 중이면 return

// task를 순서대로 await 실행

// task 실행 중 에러 발생 시

// stopOnError === true → 즉시 중단

// stopOnError === false → 에러 무시하고 다음 task 실행

// run 종료 시 #running = false

class AdvancedAsyncQueue {
    #tasks = [];
    #running = false;

    add(taskFn) {
        if (typeof taskFn !== "function") {
            throw new TypeError("taskFn must be a function");
        }

        const result = taskFn();
        if (!(result instanceof Promise)) {
            throw new TypeError("taskFn must return a Promise");
        }

        this.#tasks.push(taskFn);
    }

    async run({ stopOnError = true } = {}) {
        if (this.#running) return;

        this.#running = true;

        try {
            while (this.#tasks.length > 0) {
                const task = this.#tasks.shift();

                try {
                    await task();
                } catch (error) {
                    if (stopOnError) {
                        throw error;
                    }
                }
            }
        } finally {
            this.#running = false;
        }
    }
}

// 🔥 LEVEL 41 — 동시 실행 제한 비동기 큐 (Concurrency Limit)
// 문제

// LimitedAsyncQueue 클래스를 구현하라.

// 요구사항
// private 필드
// #queue = [];
// #runningCount = 0;
// #limit;

// constructor(limit)

// 동시에 실행 가능한 최대 task 수

// limit은 1 이상의 정수

// add(taskFn)

// taskFn은 Promise를 반환하는 함수

// 큐에 task 추가

// 실행 중이어도 추가 가능

// run()

// 큐에 있는 task를 실행

// 동시에 최대 limit개까지만 실행

// 실행 중인 task가 끝나면 다음 task 실행

// 모든 task가 끝나면 종료

// run이 이미 실행 중이면 return

class LimitedAsyncQueue {
    #queue = [];
    #runningCount = 0;
    #running = false;
    #limit;

    constructor(limit) {
        this.#limit = limit
    }

    add(taskFn) {
        this.#queue.push(taskFn);
    }

    run() {
        if (this.#running) return;
        this.#running = true;

        const launchNext = () => {
            if (this.#queue.length === 0) {
                if (this.#runningCount === 0) {
                    this.#running = false;
                }
                return;
            }

            if (this.#runningCount >= this.#limit) return;

            const task = this.#queue.shift();
            this.#runningCount++;

            task().finally(() => {
                this.#runningCount--;
                launchNext();
            });
            launchNext();
        }
        launchNext();
    }
}