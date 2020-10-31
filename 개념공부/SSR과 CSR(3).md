# SSR과 CSR가 무엇인가 알아보자... (3)

출처: https://linked2ev.github.io/devlog/2018/11/15/Javascript-2.-What-is-SSR/

-----

### 클라이언트 사이드 렌더링(CSR)와 서버 사이드 렌더링(SSR)

![K-002](https://user-images.githubusercontent.com/52457180/97775111-5aae7780-1ba1-11eb-85d5-42bf5400d4e4.png)

- 초기 View 로딩 속도
  - CSR은 최초 로딩 시 각종 HTML, JS, CSS 등 resource를 다 불러오고 js가 실행되면서 렌더링하기에 SSR보다는 맨 처음에는 View화면이 늦게 뜨는 현상이 있다.
  - CSR은 최초 로딩 이후에는 요청들에 대해서는 인터랙션이 빠르다.
  - SSR는 View를 서버에서 처리해서 초기로딩속도는 빠르지만 정보가 많은 B2C 웹 서비스 등에는 서버 부담이 크다.

- SEO(검색 엔진 최적화)의 문제
  - 일반적인 웹크롤러, 봇들은 HTML 내용만 수집하기에 빈 페이지로 인식한다. js가 실행이 완료되어 렌더링이 되기 전까지 HTML은 빈 화면이기 때문이다.

- 보안 문제
  - SSR에서는 사용자에 대한 정보를 서버 측에서 세션으로 관리를 했다.
  - CSR일 경우 쿠키말고는 사용자에 대한 정보를 저장할 공간이 마땅치 않다.
