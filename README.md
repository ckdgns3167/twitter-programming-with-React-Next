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
> - 먼저 front 영역부터 진행할 것인데, 백엔드 쪽 데이터 준비가 덜 된 상태라 가정하며, 더미 데이터를 만들어 진행한다.

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
  import React from 'react';
  const home = () => {
      return (
          <div>Hello, Next!</div>
      );
  };
  
  export default Home;
  ```

  (중요)**next는 명확히 pages라는 이름의 폴더를 인식한다. 그래서 그 안에 있는 파일들을 개별적인 page 컴포넌트로 만들어준다. 즉, 코드 스플리팅된 컴포넌트로 만들어준다.** pages 폴더가 아닌 components 폴더 같은 것들은 다른 이름으로 만들어 관리해줘도 된다. pages는 꼭 pages!

- Hello page 띄우기 

  ```
  npm run dev
  ```

-----

- 사이트에 필요한 기본  page 컴포넌트들을 pages 폴더 안에 생성

  pages/profile.js

  ```javascript
  import React from 'react';
  const Profile = () => {
      return <div>내 프로필</div>
  };
  
  export default Profile;
  ```

  pages/signup.js

  ```javascript
  import React from 'react';
  const Signup = () => {
      return <div>회원가입</div>
  };
  
  export default Signup;
  ```

  (중요) 이렇게 pages 안에 파일을 생성하여 코드만 잘 작성해주면 next가 그 파일 이름으로 된 주소로 접근할 수 있게 된다. **React를 썼을 때는 라우터 설정과 서버 사이드 랜더링 설정을 해줬어야 했는데 그럴 필요가 없게 만들어 준다.** 엄청나게 편해진 것이다. pages 안에 폴더 구성에 따라 접근 주소를 쉽게 지정할 수 있다. 또한, Next 버전 9에서 추가된 것으로 **동적 라우팅**을 가능하게 됐다. 방법은 pages 폴더 안에 어떤 파일 이름에 대괄호([])로 감싸서 생성하면 된다.

---

- page 컴포넌트가 아닌 페이지를 구성해주고 재활용성이 높은 공유 컴포넌트는 components라는 폴더를 생성해주고 이 안에 필요한 컴포넌트들을 작성

  components/AppLayout.js

  ```javascript
  import React from 'react';
  import PropTypes from "prop-types";
  
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
  
  export default AppLayout;
  ```

  prop으로 넘겨받는 것들은 proptypes로 검사해주는 게 좋다. 위에서 children은 노드라는 타입의 변수이다. Nodejs의 그 노드가 아니라 react의 노드이다. 화면에 그릴 수 있는 모든 것들이 노드이다. 위에 return 안에 들어갈 수 있는 것들이 노드이다. 

  

  pages/index.js

  ```javascript
  import React from 'react';
  const Home = () => {
      return (
          <AppLayout>
              <div>Hello, Next!</div>
          </AppLayout>
      );
  };
  
  export default Home;
  ```

  위 코드에서 보이는 것처럼 방금 만든 AppLayout 태그로 감싸주면 그 안에 들어간 것이 children으로 입력되어 화면을 구성하게 된다. 

---

- Link

  React에서는 React Router를 썼지만, Next.js 에서는 쓰지 않고 대신에 Link라는 컴포넌트를 사용하게 된다.

  

  AppLayout.js

  ```javascript
  import React from 'react';
  import PropTypes from "prop-types";
  import Link from "next/link";
  
  const AppLayout = ({ children }) => {
  	return (            
          <div>
              <div>
                  <Link href="/"><a>홈</a></Link>
                  <Link href="/profile"><a>프로필</a></Link> 
                  <Link href="/signup"><a>회원가입</a></Link>     
              </div>    
              {children}
          </div>
      )
  };
  
  AppLayout.propTypes = {
      children: PropTypes.node.isRequired,
  };
  
  export default AppLayout;
  ```

  위 코드가 잘 동작하는지 어떻게 움직이는지 확인하는 과정에서 화면이 0.5초 늦게 나오는 현상을 느낄 수 있을 것이다. 이런 현상은 현재 개발(dev)모드라서 그렇고 나중에 배포하기 전에 배포(production)모드로 변경하면 느린 현상이 나타나지 않을 것이다.

-------

- Eslint 설치

  : 개발할 때 유용한 패키지, 코드의 깔끔함과 일관성을 위함. 코드 룰이 정해짐.

  ```
  npm i eslint -D
  ```

  ```
  npm i eslint-plugin-import -D
  ```

  ```
  npm i eslint-plugin-react -D
  ```

  ```
  npm i eslint-plugin-react-hooks -D
  ```
  
  .eslintrc 파일 생성
  
  ```
  {
      "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {
        "browser": true,
        "node": true
      },
      "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
      ],
      "plugins": [
        "import",
        "react-hooks"
      ],
      "rules": {
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "no-console": "off"
      }
    }
  ```

---

- antd (중국산, css 프레임워크, 쓸만함)

  antd와 마찬가지로 Bootstrap, Material-UI 같은 것들을 사용하면 획일화된 UI를 사용하게 돼서 개성이 사라질 수 있기 때문에 고객을 위한 사이트를 만들 때는 많은 커스터마이징을 해서 쓰거나 사용하지 않는다. 하지만 어드민 페이지같은 것을 만들 때 효율적으로 쓰일 수 있다. 

  antd 설치와 같이 icon은 따로 설치해줘야 한다. 이미지는 용량이 크기 때문에 따로 분리하는 경우가 많다. 

- styled components (요즘 더 뜨는 것은 Emotion 이라는 것이 있다.)

  스타일을 가진 컴포넌트를 만들 수 있도록 도와주는 CSS-in-JS 라이브러리이다. 유동적인 스타일 Prop 을 가진 컴포넌트를 만들어서 사용할 수 있다. 스타일 상속을 가능케 한다. as Props를 이용하면 어떤 컴포넌트 태그 이름을 다른 이름으로 변경하여 사용할 수 있다. Mixin을 이용하여 중복되는 스타일 코드를 줄여줄 수 있다. createGlobalStyle 을 이용한 글로벌 스타일 적용이 가능하다. 

- ```
  npm i antd styled-components @ant-design/icons
  ```

- components/AppLayout.js

  ```javascript
  import React from 'react';
  import PropTypes from "prop-types";
  import Link from "next/link";
  import { Menu } from 'antd';
  
  const AppLayout = ({ children }) => {
  	return (            
          <div>
              <Menu mode="horizontal">
                  <Menu.Item>
                      <Link href="/"><a>홈</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/profile"><a>프로필</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/signup"><a>회원가입</a></Link>
                  </Menu.Item>
              </Menu>    
              {children}
          </div>
      )
  };
  
  AppLayout.propTypes = {
      children: PropTypes.node.isRequired,
  };
  
  export default AppLayout;
  ```

----

- _app.js와 Head

  어떤 CSS가 여러 페이지들에 공통적으로 적용되길 원하는 것이 있을 때 _app.js를 pages 안에 만들어 거기서 관리해준다. 

  

  pages/_app.js

  ```javascript
  import React from 'react';
  import PropTypes from 'prop-types';
  import 'antd/dist/antd.css'; // 모든 페이지들에 antd css를 입히기 위해
  import Head from 'next/head'; // body가 아닌 head도 조작하고 싶기 때문에
  
  const NodeBird = ({ Component }) => {
      return (
          <>
          <Head>
              <meta charSet="utf-8" />
              <title>NodeBird</title>
          </Head>
          <Component />
          </>
      )
  };
  
  NodeBird.PropTypes = {
      Component: PropTypes.elementType.isRequired,
  }
  
  export default NodeBird;
  ```

  pages/profile.js

  ```javascript
  ...
  import Head from 'next/head';
  
  const Profile = () => {
      return (
          <>
              <Head>
                  <title>내 프로필 | NodeBird</title>
              </Head>
              <AppLayout>
                  <div>내 프로필</div>
              </AppLayout>
          </>
      )
  };
  ...
  ```

  pages/signup.js

  ```javascript
  ...
  import Head from 'next/head';
  
  const Signup = () => {
      return (
          <>
              <Head>
                  <title>회원가입 | NodeBird</title>
              </Head>
              <AppLayout>
                  <div>회원가입</div>
              </AppLayout>
          </>
      )
  };
  ...
  ```

----

- 반응형 그리드 사용하기

  모바일 > 태블릿 > 데스크탑 순으로 점점 넓혀가며 짜야한다. 화면 짤 때 가로부터 먼저 나누고 그리고 나서 새로로 구역을 잘 나누는 게 좋다. ( xs, sm, md, lg, xl, xxl )

  

- 로그인 폼 만들기

  아직 서버가 없기 때문에 더미 데이터를 가지고 진행한다. 처음에만 힘겹게 따라 쓰며 해보고 나중에는 그냥 라이브러리를 써서 구축해라.

  
  
- components/Applayout.js

  ```javascript
import React, { useState } from 'react';
  import PropTypes from "prop-types";
  import Link from "next/link";
  import { Col, Input, Menu, Row } from 'antd';
  
  import UserProfile from '../components/UserProfile';
  import LoginForm from '../components/LoginForm';
  
  const AppLayout = ({ children }) => {
      const [isLoggedIn, setIsLoggedIn] = useState(false); // 가짜 데이터
  	return (            
          <div>
              <Menu mode="horizontal">
                  <Menu.Item>
                      <Link href="/"><a>홈</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/profile"><a>프로필</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/signup"><a>회원가입</a></Link>
                  </Menu.Item>
              </Menu>
  		   // 반응형 그리드 적용 구간
              <Row gutter={8}> // col들 사이에 간격을 주기 위함.
                  <Col xs={24} md={6}>
                      {isLoggedIn ? <UserProfile /> : <LoginForm />}
                  </Col>
                  <Col xs={24} md={12}>
                      {children}
                  </Col>
                  <Col xs={24} md={6}>
                      <a href="https://github.com/ckdgns3167" 
  					 // target을 _blank로 할 때 rel을 꼭 아래 처럼 써줘야 보안에 좋다고 한다. 써주자
  					 target="_blank" rel="noreferrer noopener" 
  			       >
                         Made by 창훈
                      </a>
                  </Col>
              </Row>    
          </div>
      )
  };
  
  AppLayout.propTypes = {
      children: PropTypes.node.isRequired,
  };
  
  export default AppLayout
  ```

- components/LoginForm.js

  ```javascript
  import React, { useState, useCallback } from 'react';
  import { Button, Form, Input } from 'antd';
  import Link from 'next/link';
  
  const LoginForm = () => {
      const [id, setId] = useState('');
      const [password, setPassword] = useState('');
  
      // 컴포넌트에 Props로 넘겨주는 함수는 useCallback을 써야한다. 그래야 최적화가 된다.
      const onChangeId = useCallback((e) => {
          setId(e.target.value);
      }, []);
  
      const onChangePassword = useCallback((e) => {
          setPassword(e.target.value);
      }, []);
  
      return (
          <Form>
              <div>
                  <label htmlFor="user-id">아이디</label>
                  <br />
                  <Input 
                      name="user-id" 
                      value={id} 
                      onChange={onChangeId} 
                      required 
                  />
              </div>
              <div>
                  <label htmlFor="user-password">비밀번호</label>
                  <br />
                  <Input 
                      name="user-password" 
                      type="password" 
                      value={password} 
                      onChange={onChangePassword} 
                      required 
                  />
              </div>
              <div>
                  <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                  <Link href="/signup"><a><Button>회원가입</Button></a></Link>
              </div>
          </Form>
      );
  };
  
  export default LoginForm;
  ```

-------

- 리렌더링 이해하기 **(중요★)**

  컴포넌트에 style 줄 때 {{ }} 로 감싸서 하며 안 된다. 즉, 객체로 style을 주면 안 된다. 리렌더링의 이해가 없고 귀찮기 때문에 이렇게 하기 쉽지만 하면 안 된다. 이유는 react는 매번 버츄얼 돔으로 검사를 하면서 어디가 달라졌나 찾다가 이전 버전이랑 객체가 다르네 하면서 그 부분이 바뀐 게 없는데도 리렌더링을 하게 되어 비효율적이다. 성능에 그리 예민한 게 아니라면 간단한 것은 인라인 스타일링을 해도 무방하다. 그래도 항상 styled-components를 사용하는 게 좋다. 근데 styled-components가 싫고 사용하지 않을 거라면 react로 부터 useMemo 라는 것을 import해서 사용하면 되는데, 이 useMemo와 useCallback의 차이점은 useCallback은 함수를 캐싱하는 것이고 useMemo는 값을 캐싱해주는 점에서 차이가 있다. 

  함수형 컴포넌트는 리렌더링 될 때 그 안에 있는 내용을 처음부터 끝까지 다시 실행된다. 하지만 그 안에 useCallback 같은 것은 이전 것과 같다고 판단하여 그냥 지나가고 return 안에서 달라진 게 있다면 달라진 부분만 다시 그리게 된다. 

  
  
- 더미 데이터로 로그인하기
  

  

  components/Applayout.js
  
  ```javascript
  import React, { useState } from 'react';
  import PropTypes from "prop-types";
  import Link from "next/link";
  import { Col, Input, Menu, Row } from 'antd';
  import styled from 'styled-components';
  
  import UserProfile from '../components/UserProfile';
  import LoginForm from '../components/LoginForm';
  
  // Input.Search에 style을 입힌 컴포넌트를 생성.
  const SearchInput = styled(Input.Search)`
      vertical-align: middle;
`;
  
  ```

const AppLayout = ({ children }) => {
      const [isLoggedIn, setIsLoggedIn] = useState(false); // 가짜 데이터
  	return (            
          <div>
              <Menu mode="horizontal">
                  <Menu.Item>
                      <Link href="/"><a>홈</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/profile"><a>프로필</a></Link>
                  </Menu.Item>
                  <Menu.Item>
                      {/* 전에 style에 객체로 넘겨줬던 것을 바꿔줌. */}
                      <SearchInput enterButton />
                  </Menu.Item>
                  <Menu.Item>
                      <Link href="/signup"><a>회원가입</a></Link>
                  </Menu.Item>
              </Menu>
              <Row gutter={8}>
                  <Col xs={24} md={6}>
                      {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
                  </Col>
                  <Col xs={24} md={12}>
                      {children}
                  </Col>
                  <Col xs={24} md={6}>
                      <a href="https://github.com/ckdgns3167" target="_blank" rel="noreferrer noopener">Made by 창훈</a>
                  </Col>
              </Row>    
          </div>
      )
  };

  AppLayout.propTypes = {
      children: PropTypes.node.isRequired,
  };

  export default AppLayout
  ```
  
  components/LoginForm.js
  
  ```javascript
  import React, { useState, useCallback, useMemo } from 'react';
  import { Button, Form, Input } from 'antd';
  import Link from 'next/link';
  import styled from 'styled-components';
  
  const ButtonWrapper = styled.div`
      // 이 영역은 css 적듯이...
      margin-top: 10px;
  `;
  
  const FormWrapper = styled(Form)`
      padding: 10px;
  `;
  
  const LoginForm = ({ setIsLoggedIn }) => {
      const [id, setId] = useState('');
      const [password, setPassword] = useState('');
  
      // useCallback은 함수를, useMemo는 값을 캐싱.
      // 컴포넌트에 Props로 넘겨주는 함수는 useCallback을 써야한다. 그래야 최적화가 된다.
    const onChangeId = useCallback((e) => {
          setId(e.target.value);
      }, []);
  
      const onChangePassword = useCallback((e) => {
          setPassword(e.target.value);
      }, []);
  
      // 리렌더링 최적화를 위한 useMemo를 사용하여 component에 style 주는 방법. 계속 같은 객체가 유지됨.
      // const style = useMemo(() => ({ marginTop: 10 }), []);
  
      // 
      const onSubmitForm = useCallback(() => {
          // e.preventDefault(); antd를 사용하지 않았을 때는 써줬었다. 
          console.log(id, password);
          setIsLoggedIn(true);
      }, [id, password]);
  
      return (
          // antd의 form의 onfinish에는 e.preventDefault();가 이미 적용되어 있다.
          <FormWrapper onFinish={onSubmitForm}>
              <div>
                  <label htmlFor="user-id">아이디</label>
                  <br />
                  <Input 
                      name="user-id" 
                      value={id} 
                      onChange={onChangeId} 
                      required 
                  />
              </div>
              <div>
                  <label htmlFor="user-password">비밀번호</label>
                  <br />
                  <Input 
                      name="user-password" 
                      type="password" 
                      value={password} 
                      onChange={onChangePassword} 
                      required 
                  />
              </div>
              {/* <ButtonWrapper style={style}> */}
              <ButtonWrapper>
                  <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                  <Link href="/signup"><a><Button>회원가입</Button></a></Link>
              </ButtonWrapper>
          </FormWrapper>
      );
  };
  
  export default LoginForm;
  ```

  components/UserProfile.js

  ```javascript
  import React, {useCallback} from 'react';
  import { Button, Card, Avatar } from 'antd';
  
  const UserProfile = ({ setIsLoggedIn }) => {
  
      const onLogOut = useCallback(() => {
          setIsLoggedIn(false);
      },[]);
      
  
      return (
          <Card
              actions={[
                  <div key="twit">짹짹<br />0</div>,
                  <div key="followings">팔로잉<br />0</div>,
                  <div key="followers">팔로워<br />0</div>
              ]}
          >
              <Card.Meta 
                  avatar={<Avatar>CH</Avatar>}
                  title="창훈"
              />
              <Button onClick={onLogOut}>로그아웃</Button>
          </Card>
      );
  }
  
  export default UserProfile;
  ```

---

- styled-components className 경고 메시지 해결

  next로 styled-components로 스타일 적용하고, 개발 서버를 띄워서 확인해보면 첫 페이지 로딩은 문제없이 잘 작동하고, 새로고침 이후 `Warning : Props 'className' did not match. Server : "블라블라" Client: :"블라블라"` 경고메세지가 출력되고, 화면 스타일이 사라져버린다.

  첫 페이지는 SSR로 작동하며 이후 CSR로 화면을 렌더링하게 되는데, 이때 서버에서 받은 해시+클래스명과 이후 클라이언트에서 작동하는 해시+클래스 명이 달라지면서 스타일을 불러올수 없는 문제가 발생한다.

  이때는 바벨 플러그인 `babel-plugin-styled-components`를 설치하고 바벨설정을 추가함으로 해결할 수 있다.
  이 플러그인은 서버와 클라이언트의 클래스명을 일치 시켜줌으로 문제를 해결한다.

  

  패키지 설치

  ```
  npm i babel-plugin-styled-components
  ```

  .babelrc 설정

  ```
  {
    "presets": ["next/babel"],
    "plugins": ["babel-plugin-styled-components"]
  }
  ```

  프로젝트 루트에 `.babelrc` 파일을 추가하고 위와 같이 작성한다. **nextjs에서 바벨 설정을 추가할때는 `next/bable` 프리셋을 항상 추가해야함을 잊지 말라**

  이후 서버를 다시 켜보면, 경고창은 사라지고, 스타일도 깨지지 않고 잘 나온다.

  추가옵션

  ```
  {
    "presets": ["next/babel"],
    "plugins": [
      [
        "babel-plugin-styled-components",
        { "fileName": true, "displayName": true, "pure": true }
      ]
    ]
  }
  ```

  바벨 플러그인 설정은 배열로 담아 `[0]`인덱스에는 **플러그인명**, `[1]`인덱스에는 **옵션**을 위치시킨다.

  - fileName: 코드가 포함된 파일명을 알려줌

  - displayName : 클래스명에 해당 스타일 정보 추가

  - pure : 사용하지 않은 속성 제거

> **옵션적용 전/후 클래스명 비교**
>
> - 전 : sc-17fsht8-0 cbfSeC
> - 후: Header__Container-sc-17fsht8-0 kZvURD
> - 개발모드는 자동 true 설정

---







