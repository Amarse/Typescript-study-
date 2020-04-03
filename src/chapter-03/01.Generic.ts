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
<<<<<<< HEAD
=======

// 오버로드 함수를 이용한 타입 매개변수 간의 연산
// 오버로드 함수 - 이름만 같고 매개변수의 타입이나 개수가 다르게 선언된 함수를 의미한다.
//오버로드 함수를 이용하면 T+T 와 같은 타입 매개변수 간에 연산이 가능하다.

function concat4<T>(strs: T, strs2: T): T; //오버로드 함수
function concat4(strs: any, strs2: any) {
    return strs + strs2;
}
console.log(concat4<string>("asd", "123")); //print asd123

//두 매개변수는 같은 타입으로 선언이 되어있으므로, 타입이 다른 인수로 호술 되면 에러가 난다.

//유니언 타입을 이용해 여러 타입을 허용하기
function concat5<T extends string | number>(strs: T, strs2: T): T;
function concat5(strs: any, strs2: any) {
    return strs + strs2
}
console.log(concat5<string | number>("wer", 123)); //print wer123
//string number 타입을 다 받을 수 있게 유니온 타입으로 선언
//타입의 범위를 제한 할 수 있으므로, 타입 안전성을 갖추면서 타입의 범위를 정할 수 있어 유연하다.

//타입매개변수 2개 이상 선언하기
let mapArr = [];
function put<T, T2>(strs: T, strs2: T2) : T;
function put(idx: any, str: any) {
    mapArr[idx] = str;
} 
function get<T, T2>(idx: T): T2;
function get(idx: any) {
    return mapArr[idx];
}
put<number, string>(1, "hello");
console.log(get<number, string>(1));

// //2. 제네릭 클래스와 인터페이스
// //2-1. 클래스선언 - 외부로부터 타입을 받아들여 클래스 내부에 입력된 타입을 적용 할 수 있는 클래스
// //형식
class 클래스명<T>{
    getValue(elms: Array<T>, index: number): T {
        return elms[index]; 
    }
}
// //클래스명에 타입 매개변수인 <T>를 선언해준다. <T>는 타입 매개변수이며 매개변수나 반환 타입으로 사용 될 수 있다.
class ArrayConvertor<T> {
    elements: Array<T>;
    constructor(elms: Array<T>) {
        this.elements = elms;    
    }
    array2string(): string {
        let text = '';
        for (let i = 0; i < this.elements.length; i++) {
            if (i > 0) {
                text += '';
            }
            text += this.elements[i].toString();
        }
        return text;
    }
    getValue(elms: Array<T>, index: number): T {
        return elms[index];
    }
}
let arr1 = [1, 2];
// var arr = [1, 2, "hello"]; 문자열 요소는 추가 할 수 없다.
let numConvertor = new ArrayConvertor<number>(arr);
console.log(numConvertor.array2string());
console.log(numConvertor.getValue(arr, 0));

let arr2 = new Array<string>();
arr2.push("a");
arr2.push("b");
//arr2.push(1234); //숫자타입 값은 추가할 수가 없음.
let stringConvertor = new ArrayConvertor<string>(arr2);
console.log(stringConvertor.array2string());
console.log(stringConvertor.getValue(arr2. 0)); //첫번째 인수는 문자열 타입 배열만 전달 가능

//타입 매개변수에 인터페이스를 상속하기
//특정 메서드만 제네릭 메서드로 사용하기
interface IName {
    name: string;
}
class Profile implements IName {
    name: string = 'happy!';
}
class Accessor1 {
    getKey<T>(obj: T) {
        return obj['name'];
    }
    getKey2<T extends IName>(obj: T) {
        return obj['name'];
    }
    get(obj) {
        let objName = obj instanceof Profile ? obj.name : obj;
        return objName;
    }
}
let ac = new Accessor1();
console.log(ac.getKey<IName>(new Profile())); //print happy!
console.log(ac.getKey2(new Profile())); //print happy! 
console.log(ac.get(new Profile())); //print happy!
//Profile 클래스가 IName 인터페이스를 구현하기 때문에 getKey메서드가 호출될때 IName 인터페이스를 타입 인수로 전달 받는다.
//제네릭메서드에서 타입 인수 IName을 생략하려면 getKey2 메서드처럼 타입 매개변수 T가 IName을 상속 받도록 선언해야한다.
//getKey2메서드는 제네릭 메서드를 이용해 IName을 제약했다.  get 메서드는 개체를 전달받을때 느슨한 타입을 받기 위해 타입을 선언하지 않고, 내부에 타입가드를 추가했다. 

//인터페이스 타입을 추가해 명시적으로 프로퍼티에 접근
interface IName {
    name: string;
}
class Profile2 implements IName {
    name: string = 'happy!';
}
class Accessor2<T extends IName> {
    getKey(obj: T) {
        return obj.name;
    }
}
let ac2 = new Accessor2;
console.log(ac2.getKey(new Profile2()));
//Accessor2 클래스는 제네릭 클래스고 타입 매개변수 T가 IName 인터페이스로 제약되어 있다.
//메서드 단위에서는 더 이상 IName 인터페이스를 제약할 필요가 없다.
//클래스 단위로 제네릭을 적용하면 클래스 내에 존재하는 불특정 메서드에 대해 일괄적으로 제네릭 메서드로 선언 할수 있어 편리하다.

//3. 제네릭의 여러 활용 방법
//3-1. 룩럽 타입을 제네릭 클래스에 적용
//룩업타입은 keyof로 속성을 포함하는 대상을 탐색해 유니언 타입처럼 동작한다. 
interface INumber {
    one: number;
    two: number;
    three: number;
}
type NumberKeys = keyof INumber; // "one" | "two" | "three"

let myNum: NumberKeys = 'one';

//제네릭함수에 룩업타입 적용하기
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let numbersKeys = { one: 1, two: 2, three: 3 };
console.log(getValue(numbersKeys, 'one'));
//객체의 속성명 중 하나만 허용하도록 하기 위해 keyof로 탐색할 객체 리터럴 let numbersKeys = {one: 1, two: 2, three: 3};로 정의 한다.
//전달 받을 매개변수 값 중 하나만 제한하고 싶을때 function getValue<T, K extends keyof T>(obj: T, key: K) {} 로 정의한다.


//4. 인터페이스를 상송해 제네릭 확장하기
//인터페이스는 클래스가 구현해야 할 메서드나 프로퍼티를 선언할 수있다.
//구현해야 할 클래스가 제네릭 클래스라면 인터페이스는 제네릭 인터페이스로 선언해야 한다.
//제네릭 인터페이스는 타입 매개변수가 선연된 형태로 선언된다. 
interface IFilter<T> {
    unique(array: Array<T>): Array<T>;
}
class Filter<T> implements IFilter<T> {
    unique(array: Array<T>): Array<T> {
        // Array<T> 배열이 반환 되도록 로직 구현
    }
}
//제네릭 인터페이스에 맞춰 구현하여 주면 된다.

interface IFilter<T> {
    unique(array: Array<T>): Array<T>;
}
class Filter<T> implements IFilter<T> {
    
    unique(array: Array<T>): Array<T> {
        return array.filter((v, i, array) => array.indexOf(v) === i); //ES5 
        // return [...new Set(array)]; //ES6
    }
}
let myFilter = new Filter<string>();
let resultFilter = myFilter.unique(['a', 'b', 'c', 'a', 'b']); //중복 요소를 제거하는 함수 unique
console.log(resultFilter);

//5. 맵 객체의 선언과 타입 지정 방법
// 5-1. 맵 객체의 선언과 사용 방법
// 맵은  키-값을 관리하는데 있어 효율적인 자료구조이다.
let newMap = new Map([['key1','value1'], ['key2', 'value2']]); //선언과 할당을 합한 형태로 선언
let newMap = new Map();
myMap.set('key1', 'one');
myMap.set('key2', 'two'); //맵 객체를 생성하고 나서 키-값을 쌍으로 추가하여 준다.

// 맵 객체는 순회 가능한 컬렉션으므로 for of문을 통해 순회할 수 있다.
for (var element of newMap) {
    ...
};

//예제 - 타입이 없는 맵 객체에 대한 키-값 객체를 추가하기
let myMap = new Map();
myMap.set(1, 'one');
myMap.set('2', 'two');

//내장 이터레이터와 for of를 이용해 맵을 순회하기
for (let v of myMap) {
    console.log(v);
}

//내장 이터레이터를 이용해 맵을 순회하기
let mapIter = myMap[Symbol.iterator]();
console.log(mapIter.next().value); // [1, 'one']
console.log(mapIter.next().value); // ['2', 'two']

//5-2. 맵 객체 사용 시 타입을 지정하기
//맵 객체에 타입을 지정할 숭 있게 해 타입 안전성을 줄 수 있다.
// let list5: Map<number, string> = new Map<number, string>();

//맵 객체를 할당받을 변수에 맵 객체의 타입이 선언돼 있다면 타입 안전성이 보장되므로 맵 객체를 생성할 때 타입 인수를 생략해도 된다.
// let list: Map<number, string> = new Map();

//-키 값에 대해 타입을 지정한 맵객체
let list3: Map<number, string> = new Map<number, string>();
list3.set(1, 'one');
list3.set(2, 'two');
list3.set(3, 'three');

console.log(list3); // Map { 1 => 'one', 2 => 'two', 3 => 'three' }
if (list3.delete(2)) { 
    console.log(list3); // Map { 1 => 'one', 3 => 'three' }
}

list3.clear();
console.log(list3); // Map { }

//6. 제네릭 기반의 자료구조 만들기
//arraylist
class ArrayList<T> {
    private arrayList: (T | number)[] = [];
    add(indexOrValue: T | number, value?:T) {
        if (value !== undefined) {
            //타입가이드
            if (typeof indexOrValue === 'number') { ㄴ 
                this.arrayList.splice(indexOrValue, 0, value);
            }
        }else {
            this.arrayList.push(indexOrValue);
        }
    }
    remove(index: number) {
        this.arrayList.splice(index, 1);
    }
    addAll(elements: T[]) {
        this.arrayList = [...this.arrayList, ...elements];
    }
    get(index: number): T | number {
        return this.arrayList[index];
    }
    clear() {
        this.arrayList = [];
    }
    isEmpty(): boolean {
        return this.arrayList.length === 0 ? true : false;
    }
    set(index: number, value: T) {
        this.arrayList[index] = value;
    }
    toArray(): (T | number)[] {
        return this.arrayList;
    }
    size(): number {
        return this.arrayList.length;
    }
}
let aList = new ArrayList<string>();
aList.add('a');
aList.add('b');
aList.add('c');
console.log('1번 add : ', aList.toArray());

aList.add(1, 'hi'); //인덱스 번호와 삽입 문자열을 함께 전달
console.log('2번 index로 add : ', aList.toArray());

aList.remove(1); //1번 인덱스 삭제
console.log('3번 remove(1) : ', aList.toArray());

aList.addAll(['d', 'e']); //
console.log('4번 addAll : ', aList.toArray());
console.log('5번 get(2) : ', aList.get(2));
console.log('6번 size() : ', aList.size());
aList.clear();
console.log('7번 size() : ', aList.size());

if (aList.isEmpty()) {
    console.log('8번 empty!');
}
//print
// 1번 add: ['a', 'b', 'c']
// 2번 index로 add: ['a', 'hi', 'b', 'c']
// 3번 remove(1) : ['a', 'b', 'c']
// 4번 addAll: ['a', 'b', 'c', 'd', 'e']
// 5번 get(2) : c
// 6번 size() : 5
// 7번 size() : 0
// 8번 empty!

>>>>>>> chapter-03
