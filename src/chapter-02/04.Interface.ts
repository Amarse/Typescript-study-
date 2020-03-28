//인터페이스
//타입체크의 벨류 모양에 초점을 맞추고 있다.
//타입스크립트의 인터페이스는 타입들에 이름을 붙히는 역할을 한다.

//예제1
//인터페이스 기본 작동원리
function printLabel(labelledObj: {label: string}) {
  console.log(labelledObj);
}
let myObj = { size: 10, label: "Size 10 Object"};
printLabel(myObj); //print: { size: 10, label: 'Size 10 Object' }

//예제2
//인터페이스를 사용하여 label의 속성을 지정
//함수로 전달 되는 객체가 나열된 요구 사항을 충족하는 경우만 허용 된다.
//인터페이스에 필요한 속성이 있고, 필요한 타입만 체크를 하게 된다.
interface LabelledValue {
  label: string;
}

function printLabelOne(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObjONe = { size: 10, label: "Size 10 Object" };
printLabel(myObjONe); //print: { size: 10, label: 'Size 10 Object' }


//-선택적 프로퍼티 (Optional Properties)

//속성이 필요할수도 필요 하지 않을 수도 있다.
//사용가능한 속성을 설명하는 동시에 인터페이스에 포함되지 않은 속성의 사용을 방지 할 수 있다.
//예제
//createSquare 의 color의 오타가 나면  속성이 존재하지 않는다는 에러가 나온다.
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });


//-읽기전용(Readonly properties)
//readonly 를 붙혀 지정
//예제
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = {x: 10, y: 20};
// p1.x = 5; error: 값을 지정 후엔 바꿀 수 없다.

//모든 변형 메서드가 제거된 Array<T> 와 동일한 ReadonlyArray<T> 타입이 있다. 
//이것 또한 생성 후엔 값을 변경할 수 없다.
//예제
// let onOne: number[] = [1, 2, 3, 4];
// let roOne: ReadonlyArray<number> = a;
// roOne[0] = 12; // error
// roOne.push(5); // error
// roOne.length = 100; // error
// onOne = roOne; // error

// //하지만, 타입 단언을 통해 오버라이드 할 수 있다.
// onOne = roOne as number[];

//readOnly vs const
//속성에 사용할지 변수에 사용할지 생각하면 된다.

//-프로퍼티 초과 검사 (Excess Property Checks)
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
// }
// let mySquare = createSquare({ colour: "red", width: 100 }); 
// //error: colour는 없는 타입이다.

// //타입 단언을 사용해서 식별한다.
// let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// //문자열 인덱스 시그니처를 추가 해주는게 좋다.
// interface SquareConfig {
//   color?: string;
//   width?: number;
//   [propName: string]: any;
// }

//-함수타입
//인자 값이 어떤 타입을 가지고 있는가와 반환값 타입을 명시해준다.
interface SearchFunc {
  (source: string, subString: string): boolean;
}
//인터페이스 처럼 사용할 수 있다.
//함수타입의 변수를 생성하고, 동일한 타입의 함수값을 생성한다.
// let mySearch: SearchFunc;

// mySearch = function (source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// }

//매개변수 이름이 일치 할 필요는 없다.
//
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
console.log(result);


//인덱싱 가능 타입(Indexable Types)
//예제

interface StringArray {
  [index: number]: string; //반환타입
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
console.log(myStr); //print: Bob
//StringArray가 number로 index 될때 string을 반환한다.

//예제2
class Animal {
  move(arg0: number) {
      throw new Error("Method not implemented.");
  }
  name: string;
}

class Dog extends Animal {
  breed: string;
}


interface NotOkay {        
  // [x: number]: Animal; //error: 사실 문자열이니 반환값이 DOG class여야 한다.
  [y: string]: Dog;
}

let animal: Animal = new Animal();
let dog: Dog = new Dog();

let somethings: NotOkay = {

  // [0]: animal //error
  [0]: dog // 정답! //Dog를 숫자로 인덱싱 할 경우 문제가 없지만,
           //  [0] 문자열로 인덱싱이 되어 Dog class가 반환되는것이 맞다.
} 

//예제3
//readonly
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
myArray[2] = 'Mallory'; //error: index[2]는 값이 없다.

//class Type
// 인터페이스 구현
//명시적인 강제가 가능하다.
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) { }
}


//구현 된 인터페이스의 매서드를 만들 수 있다.
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

//인터페이스는 public 측면과 private 측면이 아닌 public 측 class를 만든다.

//클래스의 스태틱과 인스턴스의 차이점
// (Difference between the static and instance sides of classes)
interface ClockConstructor {
  new(hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
//클래스가 인터페이스를 구현할때 클래스의 인스턴스 츨면만 검사한다.

//생성자를 위한 인터페이스랑 인스턴스 매서드를 위한 인터페이스를 정의해야한다.
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


//인터페이스 확장(Extending Interfaces)
//클래스 처럼 인터페이스도 서로를 확장 할 수 있다.
//인터페이스를 재사용 가능한 컴포넌트로 분리하는 방법을 더 유연하게 할 수 있다.
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

//여러 인터페이스를 확장하여 모든 인터페이스를 결합하여 만들 수 있다.
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

