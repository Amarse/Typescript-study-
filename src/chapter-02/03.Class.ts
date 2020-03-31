//부모 클래스의 멤버를 이용하기
//상속관계가 있을때 자식 클래스에서 부모클래스에 선언된 멤버 메서드나 멤버 변수를 등을 이용 할 수 있는
//super 키워드 this 키워드를 이용할 수 있다.

//super 키워드는 부모 클래스의 공개 멤버에만 접근할 수 있다.
//this 키워드는 부모클래스에서 상속받은 멤버와 현재클래스의 멤버모두에 접근 할 수 있다.

class PC{
    constructor(public hddCapacity: string){}

    private ram: string = "0G";
    set ramCapacity(value: string) {this.ram = value;} //set 프로퍼티
    get ramCapacity(){return this.ram;} //get 프로퍼티

    protected getHddCapacity() {
        return this.hddCapacity;
    }
}

class Desktop extends PC {
    constructor(public hddCapacity: string) {
        //부모클래스의 생성자를 호출함,
        super(hddCapacity);
        4
    }
    getInfo() {
        
        console.log("1번 HDD 용량 : " + super.getHddCapacity(), super.hddCapacity); //print 1번 HDD 용량 : 1000G undefined
        console.log("2번 HDD 용량 : " + this.getHddCapacity(), this.hddCapacity); //print 2번 HDD 용량 : 1000G 1000G

        this.hddCapacity = "2000G";
        console.log("3번 HDD 용량 : " + super.getHddCapacity(), super.hddCapacity); //print 3번 HDD 용량 : 2000G undefined

        console.log("4번 HDD 용량 : " + this.getHddCapacity(), this.hddCapacity); //print: 4번 HDD 용량 : 2000G 2000G

        super.ramCapacity = "16G"; //부모 클래스 set 프로퍼티로 값을 설정 set ramCapacity(value: string) {this.ram = value;}
        console.log("5번 RAM 용량 : " + this.ramCapacity, super.ramCapacity); //print 5번 RAM 용량 : 16G 16G

        this.ramCapacity = "8G"; //상속받은 set 프로퍼티 값을 설정
        console.log("6번 RAM 용량 : " + this.ramCapacity, super.ramCapacity); //print 6번 RAM 용량 : 8G 8G

    }
}
let myDesktop = new Desktop("1000G");
myDesktop.getInfo();

//1번 3번 은 super 키워드로 부모클래스의 멤버에 접근한 결과를 출력하였고, 2번 4번은 this 키워드로 현재클래스의 멤버에 접근한 결과를 출력하였다.
//1번, 3번 은 부모 getHddCapacity() 접근할 수 있지만 , hddCapacity 변수에는 접근할수 없다. 직접 가져오려면 getter를 통해 접근해야하 한다.
// getter 를 이용한 접근 한 5번,6번 은 정상적으로 출력된다.

//기본 접근제한자(default access modifier) - 접근 제한자 선언을 생략할 때 적용한다.

class Account{
    balance: number;

    //접근액 얻기 -get 프로퍼티를 이용
    get getBalance() {
        return this.balance;
    }

    //적금하기 -set 프로퍼티를 이용
    set setBalance(amount: number) {
        this.balance += amount;
    }

    //적금하기 -매서드 이용
    deposite(depositeAmount: number){
        this.setBalance = depositeAmount;
    }

    //기본 적금(balance)액을 설정하기
    constructor(defaultBalance:number = 0, protected bankName: string = "happy bank", readonly interestRate: number = 0.1){
        this.balance = defaultBalance;
    }

    //생성자 매개변수 interestRate는 public으로 설정됐으므로 호출이 가능
    getInterestRate() {
        return this.interestRate;
    }

    //생성자 매개변수 defaulBalance는 private으로 설정 됐으므로 호출이 불가능
    getDefaulBalance(){
        // return this.defaulBalance; 
    }
}


class MyAccount extends Account{
    //테스트
    constructor() {
        super();
        this.deposite(1000); //1000원 적금하기
        this.setBalance = 1000; //1000원 적금하기
        console.log(`2번) 적금: ${this.balance}원, ${this.getBalance}원 / 이율 : ${this.interestRate}, ${this.getInterestRate()}% / 은행명 : ${this.bankName}`);
    }
}
let accout = new Account();
console.log(`1번) 적금: ${accout.balance}원, ${accout.getBalance}원 / 이율 : ${accout.interestRate}, ${accout.getInterestRate()}% `);

let myAccount = new MyAccount();
//print
// 1번) 적금: 0원, 0원 / 이율 : 0.1, 0.1 %
// 2번) 적금: 2000원, 2000원 / 이율 : 0.1, 0.1 % / 은행명 : happy bank

//Account 클래스의 생성자 매개변수인 defaultBalance는 접근 제한자를 생략해 기본 접근자 pricate가 적용, 외부에서 접근 할수 없고, 생성자 내부 접근만을 허용한다.
//bankName은 protected 접근제한자가 설정되어 자식클래스에서 접근할 수 있지만, 객체를 통한 외부 접근은 안된다.
//interestRate는 readonly 읽기 전용으로 자식 클래스에서 접근 할 수 있고, 객체를 통한 외부 접근도 가능하다.
//매개변수를 제외한 나머지 요소에서 접근제한자를 생략할 경우 기본 접근 제한자는 public이다.


//4. 추상클래스를 이용한 공통 기능 정의
//구현매서드와 추상 매서드 가 동시에 존재 할 수 있다.

// 구현매서드는 실제 구현 내용을 포함한 매서드 이고, 추상메서드는 선언만 된 매서드 입니다.

// 형식
// abstract class 추상클래스 {
//     abstract 추상매서드();
//     abstract 추상맴버변수: string;
//     public 구현메서드():void;{
//         공통적으로 사용할 로직을 추가함
//         로직에서 필요 시 추상 매서드를 호출해 구현 클래스의 메서드가 호출 되게 함.
//         this.추상매서드();
//     }
// }
// 구현하지 않은 추상메서드가 선언 됐으므로, 자식클래스에서는 추상메서드를 받아 구현해야 한다.
// 추상클래스를 작성할때 abstract 키워드는 static이나 private과 함꼐 선언할 수 없다,(public, protected는 가능)

// //형식
// class 자식클래스 extends 추상클래스 {
//     public 추상멤버변수: string;
//     public 구현메서드(): void {
//         추상 메서드의 실제 구현 내용
//     }
// }
//템플릿 메서드 패턴(temple method pattern) - 추상클래스츼 구현매서드에서 추상 멤버 변수나 추상 메서드를 활용해 가상의 공통 로직을 구현해 두고
// 추상 멤버 변수나 추상 메서드에 대한 세부 조직은 구현 클래스에서 구현한다.

//형식
abstract class AbstractBird {
    //추상 멤버 변수
    abstract birdName: string;
    abstract habitat: string;
    //추상메서드
    abstract flySound(sound: string);
    //구현메서드
    fly(): void {
        this.flySound("파닥파닥");
    }
    //구현메서드
    getHabitat(): void {
        console.log(`<${this.birdName}>의 서식지는 <${this.habitat}> 입니다.`);
    }
}

class WildGoose extends AbstractBird {
    constructor(public birdName: string, public habitat: string){
        super();
    }
    //추상메서드 오버라이딩
    flySound(sound: string){
        console.log(`<${this.birdName}>가 <${sound}> 날아갑니다.`);
    }
}

let wildGoose = new WildGoose("기러기", "순천만 갈대밭");
wildGoose.fly();
wildGoose.getHabitat();
//print
// <기러기>가 < 파닥파닥 > 날아갑니다.
// < 기러기 > 의 서식지는 < 순천만 갈대밭 > 입니다.


