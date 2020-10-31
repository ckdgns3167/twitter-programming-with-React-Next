# Next로 트위터 따라하기

------

> **강의**
>
> - [리뉴얼] React로 NodeBird SNS 만들기 (인프런, 유료, 조현영)
>
> **목표**
>
> - 자바스크립트(프론트: React(Next), 백: Node.js)를 이용한 SNS 풀스택 프로그래밍과 AWS 배포 방법까지 함께 알려주는 인터넷 강의를 보고 따라해보며 내것으로 만들 것이다.

> **학습 기술**
>
> - Front-end: Next, Redux, Saga
> - Back-end: Nodejs(Express)
> - 배포: AWS

> **계획**
>
> - front, back을 나눠 진행할 것인데, 프론트 개발자, 백 개발자 각각의 입장에서 바라보며 프로그래밍하기 위함이다. 

---

아래는 강의를 듣고 직접 정리한 내용입니다. 강의없이 봐도 이해하기 쉽도록 순서대로 자세히 적었습니다. 

## **Front-End**

**시작**

- 프로젝트 생성 (package.json 생성됨)

  ```
  npm init
  ```

- package 설치 (9v으로 설치, node_modules 생성됨)

  ```
  npm i next@9 react react-dom prop-types
  ```
  
- package.json에서 scripts 변경

  ```json
  "scripts": {
      "dev": "next"
  },
  ```

- pages 폴더 생성 후 그 속에 index.js 생성

  ```javascript
  const home = () => {
      return (
          <div>Hello, Next!</div>
      );
  }
  
  export default Home
  ```

  (중요)**next는 명확히 pages라는 이름의 폴더를 인식한다. 그래서 그 안에 있는 파일들을 개별적인 page 컴포넌트로 만들어준다. 즉, 코드 스플리팅된 컴포넌트로 만들어준다.** pages 폴더가 아닌 components 폴더 같은 것들은 다른 이름으로 만들어 관리해줘도 된다. pages는 꼭 pages!

- Hello page 띄우기 

  ```
  npm run dev
  ```

- 사이트에 필요한 기본  page 컴포넌트들을 pages 폴더 안에 생성

  pages/profile.js

  ```javascript
  const Profile = () => {
      return <div>내 프로필</div>
  };
  
  export default Profile
  ```

  pages/signup.js

  ```javascript
  const Signup = () => {
      return <div>회원가입</div>
  };
  
  export default Signup
  ```

  (중요) 이렇게 pages 안에 파일을 생성하여 코드만 잘 작성해주면 next가 그 파일 이름으로 된 주소로 접근할 수 있게 된다. **React를 썼을 때는 라우터 설정과 서버 사이드 랜더링 설정을 해줬어야 했는데 그럴 필요가 없게 만들어 준다.** 엄청나게 편해진 것이다. pages 안에 폴더 구성에 따라 접근 주소를 쉽게 지정할 수 있다. 또한, Next 버전 9에서 추가된 것으로 **동적 라우팅**을 가능하게 됐다. 방법은 pages 폴더 안에 어떤 파일 이름에 대괄호([])로 감싸서 생성하면 된다.

- page 컴포넌트가 아닌 페이지를 구성해주는 컴포넌트는 components 폴더 안에 생성

  components/AppLayout.js

  ```javascript
  import PropTypes from "prop-types"
  
  const AppLayout = ({ children }) => {
  	return (            
          <div>
              <div>공통 메뉴</div>    
              {children}
          </div>
      )
  };
  
  AppLayout.PropTypes = {
      children: PropTypes.node.isRequired,
  };
  
  export default AppLayout
  ```

  prop으로 넘겨받는 것들은 proptypes로 검사해주는 게 좋다. 위에서 children은 노드라는 타입의 변수이다. Nodejs의 그 노드가 아니라 react의 노드이다. 화면에 그릴 수 있는 모든 것들이 노드이다. 위에 return 안에 들어갈 수 있는 것들이 노드이다. 

  

  pages/index.js

  ```javascript
  const Home = () => {
      return (
          <AppLayout>
              <div>Hello, Next!</div>
          </AppLayout>
      );
  }
  
  export default Home
  ```

  위 코드에서 보이는 것처럼 방금 만든 AppLayout 태그로 감싸주면 그 안에 들어간 것이 children으로 입력되어 화면을 구성하게 된다. 

