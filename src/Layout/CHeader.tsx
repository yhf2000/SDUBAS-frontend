import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button, Divider, Dropdown, Layout, Menu, message, Space} from 'antd';
import {DownOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {headerMenu} from "../router";
import {IState} from "../Type/base";
import {browserTest} from "../Utils/browserTest";
import UserAvatarByEmail from "../Component/User/UserAvatarByEmail";

const {Header} = Layout;

const CHeader = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {isLogin, userInfo} = useSelector((state: IState) => state.UserReducer);

    const [selectedKey, setSelectedKey] = useState('0');
    const [userLoginState, setUserLoginState] = useState(isLogin);

    useEffect(() => {
        // 测试浏览器功能可用性
        try {
            browserTest()
        } catch (e) {
            navigator("/error/browser", {replace: true})
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < headerMenu.length; i++) {
            if (location.pathname === headerMenu[i].path && selectedKey !== headerMenu[i].id.toString()) {
                setSelectedKey(headerMenu[i].id.toString());
            }
        }
    }, [location, selectedKey]);


    useEffect(() => {
        if (!isLogin && userLoginState) {
            setUserLoginState(false)
            navigator("/home");
            message.info("已退出登录").then();
        }

    }, [isLogin, userLoginState])

    return (
        <Header style={{
            position: 'fixed', zIndex: 1, width: '100%', display: "flex",
            justifyContent: "space-between", background: "#fff"
        }}>
            <div style={{flex: "125px 0 0", margin: "-5px 16px 16px -10px", height: "32px"}} key={"logo"}>
                <img src={undefined} style={{width: "125px", height: '30px'}} alt={"logo"}/>
            </div>
            <div style={{minWidth: 0, flex: "auto"}}>
                <Menu
                    mode="horizontal"
                    theme={"light"}
                    selectedKeys={[selectedKey]}
                >
                    {headerMenu.map((r) => {
                        return (
                            <Menu.Item key={r.id} icon={r.icon}>
                                <Link to={r.path}>{r.title}</Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </div>
            <div style={{flex: "0"}} key={"operator"}>
                {isLogin ? (
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="1" icon={<UserOutlined/>} onClick={() => navigator("/user")}>
                                用户概况
                            </Menu.Item>
                            <Menu.Item key="2" icon={<LogoutOutlined/>} onClick={() => dispatch({type: "userLogout"})}>
                                登出
                            </Menu.Item>
                        </Menu>
                    }>
                        <Button type="text" size={"large"}>
                            <Space>
                                <div style={{marginTop: -10}}>
                                    <UserAvatarByEmail email={userInfo?.email}/>
                                    <Divider type="vertical"/>
                                    {userInfo?.username}
                                </div>
                                <DownOutlined style={{fontSize: 10, marginBottom: 20}}/>
                            </Space>
                        </Button>
                    </Dropdown>
                ) : (
                    <Space>
                        <Button type={"text"} onClick={() => {
                            navigator("/login?to=" + location.pathname)
                        }}>登录 / 注册</Button>
                    </Space>
                )}
            </div>
        </Header>
    )


}

export default CHeader;
