//클래스

//예제1
class Greeter { //클래스 선언
    greeting: string; //속성
    constructor(message: string) {  //생성
        this.greeting = message; //멤버참조
    }
    greet() {
        return "hello," + this.greeting;
    }
}

console.log(new Greeter("world").greet());
//print hello,world
//new를 사용하여 Greeter 클래스의 인스턴스를 생성 
//앞서 정의한 생성자를 호출하여 Greeter 타입의 새로운 객체를 생성 후 초기화


//상속
//typescript는 일반적인 객체 지향 패턴을 사용 할 수 있음.
//상속을 사용하여 기존 클래스를 확장하여 새로운 클래스를 생성 할 수 있음.

//예제1
class Animal {
    name: string;
    constructor(theName: string) {this.name = theName;}
    move(distance:number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string){super(name);}
    move(distance = 5) {
        console.log("Slithering...");
        super.move(distance);
    }

}

class Horse extends Animal {
    constructor(name: string) {super(name);}
    move(distance = 45){
        console.log("Galloping...");
        super.move(distance);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();//print 5
tom.move(34);//print 34 

//하위 클래스를 만들때는 extends 사용 한다.
//Snake 와 Horse 가 기본 클래스 Animal의 하위 클래스로 분류되고 그 기능을 엑세스 할 수 있다.
//생성함수를 포함하는 파생 클래스는 기본 클래스에서 생성자 함수를 실행하려면 무조껀 super를 써야 한다.
//Ani 의 move 메소드를 오버라이드하는 move메소드를 생성하여 각 클래스의 부여, tom은 animal로 정의 되었지만, 34가 오버라이딩 되서 호출 됨. 



//public, private, protected

//public-자유롭게 접근이 가능하다.
// 표시해도 되고, 안해도 된다. 
class Animal{
    public name: string;
    public constructor(theName:string;) {
        this.name = theName;}

    public move(dis:number){
        console.log(`${this.name} moved ${dis}m.`);
    }    
}

//private-클래스 외부에서 엑세스 할 수 없다.
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
new Animal("Cat").name; // Error: 'name' is private;

//멤버 private와 protected멤버 가 있는 형식을 비교할때 이러한 형식을 다르게 취급한다.
//두 유형이 호환 가능한 것으로 간주되려면 두 유형중 하나에 private 구성원이 있는 경우 다른 유형eh
//동일한 선언에 비롯된 private 멤버를 가져야한다.

//예제2
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
class Rhino extends Animal {
    constructor() { super("Rhino"); }
}
class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");
animal = rhino;
animal = employee; // Error: 'Animal' and 'Employee' are not compatible

//Animal과 Rhino는 Animal의 private name: string과 같은 선언으로 부터 같의 형태의 private 부분을 공유하기 때문에 호환된다.
//Employee의 경우 Animal 이 아니기 때문에 호환되지 않는다.



//protected 
//protected 키워드는 private과 유사한 동작을 한다.
//protected로 선언된 멤버는 파생 클래스의 인스턴스에서 엑세스 할 수 있다.

class Person {
    protected name: string;
    constructor(name:string) {this.name = name;}    
}

class Employee extends Person {
    private department: string;
    constructor(name:string, department: string) {
        super(name);
        this.department = department;
    }

    public getElecatorpitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElecatorpitch());
console.log(howard.name); //error

//person 외부에선 name을 사용할 순 없지만, Employee는 Person에서 파생되었기 때문에, name을 쓸 수 있다.

//생성자 protected로 표시 될 수도 있다. 클래스 외부에선 클래스를 인스턴스화 할수 는 없지만 확장할 수는 있다.

class Person {
    protected name: string;
    protected constructor(theName: string){ this.name = theName; }
}

//Employee can extend Person
class Employee extends Person {
    private department: string;    

    constructor(name: string, department: string){
        super(name);
        this.department = department;
    }

    public getElevatorPitch(){
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("john"); // Error


//readonly
//readonly 키워드를 사용하여 읽기 전송 속성을 만들 수 있다.
//readonly 속성은 선언 또는 생성자에서 초기화 해야 한다.

class Octopus {
    readonly name: string;
    readonly numberOfLeges: number = 8;
    constructor(theName: string){
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 string legs");
dad.name = "man with the 3-piece suit"; // Error name 은 읽기전용

//파라미터 속성
//파라미터를 사용하면 한곳에서 멤버를 만들고 초기화 할 수 있다.

class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
//선언과 할당을 하나의 위치로 통합했다.
//파라미터는 접근자 또는 readonly 또는 둘 모두로 생성자 앞에 접두어를 붙임으로써 선언 된다.
//파라미터에 private를 사용하면 private 멤버를 선언하고 초기화 합니다.(public, protected, readonly도 마찬가지)

//getter, setter(Accessor)
//객체의 멤버에 대한 엑세스를 지원하는 매서드다.

let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

//setter에서 암호를 수정할 수 있는 권한이 있는지 비밀코드를 확인해 일치하면 암호를 수정하고,
// 일치하지 않을때 업데이트를 할수 있는 권한이 없다는 경고 메시지를 받는다.
//getter, setter는 ECMAScript 5 이상을 사용하도록 컴파일러를 설정해야한다.
//get, set이 없는 프로퍼티는 자동으로 읽기전용으로 추정됩니다.