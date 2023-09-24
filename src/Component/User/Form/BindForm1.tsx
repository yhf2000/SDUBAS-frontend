import ItemUsername from "./Item/ItemUsername";
import ItemPassword from "./Item/ItemPassword";
import ItemEmail from "./Item/ItemEmail";
import {Form, Input} from "antd";

export const BindForm1 = (
        <>
            <ItemUsername/>
            <ItemPassword/>
            <ItemEmail needVerify={false}/>
        </>
    )


export const EditUserForm  = (
    <>
        <Form.Item name={'user_name'}>
            <Input disabled={true} />
        </Form.Item>
    </>
)