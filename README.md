# Next로 트위터 따라하기

------

> **강의**
>
> - [리뉴얼] React로 NodeBird SNS 만들기 (인프런, 유료, 조현영)
>
> **목표**
>
> - 자바스크립트(프론트: React(Next), 백: Node.js)를 이용한 SNS 풀스택 프로그래밍과 AWS 배포 방법까지 함께 알려주는 인터넷 강의를 보고 따라해본다.

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
      const [id, setId] = useState('')
      const onChangeId = useCallback((e) => {
          setId(e.target.value);
      }, []);
      
      const [password, setPassword] = useState('')
      const onChangePassword = useCallback((e) => {
          setPassword(e.target.value);
      }, []);
  
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
      const [id, setId] = useState('')
      const onChangeId = useCallback((e) => {
          setId(e.target.value);
      }, []);
      
      const [password, setPassword] = useState('')
      const onChangePassword = useCallback((e) => {
          setPassword(e.target.value);
      }, []);
  
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

프로필 페이지 만들기

- 컴포넌트 쪼개기

  화면을 설계할 때 필요할 거 같은 컴포넌트를 미리 구축시켜놓자(아직 구현되어있지 않지만). 필요하면 더미데이터도 간단하게 만들어서 테스트.  예전에는 컴포넌트를 쪼개는 것이 마냥 좋지는 않았다. 개발자 입장에서는 당연히 쪼개면 관리하기 쉽고 보기에도 좋다. 하지만 부모에서 자식으로 데이터를 props로 넘겨줘야 하는 부담이 있었다. 부모에서 먼 자식으로 데이터가 갈 때 부담이 컸다. 이제는 hooks를 통해 해결이 되어 부담이 크게 줄었다. 적극적으로 쪼개는 것이 권장된다.

  

  pages/profile.js

  ```javascript
  import React from 'react';
  
  import NicknameEditForm from '../components/NicknameEditForm';
  import AppLayout from '../components/AppLayout';
  import FollowList from '../components/FollowList';
  
  const Profile = () => {
    const followerList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];
    const followingList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];
  
    return (
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followingList}
        />
        <FollowList
          header="팔로워 목록"
          data={followerList}
        />
      </AppLayout>
    );
  };
  
  export default Profile;
  ```

  components/NicknameEditForm.js

  ```javascript
  import { Form, Input } from 'antd';
  import React from 'react';
  
  const NicknameEditForm = () => {
    return (
      <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
        <Input.Search addonBefore="닉네임" enterButton="수정" />
      </Form>
    );
  };
  
  export default NicknameEditForm;
  ```

  components/FollowList.js

  ```javascript
  import { Button, Card, List } from 'antd';
  import { StopOutlined } from '@ant-design/icons'; // 아이콘은 따로 관리된다. 최적화 관련. 용량이 크기때문에. 
  import React from 'react';
  import PropTypes from 'prop-types';
  
  const FollowList = ({ header, data }) => (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button>더 보기</Button></div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
  
  FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };
  
  export default FollowList;
  ```

----

회원가입 페이지 만들기 (커스텀 훅)

- 커스텀 훅을 만드는 이유?

  반복되는 코드를 간략하게 줄일 수 있다. 그냥 훅을 쓸 때에는 컴포넌트 내 return () 위쪽에 선언해서 사용할 수 있었는데, 커스텀 훅은 밖에 따로 폴더를 생성하여 그 안에서 관리하며 사용하고 싶은 곳에서 불러와 사용할 수 있다. 

  

  hooks/useInput.js

  ```javascript
  import { useState, useCallback } from 'react';
  
  export default (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };
  ```

  

  로그인 폼에 적용시키기

  ```javascript
  import useInput from '../hooks/useInput';
  ...
  const LoginForm = () => {
      // 변경된 곳
      const [id, setId] = useState('');
      const [password, setPassword] = useState('');
      ...
      return (
          ...
      );
  };
  export default LoginForm;
  ```

  

  회원가입 폼에 적용시키기

  ```javascript
  import React, { useState, useCallback } from 'react';
  import { Form, Input, Checkbox, Button } from 'antd';
  import PropTypes from 'prop-types';
  
  import AppLayout from '../components/AppLayout';
  import useInput from '../hooks/useInput';
  
  const TextInput = ({ value }) => {
    return (
      <div>{value}</div>
    )
  };
  
  TextInput.propTypes = {
    value: PropTypes.string,
  };
  
  const Signup = () => {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
  
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
  
    const onSubmit = useCallback(() => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      console.log(id, nickname, password);
    }, [password, passwordCheck, term]);
  
    const onChangePasswordCheck = useCallback((e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    }, [password]);
  
    const onChangeTerm = useCallback((e) => {
      setTermError(false);
      setTerm(e.target.checked);
    }, []);
  
    return (
      <AppLayout>
        <Form onFinish={onSubmit} style={{ padding: 10 }}>
          <TextInput value="135135" />
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
            {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    );
  };
  
  export default Signup;
  ```

---

**Redux**

로그인 사용자 정보 또는 로그인 여부 등 **여러 컴포넌트들에서 공통적으로 쓰이는 데이터**들이 있는데, 지금까지는 컴포넌트가 분리되어있는 데로 데이터들이 따로 흩어져있어 부모 컴포넌트로 부터 자식에게로 전달전달하여 사용해야만 했다.

매번 수동적으로 부모에서 자식으로 데이터를 내려 보내주는 과정은 매우 귀찮은 과정이기 때문에 이러한 수고를 확 덜어주는 **Redux**, **Mobx**, **Context API **등이 있다. 

규모가 어느정도 되는 서비스라면 전역 상태를 관리할 중앙 저장소는 필수이다. 앱이 별로 크지 않다면, `Context API`를 사용하는 것도 괜찮다.

앱이 크다면 보통은 `Redux`와 `Mobx`를 고르게 되는데, mobx는 react 생태계를 이해하고 자유자재로 잘 사용할줄 알면 mobx를 선택하는 것이 좋은데, 이유는 코드량이 매우 적지만 에러 트래킹에 있어 어려움이 있기 때문이다. 반면,  초보에게 redux가 좋은데, 이유는 에러 추적이 잘 되어 코딩에 도움을 준다(안정성이 높다). 하지만 코드량이 매우 많아 생산성에 조금 단점이 있다. 

또 고려해야 할 사항이 있다. 일반적으로 앱은 전역 상태 관리 기술과 비동기 정보 요청을 동시에 필요로 한다. 여기서 비동기 요청은  `데이터 요청`, `데이터 반환 성공`, `데이터 반환 실패`로 처리해주는 과정을 갖는데, 만약 Context API를 사용하면 처리하는 코드를 직접 작성해주어야 하는 어려움이 있다. 또 이렇게 데이터를 요청하여 처리하는 코드를 작성하게 되면 보통 컴포넌트 단에 `useEffect`를 이용하여 작성하게 되는데, 컴포넌트는 최대한 화면 구성과 관련한 코드로 작성되는 것이 권장된다.

![img](https://media.vlpt.us/images/jakeseo_me/post/7e7a9b07-b928-41fb-95c5-ce35f5443d22/Screen%20Shot%202020-11-11%20at%202.27.18%20AM.png) redux와 mobx의 다운로드 비교 지표이다.

next에 redux를 붙일 때 상당히 복잡한 과정을 거쳐야하는데, 그것을 간편하게 해주는 라이브러리가 존재한다. 바로 `next redux wrapper`이다. 

### next-redux-wrapper???

정적 사이트 생성기나 서버 사이드 렌더링이 포함된다면, 리덕스가 연결된 컴포넌트들을 렌더링하기 위해 서버에 또 다른 스토어 인스턴스가 필요하게 되면서 많은 것들이 복잡해진다.

게다가, 페이지의 getInitialProps 중에도 리덕스 스토어에 접근이 간혹 필요할 것이다.

next-redux-wrapper는 이럴 때 편하다: 자동으로 스토어 인스턴스들을 만들어주며 모든 스토어 인스턴스들이 같은 상태인 것을 보증한다.

또, 개개의 페이지 수준에서 getStaticProps 또는 getServerSideProps와 함께 App.getInitialProps 같은 것을 사용하는 복잡한 일을 제대로 처리할 수 있게 해준다.

스토어를 사용하기 위해 어떤 Next.js 라이프사이클 메소드를 사용하길 원하던 간에 라이브러리는 균일한 인터페이스를 제공한다.

시작

- ```
  npm i redux
  npm i react-redux
  npm i next-redux-wrapper
  ```

- store/configureStore.js 

  store를 설정하는 configure js 파일이다.

  ```javascript
  import {createWrapper} from 'next-redux-wrapper';
  
  const configureStore = () => {
  
  };
  
  // 두 번째 파라미터는 option 객체인데, 디버그할 때 '개발'이라면 redux에 관해 좀 더 설명이 자세히.
  const wrapper = createWrapper(configureStore, {
      debug: process.env.NODE_ENV === 'development',
  });
  
  export default wrapper;
  ```

- 기존 redux를 사용했을 때는 <Provider store={store}> ... </Provider> 로 page를 감싸줬었는데, next에서는 알아서 감싸준다. 

  pages/_app.js

  ```javascript
  import React from 'react';
  import PropTypes from 'prop-types';
  import 'antd/dist/antd.css';
  import Head from 'next/head';
  // 변경된 곳
  import wrapper from '../store/configureStore';
  
  const NodeBird = ({ Component }) => {
      return (
          <>//그냥 redux를 쓸 때는 Provider로 감쌌었는데 그럴 필요 X
          <Head>
              <meta charSet="utf-8" />
              <title>NodeBird</title>
          </Head>
          <Component />
          </>
      )
  };
  
  NodeBird.propTypes = {
      Component: PropTypes.elementType.isRequired,
  }
  
  // 변경된 곳: Higher-Order Component를 구성하듯 wrapper.withRedux를 이용해 감싸준다.
  export default wrapper.withRedux(NodeBird);
  ```

---

**Redux의 원리와 불변성?**

우선 redux는 reduce에서 이름을 따온 것이다. 중앙 데이터 저장소에 있는 데이터를 읽기를 제외한 `추가/수정/삭제` 할 수 있게 각 작업에 맞는 action을 각각 생성한다. 그 다음 dispatch로 액션을 저장소에 적용시켜 상태를 바꾼다. 또 알아야할 용어로 reducer가 있는데,  dispatch 한다고해서 next가 알아서 마법처럼 자동으로 상태를 바꿔주는 것이 아니라 그전에 reducer라는 것을 만들어 그 안에 정해진 규칙에 의해 저장돼있던 데이터의 상태가 바뀌게 되는 것이다. 데이터 저장소에 필요한 작업이 있을 때마다 액션과 규칙을 적어줘야 하기 때문에 코드량이 많아진다. 그렇지만 좋은 이유로 액션 하나하나가 redux에 기록이 되기 때문에 action들만 쫙 놓고 보면 데이터를 어떻게 바꿔왔는지 내역들이 다 추적이된다. 따라서 버그 잡을 때 매우 편한다. 

![K-001](https://user-images.githubusercontent.com/52457180/99179679-4ce12080-2763-11eb-93df-be3208682931.png)

switch 문에서 return 할 때 { }로 감싸서 하는 이유는 **불변성**이라는 자바스크립트의 성질과 관련이 있다. `{} === {} 는 false를 리턴`한다. 하지만 `const a = {}; const b = a; a === b 는 true를 리턴`하는데 차이는 새로 만들어진 객체의 비교, 같은 것을 가리키는 참조의 비교이다.  즉 reducer에서 return 될 때 {}로 새 객체를 리턴함으로써 화면에서 바꾸고 싶은 것만 바꾼다. 또 변경내역들이 history에 남아 추적이 가능해진다. 

> ```js
> 중요(★)
> 
> - 자바스크립트에서는 위와 같은 특성이 있는데, 객체를 새로 만들 때 새로운 주소를 부여한다.
> - 상태관리에서 화면이 업데이트 되는 기준은 기존 객체가 다른 객체로 업데이트 되었을 때이다. 
> - 다른 객체를 만들기 위해 Reducer에서 기존 객체를 수정하지 않고 매번 새로운 객체를 반환한다.
> - 또한 Redux의 다른 목적 중에 History 관리의 측면이 있는데, 주소가 다른 각각의 객체를 따로 기억하면 History를 알 수 있다.
> - 기존 객체를 수정해서는 History를 보관하기 어렵다. 이러한 특성을 이용하기 위해서 또 불변성을 지킨다.
> - ...state를 이용하는 이유는 안바뀌는 것들에 대해서는 참조관계를 유지하여 메모리를 아끼기 위해서이다.
> - 오브젝트 내부의 오브젝트 등이 있을 때는 참조관계를 그대로 유지하기 때문에 효율적이다.
> 
> ```

액션 발생시킨 것을 기록으로 확인하고 싶으면 미들웨어를 만들어야한다. 브라우저 개발자 도구와 연동하기 위해서 npm i redux-devtools-extension 을 설치해주자. `Redux Devtool`은 `타임머신`이라는 기능을 제공하는데 어떤 액션이 행해지기 전과 후로 마음대로 옮겨다닐 수 있다.

**`Redux`의 `개발모드`에서는 History를 전부 저장하지만, `배포모드`에서는 History를 계속 정리한다. 그래서 메모리를 훨씬 적게 사용한다.**

-----

리덕스 실제 구현하기

1. reducers 디렉터리와 index.js 만들기

   reducers/index.js

   ```javascript
   const rootReducer = () => {};
   
   export default rootReducer;
   ```

   다른 컴포넌트를 구성하는 것과 같은 기본 골격을 가지며, 내용은 switch를 이용하여 action의 타입별로 상태를 실질적으로 변화시켜주는 코드로 구성될 것이다.

   ```javascript
   const rootReducer = (state: object, action: { type: string; data: any }) => {
       switch (action:type) {
           case 'ACTION의 이름':
               return {
               	...state,  
               };
               
               break;
       }
   }
   export default rootReducer;
   ```

   rootReducer에 state와 action이 들어오며, action은 state와 data로 이루어져 있다.

2. configureStore에 reducer 추가하기

   store/configureStore.js

   ```javascript
   import { createWrapper } from 'next-redux-wrapper';
   import { createStore} from 'react-redux';
   import reducer from '../reducers';
   
   const configureStore = () => {
       // 변경된 곳: 우리가 만든 reducer를 createStore로 감싸 반환.
       // store는 state와 reducer를 포함하는 것
       const store = createStore(reducer);
       return store;
   };
   // 두 번째 파라미터는 option 객체인데, 디버그할 때 '개발'이라면 redux에 관해 좀 더 설명이 자세히.
   const wrapper = createWrapper(configureStore, {
       debug: process.env.NODE_ENV === 'development',
   });
   
   export default wrapper;
   ```

3. rootReducer에 initialState 넣어주기

   ```javascript
   const initialState = {
       name: 'jch',
       age: 28,
       password: 'babo',
   }
   
   // 이전 상태와 action을 받아 다음 상태를 만들어 리턴.
   const rootReducer = (
       state: { name: string, age: number; password: string; } = initialState, 
       action: { type: string; data: any }
   ) => {
       switch (action:type) {
           case 'ACTION의 이름':
               return {
               	...state,  
               };
               
               break;
           // default 케이스는 무조건 있어야 오류를 피할 수 있다. 
           default:
               return state;
       }
   }
   export default rootReducer;
   ```

4. Action 구상하기

   사용자의 닉네임을 예를들어 jjj로 변경하는 action을 단순하게 만든다면, 

   ```javascript
   // 기본 액션 예제
   const actionExample = {
       type: 'CHANGE_NINKNAME',
       data: 'jjj',
   };
   ```

   위와 같을 것이다. 하지만 사용자 닉네임을 모두 jjj로 바꾸고 싶진 않을 것이다. 따라서 유연한 액션을 만들어야 한다. 그걸 위해 `Action creator`라는 것이 있는데, 거창한 것은 아니고 사용자에게 데이터만 받아서 새로운 Action을 return 해주는 것이다. 

   ```javascript
   const actionCreatorExample = (data) => {
       return {
           type: 'CHANGE_NICKNAME',
           data,
       };
   };
   
   // 사용
   actionCreatorExample('jjj');
   actionCreatorExample('정창훈');
   ```

5. store에서 디스패치하기

   ```javascript
   store.dispatch(actionCreator(data));
   ```

   위와 같이, store의 dispatch 함수에 actionCreator를 넣게되면, 원하는 데이터를 이용해 원하는 action을 유연하게 dispatch 하여 전역 상태를 관리할 수 있다.

6. Redux 상태를 Component에서 불러오기

   가장 기본적으로 redux에 로그인 상태를 보관하여 이용하고 싶을 때 이용하면 좋을 것이다. 보관하는 방법을 배웠으니 보관된 것을 꺼내어 사용할 때는 어떻게 할까?

   ```javascript
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
   ```

   바로 `useSelector`를 활용하여 값을 불러올 수 있다. `state`에서 `.`을 이용하여 원하는 값을 부르고, 컴포넌트 내부 변수에 저장해주면 된다.

7. dispatch를 이용하여 redux 값 바꿔보기

   이제 컴포넌트 내부 변수를 set하지말고 dispatch를 써서 redux 전역 상태를 바꾸는 방식으로 변경해보자.

   ```javascript
   //dispatch 함수 생성
   const dispatch = useDispatch();
   
   const onSubmitForm = useCallback((e) => {
       dispatch(loginAction({ id, password }));
   },
   	[id, password],                              
   );
   ```

   위와 같이 `react-redux`에 있는 `useDispatch`를 이용하여 `dispatch` 함수를 하나 만들고, 그 안에 `Action`을 넣는 방식으로 하면 된다.

----

**미들웨어와 리덕스 데브툴즈**

