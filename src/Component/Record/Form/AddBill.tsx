import {ModalForm} from "@ant-design/pro-form";
import {Form, message, Select, Tabs} from "antd";
import React, {useState} from "react";
import ItemNumber from "./Item/ItemNumber";
import ItemText from "../../Common/Form/Item/ItemText";
import {useDispatch} from "../../../Redux/Store";
import getData from "../../../API/getData";
import {Api} from "../../../API/api";

const AddBill = (props: any) => {

    const [imgId, setImgId] = useState<string>()
    const dispatch = useDispatch();

    const AddTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name});
    }
    return (
        <ModalForm<any>
            title="收支记账"
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
            onFinish={async (value:any)=>{
                console.log('data',{fId:props.fId,data:{finance_id:props.fId,...value}})
                return Api.newAccount({fId:props.fId,data:{finance_id:props.fId,...value}})
                    .then(()=>{
                        AddTableVersion('AccountTable');
                        message.success('提交成功');
                        return true;
                    })
                    .catch(()=>{return false})
            }}
        >
            <Form.Item
                label={'收/支'} name={'state'}
            >
                <Select>
                    <Select.Option value={0}>进账</Select.Option>
                    <Select.Option value={1}>出账</Select.Option>
                </Select>
            </Form.Item>
            <ItemNumber label='数目' name='amount' required={true}/>
            <ItemText label={'日志'} name={'log_content'} required={true}/>
        </ModalForm>
    )
}

export default AddBill;