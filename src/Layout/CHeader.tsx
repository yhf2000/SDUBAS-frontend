import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button, Divider, Dropdown, Layout, Menu, MenuProps, message, Space} from 'antd';
import {DownOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {headerMenu} from "../router";
import {IState} from "../Type/base";
import {browserTest} from "../Utils/browserTest";
import UserAvatarByEmail from "../Component/User/UserAvatarByEmail";
import sdu_logo from "../Assert/img/logo.jpg"
import {Api} from "../API/api";

const {Header} = Layout;


const CHeader = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {isLogin, userInfo} = useSelector((state: IState) => state.UserReducer);

    const [selectedKey, setSelectedKey] = useState('0');
    const [userLoginState, setUserLoginState] = useState(isLogin);

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button icon={<UserOutlined/>} onClick={() => navigator("/c/user")} type={"ghost"}>用户概况</Button>
            )
        },
        {
            key: '2',
            label: (
                <Button icon={<LogoutOutlined/>}
                        onClick={() => Api.logout()
                            .then(() => {
                                dispatch({type: "userLogout"})
                                navigator('/c/home',{replace:true})
                            })
                            .catch(() => {
                            })
                        }
                        type={"ghost"}>
                    用户登出
                </Button>
            )
        }
    ]

    useEffect(() => {
        // 测试浏览器功能可用性
        try {
            browserTest()
        } catch (e) {
            navigator("/error/browser", {replace: true})
        }
    }, [navigator])

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
            navigator("/c/home");
            message.info("已退出登录").then();
        }

    }, [isLogin, userLoginState, navigator])

    return (
        <Header style={{
            position: 'fixed', zIndex: 1, width: '100%', display: "flex",
            justifyContent: "space-between", background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,.15)"
        }}>
            <div style={{flex: "125px 0 0", margin: "10px 16px 16px -26px"}} key={"logo"}>
                <img src={sdu_logo} style={{width: "125px"}} alt={"山东大学 logo"}/>
            </div>
            <div style={{minWidth: 0, flex: "auto"}}>
                <Menu
                    mode="horizontal"
                    theme="light"
                    selectedKeys={[selectedKey]}
                    items={headerMenu.map((r) => ({
                        key: r.id,
                        icon: r.icon,
                        label: <Link to={r.path}>{r.title}</Link>,
                    }))}
                />
            </div>
            <div style={{flex: "0"}} key={"operator"}>
                {isLogin ? (
                    <Dropdown
                        //     overlay={
                        //     <Menu>
                        //         <Menu.Item key="1" icon={<UserOutlined/>} onClick={() => navigator("/c/user")}>
                        //             用户概况
                        //         </Menu.Item>
                        //         <Menu.Item key="2" icon={<LogoutOutlined/>}
                        //                    onClick={() => Api.logout()
                        //                        .then(() => dispatch({type: "userLogout"}))
                        //                        .catch(()=>{})
                        //         }>
                        //             登出
                        //         </Menu.Item>
                        //     </Menu>
                        // }
                        menu={{items}}
                    >
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
                            navigator("/c/login?to=" + location.pathname)
                        }}>登录</Button>
                    </Space>
                )}
            </div>
        </Header>
    )


}

export default CHeader;
