// 인터페이스  - 타입이며, 컴파일 후에는 사라진다.

//형식
interface <자식 인터페이스 이름> extends Car {}

//1.여러 부모 인터페이스를 다중 상속 할 수 있다.
interface Car{
    speed: number;
}
interface SportsCar{
    acceleration: number;
}

interface MyOptimizedCar extends Car, SportsCar {
    waterproof: boolean;
}

let myMyCar = <MyOptimizedCar>{};
myMyCar.speed = 100;
myMyCar.acceleration = 100;
myMyCar.waterproof = true;

//MyOptimizedCar 인터페이스는 Car, SportsCar 인터페이스를 다중 속성 받는다.
//MyOptimizedCar 어셜션한 myMyCar 객체는 speed, acceleration, waterproof 속성을 포함하는 인터페이스 타입이 됩니다.
//다중 속성을 받을 때 같은 이름의 매서드를 상속 받으면, 상속받는 인터페이스에서 같은 이름의 매서드를 모두 재정의 해야한다.

interface Dog {
    run(): void;
    getStatus(): { runningSpeed: number; }
}

interface Bird {
    fly(): void;
    getStatus(): { flightSpeed: number; }
}

//Dog, Bird 인터페이스에서  상속 받은  하위 인터페이스인  DogBird 는 모든 메서드(run, fly, getStatus())를 가져온다.
//getStatus 의 반환타입이 다르기 때문에 합쳐 주어야 한다. 
interface DogBird extends Dog, Bird {
    getStatus(): { runningSpeed: number, flightSpeed: number; }
}

//DogBird 는 Dog, Bird 인터페이스의 서브타입이 된다.
//인터페이스 정의를 마치면 implements키워드를 이용해 인터페이스를 구현하는 클래스를 작성한다.
class NewAnimal implements DogBird {
    run(): void {}
    fly(): void {}
    getStatus(): { runningSpeed: number, flightSpeed: number; } { return {
        runningSpeed: 10, flightSpeed: 20
    }}
}
// 인터페이스의 구현 클래스(NewAnimal)는 인터페이스(DogBird)에 선언 된 속성(run, fly, getStatus)를 구현하여야 한다.


//2. 인터페이스의 역할과 컴파일 결과 분석
interface ICar { name: string; }
class MyCar { }
let mCar: ICar = { name:"car" };
console.log(typeof mCar); //object
console.log(typeof MyCar); //function
// console.log(typeof ICar);

//타입스크립트가 ES6로 전환 될때 인터페이스 타입 검사용도가 끝나면 사라지고 ES6에서 지원하는 클래스 선언은 남는다.
//ES5로 컴파일을 하면
var MyyCar = (function(){
    function MyCar() {
    }
    return MyCar;
}());
var mmCar = {name: "car"};
console.log(typeof mmCar); //object
console.log(typeof MyyCar); //function

//위 예제는 ES5에 없는 클래스 구조를 표현하기 위해 즉시 실행 함수로 변환 된것을 확인 할 수 있다.
//결론, 인터페이스는 타입스크립트를 컴파일 할때 클래스와 객체의 타입 안전성을 확보하기 위한 용도로 사용되며, ES6,  ES5로 컴파일 후에 사라진다.




//3. 클래스를 배열 요소 타입으로 지정
//클래스는 객체 리터럴의 타입으로 사용할 수 있다. 배열 요소가 객체 리터럴이라면 배열 타입을 선언할 때 클래스를 이용할 수있다.
let person = [
    {name1: "a", city: "seoul"},
    {name2: "b", city: "daejeon"},
    {name3: "c", city: "daegu"}
];
console.log(JSON.stringify(person));
//print [{"name1":"a","city":"seoul"},{"name2":"b","city":"daejeon"},{"name3":"c","city":"daegu"}]
//배열의 요소는 객체 리터럴 이다. 각 객체 리터럴은 속성이름이 모두 달라 일관된 형태로 데이터를 관리 할 수 없다.
//배열 요소가 객체 리터럴일 때 구조를 일관 되게 하려면 배열 요소의 타입을 객체 리터럴로 선언해야 한다.
let person2: { name: string, city: string}[];
person2 = [
    { name: "a", city: "seoul" },
    { name: "b", city: "daejeon" },
    { name: "c", city: "daegu" }
];
console.log(JSON.stringify(person2));
//print [{"name":"a","city":"seoul"},{"name":"b","city":"daejeon"},{"name":"c","city":"daegu"}]

//요소에 맞춰 입력하기 쉽지 않을때는 type 에일리어스를 이용한다.
type objectLiteralType = { name: string, city: string };
let person3: objectLiteralType[];
person3 = [
    { name: "a", city: "seoul" },
    { name: "b", city: "daejeon" },
    { name: "c", city: "daegu" }
];
console.log(JSON.stringify(person3));




//4. 클래스를 배열 요소로 보고 배열 타입을 선언하기
//클래스 도 선언 할 수 있다. 클래스를 요소타입으로 선언하면 클래스 구조와 동일한 객체를 배열 요소로 받을 수 있다.
class Person4 {
    public full: string;
    constructor(public name: string, public city: string) {
        this.full = name + "(" + city + ")";        
    }    
}
let person4: Person4[] = [
    new Person4("kim", "seoul"),
    new Person4("park", "daejeon"),
    new Person4("jeong", "daegu")
];
console.log(JSON.stringify(person4));
//print [{"name":"kim","city":"seoul","full":"kim(seoul)"},{"name":"park","city":"daejeon","full":"park(daejeon)"},{"name":"jeong","city":"daegu","full":"jeong(daegu)"}]




//5. 인터페이스를 배열 타입으로 지정하기
//인터페이스는 객체 리터럴을 정의하는 타입으로 사용할 수 있다.
interface Person {
    namer: string;
    city: string;
}
//객체 타입으로 지정 돼 객체의 구조를 고정 할 수 있다. 배열 요소가 객체 리터럴이라면 Person 인터페이스를 이용해 배열타입을 다음과 같이 선언할 수 있다.
let person5: Person[];
//위와 같이 선언하면 배열 요소로 인터페이스와 동일한 구조의 객체 리터럴만을 할당 받을 수 있다.
interface Person6 {
    username: string;
    usercity: string;
}
let person6: Person6[] = [
    { username: "a", usercity: "seoul" },
    { username: "b", usercity: "daejeon" },
    { username: "c", usercity: "daegu" }
];
console.log(JSON.stringify(person6));
//print [{"username":"a","usercity":"seoul"},{"username":"b","usercity":"daejeon"},{"username":"c","usercity":"daegu"}]
//위 배열 타입은 Person6[] 이다. 간략화 할 수 있는 방법으로 인터페이스에 배열 객체를 상속 받게 할 수 있다.
//인터페이스는 타입선언이 많아도 컴파일 후에는 모두 사라지므로 런타임 성능에 영향을 미치지 않는다.

interface Person7 {
    nameE: string;
    cityE: string;
}
interface PersonItem extends Array<Person7> {}
let person7: PersonItem = [
    { nameE: "a", cityE: "seoul" },
    { nameE: "b", cityE: "daejeon" },
    { nameE: "c", cityE: "daegu" }
];
console.log(JSON.stringify(person7));
//print [{"nameE":"a","cityE":"seoul"},{"nameE":"b","cityE":"daejeon"},{"nameE":"c","cityE":"daegu"}]




//6. 인터페이스에 함수 타입 정의하기
//인터페이스는 클래스의 구조를 정의하기도 하지만 자바스크립트의 객체 모양을 정의하기도 합니다.
interface IFormat {
    (data: string, toUpper?: boolean): string;
}
//인터페이스에 익명함수를 선언할 수 있다. 익명함수를 할당 받은 변수의 타입으로도 선언할 수 있다.
// let format: IFormat = function (data: string, toUpper: string) {
//     //format 변수는  익명 함수를 할당 받고 있으며 익명 함수의 타입으로 인터페이스인  IFormat을 선언했다. 
//     //함수타입의 매개변수 이름은 정확히 일치 하지 않아도 된다
// }

//매개변수를 인터페이스에 선언된 함수 타입과 일치하지 않게 선언해도 문제가 없다.
interface IFormat {
    (date: string, toUpper?: boolean): string;
}

let formatl: IFormat = function(str: string, isUpper: boolean) {
    if(isUpper){
        return str.toUpperCase();
    } else {
        return str.toLowerCase();
    }
};
console.log(formatl("1: Happy!")); //print 1: happy!
console.log(formatl("2: Happy!", true)); //print 2: HAPPY!
console.log(formatl("3: Happy!", false)); //print 3: happy!

