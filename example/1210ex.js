// 🎓 CLASS LEVEL 1 ~ 10 (기초)
// LEVEL 1 — 가장 기본적인 클래스 만들기

// 문제:
// User 클래스를 만들고,

// name 과 age 를 생성자로 받기

// introduce() 메서드에서 "내 이름은 ___, 나이는 ___" 출력

// class User {
//     constructor({ name, age }) {
//         this.name = name;
//         this.age = age;
//     }

//     introduce() {
//         return `내 이름은 ${this.name}, 나이는 ${this.age}`
//     }

//     birthday() {
//         return this.age += 1;
//     }
// }
const level = new User({ name: "유진호", age: 27 });
console.log(level.introduce());

// LEVEL 2 — 기본 메서드 추가

// User 클래스에서

// 나이를 1 증가시키는 birthday() 메서드 만들기

// birthday() 호출 후 age 가 증가하는지 확인

console.log(level.birthday());

// LEVEL 3 — 클래스 안에서 계산하기

// Product 클래스를 만들고

// 생성자에 name, price, quantity 받기

// totalPrice() 메서드는 price * quantity 반환

class Product {
    constructor({ name, price, quantity }) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    totalPrice() {
        return this.price * this.quantity;
    }
}

// LEVEL 4 — 기본 getter / setter 만들기

// Car 클래스를 만들고

// speed 값을 가지고 있음

// getSpeed() 메서드 → 현재 속력 반환

// setSpeed(value) 메서드 → 0 미만이면 속력을 0 으로 설정

class Car {
    constructor({ speed }) {
        this.speed = speed;
    }
    getSpeed() {
        return this.speed;
    }
    setSpeed(value) {
        if (value < 0) {
            this.speed = 0;
        } else {
            this.speed = value;
        }
    }
}

// LEVEL 5 — 클래스 안에서 배열 활용

// Cart 클래스 만들기

// items 배열을 생성자에서 빈 배열로 초기화

// addItem(item) 으로 배열에 push

// getCount() 로 전체 아이템 개수 반환

class Cart {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getCount() {
        return this.items.length;
    }
}

const cart = new Cart();
cart.addItem("apple");
cart.addItem("banana");
console.log(cart.getCount()); //2

// LEVEL 6 — 클래스 간 관계 (객체 안에 객체)

// User 클래스와 Address 클래스를 만들고

// Address 는 city, street

// User 는 name, address 를 받음

// getAddress() 메서드에서 "도시: ___, 거리: ___" 출력

class Address {
    constructor({ city, street }) {
        this.city = city;
        this.street = street;
    }
}

class User {
    constructor({ name, address }) {
        this.name = name;
        this.address = address;
    }
    getAddress() {
        return `도시: ${this.address.city}, 거리: ${this.address.street}`;
    }
}
const myAddress = new Address({ city: "부산", street: "기장" })
const user = new User({ name: "진호", address: myAddress });
console.log(user.getAddress());

// LEVEL 7 — static 메서드

// MathHelper 클래스 만들기

// static 메서드 add(a, b) → 두 수 더해서 반환

// static 메서드는 인스턴스를 생성하지 않고 호출 (MathHelper.add(1,2))

class MathHelper {
    static add(a, b) {
        return a + b;
    }
}
console.log(MathHelper.add(1, 2));

// LEVEL 8 — private 변수 (# 문법)

// BankAccount 클래스 만들기

// #balance(private)

// deposit(amount) : balance 증가

// getBalance() : balance 조회

class BankAccount {
    #balance = 0;
    deposit(amount) {
        return this.#balance += amount;
    }
    getBalance() {
        return this.#balance;
    }
}
const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100

// LEVEL 9 — 클래스 상속

// Animal 클래스

// sound() 메서드 → "동물 소리" 출력

// Dog 클래스는 Animal 상속

// sound() 오버라이드 해서 "멍멍" 출력

// class Animal {
//     sound() {
//         return "동물 소리";
//     }
// }
// class Dog extends Animal {
//     sound() {
//         return "멍멍";
//     }
// }
// const animal = new Animal();
// console.log(animal.sound());
// const dog = new Dog();
// console.log(dog.sound());

// LEVEL 10 — super 사용하기

// Animal → name 을 생성자로 받음
// Dog 는 Animal 상속하고

// super(name) 사용해 부모 생성자 호출

// speak() 메서드에서 "강아지 이름은 ___" 출력

class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        return `강아지 이름은 ${this.name}`;
    }
}
const dog = new Dog("바둑이");
console.log(dog.speak());