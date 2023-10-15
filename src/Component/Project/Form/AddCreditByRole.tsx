import {Button, Form, Input, Select, Space} from "antd"
import ItemName from "../../Common/Form/Item/ItemName";
import ItemNumber from "../../Record/Form/Item/ItemNumber";
import {useEffect, useState} from "react";

//学分认定
const AddCreditByRole = (props: any) => {
    // const [roles, setRoles] = useState([]);
    //请求该项目可以添加的角色
    // useEffect(() => {
    //     //Api.getProRole().then((res:any)=>{setRoles(res.roles)}).catch(()=>{})
    // }, [])

    return (
        <>
            {/*<Form.List name={'role_credits'}>*/}
            {/*    {(fields, {add, remove}) => (*/}
            {/*        <>*/}
            {/*            {fields.map((field) => (*/}
            {/*                <Space key={field.name} style={{marginBottom: 8}}>*/}
            {/*                    <Form.Item*/}
            {/*                        {...field}*/}
            {/*                        name={[field.name, 'project_id']}*/}
            {/*                        style={{display: 'none'}}*/}
            {/*                        initialValue={props.pId}>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        {...field}*/}
            {/*                        name={[field.name,'role_id']}*/}
            {/*                    >*/}
            {/*                        <Input placeholder={'请输入角色'}/>*/}
            {/*                    </Form.Item>*/}
            {/*                    <Form.Item*/}
            {/*                        {...field}*/}
            {/*                        name={[field.name,'type']}*/}
            {/*                    >*/}
            {/*                        <Input placeholder={'请输入学分类型'}/>*/}
            {/*                    </Form.Item>*/}
            {/*                    /!*<Form.Item*!/*/}
            {/*                    /!*    {...field}*!/*/}
            {/*                    /!*    name={[field.name, 'role_id']}*!/*/}
            {/*                    /!*>*!/*/}
            {/*                    /!*    <Select style={{width: 120}}>*!/*/}
            {/*                    /!*        /!*项目已有的角色*!/*!/*/}
            {/*                    /!*        {roles.map((role: any) => {*!/*/}
            {/*                    /!*        return (*!/*/}
            {/*                    /!*            <Select.Option value={role.role_id}>{role.role_name}</Select.Option>*!/*/}
            {/*                    /!*        )*!/*/}
            {/*                    /!*    })}*!/*/}
            {/*                    /!*    </Select>*!/*/}
            {/*                    /!*</Form.Item>*!/*/}
            {/*                    <ItemNumber required={true} {...field} name={[field.name, 'credit']}/>*/}
            {/*                    <Button*/}
            {/*                        type={'link'}*/}
            {/*                        style={{width: 50}}*/}
            {/*                        onClick={() => remove(field.name)}>*/}
            {/*                        Remove*/}
            {/*                    </Button>*/}
            {/*                </Space>*/}
            {/*            ))}*/}
            {/*            <Form.Item>*/}
            {/*                <Button type="dashed" onClick={() => add()} block>*/}
            {/*                    新增*/}
            {/*                </Button>*/}
            {/*            </Form.Item>*/}
            {/*        </>*/}
            {/*    )*/}
            {/*    }*/}
            {/*</Form.List>*/}
            <Form.Item
                name={'project_id'}
                style={{display: 'none'}}
                initialValue={props.pId}>
            </Form.Item>
            <Form.Item
                name={'role_id'}
            >
                <Input placeholder={'请输入角色'}/>
            </Form.Item>
            <Form.Item
                name={'type'}
            >
                <Input placeholder={'请输入学分类型'}/>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    {...field}*/}
            {/*    name={[field.name, 'role_id']}*/}
            {/*>*/}
            {/*    <Select style={{width: 120}}>*/}
            {/*        /!*项目已有的角色*!/*/}
            {/*        {roles.map((role: any) => {*/}
            {/*        return (*/}
            {/*            <Select.Option value={role.role_id}>{role.role_name}</Select.Option>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*    </Select>*/}
            {/*</Form.Item>*/}
            <ItemNumber required={true} name={'credit'}/>
        </>
    );
}

export default AddCreditByRole;


