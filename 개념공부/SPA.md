# SPA란 무엇인지 알아보자...

출처: https://linked2ev.github.io/devlog/2018/11/15/Javascript-2.-What-is-SSR/

----

**SPA(single-page application)**

<img src="https://user-images.githubusercontent.com/52457180/97775366-5be0a400-1ba3-11eb-87a9-ab18c404da61.png" alt="K-002" style="zoom: 50%;" />

단일 페이지 애플리케이션으로, 현재의 페이지를 동적으로 작성함으로써 사용자와 소통하는 웹 애플리케이션이다. 연속되는 페이지 간의 사용자 경험을 향상시키고, 웹 애플리케이션이 데스크톱 애플리케이션처럼 동작하도록 도와준다.

SPA는 브라우저에 로드되고 난 뒤에 페이지 전체를 서버에 요청하는 것이 아니라 최초 한번 전체 페이지를 다 불러오고 HTML에 번들링 된 js가 실행되면서 페이지 렌더링을 한다.

그리고 렌더링 후 클라이언트 요청에 따라 응답 데이터만 다시 페이지의 특정 부분만 렌더링하는 웹 어플리케이션 개념이다.