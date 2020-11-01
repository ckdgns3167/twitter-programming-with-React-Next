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