//1. PrimitiveType(기본타입)

//-boolean
let isDone: boolean = false;
isDone = true;
//isDone = 30; //err Type '30' is not assignable to type 'boolean'

//-number
let decimal: number = 6;
let hex:number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//-string
let fullName: string = 'Bob Bobbington';
let age: number = 37;
let sentence1: string = `Hello, my name is ${fullName} I'll be ${age + 1} years old next month.`
let sentence2: string = "Hello, my name is" + fullName + ".\n\n" + "I'll be" + (age + 1) + "years old next month.";

//-array
let arrBool1: boolean[] = [true, false, true];
let arrBool2: Array<boolean> = [false, true, false];
let arrNum1: number[] = [1, 2, 3];
let arrNum2: Array<number> = [1, 2, 3];
let arrStr1: string[] = ['a', 'b', 'c'];
let arrStr2: Array<string> = ['a', 'b', 'c'];

//-tuple
//타입선언
let x: [string, number];
//초기화
x = ["hello", 10];
//x = [10, "hello"]; err:Type 'string' is not assignable to type 'number'.

console.log(x[0].substr(1));
//console.log(x[1].substr(1)); err: Property 'substr' does not exist on type 'number'.

// x[3] = "world";  'string'은 'string'|'number'에 할당될 수 있다.              
// console.log(x[5].toString()); 'string' 및 'number'에  모두 'toString'이 있다.  
// x[6] = true; 'boolean'은 'string'|'number' 타입이 아니다.   

//enum
//numeric 값 집합에 더 친숙한 이름을 부여하는 방법
enum Color {Red, Green, Blue}
let a: Color = Color.Green
//기본적으로 0부터 시작해 자신의 번호를 매기기 시작한다.
//멤버 중 하나의 값을 수동으로 설정하여 변경할 수 있다.
enum Color { R = 1, G, B }
let b: Color = Color.Green;

//모든값을 수동으로 설정 할 수 있다.
enum Color { Red1 = 1, Green2 = 2, Blue3 = 4 }
let c: Color = Color.Green;

//숫자값에서 enum의 해당 값 이름으로 이동 할 수 있다.
enum Color { Red0 = 1, Green0, Blue0 }
let colorName: string = Color[2];

alert(colorName); // 위의 값이 2 이므로 'Green'을 표시합니다.

//-any

//알지 못하는 변수의 타입을 설명할때, 
//타입 검사를 하지 않고 그 값이 컴파일-타임 검사를 통과하도록 하고 싶을때.

//타입이 정확한 boolean
let notSure: any = 4;
notSure = "문자열일수도 있다";
notSure = false; 

//런타임에 ifItExists가 존재할 수 있다.
//toFixed는 존재합니다. (그러나 컴파일러는 체크하지 않는다)
let noSure: any = 4;
notSure.ifItExists(); 
notSure.toFixed(); 

let prettySure: Object = 4;
// prettySure.toFixed(); // error: 'Object' 에 'toFixed' 타입이 존재하지 않는다. 

let list: any[] = [1, true, "free"];
list[1] = 100;

//-void
//반환할 값을 반환하지 않는 타입

function warnUser(): void {
  alert("This is my warning message");
}
let unusable: void = undefined;

//-null & undefined
//void와 마찬가지로 자체적인 타입
let u: undefined = undefined;
let n: null = null;

//-never
//절대적으로 발생하지 않는 값의 타입. 
//모든 타입에 서브 타입이며 모든타입에 할당 할 수 있다.

// 반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안 된다.
function error(message: string): never {
  throw new Error(message);
}

// 추론되는 반환 타입은 절대로 없다.
function fail() {
  return error("Something failed");
}

// 반환되는 함수에는 연결할 수 없는 end-point가 있어서는 안 된다.
function infiniteLoop(): never {
  while (true) {
  }
}

