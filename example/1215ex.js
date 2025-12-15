// ⭐ LEVEL 33 — 클래스 + 옵저버 패턴 기초 (상태 변경 알림)
// 문제
// Counter 클래스를 만들기
// private 변수 #value (초기값: 0)
// private 변수 #listeners (빈 배열)
// addListener(fn)
// → fn 을 listeners 에 추가
// increment()
// → value 1 증가
// → 모든 listener 에 현재 value 전달하여 실행
// getValue()
// → 현재 value 반환
// 사용 예

// const c = new Counter();

// c.addListener((v) => {
//     console.log("현재 값:", v);
// });

// c.increment(); // 현재 값: 1
// c.increment(); // 현재 값: 2

class Counter {
    #value = 0;
    #listeners = [];
    addListener(fn) {
        this.#listeners.push(fn);
    }

    increment() {
        this.#value++;

        for (const listener of this.#listeners) {
            listener(this.#value);
        }
    }

    getValue() {
        return this.#value;
    }
}

// ⭐ LEVEL 34 — 클래스 + 옵저버 패턴 완성

// 문제

// Temperature 클래스 만들기

// private #temp = 0
// private #observers = []

// subscribe(fn) → 관찰자 등록
// setTemp(value) → 온도 변경 + 모든 관찰자 호출
// getTemp() → 현재 온도 반환

// 사용 예
// const t = new Temperature();
// t.subscribe(v => console.log("현재 온도:", v));
// t.setTemp(25); // 현재 온도: 25
// t.setTemp(30); // 현재 온도: 30

class Temperature {
    #temp = 0;
    #observers = [];

    subscribe(fn) {
        this.#observers.push(fn);
    }

    setTemp(value) {
        this.#temp = value;

        for (const observer of this.#observers) {
            observer(this.#temp);
        }
    }

    getTemp() {
        return this.#temp;
    }
}

// ⭐ LEVEL 35 — 클래스 + 상태 이력 관리 (히스토리)

// 문제

// History 클래스 만들기

// private #states = []

// add(state) → 상태 추가
// undo() → 가장 최근 상태 제거하고 제거된 상태 반환
// getAll() → 전체 상태 배열 반환

// 사용 예
// const h = new History();
// h.add("A");
// h.add("B");
// h.add("C");

// console.log(h.getAll()); // ["A", "B", "C"]
// console.log(h.undo());  // "C"
// console.log(h.getAll()); // ["A", "B"]

class History {
    #state = [];
    add(state) {
        this.#state.push(state);
    }
    undo() {
        this.#state.splice(-1, 1);
    }
    getAll() {
        return this.#state;
    }
}

// ⭐ LEVEL 36 — 클래스 + 커맨드 패턴 기초

// 문제

// CommandHistory 클래스를 만들어라

// 요구사항

// private #commands = []

// execute(commandFn)
// → commandFn 실행
// → commandFn을 히스토리에 저장

// undo()
// → 가장 마지막 commandFn을 되돌리는 함수 실행

// 힌트:
// commandFn은 실행 함수와 undo 함수 둘 다 가진 객체

// 사용 예
// const h = new CommandHistory();

// h.execute({
//   run: () => console.log("실행 A"),
//   undo: () => console.log("취소 A")
// });

// h.execute({
//   run: () => console.log("실행 B"),
//   undo: () => console.log("취소 B")
// });

// h.undo(); // 취소 B
// h.undo(); // 취소 A

class CommandHistory {
    #commands = [];

    execute(commandFn) {
        commandFn.execute();
        this.#commands.push(commandFn);
    }
    undo() {
        const last = this.#commands.pop();
        if (last) {
            last.undo();
        }
    }
}

// ⭐ LEVEL 36 — 클래스 + 이벤트 큐 시뮬레이션

// 문제

// EventQueue 클래스를 만들어라.

// 요구사항:

// private #queue = []

// add(eventFn)
// → 큐에 함수(eventFn)를 추가

// run()
// → 큐에 있는 함수들을
//    추가된 순서대로 하나씩 실행
// → 실행이 끝난 함수는 큐에서 제거

// getSize()
// → 현재 큐에 남아있는 이벤트 개수 반환

// 사용 예
// const q = new EventQueue();
// q.add(() => console.log("A"));
// q.add(() => console.log("B"));
// q.add(() => console.log("C"));

// q.run();
// // 출력
// // A
// // B
// // C

// console.log(q.getSize()); // 0

class EventQueue {
    #queue = [];

    add(eventFn) {
        this.#queue.push(eventFn);
    }
    run() {
        while (this.#queue.length > 0) {
            const eventFn = this.#queue.shift();
            eventFn();
        }
    }
    getSize() {
        return this.#queue.length;
    }
}

// ⭐ LEVEL 37 — 클래스 + 타이머 관리 (setTimeout 제어)

// 문제

// Timer 클래스 만들기

// private #timers = []

// start(fn, delay)
// → setTimeout 으로 fn 실행
// → 생성된 timerId 를 #timers 에 저장

// clearAll()
// → 등록된 모든 타이머 취소
// → #timers 비우기

// getCount()
// → 현재 등록된 타이머 개수 반환

// 사용 예
// const t = new Timer();
// t.start(() => console.log("A"), 1000);
// t.start(() => console.log("B"), 2000);
// console.log(t.getCount()); // 2
// t.clearAll();
// console.log(t.getCount()); // 0

class Timer {
    #timers = [];

    start(fn, delay) {
        const id = setTimeout(fn, delay);
        this.#timers.push(id);
    }

    clearAll() {
        for (const id of this.#timers) {
            clearTimeout(id);
        }
        this.#timers = [];
    }

    getCount() {
        return this.#timers.length;
    }
}

// ⭐ LEVEL — 클래스 + 큐 + 비동기 실행 제어

// 문제

// TaskRunner 클래스를 만들기

// private #tasks = []

// add(taskFn) → 작업 추가 (taskFn은 함수)

// run() →
//  - 작업을 하나씩 순서대로 실행
//  - 각 taskFn은 Promise를 반환
//  - 이전 작업이 끝난 뒤 다음 작업 실행

// getCount() → 남은 작업 개수 반환

// 사용 예
// const r = new TaskRunner();
// r.add(() => new Promise(res => setTimeout(() => { console.log(1); res(); }, 1000)));
// r.add(() => new Promise(res => setTimeout(() => { console.log(2); res(); }, 500)));
// await r.run();
// 출력: 1 (1초 뒤), 2 (그 다음 0.5초 뒤)

class TaskRunner {
    #tasks = [];

    add(taskFn) {
        this.#tasks.push(taskFn);
    }
    run() {
        while (this.#tasks.length > 0) {
            const task = this.#tasks.shift(); // 변수 지정
            task(); // 실행 -> shift 순서
        }
    }
    getCount() {
        return this.#tasks.length;
    }
}