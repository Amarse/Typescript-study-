// 인터페이스  - 타입이며, 컴파일 후에는 사라진다.

//형식
interface <자식 인터페이스 이름> extends Car {}

//여러 부모 인터페이스를 다중 상속 할 수 있다.
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
