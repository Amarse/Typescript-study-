//연산자

//- 산술연산자
console.log(10 + 2, 10 - 2, 10 * 2, 10 / 2, 10 % 2);
console.log(10 ** 3);
//타입이 다른 피연산자 간의 더하기 연산자
console.log(1 + "happy");
console.log(false + "happy"); //문자열의 결합이라고 인식
//예외상황
// 1 + false -bool값은 숫자값과 연산할 수 없으며, 자바스크립트 처럼 false를 0으로 인식하지 않음.
// 10 / "2" - 숫자와 문자값으로 인식하기때문에 나누기 연산을 할 수 없음.


//-비교 연산자
a == b // a와 b의 값이 같은지 비교
a === b //타입까지 같은지 비교
a != b // a와 b의 값이 같은지 비교
a !== b //타입까지 다른지 비교
a < b //a 보다 b가 큰지 비교
a > b //a 보다 b가 작은지 비교
a >= b //a가 b보다 크거나 같은지 비교
a <= b //a가 b보다 작거나 같은지 비교

//-논리연산자
let five:number = 5;
five == 5 && five > 0 //ture
five == 5 || five == 6 //ture 둘 중 하나가 참일때
!true //false
!false //true

//-삼항연산자
//형식 
// 판별조건 ? 표현식1 : 표현식2
1 < 2 ? console.log('true') : console.log('false');

//디스트럭처링 (destructuring)
const temp = {
  nam: 'test',
  count: 2,
  value: 10
}

const { nam, count } = temp;
console.log(nam); //print: test
console.log(count);//print: 2

//-전개연산자 (얕은 복사 방식)
//배열요소 확장
let number: Array<number> = [3, 4, 5];
let number2: Array<number> = [1, 2, ...number]; 
console.log(number2); // print : [1, 2, 3, 4, 5]

//배열 디스트럭처링에 전개연산자
let [first, ...second] = [1, 2, 3];
console.log(first); //print: 1
console.log(second); //print: [2, 3]

//배열 합치기
let array:number[] = [1, 2];
let array2:number[] = [...array, 3, 4]
console.log("1번 : ", array2); //print: 1번 : [1, 2, 3, 4]
//배열 디스트럭처링
let [firstItem, ...rest]:[number, number, number] = [10, 20, 30];
console.log("2번 : ", firstItem,); //print: 2번 : 10
console.log("3번 : ", rest); //print: 3번 : [20, 30]
console.log("4번 : ", rest[0]);//print: 4번 : 20

//객체요소확장
let obj = {c: 3, d: 4, e: 5};
let obj2 = {a: 1, b: 2, ...obj};
console.log(obj2); //print: { a: 1, b: 2, c: 3, d: 4, e: 5 }

//객체 디스트럭처링
let numGroup = {n1: 1, n2: 2, n3: 3};
let {n2, ...n13} = numGroup;
console.log(n2, n13); //print: 2 { n1: 1, n3: 3 } 
//n13 은 n2 를 뺀 나머지 n1, n3를 받아 출력

let {a, b, ...c} = { a: 10, b: 20, c: 30, d: 40};
console.log(a); //print: 10
console.log(b); //print: 20
console.log(c); //print: { c: 30, d: 40 }
//a와 b를 뺀 나머지 요소를 객체로 받음.

