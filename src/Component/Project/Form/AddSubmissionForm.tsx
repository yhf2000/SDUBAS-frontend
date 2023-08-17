import {Button, Form, Input, InputNumber, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useState} from "react";

type SType = "0" | "1";
const AddSubmissionForm = () => {
    const [type, setType] = useState<SType[]>([]);
    const handleSelect = (index: number, value: any) => {
        console.log('type', value);
        let newType = type.slice();
        newType[index] = value;
        setType(newType);
    }
    const handleRemove = (index: number) => {
        setType((prevType) => (prevType.filter((_, i) => i !== index)))
    }
    const handleAdd = () => {
        setType((preVType) => ([...preVType, '0']))
    }
    return (
        <Form.List name={'addSubmission'}>
            {(fields, {add, remove}) => (
                <>
                    {fields.map((field) => (
                        <Space key={field.name} style={{marginBottom: 8}}>
                            <Form.Item
                                {...field}
                                name={[field.name, 'name']}
                                key={field.name + 'name'}
                                rules={[{
                                    required: true, message: '请输入名称'
                                }]}
                                noStyle
                            >
                                <Input placeholder="名称"/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'type']}
                                key={field.name + 'type'}
                                rules={[{
                                    required: true, message: '请选择类型'
                                }]}
                                noStyle
                            >
                                <Select style={{width: 80}} onChange={(value) => handleSelect(field.name, value)}>
                                    <Select.Option value={'0'}>文本</Select.Option>
                                    <Select.Option value={'1'}>文件</Select.Option>
                                </Select>
                            </Form.Item>
                            {type[field.name] === "0" && (<Form.Item
                                {...field}
                                name={[field.name, 'count_limit']}
                                key={field.name + 'count_limit'}
                                rules={[
                                    // {required:true,message:'填写大小'},
                                    {type: "number"}
                                ]}
                                noStyle
                            >
                                <InputNumber placeholder="字数限制"/>
                            </Form.Item>)}
                            {type[field.name] === "1" && (
                                <>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'size_limit']}
                                        key={field.name + 'size_limit'}
                                        rules={[
                                            {type: 'number'},
                                            {
                                                validator: (_, value) => {
                                                    if (value && !Number.isInteger(Number(value))) {
                                                        return Promise.reject('请输入整数');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }
                                        ]}
                                        noStyle
                                    >
                                        <InputNumber placeholder="文件大小限制"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'type_limit']}
                                        key={field.name + 'type_limit'}
                                        noStyle
                                    >
                                        <Select style={{width: 80}}>
                                            <Select.Option value={'zip'}>zip</Select.Option>
                                            <Select.Option value={'docx'}>docx</Select.Option>
                                            <Select.Option value={'pdf'}>pdf</Select.Option>
                                            <Select.Option value={'pptx'}>pptx</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </>
                            )}
                            <MinusCircleOutlined onClick={() => {
                                handleRemove(field.name);
                                remove(field.name);
                            }}/>
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => {
                            add();
                            handleAdd();
                        }} style={{marginBottom: 8}}
                                icon={<PlusOutlined/>}>
                            添加
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default AddSubmissionForm;