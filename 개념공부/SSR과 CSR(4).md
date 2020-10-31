# SSR과 CSR가 무엇인가 알아보자... (4)

출처: https://2dubbing.tistory.com/86

----

## Server-Side Rendering(SSR) 이란?

PHP, JSP, ASP, Node.js 등 Server-Side Script 언어 기반의 템플릿 엔진을 이용해 동적인 웹 콘텐츠(html) 문서를 만드는 방식.

다음 코드는 Node.js 템플릿 엔진인 EJS 문법으로 작성 된 .ejs 파일 내용의 일부분이다.

```html
<body>
  <h1>User list</h1>
  <ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
  </ul>
</body>
```

html <ul> 태그 중간에 템플릿 문법이 사용된 것을 확인할 수 있다.

Client 에서 요청이 들어오면 Server 에서 화면 구성에 필요한 데이터를 구성한 뒤, 템플릿엔진이 .ejs 파일과 데이터를 가지고 렌더링한다.

렌더링이 완료되면 다음과 같이 변환되고 결과물을 Client 로 서빙한다.

```html
<body>
  <h1>User list</h1>
  <ul>
    <li>kim</li>
    <li>lee</li>
    <li>park</li>
  </ul>
</body>
```

 

#### SSR 장점

- 웹 페이지 초기 로딩 지연시간을 줄일 수 있다.
  - SSR 방식은 Server 에서 화면 구성에 필요한 데이터를 가지고 렌더링을 진행한 뒤, 결과물인 html 을 Client 로 서빙한다. Client 에서는 초기 웹 페이지 구성에 필요한 데이터를 요청하지 않아도 된다.
- [SEO(Search Engine Optimization)](https://ko.wikipedia.org/wiki/검색_엔진_최적화) 가 많은 양의 웹 콘텐츠 정보를 수집하게 되므로, 검색사이트 상위 노출에 유리하다.
  - 검색엔진 봇이 웹 사이트 정보를 수집하고자 Server 에 요청하면, Server 는 콘텐츠 정보를 포함한 html 을 제공하므로 검색엔진 봇은 많은 정보를 수집할 수 있게 된다. 

 

#### SSR 단점

- Server 에서 데이터를 이용해 동적으로 html 을 생성하기에 Server 부담이 발생한다.

----------

## Client-Side Rendering(CSR) 이란?

Client(Web Browser) 에 내장된 javascript 엔진이 동적으로 html element 를 생성한 뒤, root element 에 추가하여 웹 콘텐츠를 만드는 방식이다.

CSR 방식은 React, Angular, Vue 와 같은 Single Page Application(SPA) 에서 사용한다.



#### CSR 장점

- Server 부담을 줄일 수 있다.
  - CSR 방식을 이용하면 Server 는 Client 에서 요청한 데이터만 제공하면 된다. 템플릿 엔진을 이용한 웹 페이지 렌더링을 하지 않으므로 SSR 방식보다 적은 부담이 발생한다. 

 

#### CSR 단점

- 웹 페이지 초기 로딩 지연시간이 발생한다.
  - CSR 방식은 Server 로 부터 html 파일을 서빙 받은 뒤, AJAX 를 통해 화면 구성에 필요한 데이터를 Server 에 요청하게 된다. 이로 인해 웹 페이지 초기 로딩 지연시간이 발생한다.

- [SEO(Search Engine Optimization)](https://ko.wikipedia.org/wiki/검색_엔진_최적화) 가 웹 콘텐츠 정보를 수집하지 못해, 검색사이트 상위 노출에 불리하게 된다.
  - CSR 방식의 경우, 초기 html 에는 별다른 정보가 없다.
  - 그러므로 검색엔진 봇이 수집하는 콘텐츠 정보가 적어, SSR 방식으로 개발된 웹 사이트에 비해 상대적으로 검색 노출에 불리하게 된다. 

```html
<!-- Client-Side Rendering 을 하는 html 예시 -->
<html>
    <head> ...생략 </head>
    <body>
    	<div id="root"></div>
    </body>
</html>
```