'use strict';

// Q1. make a string out of an array
// join은 '' 안에 있는걸 문자열 형태로 출력하는것 (구분자 넣을 수 있음)
{
    const fruits = ['apple', 'banana', 'orange'];
    const result = fruits.join(' | ');
    console.log(result);
}

// Q2. make an array out of a string
// split은 2가지의 파라미터를 받음
// 구분자를 꼭 전달해줘야함
{
    const fruits = 'apple,kiwi,banana,cherry';
    const result = fruits.split(',', 2);
    console.log(result);
}

// Q3. make this array look like this : [5,4,3,2,1]
// reverse는 배열안에 순서를 거꾸로 바꿔줌
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    console.log(result);
    console.log(array); //배열 자체도 순서가 바뀜
}

// Q4. make new array without the first two elements
// 처음 두개 빼고 나머지만 배열에 남겨둬라
{
    const array = [1, 2, 3, 4, 5];
    const result = array.slice(2, 5); // 2번째부터 5번째까지
    console.log(result);
    console.log(array);
}

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}

const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('A', 29, true, 88),
];

// Q5. 점수가 90점인 학생을 찾아라
// find는 콜백함수를 만들어서 전달해야함
{
    const result = students.find((student, index) => student.score === 90);
    console.log(result);
}

// Q6. 수업에 등록한 학생만 골라서 배열을 만든다.
// filter 도 콜백함수가 필요
{
    const result = students.filter((student) => student.enrolled);
    console.log(result);
}

// Q7. 점수만 들어있는 배열을 만들어라
// 배열안에 있는요소들을 맵핑한 후 따로 원하는걸 빼내서 만듬
{
    const result = students.map((student) => student.score);
    console.log(result);
}

// Q8. 학생중에 점수가 50점보다 낮은 학생이 있는지 없는지 확인해보기
// some 은 배열에 요소중에 하나라도 조건이 충족하면 true 리턴
// every 는 배열에있는 모든 요소가 조건에 충족해야 true를 리턴
{
    const result = students.some((student) => student.score < 50);
    console.log(result);

    const result2 = students.every((student) => student.score >= 50);
    console.log(result2);
}

// Q9. 학생들의 평균 점수를 구하라
// reduce는 배열에있는 모든 요소의 값을 누적할때 쓰는것
{
    const result = students.reduce((prev, curr) => {
        console.log('---------');
        console.log(prev);
        console.log(curr);
        return prev + curr.score;
    }, 0); // 0부터 시작해서 점수를 하나하나씩 누적시켜서
    console.log(result); // 최종적으로 모든 합을 출력
    console.log(result / students.length); // 평균값을 내기때문에 length 즉 학생수만큼 나눔
}

// Q10. 학생들의 점수를 string 으로 변환해서 만들어라
{
    const result = students
        .map((student) => student.score)
        .filter((score) => score >= 50)
        .join();
    console.log(result);
}

// 학생들의 점수를 낮은점수부터 정렬해서 string 으로 변환하라
{
    const result = students
        .map(student => student.score)
        .sort((a, b) => a - b) // a-b 낮은거부터 b-a 높은거부터
        .join();
    console.log(result);
}