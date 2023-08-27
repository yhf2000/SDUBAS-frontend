import {Form, Select} from "antd";
import {useEffect, useState} from "react";
import {Api} from "../../../../API/api";
import {permission} from "../../../../Type/permission";


const initPermissions:permission[] = [
    {
        key:'1',
        name:'查看'
    },
    {
        key:'2',
        name:'提交'
    }
]
const ItemPermission = (props: any) => {
    const [options, setOptions] = useState<permission[]>([]);
    useEffect(() => {
        // Api.getPermission()
        //     .then((res:permission[])=>{
        //         setOptions(res);
        //     })
    }, [setOptions])
    return (
        <>
            <Form.Item
                name={props.name?props.name:'permissions'}
                label={'分配权限'}
                key={props.key}
                rules={[
                    {required:true}
                ]}
            >
                <Select
                    {...props.field}
                    key={props.key}
                    mode={'multiple'}
                    style={props.style}
                    placeholder={'选择分配的权限'}
                >
                    {initPermissions?.map((option: permission) => {
                        return (
                            <Select.Option key={option.key} value={option.key}>{option.name}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
        </>
    )
}

export default ItemPermission;