
// 1. Object to JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => {
        console.log(`${name} can jump!`);
    },
};

json = JSON.stringify(rabbit, ['name', 'color']); //jump 같은 함수는 json 에 포함되지않음
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'ellie' : value;
});
console.log(json);

// 2. JSON to Object
// parse(json)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
//obj.jump();

// rabbit 오브젝트를 JSON 으로 변환할때는 함수는 포함되지않는다. (데이터들만 포함)
// 그러므로 obj는 jump() 함수를 쓸 수 없다. (이미 json 으로 변환되고 다시 오브젝트로 변환해서)

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate());
