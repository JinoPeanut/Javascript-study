// 🔥 다음 문제: Retry + Timeout + Concurrency Queue
// 📌 요구사항

// RetryAsyncQueue 클래스를 구현해라.

// 1️⃣ 기본 구조
// class RetryAsyncQueue {
//   constructor(limit, timeoutMs, retryCount) {}
//   add(taskFn) {}
//   run() {}
// }

// 2️⃣ 동작 조건
// ✅ 동시 실행 제한
// 동시에 실행 가능한 task는 limit 개까지

// ✅ 타임아웃
// 각 task는 timeoutMs를 초과하면 timeout 실패

// ✅ 재시도 (중요)
// task가 reject 또는 timeout 되면
// 최대 retryCount 번까지 재시도
// 재시도 중 성공하면 fulfilled
// retryCount 초과 시 최종 rejected

// 3️⃣ 결과 형식 (순서 유지 필수)
// [
//   { status: "fulfilled", value },
//   { status: "rejected", reason }
// ]

// ⚠️ add 순서대로 결과가 반환돼야 한다

// 4️⃣ 중요한 제약 (핵심 난이도)
// ❌ Promise.race 사용 금지
// ❌ 외부 라이브러리 사용 금지
// ❌ 전역 변수 사용 금지
// ✔️ finished / attempt / retry 상태 직접 관리

class RetryAsyncQueue {
    #limit;
    #timeoutMs
    #retryCount
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];

    constructor(limit, timeoutMs, retryCount) {
        this.#limit = limit;
        this.#timeoutMs = timeoutMs;
        this.#retryCount = retryCount;
    }

    add(taskFn) {
        const idx = this.#index++;
        this.#queue.push({
            taskFn,
            index: idx,
            retryLeft: this.#retryCount,
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

                if (this.#runningCount >= this.#limit || this.#queue.length === 0) {
                    return;
                }

                const task = this.#queue.shift();
                this.#runningCount++;

                runTask = () => {
                    let finished = false;

                    const timer = setTimeout(() => {
                        if (finished) return;
                        finished = true;

                        if (task.retryLeft > 0) {
                            task.retryLeft--;
                            runTask();
                            return;
                        }

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
                            this.#retryCount--;
                            launchNext();
                        })
                        .catch((error) => {
                            if (finished) return;
                            finished = true;
                            clearTimeout(timer);
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
                            this.#runningCount--;
                            launchNext();
                        })
                }
                runTask();
                launchNext();
            }
            launchNext();
        })
    }
}

// 🔥 다음 문제: CancelableAsyncQueue
// 🧩 문제 목표
// 아래 조건을 모두 만족하는 비동기 작업 큐를 만들어라.

// 📌 요구사항
// 1️⃣ 기본 구조
// class CancelableAsyncQueue {
//     constructor(limit) {}
//     add(taskFn) {}
//     run() {}
//     cancel() {}
// }

// 2️⃣ 동시 실행 제한
// 한 번에 최대 limit개의 task만 실행
// limit 초과 시 대기열(queue)에 보관

// 3️⃣ 실행 결과 반환
// run()은 Promise를 반환하며
// 모든 task가 끝나면 아래 형태의 배열을 resolve 해야 한다.

// [
//   { status: "fulfilled", value: ... },
//   { status: "rejected", reason: ... },
//   { status: "canceled" }
// ]

// ✅ add 순서 기준 유지 (index 고정)

// 4️⃣ cancel 기능 (핵심 ⭐)
// queue.cancel();
// cancel()이 호출되면:
// 🔴 실행 중이 아닌 task
// 즉시 취소
// 결과: { status: "canceled" }
// 🟡 이미 실행 중인 task
// 끝까지 실행은 시킴
// 하지만 결과는 무조건 canceled
// taskFn()이 성공해도
// → { status: "canceled" }

// 5️⃣ cancel 이후 규칙
// cancel 이후 새 task 실행 금지
// 실행 중이던 task들이 전부 종료되면 run() resolve

class CancelableAsyncQueue {
    #limit;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];
    #canceled = false;

    constructor(limit) {
        this.#limit = limit;
    }

    add(taskFn) {
        const idx = this.#index++;
        this.#queue.push({
            taskFn,
            index: idx,
        })
    }

    cancel() {
        if (this.#canceled) return;
        this.#canceled = true;
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

                // ✅ cancel 상태면 큐에 대기중인 작업 즉시 처리
                if (this.#canceled) {
                    while (this.#queue.length > 0) {
                        const task = this.#queue.shift();
                        results[task.index] = { status: "canceled" };
                        completed++;
                    }
                    return;
                }

                if (this.#queue.length === 0 || this.#runningCount >= this.#limit) {
                    return;
                }

                const task = this.#queue.shift();
                this.#runningCount++;

                task.taskFn()
                    .then((value) => {
                        // 큐 실행중인 작업들
                        results[task.index] = this.#canceled
                            ? { status: "canceled" }
                            : { status: "fulfilled", value };
                    })
                    .catch((error) => {
                        results[task.index] = this.#canceled
                            ? { status: "canceled" }
                            : { status: "rejected", error };
                    })
                    .finally(() => {
                        this.#runningCount--;
                        completed++;
                        launchNext();
                    })
                launchNext();
            }
            launchNext();
        })
    }
}