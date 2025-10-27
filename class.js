"use strict";

// 1. Class
class Person {
    // constructor
    constructor(name, age) {
        // field
        this.name = name;
        this.age = age;
    }
    // method
    speak() {
        console.log(`${this.name}: hello!`);
    }
}

const ellie = new Person('ellie', 20);
console.log(ellie.name); // ellie
console.log(ellie.age); // 20

// 2. Getter Setter
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    //this.age 가 호출
    get age() {
        return this._age;
    }
    // = age 가 호출
    set age(value) {
        //if (value < 0) {
        //    throw Error('age can not be negative'); //마이너스 값일때 경고출력
        //}
        //this.age = value; <- 는 무한반복이므로
        //this._age = value; 이런식으로 이름을 바꿈
        this._age = value < 0 ? 0 : value; //경고창 대신 값을 0으로 출력하게 만들어줄 수도 있다
    }
}

const user1 = new User('Steve', 'jobs', '-1');
console.log(user1.age);

// 3. Fields (public, private)
class Experiment {
    publicField = 2;
    #privateField = 0; //클래스 내부에서만 쓰고읽기 가능하지만 밖에선 아무것도 불가능
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4. Static
class Article {
    static publisher = 'Dream Coding';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
// article1 이 아닌 Article 클래스 이름 자체를 쓰는 이유는
// static은 오브젝트 자체로 할당되는것이 아닌 클래스 자체에 붙어있기 때문
console.log(Article.publisher);
Article.printPublisher();

// 상속 & 다양성
class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
        console.log(`drawing ${this.color} color of`);
    }
    getArea() {
        return width * this.height;
    }
}

class Rectangle extends Shape { }
class Triangle extends Shape {
    draw() {
        super.draw(); //공통으로 정의한 부모의 draw도 같이 호출함
        console.log('삼각형');
    }
    getArea() {
        return (width * this.height) / 2;
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
const triangle = new Triangle(20, 20, 'red');
triangle.draw();

// 6. InstanceOf
// 왼쪽에 있는 오브젝트가 오른쪽 클래스의 인스턴스가 맞는지 아닌지 확인하는것
console.log(rectangle instanceof Rectangle); //true
console.log(triangle instanceof Rectangle); //false
console.log(triangle instanceof Triangle); //true
console.log(triangle instanceof Shape); //true
console.log(triangle instanceof Object); //true