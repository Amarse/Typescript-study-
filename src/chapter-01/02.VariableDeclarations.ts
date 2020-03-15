//2.VariableDeclarations

//-Declare 선언자

//- var
 var q = 10; //자바스크립트 변수선언

 //함수 내 선언
 function w() {
   var message = "Hello, world!"
   return message;
 }

 //함수 내부에 동일한 변수에 접근 수정이 가능하다.
 
function f() {
  var a = 1;

  a = 2;
  var b = g();
  a = 3;

  return b;

  function g() {
    return a;
  }
}

f(); // '2' 반환

//스코프(Scoping rules)

//-var선언

//target 변수는 if 문 안에 있지만 블록의 바깥에서 접근을 할 수 있다.
//var 선언은 함수, 모듈, 네임 스페이스 또는 전역 스코프에서 접근할수 있어 가능하다.
function Scop(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var target = 10;
  }

  return target;
}
target(true);  // '10' 반환
target(false); // 'undefined' 반환

//-let선언 
//같은 블록 내 같은 이름의 변수를 중복해서 사용할 수 없다.
//let 선언자로 선언된 변수는 블록 스코프가 적용 된다.

//블록 스코프 (Block-scoping)
//블록-스코프 변수는 가장 가깝게 포함된 블록 or for 반복문 외부에서 사용 하수 없다.
//블록-스코프 변수는 선언 되기 전까지 읽거나 쓸수 없다.
function Block(input: boolean) {
  let numberOne = 100;

  //numberOne은 if 구문에서 실행
  if (input) {
    let numberTwo = numberOne + 1;
    return numberTwo;
  
  }
  // return numberTwo; error : numberTwo는 여기 존재하지 않음..
}

//catch 문에서도 유사한 스코프규칙을 가지고 있다.
try {
  throw "oh no!";
}
catch (yes) {
    console.log("oh well!");
}

// console.log(yes); error: yes는 여기 존재하지 않음.

//const 선언
//const로 선언 하면 let 선언처럼 변수에 블랙스코프가 적용된다.
const birthMonth = 9;
if (true) {
  const birthMonth = 12;
}
console.log(birthMonth); //9 출력


const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}

// 오류 새로 값을 할당 할 수 없다.
kitty = {
  name: "Danielle",
  numLives: numLivesForCat
};

//속성값을 변경 을 허용 한다.
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;