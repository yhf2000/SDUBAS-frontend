import {Button, Form, Input, Select, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";

const {Option} = Select;

function MinusCircleOutlined() {
    return null;
}

const RoleManageForm = () => {
    const initialValues = {
        roles: [
            {
                roleName: '角色1',
                assignedUsers: ['用户1', '用户2'],
            },
            {
                roleName: '角色2',
                assignedUsers: ['用户3', '用户4'],
            },
        ],
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const handleEdit = (index: any) => {
        console.log('编辑角色', index);
    };

    const handleDelete = (index: any) => {
        console.log('删除角色', index);
    };
    return (
        <>
            <Form.List name="roles">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map((field, index) => (
                            <Space key={field.key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'roleName']}
                                    label="角色"
                                    rules={[{required: true, message: '请输入角色名称'}]}
                                >
                                    <Input placeholder="角色名称"/>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'permission']}
                                    label={'角色权限'}
                                    rules={[{required: true, message: '请选择角色权限'}]}
                                >
                                    <Select mode={"multiple"} placeholder={'请选择权限'}>
                                        <Option value={'权限1'}>权限1</Option>
                                        <Option value={'权限2'}>权限2</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'assignedUsers']}
                                    label="分配给"
                                    rules={[{required: true, message: '请至少选择一个用户'}]}
                                >
                                    <Select mode="multiple" placeholder="请选择用户">
                                        <Option value="用户1">用户1</Option>
                                        <Option value="用户2">用户2</Option>
                                        <Option value="用户3">用户3</Option>
                                        <Option value="用户4">用户4</Option>
                                    </Select>
                                </Form.Item>
                                <Button type="text" icon={<EditOutlined/>} onClick={() => handleEdit(index)}/>
                                <Button type="text" icon={<MinusCircleOutlined/>} onClick={() => handleDelete(index)}/>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                添加角色
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );
}

export default RoleManageForm;