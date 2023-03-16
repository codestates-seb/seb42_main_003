# 차몽/프론트엔드

## Rule
* App.tsx 등 공용 컴포넌트 편집시 회의에서 반드시 보고하기
* 개인 브랜치에서 frontend 브랜치로 머지 시 Pull request 넣기

## 컴포넌트 참조
https://codestates.notion.site/FE-6dafe069dbc74725b1999d1494d5b59f

## figma 
https://www.figma.com/file/QqbxOMuxsCglNtxJ2oAA6c/Untitled?node-id=0%3A1&t=yd5GYQ2V6FNruxpC-1

## 폴더 구조
* src
  * components
    * 공용 컴포넌트는 components에 바로, 특정 페이지에서 사용할 컴포넌트는 폴더에 정리합니다.
    * 예시) mypage
    * 예시) Search.js
  * utils
    * 함수들을 정리합니다.
  * api
    * api 호출시 사용될 함수를 정리합니다.
  * redux
    * redux 사용시 관련 파일을 정리합니다.
  * hooks
  * assets
  * styles
    * globalStyle.js
    * global.css

## 코드 컨벤션

### prettier 설정
* 들여쓰기 2칸
* 작은따옴표(Single quote) 사용

### 함수 선언
* 컴포넌트 함수는 function으로, 그 외 함수는 화살표 함수로 선언합니다.
```
//props 전달을 위한 interface를 선언합니다.
interface ExampleProps {
  exampleString:string,
  exampleNumber:number,
  exmapleFunc:(foo:number)=>void;
}

//props를 구조분해할당으로 받아오면서 props 타입을 붙여줍니다.
function ExampleComponents ({exampleString,exampleNumber,exampleFunc}:ExampleProps){
}

//일반 함수는 화살표로 선언합니다.
const add=(foo:number, bar:number):number=>{
  return foo+bar;
}
```

