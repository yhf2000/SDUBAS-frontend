import {DatePicker, Form, Input, Select} from "antd";
import ItemGender from "./Item/ItemGender";
import {useState} from "react";
import college from "../../../Page/School/College";
import {ItemCadSchool} from "./Item/ItemCadSchool";


interface OpType {
    value: string;
    label: string;
}

export const BindForm2 = (props: any) => {
    return (
        <>
            <Form.Item
                name={'card_id'}
                label={'学号'}
                rules={[{required: true}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name={'role_id'} initialValue={props.role_id} style={{display:'none'}}>
            </Form.Item>
            <Form.Item
                name={'realname'}
                label={'姓名'}
                rules={[{required: true}]}
            >
                <Input/>
            </Form.Item>
            <ItemGender/>
            <Form.Item
                label="入学时间"
                name="enrollment_dt"
                rules={[{required: true}]}
            >
                <DatePicker style={{width: "100%"}} format="YYYY-MM-DD"/>
            </Form.Item>
            <Form.Item
                label="毕业时间"
                name="graduation_dt"
                rules={[{required: true}]}
            >
                <DatePicker style={{width: "100%"}} mode={'date'}/>
            </Form.Item>
            <ItemCadSchool />
        </>
    );
}
