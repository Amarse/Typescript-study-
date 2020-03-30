                                                    //제네릭
//- 타입 매개변수를 통해 타입 안전성을 보장 할 수 있다.
//- 캐스팅과 관련한 코드를 제거할 수 있다.
//- 제네릭 로직을 이용해 재사용할 수 있는 코드를 만들 수 있다.


//1. 제네릭 함수
//1-1. 제네릭 함수 선언 
//타입제약이 없는 타입 매개변수
function concat3<T>(strs: T, strs2: T) {
    // return strs + strs2;
}
//타입매개변수<T>에 타입이 지정되려면 타입 인수를 명시해 제네릭 함수를 호출한다.
concat3<string>("abc", "123");
//타입 인수인 string은 타입 매개변수 T에 전달돼 string 타입으로 제약됩니다.

//타입 매개변수 T를 사용하는  concat함수
function concat<T>(strs: T, strs2: T) {
    console.log(typeof strs, strs);
    console.log(typeof strs2, strs2);
    //return strs + strs2;
    return String(strs) + String(strs2);
}
concat("abc", "123"); //타입 인수를 생략(타입을 추론해서 함)
concat<string>("abc", "123"); //타입 인수 추가 (명시적인 타입이 선언됨)

