// //클래스

//1. 클래스 생성과 객제 생성
//Rectangle class type
class Rectangle {
    x: number;
    y: number;
    //생성자 constructor(){} - 클래스의 필요한 매개변수를 전달받아 멤버변수를 초기화 한다.
    constructor(x: number, y: number) {
        this.x = x; //초기화
        this.y = y;          
    }
    getArea(): number {
        return this.x * this.y;
    }
}
//interface type - 위 클래스 타입과 일치 
interface Rectangle {
    x: number;
    y: number;
    getArea(): number;
}

// 클래스를 선언할 때 생성자를 생략하면 기본 생성자(default constructor)를 호출한다. 
// 만약 클래스에 초기할 내용이 없다면 선언 때 생성자를 생략할 수 있다.

//-예제
class Rectangle { }

//2. 객체 생성

let rectangle = new Rectangle(1, 5);

// 클래스는  멤버 변수와 멤버 메서드 등으로 구성된 '틀'이며, 사용하려면 객체로 생성되어야 한다.
// new 키워드를 이용해 객체를 생성하여 객체참조변수(object reference variable)에 할당하였다.
// 객체의 참조가 객체 참조변수에 할당되는 과정을 인스턴스화(instantiate)라고 한다.

class Rectangle{
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    getArea(){
        return this.x * this.y;
    }
}


let rectangle = new Rectangle(1, 5); //객체를 생성할때 생성자로 인수값을 전달해야 한다.
let area: number = rectangle.getArea(); //rectangle변수를 통해 객체의 멤버 변수나 멤버 매서드에 접근 할 수 있다.
console.log(area)

//자바스크립트 컴파일 
var Rectangle = (function(){
    function Rectangle(x, y) {
        this.x = x;
        this.y = y;
    }
    Rectangle.prototype.getArea = function() {

        return this.x * this.y;
    }
    
    return Rectangle;
}());

var rectangle = new Rectangle(1, 5);
var area = rectangle.getArea();
console.log(area);

//클래스에 대응하는 대상은  Rectangle 변수 이다. 변수에 할당 된 값은 생성자 함수(constructor function) 이 된다.
// 생성자 함수 - (function(){.................}());

// 2. 상속 관계와 포함 관계

//2-1. 상속관계(IS-A관계)
// 코드에 재사용성을 높힌다. 자식클래스가 부모클래스를 상속하면, 부모클래스의 멤버 변수나 넨저 메서드를 상속받아 사용이 가능하다. 
//부모클래스 = base class or super calss, 자식클래스 = derived class or sub class 라고 한다.

class Animal{......}; //부모클래스
class Dog extends Animal{.....}; //자식클래스


//자식클래스 형식 - 하나의 부모클래스만 상속 받을 수 있다.
//super() 매서드를 호출에 부모클래스의 생성자를 호출해 주어야한다.
class Dog extends Animal{
    constructor(){
        super();
    }
}


//2-2. 포함관계(HAS-A관계)
//클래스 내부에 다른 클래스를 포함하는 관계
// 합성(composition), 집합(aggregation)

//합성관계 - 전체가 부분을 포함하며 강한 관계
// Car클래스에 선언 된 engine 객체는 myCar가 생성될때 함게 생성되고, null이 되면 함께 제거가 된다.
class Engine{}
class Car{
    private engine;
    constructor(){
        this.engine = new Engine();
    }
}
 let myCar = new Car();
 myCar = null;

 //집합관계 - 전체가 부분을 포함하며 약한 관계
 // Car 클래스에 car개체가 생성될때 외부에서 생성된 engine 객체를 전달하고 있다.
 // car 객체에 null이 할당돼 제거 되더라도 engine 객체는 Car 클래스 외부에 생성돼 제거가 되지 않는다.
 class Engine{}
 class Car{
     private engine: Engine;
     constructor(engine: Engine) {
         this.engine = engine;
        
     }
 }  
 let engine =  new Engine();
 let car = new Car(engine);

//2-3. 상속관계와 포함관계를 모두 고려해 구현하기
//부모클래스에는 공통기능에 해당하는 일반적인 매서드를 추가하고 자식클래스에는 세부적인 매서드를 추가해 구현한다.

//상속관계
class Bicycle {...}; //부모
class MountainBike extends Bicycle {...}; //자식

//포함관계
class Flashlight {
    constructor(public lightIntensity){}
};
class MountainBike extends Bicycle {
    flashlight: Flashlight;
}; 
//Flashlight 클래스의  생성자 매개변수 lightIntensity는 빛의 밝은 정도를 숫자로 나타냅니다. 


// 위 예제 전체 구현
class Flashlight {
    constructor(public lightIntensity) { }
};

//Bicycle 클래스
class Bicycle {
    constructor(public numberOfWheel: number){}
    getNumberOfWheel():number{
        return this.numberOfWheel;
    }
}

//Bicycle  클래스를 상속함(IS-A관계)
class MountainBike extends Bicycle {
    flashlight: Flashlight;
    constructor(public numberOfWheel: number, public hasBackSaddle: boolean){
        super(numberOfWheel);

        // 자전거가 후레쉬 라이트를 포함함(HAS-A 관계)
        this.flashlight = new Flashlight(90);
    }
    getHasBackSaddle(){
        return this.hasBackSaddle;
    }
    getNumberOfWheel(){
        return this.numberOfWheel;
    }
}
let hasBackSaddle = true;
let numberOfWheel = 2;
let mountainBike = new MountainBike(numberOfWheel, hasBackSaddle);
console.log("자전거의 안장 유무 : " + mountainBike.getHasBackSaddle());
console.log("자전거의 바퀴 개수 : " + mountainBike.getNumberOfWheel());
//print : 자전거의 안장 유무 : ture , 자전거의 바퀴 개수 : 2 

// MountainBike 클래스가 Bicycle 클래스를 상속받으므로  IS-A 관계가 존재 , 
// 이어서 MountainBike 클래스가 Flashlight 객체를 생성해 포함 하므로 HAS-A 관계도 존재

//3.접근제한자의 사용법

//public 제한자와 pricate 제한자 
//public은 외부에서도 접근할 수 있게 공개하는 접근 제한자이다. 
class Base {
    public defaultAge = 0;
}

class Member extends Base {
    age = 0;//this.age
    public getAge(){
        return this.age  + this.defaultAge;//public defaultAge = 0;
    }
}
let member = new Member();
console.log(member.getAge()); //public getAge() /0으로 출력됨

//private는 내부에는 접근이 가능하되, 외부에서는 접근이 불가능 하다.

class Base {
    private birthYear = 2017;
}

class Member extends Base {
    private age = 0;
    private getBirthYear() {
        // return this.birthYear; 부모에게 접근 불가
    }
    private getAge(){
        return this.age;
    }
}
let member = new Member();
// member.age;
// member.getAge(); 외부에서 접근 불가

//생성자 매개변수에 접근 제한자 추가
class Cube {
    public width: number;
    private length: number;
    protected height: number;
    constructor(pWidth: number, pLength: number, pHeight: number){
        this.width = pWidth;
        this.length = pLength;
        this.height = pHeight;
    }
}

//위 코드를 간결하게
// 생성자 매개변수에 접근 제한자를 추가한 것으로 생성자 매개변수가 클래스의 멤버 변수가 되는 효과가 있다.
class Cube {
    
    constructor(public width: number, private length: number, protected height: number){}
}
//관련 예제
class Cube {
    // #1 생성자 매개변수 선언
    constructor(public width: number, private length: number, protected height: number){

    }
    // #2 직육면체 부피 구하기
    getVolume() {
        return this.width * this.length * this.height;
    }
}
let [cWidth, cLength, cHeight] = [1, 2, 3]; //가로 세로 높이
let cube = new Cube(cWidth, cLength, cHeight);
console.log("1번 세로 : ", cube.width, "cm");
console.log("2번 부피 : ", cube.getVolume(), "ml");
