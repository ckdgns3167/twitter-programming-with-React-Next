# SSR과 CSR가 무엇인가 알아보자... (2)

출처: https://d2.naver.com/helloworld/7804182

-------

1. ## SSR은 무엇인가?

   SSR은 서버에서 사용자에게 보여줄 페이지를 모두 구성하여 사용자에게 페이지를 보여주는 방식이다. JSP/Servlet의 아키텍처에서 이 방식을 사용했다.

   SSR을 사용하면 모든 데이터가 매핑된 서비스 페이지를 클라이언트(브라우저)에게 바로 보여줄 수 있다. 서버를 이용해서 페이지를 구성하기 때문에 클라이언트에서 구성하는 CSR(client-side rendering)보다 페이지를 구성하는 속도는 늦어지지만 전체적으로 사용자에게 보여주는 콘텐츠 구성이 완료되는 시점은 빨라진다는 장점이 있다. 더불어 SEO(search engine optimization) 또한 쉽게 구성할 수 있다.

   ![SSR](https://d2.naver.com/content/images/2020/06/ssr.png)

   출처: [The Benefits of Server Side Rendering Over Client Side Rendering](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)

   반면 CSR은 SSR보다 초기 전송되는 페이지의 속도는 빠르지만 서비스에서 필요한 데이터를 클라이언트(브라우저)에서 추가로 요청하여 재구성해야 하기 때문에 전제적인 페이지 완료 시점은 SSR보다 느려진다.

   ![CSR](https://d2.naver.com/content/images/2020/06/csr.png)

   출처: [The Benefits of Server Side Rendering Over Client Side Rendering](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)

   SSR이 CSR에 비해 성능이 우수한 면도 있지만 모든 면에서 SSR이 CSR보다 우수하지는 않다.

-------

## 왜 네이버 블로그는 Node.js 기반의 SSR을 도입하였을까?

### 합리적인 선택

2003년 네이버 블로그가 처음 대중에게 오픈된 이후로 지금까지 네이버 블로그는 많은 도전과 변화를 겪어야 했다. 대표적으로 모바일 시대 전환에 대한 대응이 있었고 이를 위해 2016년 2월 블로그 모바일 페이지를 전면 개편했다. 사용자 UI에 대한 요구 사항도 많아지다 보니 빠르고 기민한 대응을 위한 프레임워크 도입이 필요했으며 당시 가장 많이 사용하던 angular.js를 도입했다.

![react VS angular.js](https://d2.naver.com/content/images/2020/06/angularjs_react.png)

angular.js는 손쉽게 SPA(single-page application)를 구축할 수 있다. SPA는 사용자가 웹을 쓰면서도 데스크톱 애플리케이션과 같은 사용성을 제공한다.

> **SPA(single-page application)**
>
> 단일 페이지 애플리케이션으로, 현재의 페이지를 동적으로 작성함으로써 사용자와 소통하는 웹 애플리케이션이다. 연속되는 페이지 간의 사용자 경험을 향상시키고, 웹 애플리케이션이 데스크톱 애플리케이션처럼 동작하도록 도와준다.

이러한 구성을 하기 위해서는 기본적으로 프런트엔드와 백엔드 영역의 분리가 선행되어야 한다.

다음과 같이 기존의 페이지 덩어리(JSP/Servlet)를 'CSR View 영역'과 'SSR View 영역', 그리고 'API'로 분리함으로써 프런트엔드와 백엔드 영역에서 담당하는 페이지의 역할을 나누어야 한다.

![step1.png](https://d2.naver.com/content/images/2020/06/step1.png)

그 당시만 해도 프런트엔드부터 백엔드까지 모두 개발하는 Full Stack Developer의 태동기였기 때문에 개발자 입장에서는 프런트엔드 영역으로의 확장에 대한 도전이 필요한 상황이었다.

![img](https://d2.naver.com/content/images/2020/06/fullstack.png)

### 너무 빠르게 바뀐 프런트엔드 생태계

프런트엔드 생태계는 2016년 이후 급속도로 발전하면서 ES2015, ES2016 등이 개정되고, jQuery가 영원할 것 같은 프레임워크는 react, vue, angular2와 같은 프레임워크의 창출과 함께 급격하게 변하고 있었다.

더불어 Webpack, rollup, TypeScript, babel과 같은 프런트엔드 생태계가 구축되면서 개발자 모두가 Full Stack Developer로 성장하기에는 많은 노력과 시간이 필요한 상황이었다.

![img](https://learnwebskill.com/wp-content/uploads/2019/09/full-stack-javascript.jpg)

블로그가 네이버를 대표하는 서비스이다 보니 타 서비스 과제와의 연관성도 높아 프런트엔드 기술력을 높여 Full Stack Developer로 개발자를 육성하기에는 더더욱 어려움이 많았다.

결국, 아키텍처는 프런트엔드와 백엔드로 일정 부분 분리가 되었지만 개발은 Full Stack Developer를 지향하다 보니 영역의 전문성은 떨어지고 사용자의 프런트엔드 요구 사항에 신속하게 대응하는 데에 더욱 더 큰 어려움이 생겼다.

### CSR의 기술적인 한계

프런트엔드 생태계와 그에 따른 개발팀의 상황은 너무 빠르게 바뀌었다. 그 뿐만 아니라 궁극적으로는 angular.js는 블로그 서비스의 요구 사항을 모두 수용하기에는 기술적인 한계가 있었다.

블로그는 주요 사용자들이 방문하는 블로그 세션 영역과 네이버 검색과 메인을 통해 노출되는 블로그 글 영역으로 구분할 수 있다.

![모바일 블로그 세션 영역](https://d2.naver.com/content/images/2020/06/blog.png)

블로그 서비스의 대다수 트래픽은 블로그 글에 집중되어 있다. 사용자들은 네이버 검색을 통해 블로그 글을 보고, 네이버 메인에 노출된 블로그 글을 본다.

CSR만을 지원하는 anuglar.js 프레임워크 내에서는 페이지 로드 이후 동적으로 콘텐츠를 생성하기 때문에 콘텐츠를 빠르게 소비하는 사용자의 요구 사항을 충족시킬 수가 없었다.

다음은 그림은 페이지가 노출되는 과정을 시간순으로 찍은 스크린샷이다.

![img](https://d2.naver.com/content/images/2020/06/csr_fault.png)

네트워크 상황이 좋지 않다면 CSR을 이용할 경우 사용자들은 글을 보기 전에 상당 시간 하얀 화면을 봐야 할 수도 있다.

> angular.js는 SSR 구축을 위한 3rd party 라이브러리가 존재하지만 공식적인 생태계는 존재하지 않는다.

### Node.js 기반의 SSR을 선택한 이유

CSR의 문제를 해결할 수 있는 방법으로 여러 가지 렌더링 기법이 있다. 자세한 내용은 [Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web?hl=en)을 참고한다.

하지만 빠르게 바뀌는 프런트엔드 생태계와 CSR의 한계를 극복하기 위해서 블로그 개발팀은 Node.js 기반의 SSR을 선택했다. Node.js 기반의 SSR에는 다음과 같은 이점이 있다.

#### 첫째, Node.js 기반의 SSR은 universal language인 JavaScript를 최대한 활용할 수 있다.

일반적으로 클라이언트에서 작성한 코드의 일부는 서버에서도 동일한 로직으로 구성되는 경우가 많다. 개발의 난이도는 있지만 생산성 측면에서는 SSR을 구축하는 것이 장기적인 관점에서 더 생산적이다.

블로그 개발팀은 React 기반의 SSR을 선택함으로써 universal language의 장점과 성장한 React 생태계를 이용할 수 있게 되었다.

![2016년 이후 급격히 성장한 React](https://d2.naver.com/content/images/2020/06/react-angular-vue.png)

#### 둘째, SSR을 사용하면 프런트엔드 영역과 백엔드 영역을 완전히 분리함으로써 생산성을 높일 수 있다.

SSR을 사용하면 프런트엔드 영역과 백엔드 영역은 REST API를 통해 느슨하게 연결할 수 있다.

기존에 CSR 페이지는 프런트엔드에서 개발하고 SSR 페이지는 백엔드에서 개발을 했다면, SSR 환경을 구축하면 페이지의 소유권이 온전히 프런트엔드에 존재하므로 페이지가 변경될 때마다 불필요한 커뮤니케이션을 할 필요가 없어진다.

다만, 인프라를 구축하고 운영하는 것이 부담스러운 부분이지만 요즘은 가상화를 통한 구성이 너무 잘 되어 있어서 조그만한 투자로 많은 이점을 얻을 수 있다.

더불어 백엔드에서도 API 개발과 데이터 활용에 더 집중할 수 있어서 서비스 품질을 높이는 데 기여할 수 있다는 장점이 있다.

![step2.png](https://d2.naver.com/content/images/2020/06/step2.png)

#### 마지막으로, SSR 아키텍처를 구성하면 다른 여러 가지 대안을 활용할 수 있는 토대가 된다.

필요에 따라서 CSR로만 구성할 수도 있고 CSR과 prependering을 함께 사용하도록 개발할 수도 있다.

![img](https://developers.google.com/web/updates/images/2019/02/rendering-on-the-web/infographic.png)

출처: [Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)

초기 비용을 감당할 수 있다면 SSR을 도입하지 않을 이유가 없다.