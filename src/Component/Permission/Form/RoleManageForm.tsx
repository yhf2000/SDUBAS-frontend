import {Button, Form, Input, Select, Space} from "antd";
import ItemPermission from "./Item/ItemPermission";

const {Option} = Select;


const RoleManageForm = (props:any) => {
    return (
        <Form.List name="roles">
            {(fields, {add, remove}) => (
                <>
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                            添加角色
                        </Button>
                    </Form.Item>
                    {fields.map((field) => (
                        <Space key={field.name} style={{display: 'flex', marginBottom: 8}} align="baseline">
                            <Form.Item
                                {...field}
                                name={[field.name, 'role_name']}
                                key={field.name+'role_name'}
                                label="角色"
                                rules={[{required: true, message: '请输入角色名称'}]}
                                noStyle
                            >
                                <Input placeholder="角色名称"/>
                            </Form.Item>
                            <ItemPermission
                                style={{width:200}}
                                field={field}
                                name={[field.name,'privilege_list']}
                                service_type={props.service_type}
                                {...props}
                            />
                            <Button
                                type={'link'}
                                style={{width: 50}}
                                onClick={() => remove(field.name)}>
                                Remove
                            </Button>
                        </Space>
                    ))}
                </>
            )}
        </Form.List>
    );
}

export default RoleManageForm;