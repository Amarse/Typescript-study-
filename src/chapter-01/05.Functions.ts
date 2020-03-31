//함수
//-선언적 함수
function profileOne(name: string) {
  console.log(name);
}
profileOne("doitnowm-man");
//매개 변수 초기값 명시
function profileTwo(name: string, age: number = 32) {
  console.log(name, age);
}
profileTwo("doitnowm-man");

//선택 매개 변수
function secretProfile(name: string, age?: number){
  return name+ age;
}
console.log(secretProfile("doitnow-man")); //print: doitnow-man undefined
console.log(secretProfile("doitnow-man")); //print: doitnow-man 32

//-익명함수
const testFunc = x => { return x; };
// const test: number = (x: number) => { return x; };
const Func = (x: number): number => { return x; };
console.log(testFunc(12));

type funcType = (x: number) => number;
let typfunc: funcType = (x: number) => { return x;};

console.log(typfunc(10)); //print: 10

let iif = ((x: number) => {return x;})(3);
console.log(iif); //print: 3

//-콜백함수
//익명 콜백 함수 타입, 콜백함수의 가독성을 위해 사용
type callBackType = (message: string) => void;

//익명 콜백 함수
let crazy: callBackType = message => {return "crazy";};

//익명 콜백 함수
let sad: callBackType = message => { return "sad"; };

//콜백 함수를 실행 할 함수
function callFunc(message: string, callback: callBackType ){
  return "I am " + callback(message);
}

// crazy 콜백 함수를 인자로 주어 함수 실행
let result1 = callFunc("hello", crazy);
console.log(result1); //print: I am crazy

// sad 콜백 함수를 인자로 주어 함수 실행
let result2 = callFunc("hello", sad);
console.log(result2); //print: I am sad