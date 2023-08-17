import {Form, Input, InputNumber} from "antd";
import React from "react";
import {withTranslation} from "react-i18next";
import {Api} from "../../../../API/api";

const ItemNumber = (props: any) => {
    const validateNumber = (_:any, value:any, callback:any) => {
        if (isNaN(value)) {
            callback('请输入有效的数字');
        } else {
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
            />
        </Form.Item>
    )
}

export default withTranslation()(ItemNumber)