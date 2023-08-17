import {Form, Select} from "antd";
import {Option} from "antd/es/mentions";
import {useState} from "react";

const ItemType = (props: any) => {
    const [select,setSelect] = useState(props.default);
    const handleChange = (value:any)=>{
        setSelect(value);
    }
    return (
        <>
            <Form.Item label={props.label} name={props.name}
                       rules={[
                           {
                               required: props.required,
                               message: props.required ? `请选择${props.label}` : undefined
                           }
                       ]}
            >
                <Select value={select} onChange={handleChange} mode={props.mode}>
                    {props.options.map((option: { key: string, value: string }) => {
                        return (
                            <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </>
    );
}

export default ItemType;