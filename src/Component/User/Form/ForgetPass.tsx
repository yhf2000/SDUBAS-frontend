import {ModalForm} from "@ant-design/pro-form";
import {Form, message, Tabs} from "antd";
import ItemCaptcha from "./Item/ItemCaptcha";
import React, {useState} from "react";
import {withTranslation} from "react-i18next";
import ItemUsername from "./Item/ItemUsername";
import ItemEmail from "./Item/ItemEmail";
import {Api} from "../../../API/api";
import TabPane from "antd/es/tabs/TabPane";

const ForgetPass = (props: any) => {

    const [imgId, setImgId] = useState<string>()
    const [active, setActive] = useState<string>("1")

    return (
        <ModalForm<any>
            title="找回密码"
            trigger={
                props.button
            }
            autoFocusFirstInput
            modalProps={{
                maskClosable: false,
                destroyOnClose: true,
                width: 500,
                okText: "发送"
            }}
            onFinish={async (values: any) => {
                let data: any = {
                    captchaId: imgId,
                    captcha: values.captcha
                }
                data.username = values.username;
                data.email = values.email;
                data.type = 2;
                return Api.forgetPassword({data: data}).then(() => {
                    message.success('验证成功');
                    return true
                }).catch(() => {
                    // console.log('data', data);
                })
            }}
        >
            <ItemUsername/>
            <ItemEmail needVerify={false} notCheck={active !== '2'} type={2}/>
            <ItemCaptcha setImgId={setImgId}/>
        </ModalForm>
    )
}

export default ForgetPass;