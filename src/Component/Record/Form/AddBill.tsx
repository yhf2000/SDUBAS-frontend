import {ModalForm} from "@ant-design/pro-form";
import {message, Tabs} from "antd";
import ItemCaptcha from "../../User/Form/Item/ItemCaptcha";
import React, {useState} from "react";
import {withTranslation} from "react-i18next";
import ItemUsername from "../../User/Form/Item/ItemUsername";
import ItemEmail from "../../User/Form/Item/ItemEmail";
import {Api} from "../../../API/api";
import TabPane from "antd/es/tabs/TabPane";
import ItemNumber from "./Item/ItemNumber";

const AddBill = (props: any) => {

    const [imgId, setImgId] = useState<string>()
    const [active, setActive] = useState<string>("1")

    return (
        <ModalForm<any>
            title="收入记账"
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
            // }}重写记账修改的Api
        >
            <Tabs
                onChange={setActive}
                activeKey={active}
                items={[
                    {label: '收入', key: '1',children:active==='1'&&<ItemNumber notRequired={active !== '1'} />},
                    {label: '支出', key: '2',children:active==='2'&&<ItemNumber notRequired={active !== '2'} />}
                ]}
            >
            </Tabs>
        </ModalForm>
    )
}

export default AddBill;