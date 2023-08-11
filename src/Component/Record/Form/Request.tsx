import {ModalForm} from "@ant-design/pro-form";
import {Form, Input, message, Tabs} from "antd";
import ItemCaptcha from "../../User/Form/Item/ItemCaptcha";
import React, {useState} from "react";
import {withTranslation} from "react-i18next";
import ItemUsername from "../../User/Form/Item/ItemUsername";
import ItemEmail from "../../User/Form/Item/ItemEmail";
import {Api} from "../../../API/api";
import TabPane from "antd/es/tabs/TabPane";
import ItemNumber from "./Item/ItemNumber";
import {useDispatch} from "../../../Redux/Store";
import getData from "../../../API/getData";

const RequestResource = (props: any) => {

    const [active, setActive] = useState<string>("1")
    const dispatch = useDispatch();

    return (
        <ModalForm<any>
            title="申请资源"
            trigger={
                props.button
            }
            autoFocusFirstInput
            modalProps={{
                maskClosable: false,
                destroyOnClose: true,
                width: 500,
                okText: "提交"
            }}
            // onFinish={async (values: any) => {
            //     let data: any = {
            //         captchaId: imgId,
            //         captcha: values.captcha
            //     }
            //     if (active === "1") data.username = values.username
            //     if (active === "2") data.email = values.email
            //     return Api.forgetPassword(data).then(() => {
            //         message.success('修改密码的链接已发送至您的邮箱');
            //         return true
            //     })
            // }}
            onFinish={async (value:any)=>{
                dispatch(getData(
                    'applyResource',
                    {rId:props.rId,data:value},
                    (res:any)=>{
                        message.success('提交成功');
                        return Promise.resolve(res);
                    },
                    ()=>{
                        message.error('提交失败')
                    }
                ))
            }}
        >
            <Form.Item
                label="姓名"
                name="name"
                rules={[{required: true, message: "请输入您的姓名"}]}
            >
                <Input placeholder="请输入您的姓名"/>
            </Form.Item>
            <Form.Item
                label="电子邮件"
                name="email"
                rules={[
                    {required: true, message: "请输入您的电子邮件"},
                    {type: "email", message: "请输入有效的电子邮件地址"},
                ]}
            >
                <Input placeholder="请输入您的电子邮件"/>
            </Form.Item>
            <Form.Item
                label="简介"
                name="description"
                rules={[{required: true, message: "请输入简介"}]}
            >
                <Input.TextArea placeholder="请输入简介"/>
            </Form.Item>
        </ModalForm>
    )
}

export default RequestResource;