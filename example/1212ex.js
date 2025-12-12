// ⭐ LEVEL 21 — 클래스 + Promise (비동기 로직 만들기)

// 문제:

// Server 라는 클래스를 만들고,

// fetchData() 메서드는 1초 뒤 "완료"를 resolve 하는 Promise 반환

// getMessage() 메서드는 await 를 써서 "서버 응답: 완료" 형태로 반환

class Server {
    fetchData() {
        return new Promise((resolve) => setTimeout(() => {
            resolve("완료");
        }, 1000));
    }
    async getMessage() {
        const result = await this.fetchData();
        return `서버응답: ${result}`;
    }
}

(async () => {
    const s = new Server();
    console.log(await s.getMessage());
})();

// ⭐ LEVEL 22 — 클래스 + Static + 싱글턴 패턴 구현

// 문제:

// Config 클래스를 만들고

// static instance = null

// 생성자가 처음 호출되면 instance 에 저장

// 이후에 new Config() 를 여러 번 호출해도 동일한 객체를 반환해야 함
// (= 싱글턴 패턴)

// const c1 = new Config();
// const c2 = new Config();
// console.log(c1 === c2);  // true

class Config {
    static instance = null;
    constructor() {
        if (Config.instance) {
            return Config.instance;
        }

        this.data = "some config data";

        Config.instance = this; //인스턴스에 자신을 저장
    }

}

// ⭐ LEVEL 23 — 클래스 안에서 Map 자료구조 사용하기

// 문제:

// UserStore 클래스를 만들고

// this.users = new Map()

// addUser(id, name)

// getUser(id) → id로 name 반환

// deleteUser(id)

// const store = new UserStore();
// store.addUser(1, "철수");
// console.log(store.getUser(1)); // "철수"
// store.deleteUser(1);
// console.log(store.getUser(1)); // undefined

class UserStore {
    constructor() {
        this.users = new Map();
    }
    addUser(id, name) {
        this.users.set(id, name);
    }
    getUser(id) {
        return this.users.get(id);
    }
    deleteUser(id) {
        return this.users.delete(id);
    }
}

// ⭐ LEVEL 24 — 클래스 상속 + 다형성 응용

// 문제:

// Shape 클래스를 만들고
// draw() 메서드 → "도형" 출력

// Circle 클래스
// draw() → "동그라미 그리기"

// Triangle 클래스
// draw() → "삼각형 그리기"

// 그리고
// drawShapes(shapes) 라는 함수를 만들어서,
// 전달받은 배열의 각 객체마다 draw() 호출

// const shapes = [new Circle(), new Triangle()];
// drawShapes(shapes);

// // 출력
// // 동그라미 그리기
// // 삼각형 그리기

class Shape {
    draw() {
        console.log("도형");
    }
}
class Circle extends Shape {
    draw() {
        console.log("동그라미 그리기");
    }
}
class Triangle extends Shape {
    draw() {
        console.log("삼각형 그리기");
    }
}
function drawShapes(shapes) {
    for (const shape of shapes) {
        shape.draw();
    }
}

// ⭐ LEVEL 25 — 클래스 + 모듈 패턴 시뮬레이션

// (웹 개발에서 정말 많이 씀)

// 문제:

// “Module” 클래스를 만들고

// 내부에 private 변수 #data = []

// addItem(item)

// getAll()

// removeItem(item) → 일치하는 첫 항목 삭제

// const m = new Module();
// m.addItem("A");
// m.addItem("B");
// m.removeItem("A");
// console.log(m.getAll()); // ["B"]

class Module {
    #data = [];

    addItem(item) {
        this.#data.push(item);
    }

    getAll() {
        return [...this.#data];
    }

    removeItem(item) {
        // indexOf 는 찾는값이 없을때 -1을 반환함
        const index = this.#data.indexOf(item); //첫 등장 위치찾기
        if (index !== -1) {
            this.#data.splice(index, 1); // 해당 위치 삭제
        }
    }
}