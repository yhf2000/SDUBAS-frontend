import React, {Dispatch, useRef, useState} from "react";
import {Button, Card, Space, Tabs} from "antd";
import {LoginForm, ProFormInstance, ProFormText} from "@ant-design/pro-form";
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import userLoginTodo from "./userLoginTodo";
import Logo from "../../Assert/img/blocklogo.png"
import ForgetPass from "./Form/ForgetPass";
import {useDispatch} from "../../Redux/Store";
import UserLoginTodo from "./userLoginTodo";
import {loginInfo} from "../../Type/types";
import getData from "../../API/getData";
import UserLoginCheck from "./UserLoginCheck";
import Register from "./Form/Register";

type LoginType = 'SDUCAS' | 'account';


const Login = (props: any) => {

    const formRef = useRef<ProFormInstance>()
    const [loginType, setLoginType] = useState<LoginType>("account")
    const dispatch = useDispatch();
    const login = (data: loginInfo) => {
        dispatch(getData(
            "login",
            {data: data},
            (r: any) => {
                return <UserLoginCheck jump={false}/>
            },
            (error: any) => {

            }
        ))
    }
    return (
        <Card
            style={{width: "450px", textAlign: "center", margin: "0 auto"}}>
            <LoginForm
                formRef={formRef}
                title="用户登录"
                subTitle="山东大学区块链学习系统"
                actions={
                    <></>
                }
                submitter={{
                    resetButtonProps: false,
                    render: (prop: any, def: any) => {
                        if (loginType !== 'SDUCAS')
                            return <Button type={"primary"} block onClick={() => {
                                formRef.current?.validateFieldsReturnFormatValue?.()?.then((value: any) => {
                                    if (value.username && value.password)
                                        login(value);
                                }).catch((value) => {
                                    let sf = []
                                    value.username && sf.push(
                                        {
                                            name: 'username',
                                            errors: ['用户名不能为空'],
                                        },
                                    )
                                    value.password && sf.push(
                                        {
                                            name: 'password',
                                            errors: ['密码不能为空'],
                                        },
                                    )
                                    formRef.current?.setFields(sf);
                                })
                            }
                            }> Login </Button>
                    },
                }}
            >
                <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                      items={[
                          {label: '账号密码登录', key: 'account'},
                      ]}
                >
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                                onPressEnter: () => {
                                    formRef.current?.validateFieldsReturnFormatValue?.()?.then((value: any) => {
                                        if (value)
                                            login(value);
                                    }).catch(() => {
                                        formRef.current?.setFields(
                                            [
                                                {
                                                    name: 'username',
                                                    errors: ['用户名不能为空'],
                                                },
                                            ]
                                        )
                                    })
                                }
                            }}
                            placeholder={'请输入用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                                onPressEnter: () => {
                                    formRef.current?.validateFieldsReturnFormatValue?.()?.then((value: any) => {
                                        login(value);
                                    }).catch(() => {
                                        formRef.current?.setFields(
                                            [
                                                {
                                                    name: 'password',
                                                    errors: ['密码不能为空'],
                                                },
                                            ]
                                        )
                                    })
                                }
                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {
                    loginType === 'account' && (
                        <div style={{
                            textAlign: "right", marginBottom: 10
                        }}>
                            <Space size={3}>
                                <Register button={<Button type={"link"} size={"small"}>注册</Button>}/>
                                <ForgetPass button={<Button type={"link"} size={"small"}>忘记密码</Button>}/>
                            </Space>
                        </div>
                    )
                }
            </LoginForm>
        </Card>
    )
}

export default Login;
