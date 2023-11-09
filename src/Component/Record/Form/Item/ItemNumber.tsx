import {Form, InputNumber} from "antd";
import React from "react";
import {withTranslation} from "react-i18next";

const ItemNumber = (props: any) => {
    const validateNumber = (_:any, value:any, callback:any) => {
        if (isNaN(value)) {
            callback('请输入有效的数字');
        } else {
            if(value > props.max || value < props.min)
                callback('输入越界')
            else
                callback();
        }

    };
    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={[
                {required:props.required,message:'请输入数字'},
                {validator:validateNumber}
            ]}
            hasFeedback>
            <InputNumber
                disabled={props.editable === false}
                bordered={props.editable}
                min={props.min??0}
                max={props.max??undefined}
            />
        </Form.Item>
    )
}

export default withTranslation()(ItemNumber)