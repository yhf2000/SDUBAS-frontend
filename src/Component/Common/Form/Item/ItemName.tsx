import {Form, Input} from "antd";

const ItemName = (props: any) => {
    return (
        <>
            <Form.Item label={props.label} name={props.name}
                       rules={[
                           {
                               required:props.required,
                               message:props.required?`请输入${props.label}`:undefined
                           }
                       ]}
            >
                <Input disabled={props.disabled}/>
            </Form.Item>
        </>
    );
}

export default ItemName;