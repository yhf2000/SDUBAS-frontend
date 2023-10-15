import {Button, Form, Input, Modal, Select, Space, Switch} from "antd";
import {useState} from "react";
import {ModalForm} from "@ant-design/pro-form";
import {useForm} from "antd/es/form/Form";

const ConditionLimitItem = (props:any) => {
    const {value,onChange} = props;
    const [form] = Form.useForm<any>();
    return (
        <ModalForm
            form={form}
            trigger={<Button type={'ghost'}>设置</Button>}
            onFinish={(value)=>{onChange(value.set_list);return Promise.resolve(true)}}
        >
            <Form.List name={'set_list'}>
                {(fields, {add, remove}) => (
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {fields.map((field) => (
                            <Space wrap>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "projects"]}
                                    key={field.name + 'projects'}
                                >
                                        <Select mode={'multiple'}>
                                            <Select.Option key={'1'} value={1}>数据实践</Select.Option>
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "lower_bound"]}
                                    key={field.name + 'lower_bound'}
                                >
                                    <Input />
                                </Form.Item>
                                <Button
                                    type={'link'}
                                    style={{width: 50}}
                                    onClick={() => remove(field.name)}>
                                    Remove
                                </Button>
                            </Space>
                        ))
                        }
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                添加内容
                            </Button>
                        </Form.Item>
                    </div>
                )
                }
            </Form.List>
        </ModalForm>
    );
}

export default ConditionLimitItem;