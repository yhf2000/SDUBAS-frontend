import {ModalForm} from "@ant-design/pro-form";
import {message, Tabs} from "antd";
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
                if (active === "1") data.username = values.username
                if (active === "2") data.email = values.email
                return Api.forgetPassword(data).then(() => {
                    message.success('修改密码的链接已发送至您的邮箱');
                    return true
                })
            }}
        >
            <Tabs
                onChange={setActive}
                activeKey={active}
                items={[
                    {label: '用戶名', key: '1', children: <ItemUsername notRequired={active !== '1'}/>},
                    {label: '邮箱', key: '2', children: <ItemEmail needVerify={false} notCheck={active !== '2'}/>}
                ]}
            >
            </Tabs>
            <ItemCaptcha setImgId={setImgId}/>
        </ModalForm>
    )
}

export default ForgetPass;