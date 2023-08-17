import {ModalForm} from "@ant-design/pro-form";
import {DatePicker, Form, Input, message, Tabs} from "antd";
import React, {useState} from "react";
import {useDispatch} from "../../../Redux/Store";
import getData from "../../../API/getData";
import ItemNumber from "./Item/ItemNumber";
import {Api} from "../../../API/api";

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
                console.log('apply:',value);
                return Api.applyResource({rId:props.rId,data:value}).then(()=>{
                    message.success('成功');
                    return true;
                })
            }}
        >
            <ItemNumber label={'申请数量'} name={'count'}/>
            <Form.Item name={'begintime'} label={'起始日期'}>
                <DatePicker />
            </Form.Item>
            <Form.Item name={'endtime'} label={'结束日期'}>
                <DatePicker />
            </Form.Item>
        </ModalForm>
    )
}

export default RequestResource;