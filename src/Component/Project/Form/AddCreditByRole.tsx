import {Button, Form, Input, Select, Space} from "antd"
import ItemNumber from "../../Record/Form/Item/ItemNumber";
import {useEffect, useState} from "react";
import {Api} from "../../../API/api";
import {creditsType} from "../../../Config/Project/data";

//学分认定
const AddCreditByRole = (props: any) => {
    // const [roles, setRoles] = useState([]);
    const [options,setOptions] = useState([]);

    //请求该项目可以添加的角色
    useEffect(() => {
        Api.getRoles({data:{pageNow:1,pageSize:100000000}})//请求type==x所有权限
            .then((res:any)=>{
                setOptions(res.rows);
            }).catch(()=>{})
    }, [])
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
                label={'目标角色'}
                rules={[{required:true}]}
            >
                <Select>
                    {
                        options.map((option:any)=>{
                            return (<Select.Option key={option.role_id} value={option.role_id}>{option.role_name}</Select.Option>)
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name={'type'}
                label={'类型'}
                rules={[{required:true}]}
            >
                <Select>
                    {
                        creditsType.map((option:any)=>{
                            return(
                                <Select.Option key={option.key} value={option.value}>{option.value}</Select.Option>
                            )
                        })
                    }
                </Select>
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
            <ItemNumber required={true} name={'credit'} min={0} max={10} label={'学分'}/>
        </>
    );
}

export default AddCreditByRole;


