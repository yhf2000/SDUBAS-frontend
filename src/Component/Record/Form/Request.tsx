// import {ModalForm} from "@ant-design/pro-form";
// import {DatePicker, Form, Input, message, Tabs} from "antd";
// import React, {useState} from "react";
// import {useDispatch} from "../../../Redux/Store";
// import getData from "../../../API/getData";
// import ItemNumber from "./Item/ItemNumber";
// import {Api} from "../../../API/api";
//
// const RequestResource = (props: any) => {
//
//     // const [active, setActive] = useState<string>("1")
//     const dispatch = useDispatch();
//     const AddTableVersion = (name:string)=>{
//         dispatch({type:'addTableVersion',name:name});
//     }
//
//     return (
//         <ModalForm<any>
//             title="申请资源"
//             trigger={
//                 props.button
//             }
//             autoFocusFirstInput
//             modalProps={{
//                 maskClosable: false,
//                 destroyOnClose: true,
//                 width: 500,
//                 okText: "提交"
//             }}
//             // onFinish={async (values: any) => {
//             //     let data: any = {
//             //         captchaId: imgId,
//             //         captcha: values.captcha
//             //     }
//             //     if (active === "1") data.username = values.username
//             //     if (active === "2") data.email = values.email
//             //     return Api.forgetPassword(data).then(() => {
//             //         message.success('修改密码的链接已发送至您的邮箱');
//             //         return true
//             //     })
//             // }}
//             onFinish={async (value:any)=>{
//                 console.log('apply:',value);
//                 return Api.applyResource({rId:props.rId,data:value}).then(()=>{
//                     AddTableVersion(props.TableName);
//                     message.success('成功');
//                     return true;
//                 })
//             }}
//         >
//             <ItemNumber label={'申请数量'} name={'count'}/>
//             <Form.Item name={'begintime'} label={'起始日期'}>
//                 <DatePicker />
//             </Form.Item>
//             <Form.Item name={'endtime'} label={'结束日期'}>
//                 <DatePicker />
//             </Form.Item>
//         </ModalForm>
//     )
// }
//
// export default RequestResource;


//未来一周的申请情况
import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import ResourceStatus from "../../Common/ResourceStatus";
import {Api} from "../../../API/api";

const RequestResource = (props: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Button type={'primary'} onClick={() => setVisible(true)}>申请</Button>
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={1000}
            >
                <ResourceStatus
                    id={props.rId}
                    apply={true}
                    end={23}
                    start={8}
                />
            </Modal>
        </>
    );
}

export default RequestResource;
