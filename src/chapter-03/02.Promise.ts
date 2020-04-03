// promise - 스코프가 깊어지지 않도록 나열식 패턴 방식으로 입력 데이터를 ㅈ\처리할 수 있게 한다.
//3가지 상태
//대기상태(pending) - 프로미스가 실행되고 값이 결정되지 않은 상태
//충족상대(fulfilled) - 대기 상태가 끝난 뒤 값이 결정된 상태  resolve 함수를 통해 값을 전달
//거부상태(rejected) - 프로미스가 제대로 처리 되지 않고 거부된 상태로 catch 메서드를 통해 예외를 처리해주어야 한다.
//형식
// const promise = new Promise((resolve, reject)=>{
//     if (충족상태) {
//         resolve(result); //오류가 없으므로 resolve 함수에 결과값을 전달
//     }else{
//         //거부상태
//         reject("거절 사유 전달");
//     }
// });
//resolve 함수를 호출하면 then 메서드를 호출 한다. then메서드는 결정된 값에 대해 후속 처리를 담당한다.
//reject함수에 거절된 사유를 전달하면 catch메서드를 호출한다. catch메서드는 전달된 이유를 표시해주고 예외처리를 진행한다.


//1. 프로미스를 사용한 충첩스코프 개선
//then 메서드를 이용해 중첩 코드개선 - then 메서드는 중첩 스코프를 만들지 않아 가독성을 개선한다. 여러개 동시에 선언 할 수 있다.
//형식
// promise.then(res => {
//     ...
// }).then(res = > {
//     ...
// }).then(res => {
//     ...
// });

//기본선언
const mPromise = new Promise((resolve, reject)=>{
    resolve(1);
});
mPromise.then(res => {
    console.log(typeof res, res);
});
 //print number 1


 //reject함수 호출 후 예외 상황 처리
 const basicRejectPromise = new Promise((resolve, reject)=>{
     //reject 을 통한 예외상황 발생
     reject('Err');
 }).catch((err)=>{
     //예외 상황 처리
     console.log(err);
 });

 //then 메서드를 채이닝 형태로 선언하고 then 메서드에서 발생한 예외 상황을 처리하려면 catch 메서드를 마지막에 선언한다.

let chainingPromise = new Promise(function (resolve, reject) {
    resolve(1);
}).then(function(value){
    console.log(value); //1
    return 2;
}).then(function(value){
    console.log(value); //2
    throw 'Exception!';
}).catch(function(e){
    console.log(e); // Exception!
})

//2. 프로미스의 비동기 호출 제어
//프로미스는 비동기 응답의 흐름을 개선할 숭 있다.
// const promiseAsync = new Promise((resolve, reject) => {
//     let result;
//     setTimeout(function() {
//         //비동기 작업의 처리결과를 result에 할당하고 then 메서드에서 처리하도록 함.
//             resolve(result);
        
//     }, 지연시간);
// });
//setTimeout에 설정한 지연시간이 되면 setTimeout의 콜백함수가 호출 되는데, 이부분에 지연시간 동안 계산된 결정 값을 전달하는 방식으로 흐름을 개선한다.
//예제
const promiseAsync =  new Promise((resolve, reject) => {
    let sec: number = (Math.floor(Math.random() * 5) + 1);
    setTimeout(function (isTrue) {
        if (isTrue) {
            resolve(sec);
        }
    }, sec * 1000, true);
}).then(res => {
    console.log(res + 's');
});
// 1s, 2s, 3s, 4s, 5s 중 하나 출력

//호출 순서와 응답순서가 일치하지 않는 문제
//임의 시간만큼의 지연이 있는 비동기 함수 여러개를 동시에 호출하면 호출 순서와 응답 결과의 순서가 일치되지 않는 문제가 있다.
//delay함수에 setTimeout 함수를 선언
// function delay(msg) {
//     setTimeout(function(){
//         //콜백 함수에서 비동기 응답에 대한 처리
//     }, 임의의 지연시간);
// }

//예제
function delay(msg) {
    let ms: number = Math.floor(Math.random() * 1000) + 1;
    setTimeout(function (){
        console.log(msg);
    }, ms);
}
function async() {
    delay('hello1');
    delay('hello2');
    delay('hello3');
}

async();

//promise.all()을 이용한 처리 결과에 대한 동기화
function asyncDelay(order: number) {
    return new Promise(function(resolve, reject){
        let ms: number = Math.floor(Math.random() * 1000) + 1;
        setTimeout(function(){
            // console.log('작업완료 : ' + order);
            resolve(order); //결정
            //reject('reject'); //거절
        }, ms);
    }).then();
}

function sysResultPromise() {
    let p1 = asyncDelay(1);
    let p2 = asyncDelay(2);
    let p3 = asyncDelay(3);
    let p4 = asyncDelay(4);
    Promise.all([p1, p2, p3, p4]).then(function (order){ // Promise.all() 메서드는 각 프로미스 객체의 결정 값을 호출 순서에 맞춰 1,2,3,4 와 같이 차례대로 정렬해 출력한다.
        console.log(`동기화 된 출력 : ${order}`);
    })
}
sysResultPromise();
// 실행 할때 마다 바뀜.
// 작업완료: 2
// 작업완료: 3
// 작업완료: 4
// 작업완료: 1
// 동기화 된 출력: 1, 2, 3, 4



//3. RxJS를 활용한 데이터 스트림 처리
//3-1. 반응형 프로그래밍 - 웹페이지에 들어오는 스트림(stream) 형태의 입력 이벤트를 감지해 반응(responsive)을 처리 할수 있는 모델이다.
//검색어 제안(keyword suggestion) - 사용자가 어떤한 단어를 입력하면 단어에 연관된 관련 키워드를 보이는 기능.

//4. Asyne/Await 이용한 동기화
//비동기 호출을 동기화
//형식
async function hello() {
    await run1();
    await run2();
}

// // Async/Await 를 도입해 비동기 처리를 동기로 실행하기
function delay2(msg: string) {
    let ms: number = Math.floor(Math.random() * 1000) + 1;
    return new Promise(function(){
        setTimeout(resolve, ms, msg);
    }).then(function (v) {
        console.log(v, ms + 'ms');
    });
}

async function sync2() {
    let start = new Date().getTime();

    await delay2('a');
    await delay2('b');
    await delay2('c');

    let end = new Date().getTime();
    console.log('시간 : ', end - start + 'ms');
}
sync2();


// 비동기 함수의 처리 결과가 영향을 미치도록 동기화 실행
function delay3(msg, ms): Promise<string> {
    //프로미스가 지연시간이 지나면 결정 값을 반환해 줌.
}

// delay3 함수가 호출될때 await 키워드를 붙여서 호출 할 수 있다.

let result1: string =  await delay3('a', 1000);
let result2: string = await delay3(result1 + 'b', 500);
let result3: string = await delay3(result2 + 'c', 100);

//비동기 함수이 호출 결과가 이어서 호출되는 비동기 함수에 영향을 미치도록 함.
function delay3(msg, ms): Promise<any> {
    return new Promise(function(resolve){
        setTimeout(function () {
            resolve(msg);
        }, ms);
    }).then(function(v) {
        console.log(v + '' + ms + 'ms');
        return v;
    });
}

async function sync3() {
    let start =  new Date().getTime();
    let result1: Promise<any> = await delay3('a', 1000);
    let result2: Promise<any> = await delay3(result1 + 'b', 500);
    let result3: Promise<any> = await delay3(result2 + 'c', 100);

    let end = new Date().getTime();
    console.log('시간 : ', end - start + 'ms');
}

sync3();

//delay3 함수가 호출 되고 나서 1000ms 지연 후 호출 된 결과를 result1에  'a' 로 할당하고, 이어서 result2에는 이전 실행 결과와 합해 'ab' 문자열을 500ms 지연후 할당한다.
//result3 도 이전 결과를 합해 'abc' 문자열을 합해 100ms 지연 후 할당한다.