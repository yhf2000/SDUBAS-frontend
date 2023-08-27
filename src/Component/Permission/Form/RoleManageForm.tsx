import {Button, Form, Input, Select, Space} from "antd";
import ItemPermission from "./Item/ItemPermission";

const {Option} = Select;


const RoleManageForm = () => {

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
            <Form.List name="roles">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map((field,index) => (
                            <Space key={field.key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'roleName']}
                                    label="角色"
                                    rules={[{required: true, message: '请输入角色名称'}]}
                                >
                                    <Input placeholder="角色名称"/>
                                </Form.Item>
                                <ItemPermission
                                    style={{width:200}}
                                    field={field}
                                    name={[field.name,'permission']}
                                />
                                <Button
                                    type={'link'}
                                    style={{width: 50}}
                                    onClick={() => remove(field.name)}>
                                    Remove
                                </Button>
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
    );
}

export default RoleManageForm;