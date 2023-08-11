import {useSelector} from "react-redux";
import {IState} from "../Type/base";
import {isValueEmpty} from "../Utils/isValueEmpty";
import {avatarServerUrl} from "../config";
import md5 from "js-md5";
import {useEffect, useState} from "react";
import {IUserInfo} from "../Type/user";
import {Button, Form, Input, message, Space} from "antd";
import {ModalForm} from "@ant-design/pro-form";
import ItemPassword from "../Component/User/Form/Item/ItemPassword";
import {useForm} from "antd/es/form/Form";
import {Api} from "../API/api";
import getData from "../API/getData";
import {useDispatch} from "../Redux/Store";


const UserInfo = () => {
    const [form] = useForm();
    const userInfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = (values: IUserInfo) => {
        dispatch({type: 'setUserInfo', data: values});
        setEditMode(false);
    };
    return (
        <div>
            <h1>User Information</h1>
            <Form
                onFinish={handleSave}
                initialValues={userInfo}
                labelCol={{span: 4}}
                wrapperCol={{span: 8}}
            >
                <Form.Item label="Name" name="username">
                    {editMode ? <Input/> : <span>{userInfo?.username}</span>}
                </Form.Item>
                <Form.Item label="Email" name="email">
                    {editMode ? <Input/> : <span>{userInfo?.email}</span>}
                </Form.Item>
                <Form.Item label="StudnetId" name='studentId'>
                    <span>uid</span>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 8}}>
                    {editMode ? (
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button onClick={toggleEditMode}>Cancel</Button>
                        </Space>
                    ) : (
                        <Button type="primary" onClick={() => toggleEditMode()}>
                            Edit
                        </Button>
                    )}
                </Form.Item>
            </Form>
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
                    return Api.updataPwd(values).then((res: any) => {
                        message.success('修改成功,请重新登录');
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
                    }).catch((error: any) => {
                        message.error(error);
                    })
                }}
            >
                <Form.Item
                    name={'oldPwd'}
                    label={'oldPassword'}
                    rules={[
                        {
                            required: true,
                            message: 'oldPasswordEmpty'
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                return Api.checkPwd({password: value}).then((res: any) => {
                                    if (res === true) return Promise.resolve();
                                    else return Promise.reject('旧密码错误');
                                }).catch((error: any) => {
                                    message.error(error);
                                })
                            }
                        })
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <ItemPassword/>
            </ModalForm>
        </div>
    );
}

export default UserInfo;