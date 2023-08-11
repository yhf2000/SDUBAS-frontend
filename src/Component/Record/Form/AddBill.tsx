import {ModalForm} from "@ant-design/pro-form";
import {message, Tabs} from "antd";
import React, {useState} from "react";
import ItemNumber from "./Item/ItemNumber";
import ItemText from "../../Common/Form/Item/ItemText";
import {useDispatch} from "../../../Redux/Store";
import getData from "../../../API/getData";

const AddBill = (props: any) => {

    const [imgId, setImgId] = useState<string>()
    const [active, setActive] = useState<string>("1")
    const dispatch = useDispatch();

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
            onFinish={async (value:any)=>{
                dispatch(getData(
                    'newAccount',
                    {fId:props.fId,data:{value}},
                    ()=>{
                        message.success('提交成功')
                    },
                    ()=>{
                        message.error('提交失败')
                    }
                ))
            }}
        >
            <Tabs
                onChange={setActive}
                activeKey={active}
                items={[
                    {
                        label: '收入', key: '1', children: active === '1' && (
                            <>
                                <ItemNumber label='收入' name='income' notRequired={active !== '1'}/>
                                <ItemText label={'收入描述'} name={'IncomeDsp'} required={true}/>
                            </>
                        )
                    },
                    {
                        label: '支出',
                        key: '2',
                        children: active === '2' && (
                            <>
                                <ItemNumber label='支出' name='outcome' notRequired={active !== '2'}/>
                                <ItemText label={'支出描述'} name={'OutcomeDsp'} required={true}/>
                            </>
                        )
                    }
                ]}
            >
            </Tabs>
        </ModalForm>
    )
}

export default AddBill;