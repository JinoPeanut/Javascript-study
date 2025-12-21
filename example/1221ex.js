// 🔥 복습 + 다음 단계 진입용 문제
// 문제: SafeAsyncQueue (throw-safe + cancel-safe)
// 요구사항
// limit 개수만큼만 동시에 실행
// taskFn은 다음 중 아무거나 할 수 있음
// 값을 반환 (동기)
// Promise 반환 (비동기)
// 동기적으로 throw
// Promise reject
// 어떤 경우든:
// 큐가 멈추지 않아야 함
// runningCount / completed가 깨지면 안 됨

// 결과 형식

// {
//   status: "fulfilled",
//   value
// }
// {
//   status: "rejected",
//   reason
// }
// {
//   status: "canceled"
// }


// cancel() 호출 시
// 대기 중인 작업은 즉시 canceled
// 이미 실행 중인 작업은 결과 무시하고 canceled
// 절대 finally에서 결과를 기록하지 말 것
// finally는 상태 정리 전용

class SafeAsyncQueue {
    #limit;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];
    #canceled;

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

    runTask(taskFn) {
        if (this.#canceled) {
            return Promise.reject(new Error("canceled"));
        }
        return Promise.resolve()
            .then(() => taskFn());
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

                this.runTask(task.taskFn)
                    .then((value) => {
                        results[task.index] = this.#canceled
                            ? { status: "canceled" }
                            : { status: "fulfilled", value }
                    })
                    .catch((error) => {
                        results[task.index] = this.#canceled
                            ? { status: "canceled" }
                            : { status: "rejected", error }
                    })
                    .finally(() => {
                        this.#runningCount--;
                        completed++;
                        launchNext();
                    })
                launchNext();
            }
            launchNext();
        });
    }
}

// 📘 문제: AbortableAsyncQueue
// 목표
// AbortController를 사용해서
// 실행 중인 비동기 작업까지 중단 가능한 큐를 구현하라.

// 2️⃣ taskFn 규칙
// taskFn({ signal }) 형태
// signal.aborted === true 이면 즉시 중단
// AbortError 발생 시 → { status: "canceled" }

// 3️⃣ cancel() 동작
// 상태	처리
// 대기 중	즉시 canceled
// 실행 중	controller.abort()
// 완료	영향 없음

// 4️⃣ 결과 형식 (순서 보장)
// { status: "fulfilled", value }
// { status: "rejected", reason }
// { status: "canceled" }

// 5️⃣ 제한 사항 (중요)

// ❌ this.#canceled 같은 플래그 사용 금지
// ❌ taskFn 직접 종료 금지
// ✅ AbortController만 사용

class AbortableAsyncQueue {
    #limit;
    #index = 0;
    #runningCount = 0;
    #running = false;
    #queue = [];
    #canceled;
    #runningControllers = new Set();

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

        for (const controller of this.#runningControllers) {
            controller.abort();
        }
        this.#runningControllers.clear();

        while (this.#queue.length > 0) {
            const task = this.#queue.shift();
            this.#results[task.index] = { status: "canceled" };
            this.#completed++;
        }
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

                if (
                    this.#queue.length === 0
                    || this.#runningCount >= this.#limit
                    || this.#canceled
                ) {
                    return;
                }

                const controller = new AbortController();
                const task = this.#queue.shift();

                this.#runningControllers.add(controller);
                this.#runningCount++;

                task.taskFn({ signal: controller.signal })
                    .then((value) => {
                        results[task.index] = { status: "fulfilled", value }
                    })
                    .catch((error) => {
                        if (error.name === "AbortError") {
                            results[task.index] = { status: "canceled" }
                        } else {
                            results[task.index] = { status: "rejected", error }
                        }
                    })
                    .finally(() => {
                        this.#runningControllers.delete(controller);
                        this.#runningCount--;
                        completed++
                        launchNext();
                    })
                launchNext();
            }
            launchNext();
        })
    }
}