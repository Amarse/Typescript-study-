//7. 오버라이딩으로 메서드 정의 하기
//오버라이딩 = 부모클래스에 정의된 메서드를 자식 클래스에서 새로 구현 하는것
// 조건1 - 오버라이든 메서드의 매개변수 타입은 오버라이딩 메서드의 매개변수 타입과 같거나 상위타입이야 한다.
//(오버라이딩 메서드의 매개변수 타입이 any 타입이면 예외)
// 조건2 - 오버라이든 메서드의 매개변수 개수가 오버라딩 메서드의 매개변수 개수와 같거나 많아야 한다.
//(조건1이 성립이 되어야 한다는 전제)

// any 타입 조건 (조건1)
// flight(kmDistance: any = 0); //오버라이든 메서드
// flight(kmDistance2: number = 0); //오버라이딩 메서드

// //매개변수 개수와 같거나 많으면 오버라이딩이 가능(조건2)
// flight(kmDistance: number = 0, kmSpeed: number = 0); //오버라이든 메서드
// flight(kmDistance2: number = 0); //오버라이딩 메서드

// //매개변수 개수는 같지만 조건1과 조건2를 동시에 성립하지 않으면 오버라이딩이 되지 않는다.
// flight(kmDistance: number = 0, kmSpeed: number = 0); //오버라이든 메서드
// flight(kmDistance2: number = 0, kmSpeed: string = 0); //오버라이딩 메서드


//조건1 과 조건2  동시에 성립되는 예제
class Bird {
    constructor() { }
    flight(kmDistance: number = 0, kmSpeed: number = 0) { //오버라이든 메서드
        console.log(`새가 ${kmDistance}km를 ${kmSpeed}km의 속도로 비행했습니다.`);
    }

}
class Eagle extends Bird {
    constructor() {
        super();
    }
    flight(kmDistance2: number = 0) { //오버라이딩 메서드
        console.log(`독수리가 ${kmDistance2}km 비행했습니다.`);
    }
}
let bird = new Bird();
bird.flight(1000, 100);

let eagle = new Eagle();
eagle.flight();
eagle.flight(1000);
// 오버라이든 메서드 첫번째 매개 변수는 number 타입인데 오버라이딩 첫번째 매개변수도 number 타입이라 조건1에 만족하고, 
//매개변수 갯수도 오버라이든 갯수 이하 이므로 조건2에 만족해 오버라이딩이 가능하다.

//8. 오버로딩을 구현하는 여러방법
//메서드 오버로딩은 매서드의 이름이 같지만 매개변수의 타입과 개수를 다르게 정의하는 방법

// //오버라이딩 메서드를 오버로딩하기
// class SingleTypeChecker {
//     constructor() {}
//     typeCheck(value: string): void {
//         console.log(`${typeof value}: ${value}`);
//     }    
// }
// class UnionTypeChecker extends SingleTypeChecker {
//     constructor() {
//         super();      
//     }
//     typeCheck(value: number): void;
//     typeCheck(value: string): void;
//     typeCheck(value: any): void {
//         if (typeof value === "number") {
//             console.log("숫자 : ", value);
//         }
//         else if (typeof value === "string") {
//             console.log("문자열 : ", value);
//         } else {
//             console.log("기타 : ", value);
//         }
//     }  
// }
// let unionTypeChecker = new UnionTypeChecker();
// unionTypeChecker.typeCheck(123);
// unionTypeChecker.typeCheck("happy!");
// unionTypeChecker.typeCheck(true); //에러!

//오버로드는 함수이름은 같지만 매개변수 선언 형태가 다른 특성이 있다. 위예제에서 any 타입에 제약을 가해 number와 string만 받을 수 있도록 typeCheck매서드를 정의했다.
//위 코드에서 any타입은 모든걸 받은 수 있을것 같지만, 실제로는 number, string 타입 값만 매개변수로 받을 수 있다.
//위 코드의 오버로드는 유니언 타입을 이용해 간결하게 바꿀 수 있다.
class SingleTypeChecker {
    constructor() { }
    typeCheck(value: string): void {
        console.log(`${typeof value}: ${value}`);
    }
}
class UnionTypeChecker extends SingleTypeChecker {
    constructor() {
        super();
    }
    typeCheck(value: number | string): void {
        if (typeof value === "number") {
            console.log("숫자 : ", value);
        }
        else if (typeof value === "string") {
            console.log("문자열 : ", value);
        } else {
            console.log("기타 : ", value);
        }
    }
}
let unionTypeChecker = new UnionTypeChecker();
unionTypeChecker.typeCheck(123);
unionTypeChecker.typeCheck("happy!");


//9. 인터페이스를 클래스에서 구현하여 오버로딩하기
//인터페이스를 이용해 오버로딩을 하려면 인터페이스에 오버로딩 할 기본 메서드를 선언해 준다. 그리고 인터페이스를 구현 할 클래스에서 기본 메서드를 구현 해준다.
interface IPoint {
    getX(x: any): any;
}

class Point implements IPoint {
    getX(x?: number | string): any {  //선택할 수 있게 ?를 사용해 선택 매개변수를 선언했고, 유니언 타입을 추가하였다.
        if (typeof x === "number") {
            return x;
        } else if (typeof x === "string") {
            return x;
        }
    }
}
let p = new Point();
console.log(p.getX());
console.log(p.getX("hello"));
console.log(p.getX(123));
//interface IPoint 를 이용해 getX를 선언했고, 클래스 Point에서 IPoint 인터페이스를 구현하고 있다.
//이때  getX 매서드는 인터페이스에 정의 된 getX매서드의 선언을 변형해 여러 매개변수(number, string)을 가지는 형태로 오버로딩 하고 있다.
//인터페이스를 이용하면 선언과 구현을 분리하고 구현부의 구조를 강제 할수 있다. 로직과 구조가 섞여 있는 클래스를 상속해 오버로딩 하는것 보다
//구조만 포함 하고 있는 인터페이스를 이용하는 것이 복잡도가 낮다.




//10. 클래스와 인터페이스 기반의 다향성 구현하기
//다향성 - 여러타입을 받아들임으로써 여러 형태를 가지는것을 의미한다.(클래스, 인터페이스, 매개변수의 다향성)

//클래스의 다향성 - 자식클래스가 부모 클래스를 상속하고 있을때 부모 클래스 타입으로 가지는 객체 참조 변수에 자식 클래스의 객체가 할당됨으로써 다향성을 지니게 된다.
class Planet {
    public diameter: number; //지름
    protected isTransduction: boolean = true; //공전

    getIsTransduction(): boolean {
        return this.isTransduction;
    }

    stopTransduction(): void {
        console.log("stop1");
        this.isTransduction = false;
    }
}

class Earth extends Planet {
    public features: string[] = ["soil", "water", "oxyzen"];
    stopTransduction(): void { //오버라이딩
        console.log("stop2");
        this.isTransduction = false;
    }
}
let earth: Planet = new Earth();
earth.diameter = 12656.2;
console.log("1번 : " + earth.diameter); //1번 : 12656.2
console.log("2번 : " + earth.getIsTransduction()); //2번 : true
earth.stopTransduction(); //stop2 - 오버라이든 매서드보다 오버라이딩 메서드가 우선으로 호출 되기 때문에 stop2 가 찍힘.
console.log("3번 : " + earth.getIsTransduction()); //3번 : false
// console.log(earth.features); //접근불가


//추상클래스 - 부모가 추상클래스이고 이를 상속하는 자식클래스 간에도 다형성이 존재한다.
abstract class Train {
    constructor(protected speed: number) { }
    speedUp(): void {
        this.speed++;
    }
    abstract getSpeed(): number;
}
class Ktx extends Train {
    constructor(protected speed: number) {
        super(speed);
    }
    public getSpeed(): number {
        return this.speed;
    }
    public speedUpUp(): void {
        this.speed += 2;
    }
}
let ktx: Train = new Ktx(300);
console.log("현재 속도 : " + ktx.getSpeed() + "km"); //현재 속도 : 300km
ktx.speedUp();
console.log("현재 속도 : " + ktx.getSpeed() + "km"); //현재 속도 : 301km

//할당 객체의 타입은 Ktx지만 할당될 때 Train 타입으로 업 캐스팅(upcasting)되어 다형성이 생긴다.
//객체 참조변수(ktx)는 추상클래스(Train)에 선언된 요소에는 접근할 수 있지만, 할당 객체의 타입(Ktx)에 선언된 요소에는 접근 할 수 없다.

//인터페이스의 다형성 - 클래스가 인터페이스를 구현하고 있을 때 해당 인터페이스를 타입으로 가지는 객체 참조변수가 구현 클래스의 객체를 참조함으로써 다형성을 가지게 된다.
interface IPerson {
    height: number;
    getAlias: () => string;
    getAge(): number;
}
class PoliceOfficer implements IPerson {
    height: number;
    getAlias = () => "happy";
    getAge(): number {
        return 10;
    }
    hasClub() {
        return true;
    }
}
let policeMan: IPerson = new PoliceOfficer();
console.log(policeMan.getAlias()); //happy
console.log(policeMan.getAge()); //10
//인터페이스(IPerson)를 구현클래스(PoliceOfficer)가 구현하고 있으므로 객체 참조변수의 타입에 IPerson을 지정하고 구현 클래스를 할당 할 수 있다.
//객체(new PoliceOfficer())가 본래 PoliceOfficer 타입이지만, 객체 참조변수(policeMan)로 할당됨으로써 인터페이스(IPerson) 를 기준으로 접근이 이루어 진다.
//객체 참조변수(policeMan)는 인터페이스에 정의 된 height 멤버번수, getAlias 메서드, getAge 메서드에 접근할 수 있지만, 
//구현클래스에서 새롭게 추가된 hasClub 메서드에 접근할 수 없다.


// 매개변수의 다형성(유니언 타입 이용)
// 매개변수 타입을 유니언타입을 이용함으로써 객체가 다형성의 성질을 띠도록 만들 수 있다.
class MonitorDisplayTest {
    display(data: string | number) { //오버로딩 메서드
        if (typeof data === "string") {
            return "string" + data;
        } else {
            return "number" + data;
        }
    }
}
let displayTest = new MonitorDisplayTest();
displayTest.display("happy");
displayTest.display(123);
//display 메서드는 여러 타입을 받아들이므로 typeof로 타입검사를 수행하는 타입 가드를 추가해야 한다.

//매개변수에 클래스타입을 유니언타입으로 선언해 여러 클래스 타입을 받아 instansceof 로 타입 가드를 추가해야 한다.
class MonitorDisplayTest {
    display1(monitor: Led | Oled) {
        //변수에 지정된 타입과 타입 어셜션은 생략 가능
        let myMonitor: Led = <Led>monitor;
        return myMonitor.getName();
    }
    else if(monitor instanceof Oled) {
        let myMonitor: Oled = <Oled>monitor;
        return mymoniter.getName();

    }
}
let displayTest = new MonitorDisplayTest();
displayTest.display1(new Led("LED TV"));
displayTest.display1(new Oled("OLED TV"));


//11. 클래스에서 getter와 setter
//getter = 접근자(accessor) 라 하고 setter = 설정자(mutator)라 한다.

// //자바스크립트 - 객체 리터널에서 get과 set을 이용한 값 설정
var obj = {
    set name(name) {
        this.myName = name;
    },
    get name() {
        return this.myName;
    },
    myName: ""
}
obj.name = "happy"; // setter
console.log(obj.name); // getter


//타입스크립트 - 
class Student {
    name: string;
    birthYear: number;

}
let student = new Student();

//속성값 설정 set
student.name = "happy!";
student.birthYear = 2017;

//속성값 읽기 get
console.log(student.name);
console.log(student.birthYear);
//name, birthYear속성은 값 설정도 가능하지만, 설정값을 읽을때도 사용할 수 있다. 하지만, 위 예제는 로직을 추가 할 수 없다.

//로직을 추가 하고 싶으면 키워드로 추가 하여 줄수 있다.

class Student2 {
    private studentName: string;
    private studentBirthYear: number;

    get name(): string {
        return this.studentName;
    }

    set name(name: string){
        // 포함되면 0, 포함되지 않으면 -1
        if (name.indexOf("happy") !== 0 ) {
            this.studentName = name;
        }
    }

    get birthYear() : number {
        return this.studentBirthYear;
    }

    set birthYear(year: number) {
        if (year <= 2000) {
            this.studentBirthYear = year;
        }
    }
}

let student2 = new Student2();

student2.birthYear = 2001; //set
console.log("1번 : " + student2.birthYear); //get
student2.birthYear = 2000; //set
console.log("2번 : " + student2.birthYear); //get
student2.name = "happy"; //set
console.log("3번 : " + student2.name); //get 
student2.name = "lucky"; //set
console.log("4번 : " + student2.name); //get

//컴파일
var Student2 = (function () {
    function Student2() { }

    Object.defineProperty(Student2.prototype, "name", {
        get: function () {
            return this.studentName;
        },
        set: function (name) {
            if (name.indexOf("happy") !== 0) {
                this.studentName = name;
            }
        },
        enumerable: false, //객체의 키를 열거할수 있을지에 대한 설정
        configurable: true //해당속성 여부를 설정으로 true면 특정 속성을 새롭게 정의하거나 삭제 할수 있다.
    });

    Object.defineProperty(Student2.prototype, "birthYear", {
        get: function () {
            return this.studentBirthYear;
        },
        set: function (year) {
            if (year <= 2000) {
                this.studentBirthYear = year;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Student2;
}());

var student2 = new Student2();
student2.birthYear = 2001; //set
console.log("1번 : " + student2.birthYear); //get
student2.birthYear = 2000; //set
console.log("2번 : " + student2.birthYear); //get
student2.name = "happy"; //set
console.log("3번 : " + student2.name); //get 
student2.name = "lucky"; //set
console.log("4번 : " + student2.name); //get

for (var props in Student2.prototype) {
    console.log(props);
}

//Object.defineProperty() 메서드는 객체에 새로운 속성을 정의 할때 사용한다.
//Object.defineProperty() 첫번째 매개변수는 속성을 정의할 객체이며,  두번쨰 매개변수는 정의하거나 수정을 하려는 속성 이름 이다.


//12. 정적변수와 정적 메서드
// static - 클래스에 정적 멤버 변수나 정적 메서드 등을 선언할 때 객새 생성없이 접근 가능하므로 메모리 절약 효과가 있다.
class Circle {
    private static pi: number = 3.14;
    static circleArea: number = 0;

    static getArea(radius: number) {
        this.circleArea = radius * radius * Circle.pi;
        return this.circleArea;
    }
    static set area(pArea: number) {
        Circle.circleArea = pArea;
    }
    get area(): number {
        return Circle.circleArea;
    }
}


console.log("1번 : " + Circle.getArea(3));
//정적멤버 변수인 Circle에 값 설정
Circle.area = 100;

let circle = new Circle();
//정적 멤버 변수인 circle을 통해 클래스와 객체 간에 값을 공유함.
console.log("2번 : " + circle.area);
//클래스와 객체 간에 공통으로 사용돼야 할 멤버가 있다면 static으로 선언 할 수 있다.

//정적 변수와 정적 메서드를 싱글텐 패턴에 적용하기
//static 키워드는 클래스에 선언된 멤버 변수를 객체 생성 없이 접근하게 해주는 장점이 있다.
//static 키워드를 활용하면 클래스를 활용해 유일하게 상태 정보를 담을 수 있다.
class Member {
    static age = 0;
    static getAge() {
        return this.age;
    }
    private constructor() { }
}
// let member = new Member(); 인스턴스 생성 불가
console.log(Member.age()); //0이 출력됨.
console.log(Member.getAge()); //0이 출력됨.

let member = new Member(); // 불가능
//반드시 Member라는 클래스를 통해 Member.age()와 같은 형태로 정적멤버(age, getAge메서드)접근 해야한다.
//외부에 변수를 두면서 프로그램 단위에서 유일한 객체를 유지할 수 있게 하려면 싱글턴 패턴을 도입해야 한다.

//부지런한 초기화 (eager initialization) - 프로그램이 구동할 때 초기화가 일어나고 공개된 정적 메서드를 통해 생성된 객체를 얻는다.
// 싱글턴 객체는 사용자가 정의한 임의의 변수에 할당 돼 접근 할 수 있다.
let eagerLogger: EagerLogger = EagerLogger.getLogger();


//게으른 초기화 (lazy initialization) - 프로그램이 구동할떄 초기화 되지 않지만 공개된 정적메서드를 호출하는 시점에 객체를 생성한다.
let lazeLogger: LazeLogger = LazeLogger.getLogger();
let lazeLogger2: LazeLogger = LazeLogger.getLogger();


//부지런한 초기화 예제
class EagerLogger {
    //부지런한 초기화
    private static uniqueObject: EagerLogger = new EagerLogger;
    // #2 private을 붙여 객체로 생성되지 않도록 함.
    private EagerLogger() { }

    // #3 static을 붙여 외부 접근을 가능케 함.
    public static getLogger(): EagerLogger {
        return this.uniqueObject;
    }

    // #4 정보 로그 출력
    public info(message: string) {
        console.log(`[info] ${message}`) 
    }

    // #5 경고 로그를 출력
    public warnning(message: string) {
        console.log(`[warn] ${message}`);
     }
}
// #6 유일한 객체를 얻고 메서드(info, warning)을 사용함.
let eagerLogger: EagerLogger = EagerLogger.getLogger();
let eagerLogger2: EagerLogger = EagerLogger.getLogger();
eagerLogger.info("1번 : 정보 log");
eagerLogger.warnning("2번 : 경고 log");
eagerLogger.info(`3번 : ${eagerLogger === eagerLogger2}`);
//getLogger로 얻은 객체는 유일하므로 실행 결과 eagerLogger와 eagerLogger2는 변수명은 다르지만 같은 객체를 참조하고 있다.

let eagerLogger: EagerLogger = EagerLogger.getLogger(); //가능
let eagerLogger: EagerLogger = new EagerLogger(); //불가능

//게으른 초기화 예제
class LazeLogger {
    // #1 싱글턴 객체를 담는 정적 멤버 변수를 선언함
    private static uniqueObject: LazeLogger;

    // #2 private을 붙여 객체로 생성되지 않도록 함.
    private LazeLogger() {}

    // #3 게으른 초기화를 진행
    public static getLogger(): LazeLogger {
        // #3-1 생성된 객체가 없으면 초기화
        if (this.uniqueObject == null) {
            this.uniqueObject = new LazeLogger();
        }
        return this.uniqueObject;
    }
    // #4 정보 로그를 출력
    public info(message: string) {
        console.log(`[info] ${message}`);    
    }
    // #5 경고 로그를 출력
    public warnning(message: string) {
        console.log(`[warn] ${message}`);
    }
}
let lazeLogger: LazeLogger = LazeLogger.getLogger();
let lazeLogger2: LazeLogger = LazeLogger.getLogger();
lazeLogger.info("1번 : 정보 log");
lazeLogger.warnning("2번 : 경고 log");
lazeLogger.info(`3번 : ${lazeLogger === lazeLogger2}`);


//13. readonly 제한자의 활용
//readonly가 선언된 변수는 초기화 되면 재할당이 불가능하다.
interface ICount {
    readonly count: number;
}
class TestReadonly implements ICount {
    readonly count: number;
}
//인터페이스의 멤버변수, 클래스의 멤버변수에 사용 할 수 있다.

interface ICount {
    readonly count: number; // readonly는 인터페이스 멤버를 선언 할 수 있음
}

class TestReadonly implements ICount {
    readonly count: number; // readonly 는 클래스의 멤버 변수에 선언할 수 있음
    static readonly count2: number; // readonly 앞에 static 지정 가능
    private readonly count3: number; // readonly 앞에 접근 제한자 지정 가능
    readonly count4: number = 0; // readonly로 선언되면 초기화 가능
    getCount() {
        // this.count4 = 0; // readonly로 선언된 멤버 변수는 재할당 불가
        // readonly count5: number = 0; // readonly는 메서드에 선언할 수 없음
    }
}

function getCount() {
    // readonly count: number; // readonly는 함수에 선언할 수 없음
}

//readonly는 객체 리터럴의 속성 앞에 지정 가능
let literalObj: { readonly alias: string } = { alias: "happy"};
//literalObj.name = "happy"; //readonly로 지정된 타입으로 인해 할당 불가
//literalObj = "test"; //readonly로 지정된 타입으로 인해 할당 불가

//readonly는 인터페이스나 클래스의 멤버 변수, 객체 리터럴의 속성 이름에 선언 할 수 있습니다.
//readonly의 가장 큰 특징 중에 하나는 초기화를 강제하지 않는다는 점이다. 그러나, 어떠한 값을 할당해 변수가 초기화 되면 재할당이 불가능하다.

//컴파일
class TestReadonly {
    constructor() {
        this.count4 = 0;
    }
    getCount() {}    
}
function getCount() {}
let literalObj = {alias: "happy"};
//컴파일 후에는 인터페이스는 사라지며 readonly로 선언됐지만 초기화 되지 않는 클래스의 멤버변수들도 함께 제거 된다.
//초기값이 있는 count4변수만 제거 되지 않는다. 이는 readonly 는 클래스나 인터페이스 내의 변수를 상수로 강제하기 위해 컴파일 시점까지만 유효함을 알수있다.
