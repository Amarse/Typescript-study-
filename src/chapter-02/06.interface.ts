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
    getX(x?: number | string):any {  //선택할 수 있게 ?를 사용해 선택 매개변수를 선언했고, 유니언 타입을 추가하였다.
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
    constructor(protected speed: number) {}
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