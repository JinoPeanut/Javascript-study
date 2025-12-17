// 🔥 LEVEL 42 문제
// “순서는 유지하되, 동시 실행은 허용하는 Async Queue”
// 📌 요구사항

// 다음 조건을 만족하는 OrderedAsyncQueue 클래스를 만들어라.

// ✅ 기능 요구

// 동시에 최대 limit개까지 실행 가능

// task 실행은 병렬로 되지만

// 결과는 add된 순서대로만 처리(반환) 되어야 한다

// task 중 하나가 실패해도

// 다른 task는 계속 실행

// 실패한 task 자리는 Error 객체로 결과에 포함

// 모든 task가 끝나면

// run()은 결과 배열을 resolve

class OrderedAsyncQueue {
    #limit;
    #running = false;
    #runningCount = 0;
    #queue = [];
    #index = 0;

    constructor(limit) {
        this.#limit = limit;
    }

    add(taskFn) {
        const currentIdx = this.#index++;
        this.#queue.push({
            taskFn,
            index: currentIdx,
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

                //모두 끝났으면 결과 반환
                if (completed === total) {
                    this.#running = false;
                    resolve(results);
                    return;
                }

                //실행할 수 없으면 종료
                if (this.#runningCount >= this.#limit || this.#queue.length === 0) {
                    return;
                }

                const { taskFn, index } = this.#queue.shift();
                this.#runningCount++;

                taskFn()
                    .then((value) => {
                        results[index] = value;
                    })
                    .catch((err) => {
                        results[index] = err;
                    })
                    .finally(() => {
                        this.#runningCount--;
                        completed++;
                        launchNext();
                    });
                launchNext();
            }
            launchNext();
        })
    }
}

// 🧩 LEVEL 42 — 복습 문제 (구조 고정)

// 이번엔 설계는 고정,
// 너는 핵심 로직만 채우는 문제야.

// 📌 문제

// 아래 OrderedAsyncQueue 에서
// ❓ 표시된 부분만 채워라

// 조건

// limit 동시 실행

// 결과는 add 순서 유지

// 실패도 결과에 포함

// run() 은 Promise 반환

class OrderedAsyncQueue {
    #queue = [];
    #limit;
    #runningCount = 0;
    #running = false;
    #index = 0;

    constructor(limit) {
        this.#limit = limit;
    }

    add(taskFn) {
        this.#queue.push({
            taskFn,
            index: this.#index++
        });
    }

    run() {
        if (this.#running) return;
        this.#running = true;

        const total = this.#queue.length;
        const results = new Array(total);
        let completed = 0;

        return new Promise((resolve) => {
            const launchNext = () => {
                // ❓ 1. 모든 task가 끝났을 때
                // resolve(results) 하고 return
                if (completed === total) {
                    this.#running = false;
                    resolve(results);
                    return;
                }

                // ❓ 2. 실행할 수 없는 조건
                // (limit 초과 or queue 비어있음)
                if (this.#runningCount >= this.#limit || this.#queue.length === 0) {
                    return;
                }

                const { taskFn, index } = this.#queue.shift();
                this.#runningCount++;

                taskFn()
                    .then((value) => {
                        // ❓ 3. 성공 결과 저장
                        results[index] = value;
                    })
                    .catch((err) => {
                        // ❓ 4. 실패 결과 저장
                        results[index] = err;
                    })
                    .finally(() => {
                        // ❓ 5. 상태 복구 + 다음 실행
                        this.#runningCount--;
                        completed++;
                        launchNext();
                    });

                // ❓ 6. limit 채우기용 재호출
                launchNext();
            };

            launchNext();
        });
    }
}

// LEVEL 43 — 실행 중 add() 허용 큐
// 📌 요구사항

// run() 실행 중에도 add() 가능

// 새로 추가된 task는 자동으로 이어서 실행

// run() 은

// 한 번만 실행

// 모든 task가 끝나면 resolve

// limit 동시 실행 유지

// 결과 순서 유지

class OrderedAsyncQueue {
    #limit;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];

    constructor(limit) {
        this.#limit = limit;
    }

    add(taskFn) {
        const curIdx = this.#index++;
        this.#queue.push({
            taskFn,
            index: curIdx,
        })

        if (this.#running) {
            this.#launchNext?.();
        }
    }

    run() {
        if (this.#running) return;
        this.#running = true;

        const results = [];

        return new Promise((resolve) => {
            launchNext = () => {
                if (this.#runningCount === 0 && this.#queue.length === 0) {
                    this.#running = false;
                    resolve(results);
                    return;
                }

                if (this.#runningCount >= this.#limit || this.#queue.length === 0) {
                    return;
                }

                const { taskFn, index } = this.#queue.shift();
                this.#runningCount++;

                taskFn()
                    .then((value) => {
                        results[index] = value;
                    })
                    .catch((err) => {
                        results[index] = err;
                    })
                    .finally(() => {
                        this.#runningCount--;
                        launchNext();
                    })
                launchNext();
            }
            this.#launchNext = launchNext;
            launchNext();
        })
    }
}