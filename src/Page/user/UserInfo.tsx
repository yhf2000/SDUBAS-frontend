import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import React, {useEffect, useState} from "react";
import {IUserInfo} from "../../Type/user";
import {Button, Form, Input, message, Space} from "antd";
import {ModalForm} from "@ant-design/pro-form";
import ItemPassword from "../../Component/User/Form/Item/ItemPassword";
import {useForm} from "antd/es/form/Form";
import {Api} from "../../API/api";
import getData from "../../API/getData";
import {useDispatch} from "../../Redux/Store";
import '../../Config/CSS/UserInfo.css'
import EditableInput from "../../Component/User/EditableInput";
import ItemEmail from "../../Component/User/Form/Item/ItemEmail";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
// import BindForm from "../../Component/User/Form/BindForm";
import {useNavigate} from "react-router-dom";


const UserInfo = () => {
    const [form] = useForm();
    const userPro = useSelector((state: IState) => state.UserReducer.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log('userPro',userPro)
    return (
        <div className="user-info-container">
            <div className="user-info-header">
                <h1 className="user-info-title">用户信息</h1>
                <ModalForm<any>
                    title={'修改密码'}
                    autoFocusFirstInput
                    trigger={<Button type={'link'}>修改密码</Button>}
                    modalProps={{
                        maskClosable: false,
                        destroyOnClose: true,
                        width: 500,
                        okText: "提交"
                    }}
                    form={form}
                    onFinish={(values) => {
                        return Api.updatePwd({data:values}).then((res: any) => {
                            dispatch(getData(
                                'logout',
                                {},
                                () => {
                                    dispatch({type: 'userLogout'});
                                    dispatch({type: 'clearRedux'});
                                },
                                (error: any) => {
                                    message.error(error);
                                }
                            ))
                            message.success('修改成功,请重新登录');
                            navigate('/c/login',{replace:true});
                        }).catch((error: any) => {

                        })
                    }}
                >
                    {/*<Form.Item*/}
                    {/*    name={'old_password'}*/}
                    {/*    label={'旧密码'}*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: true,*/}
                    {/*            message: 'oldPasswordEmpty'*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Input.Password/>*/}
                    {/*</Form.Item>*/}
                    <ItemPassword oldpass={true} />
                    <ItemPassword newpass={true}/>
                </ModalForm>
            </div>
            <Space
                direction={'vertical'}
                size={'large'}
            >
                <EditableInput
                    label={'用户名'}
                    onClick={async (data: any) => {
                        return Api.updateUsername({data: {username: data}});
                    }}
                    defaultValue={userPro?.username}
                />
                <EditableInput
                    label={'邮箱'}
                    editable={false}
                    defaultValue={userPro?.email}
                    addonAfter={
                        <ModalForm
                            title={"修改邮箱"}
                            trigger={<Button type={'link'}>修改</Button>}
                            autoFocusFirstInput
                            modalProps={{
                                maskClosable: false,
                                destroyOnClose: true,
                                width: 500,
                                okText: "提交"
                            }}
                            form={form}
                            onFinish={(data: any) => {
                                return Api.updateEmail({data: data}).then((res: any) => {
                                    message.success('绑定成功');
                                    return true;
                                }).catch((error: any) => {
                                })
                            }
                            }
                        >
                            <ItemEmail
                                name={'token_s6'}
                                needVerify={true}
                                getEmail={() => {
                                    return form.validateFields(["email"]).then((data: any) => {
                                        return Promise.resolve(data.email)
                                    }).catch(() => {
                                    })
                                }}
                                type={1}
                            />
                        </ModalForm>
                    }
                />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{minWidth: "100px"}}>个人信息绑定:</div>
                    {/*<div style={{width: '400px', flex: 1}}>*/}
                    {/*    {2===2*/}
                    {/*        ? (<>已绑定</>)*/}
                    {/*        : (<ModalFormUseForm*/}
                    {/*                title={'绑定个人信息'}*/}
                    {/*                subForm={[*/}
                    {/*                    {*/}
                    {/*                        component: BindForm,*/}
                    {/*                        label: ''*/}
                    {/*                    }*/}
                    {/*                ]}*/}
                    {/*                type={'create'}*/}
                    {/*                btnName={'点击绑定'}*/}
                    {/*                dataSubmitter={async (data: any) => {*/}
                    {/*                    data.enrollment_dt = data.enrollment_dt.format("YYYY-MM-DD")*/}
                    {/*                    data.graduation_dt = data.graduation_dt.format("YYYY-MM-DD")*/}
                    {/*                    data.gender = data.gender.toString();*/}
                    {/*                    // console.log('bind',data);*/}
                    {/*                    return Api.bind({data: data});*/}
                    {/*                }}*/}
                    {/*                afterSubmit={(r:any) => {*/}
                    {/*                    dispatch(getData(*/}
                    {/*                        "getProfile",*/}
                    {/*                        {},*/}
                    {/*                        (res: any) => {*/}
                    {/*                            // console.log(res);*/}
                    {/*                            dispatch({type: "setUserInfo", data: res});*/}
                    {/*                        },*/}
                    {/*                        () => {*/}
                    {/*                        }*/}
                    {/*                    ))*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
            </Space>
        </div>
    );
}

export default UserInfo;