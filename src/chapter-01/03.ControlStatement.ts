
//조건문

//-if문
//형식
// if (조건식 or true값) {
//   실행 코드  
// }

//예제1
if(true){
  console.log("This will always executed.");
}
if (false) {
  console.log("This will never executed.");
}
//예제2
let yes:number = 10, no =20;
if (yes < no) {
  console.log("yes is less than no");
}

//예제3
let state: number = 10, str = 20;
state > str ? console.log("state is greater than str."): console.log("state is less than or equal to str.")

//-swich문
//형식
// switch (표현식) {
//   case 값:
//     { 수행할 코드 }
//     break;
//   default:
//     {...조건에 맞는것이 없을 때 수행할 코드}
//     break;
// }

//예제
let day: number = 4;

switch(day) {
  case 0:
    console.log("It is a Sunday.");
    break;
  case 1:
    console.log("It is a Monday.");
    break;
  case 2:
    console.log("It is a Tuesday.");
    break;
  case 3:
    console.log("It is a wednesday.");
    break;
  case 4:
    console.log("It is a Thursday.");
    break;
  case 5:
    console.log("It is a Friday.");
    break;
  case 6:
    console.log("It is a Saturday.");
    break;
  default:
    console.log("No such dat exists!");
    break;    
}

//예제 2
let one = 10, two = 5;

switch(one-two){
  case 0:
    console.log("Result: 0");
    break;
  case 5:
    console.log("Result: 5");
    break;
  case 10:
    console.log("Result: 10");
    break;
}

//-for문
//형식
// for (변수 초기화: 조건식: 증감식) {
//   ...반복코드
// }
// for (변수 in 이터너블) {
//   ...반복코드
// }


//예제1
for (let i = 0; i < 3; i++) {
  console.log("Block statment execution no" + i);
}

//예제2
let arr = [10, 20, 30, 40]
for (var index in arr) {
  console.log(index) //index가 가지고 있는 번호 출력 0, 1, 2, 3
  console.log(arr[index]); //index에 담겨있는 값 출력
}

let arrTow = [10, 20, 30, 40]
for (var index1 in arrTow) {
  console.log(index1);
}
//console.log(index1);

let strOne = "Hello World";
for (var char of strOne) {
  console.log(char); //print char: H e l l o W o r l d
}

//-While문
//형식
// while (참/거짓을 판별 할 수 있는 조건문) {
//   ...반복코드
// }
// 구문
// do {
//   ..반복 코드
// } while (반복조건)

//예제1
let i: number = 2;
while (i < 4) {
  console.log("Block statement execution no." + i);
  i++;
}

//예제 2
let j: number = 2;
do {
  console.log("Block statement execution no." + j)
  j++;
} while (j < 4)