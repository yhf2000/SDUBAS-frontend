import {DatePicker, Form, Input, Select} from "antd";
import ItemGender from "./Item/ItemGender";
import {useState} from "react";
import college from "../../../Page/School/College";


interface OpType {
    value: string;
    label: string;
}

export const BindForm2 = (
    <>
        <Form.Item
            name={'card_id'}
            label={'学号'}
            rules={[{required: true}]}
        >
            <Input/>
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
            <DatePicker style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
            label="毕业时间"
            name="graduation_dt"
            rules={[{required: true}]}
        >
            <DatePicker style={{width: "100%"}}/>
        </Form.Item>
    </>
)


export function BindForm3() {
    const [schoolOp, setSchoolOp] = useState<OpType[]>([]);
    const [collegeOp, setCollegeOp] = useState<OpType[]>([]);
    const [classOp, setClassOp] = useState<OpType[]>([{value: '1', label: '数据班'}]);
    const [majorOp, setMajorOp] = useState<OpType[]>([{value: '1', label: '计算机'}]);
    return (
        <>
            <Form.Item
                name={'school_id'}
                label={'学校'}
                rules={[{required: true}]}
            >
                <Select>
                    {schoolOp.map((option: OpType) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={'college_id'}
                label={'学院'}
                rules={[{required: true}]}
            >
                <Select>
                    {collegeOp.map((option: OpType) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={'major_id'}
                label={'专业'}
                rules={[{required: true}]}
            >
                <Select>
                    {majorOp.map((option: OpType) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name={'class_id'}
                label={'班级'}
                rules={[{required: true}]}
            >
                <Select>
                    {classOp.map((option: OpType) => {
                        return (
                            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
        </>
    )
}