import {ModalForm} from "@ant-design/pro-form";
import {message} from "antd";
import ItemUsername from "./Item/ItemUsername";
import ItemPassword from "./Item/ItemPassword";
import ItemEmail from "./Item/ItemEmail";
import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import getData from "../../../API/getData";
import {useNavigate} from "react-router-dom";
import {Api} from "../../../API/api";


const Register = (props: any) => {
    const [form] = useForm()
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("")
    const [pwd, setPwd] = useState<string>("")
    const [token,setToken] = useState<string>("");

    useEffect(() => {
        if (props.token !== undefined)
            form.setFieldsValue({username: props.username})
    }, [props, form])
    const handleUChange = (name: string) => {
        setUsername(name);
    }
    const handlePChange = (password: string) => {
        setPwd(password);
    }
    return (
        <ModalForm<any>
            title={"用户注册"}
            trigger={props.button}
            autoFocusFirstInput
            modalProps={{
                maskClosable: false,
                destroyOnClose: true,
                width: 500,
                okText: "提交"
            }}
            form={form}
            onFinish={(values) => {
                return Api.register({data:{token:token}}).then((res: any) => {
                    message.success('注册成功,请返回登录');
                    return true;
                }).catch((error: any) => {
                })
            }
            }
        >
            <ItemUsername ExistCheck={true} editable={props.token === undefined} onChange={handleUChange}/>
            <ItemPassword onChange={handlePChange}/>
            <ItemEmail
                needVerify={true}
                getEmail={() => {
                    return form.validateFields(["email"]).then((data: any) => {
                        return Promise.resolve(data.email)
                    }).catch(() => {
                    })
                }}
                username={username}
                pwd={pwd}
                setToken={setToken}
                type={0}
            />
        </ModalForm>
    )
}

export default Register
