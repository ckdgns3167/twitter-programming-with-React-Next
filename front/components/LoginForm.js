import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm;