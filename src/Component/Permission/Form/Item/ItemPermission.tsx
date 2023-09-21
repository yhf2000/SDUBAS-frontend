import {Checkbox, Form, Select} from "antd";
import {useEffect, useState} from "react";
import {Api} from "../../../../API/api";

const ItemPermission = (props: any) => {
    const [options, setOptions] = useState<any>([]);
    useEffect(() => {
        Api.getPermission({data:{service_type:props.service_type}})//请求type==x所有权限
            .then((res:any)=>{
                setOptions(res);
            })
    }, [setOptions])
    return (
        <>
            <Form.Item
                {...props.field}
                name={props.name?props.name:'permissions'}
                label={props.label?props.label:''}
                key={props.key}
                rules={[
                    {required:false,message:"权限"}
                ]}
            >
                <Checkbox.Group options={options} />
                {/*<Select*/}
                {/*    {...props.field}*/}
                {/*    key={props.key}*/}
                {/*    mode={'multiple'}*/}
                {/*    style={props.style}*/}
                {/*    placeholder={'选择分配的权限'}*/}
                {/*>*/}
                {/*    {initPermissions?.map((option: permission) => {*/}
                {/*        return (*/}
                {/*            <Select.Option key={option.key} value={option.key}>{option.name}</Select.Option>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</Select>*/}
            </Form.Item>
        </>
    )
}

export default ItemPermission;