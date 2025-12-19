// 📘 문제 41 — RetryAsyncQueue
// 🎯 목표
// 비동기 작업 큐를 만들되,
// 동시 실행 개수 제한
// 실패한 작업은 최대 N번 재시도
// 모든 작업의 최종 결과를 순서대로 반환
// 해야 한다.

// 📌 요구사항
// 1️⃣ 기본 구조
// class RetryAsyncQueue {
//   constructor(limit, retryCount) {}
//   add(taskFn) {}
//   run() {}
// }

// 2️⃣ 동작 규칙
// ✅ limit
// 동시에 실행할 수 있는 최대 task 수

// ✅ retryCount
// task가 실패했을 때 최대 재시도 횟수
// 재시도 초과 시 실패로 확정

// 3️⃣ task 규칙
// taskFn은 Promise를 반환하는 함수
// 성공 → resolve(value)
// 실패 → reject(error)

// 4️⃣ 결과 반환 규칙 (중요)
// run()은 Promise를 반환
// 결과는 add된 순서 그대로 배열로 반환

// [
//   { status: "fulfilled", value: ... },
//   { status: "rejected", reason: ... }
// ]

// 👉 Promise.allSettled 형식과 동일

// 5️⃣ 재시도 규칙 (핵심)
// 실패하면 같은 index로 다시 실행
// 재시도 중에도 limit은 반드시 지켜야 함
// 성공하면 즉시 확정
// 재시도 횟수 초과 시 실패 확정

class RetryAsyncQueue {
    #limit;
    #retryCount;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];

    constructor(limit, retryCount) {
        this.#limit = limit;
        this.#retryCount = retryCount;
    }

    add(taskFn) {
        const idx = this.#index++;
        this.#queue.push({
            taskFn,
            index: idx,
            retryLeft: this.#retryCount
        })
    }

    run() {
        if (this.#running) return;
        this.#running = true;

        const total = this.#queue.length;
        const results = new Array(total);
        let completed = 0;

        return new Promise((resolve) => {
            launchNext = () => {
                if (completed === total) {
                    this.#running = false;
                    resolve(results);
                    return;
                }

                if (this.#queue.length === 0 || this.#runningCount >= this.#limit) {
                    return;
                }

                const task = this.#queue.shift();
                this.#runningCount++;

                runTask = () => {
                    task.taskFn()
                        .then((value) => {
                            results[task.index] = {
                                status: "fullfilled",
                                value,
                            }
                            completed++;
                        })
                        .catch((error) => {
                            if (task.retryLeft > 0) {
                                task.retryLeft--;
                                runTask();
                                return;
                            }
                            results[task.index] = {
                                status: "rejected",
                                reason: error
                            }
                            completed++;
                        })
                        .finally(() => {
                            this.#runningCount--;
                            launchNext();
                        })
                }
                runTask();
                launchNext();
            }
            launchNext();
        });
    }
}

// 📘 문제 42 — TimeoutAsyncQueue
// 이번 문제의 핵심 키워드
// 실행 시작 시점
// 상태 전이 (대기 → 실행 → 종료)
// “끝나지 않은 작업” 처리

// 🎯 목표
// 동시 실행 개수 제한
// 각 task에 타임아웃 적용
// 타임아웃이 발생하면 실패로 확정
// 모든 결과를 add 순서대로 반환

// 📌 기본 구조
// class TimeoutAsyncQueue {
//   constructor(limit, timeoutMs) {}
//   add(taskFn) {}
//   run() {}
// }

// 📌 규칙
// 1️⃣ limit
// 동시에 실행 가능한 task 수

// 2️⃣ timeoutMs
// task 하나당 최대 실행 시간 (ms)
// 이 시간을 넘기면 실패 처리

// 📌 task 규칙
// taskFn은 Promise를 반환하는 함수
// 성공 → resolve(value)
// 실패 → reject(error)
// 타임아웃 → reject(new Error("timeout"))

// 📌 run() 반환값
// [
//   { status: "fulfilled", value: ... },
//   { status: "rejected", reason: Error("timeout") }
// ]

// 👉 Promise.allSettled 형식

class TimeoutAsyncQueue {
    #limit;
    #timeoutMs;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];

    constructor(limit, timeoutMs) {
        this.#limit = limit;
        this.#timeoutMs = timeoutMs;
    }

    add(taskFn) {
        const idx = this.#index++;
        this.#queue.push({
            taskFn,
            index: idx,
        })
    }

    run() {
        if (this.#running) return;
        this.#running = true;

        const total = this.#queue.length;
        const results = new Array(total);
        let completed = 0;

        return new Promise((resolve) => {
            const launchNext = () => {
                if (completed === total) {
                    this.#running = false;
                    resolve(results);
                    return;
                }

                if (this.#queue.length === 0 || this.#runningCount >= this.#limit) {
                    return;
                }

                const task = this.#queue.shift();
                this.#runningCount++;

                let finished = false;

                const timer = setTimeout(() => {
                    if (finished) return;
                    finished = true;

                    results[task.index] = {
                        status: "rejected",
                        reason: new Error("timeout"),
                    }
                    completed++;
                    this.#runningCount--;
                    launchNext();
                }, this.#timeoutMs);

                task.taskFn()
                    .then((value) => {
                        if (finished) return;
                        finished = true;
                        clearTimeout(timer);
                        results[task.index] = {
                            status: "fulfilled",
                            value,
                        }
                        completed++;
                    })
                    .catch((error) => {
                        if (finished) return;
                        finished = true;
                        clearTimeout(timer);
                        results[task.index] = {
                            status: "rejected",
                            reason: error,
                        }
                        completed++;
                    })
                    .finally(() => {
                        if (!finished) return;
                        this.#runningCount--;
                        launchNext();
                    })
                launchNext();
            }
            launchNext();
        })
    }
}