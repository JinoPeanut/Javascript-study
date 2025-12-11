// LEVEL 11 — getter/setter 심화

// Person 클래스 만들기

// name 과 age 를 생성자로 받기

// age 가 0보다 작으면 0으로 설정하는 setter 만들기

// getter 로 "이름: ___, 나이: ___" 반환

class Person {
    constructor({ name, age }) {
        this.name = name;
        this.age = age;
    }

    get info() {
        return `이름: ${this.name}, 나이: ${this.age}`;
    }
    set age(value) {
        if (value < 0) {
            this._age = 0;
        } else {
            this._age = value;
        }
    }
    get age() {
        return this._age;
    }
}

// LEVEL 12 — private + getter/setter

// Account 클래스 만들기

// private 변수 #money

// deposit(amount) → money 증가

// withdraw(amount) → 돈 부족하면 "잔액 부족"

// get balance() → money 반환

class Account {
    #money = 0;
    deposit(amount) {
        this.#money += amount;
    }
    withdraw(amount) {
        if (amount > this.#money) {
            return "잔액 부족";
        }
        this.#money -= amount;
    }
    get balance() {
        return this.#money;
    }
}

// LEVEL 13 — 상속 + super 복습

// Shape 클래스

// getArea() 메서드(기본은 0 반환)

// Rectangle 클래스 (Shape 상속)

// width, height 받음

// getArea() 오버라이드해서 넓이 반환

class Shape {
    getArea() {
        return 0;
    }
}
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}

// LEVEL 14 — 배열을 다루는 클래스

// TodoList 클래스

// todos = 빈 배열

// add(todo)

// remove(index)

// getAll() → 전체 배열 반환

class TodoList {
    constructor() {
        this.todos = [];
    }
    add(todo) {
        this.todos.push(todo);
    }
    remove(index) {
        this.todos.splice(index, 1);
    }
    getAll() {
        return this.todos;
    }
}

// LEVEL 15 — 클래스 안에서 filter/map 활용

// StudentManager 클래스

// students = 배열

// addStudent({name, score})

// getPassed(minScore) → minScore 이상 점수 가진 학생만 배열로 반환

class StudentManager {
    constructor() {
        this.students = [];
    }
    addStudent({ name, score }) {
        this.students.push({ name, score });
    }
    getPassed(minScore) {
        return this.students.filter(s => s.score >= minScore);
    }
}

// ⭐ LEVEL 16 — 정적(static) 프로퍼티 활용

// 문제:
// Counter 클래스를 만들고,

// static count = 0

// 생성자 실행될 때마다 count 1 증가

// static getCount() → 현재 count 반환

class Counter {
    static count = 0;

    constructor() {
        Counter.count++;
    }

    static getCount() {
        return Counter.count;
    }
}

// ⭐ LEVEL17 — 상속 + super + private 혼합

// 문제:
// Employee(직원) 클래스를 만들고:
// name, #salary 받기
// getSalary() → #salary 반환
// Manager(관리자) 클래스 만들기:
// Employee 상속
// 추가로 team(문자열 배열)을 생성자로 받기
// addMember(name) → 팀원 추가
// getInfo() → "관리자 ___ / 팀원: ___" 출력

class Employee {
    #salary;
    constructor({ name, salary }) {
        this.name = name;
        this.#salary = salary;
    }
    getSalary() {
        return this.#salary;
    }
}
class Manager extends Employee {
    constructor({ name, salary }) {
        super({ name, salary });
        this.team = [];
    }
    addMember(name) {
        this.team.push(name);
    }
    getInfo() {
        return `관리자: ${this.name} / 팀원: ${this.team.join(", ")}`;
    }
}

// ⭐ LEVEL 18 — 클래스 안에서 map/filter/sort 응용

// 문제:
// ScoreBoard 클래스

// scores = 빈 배열

// add(name, score)

// getTop3() → score 기준으로 상위 3명 배열 반환

// getAverage() → 전체 평균 점수

class ScoreBoard {
    constructor() {
        this.scores = [];
    }
    add(name, score) {
        this.scores.push({ name, score });
    }
    getTop3() {
        return this.scores.sort((a, b) => b.score - a.score).slice(0, 3);
    }
    getAverage() {
        const total = this.scores.reduce((sum, item) => sum + item.score, 0);
        return total / this.scores.length;
    }
}

// ⭐ LEVEL 19 — toString 오버라이드

// 문제:
// Point(점) 클래스를 만들고
// x, y를 생성자로 받기

// toString() 메서드 오버라이드해서
// "(${x}, ${y})" 형태 문자열 반환

// const p = new Point(3, 5);
// console.log(String(p));  // "(3, 5)"

class Point {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

// ⭐ LEVEL 20 — 클래스 안에서 객체 배열 조작

// 문제:
// Library 클래스를 만들고:

// books = 빈 배열

// addBook({title, author, year})

// findByAuthor(name) → 해당 author 책들 배열로 반환

// getLatest() → year 가장 최신 책 반환

class Library {
    constructor() {
        this.books = [];
    }
    addBook({ title, author, year }) {
        this.books.push({ title, author, year });
    }
    findByAuthor(name) {
        return this.books.filter(s => s.author === name);
    }
    getLatest() {
        return [...this.books].sort((a, b) => b.year - a.year)[0];
    }
}