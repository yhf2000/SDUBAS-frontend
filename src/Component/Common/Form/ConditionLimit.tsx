import {Button, Form, Input, InputNumber, Modal, Select, Space, Switch} from "antd";
import {ModalForm} from "@ant-design/pro-form";
import {useEffect, useState} from "react";
import {Api} from "../../../API/api";

const ConditionLimitItem = (props:any) => {
    const [options,setOptions] = useState<any>(undefined)
    useEffect(()=>{
        Api.getAllCourse().then((res:any)=>{
            setOptions(res);
        }).catch(()=>{})
    },[])
    const {value,onChange} = props;
    // console.log('what',value)
    return (
        <ModalForm
            name={'set_list'}
            trigger={<Button type={'ghost'}>置换</Button>}
            initialValues={value}
            onFinish={(value)=>{onChange({set_list:value.set_list});return Promise.resolve(true)}}
        >
            <Form.List name={'set_list'}>
                {(fields, {add, remove}) => (
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {fields.map((field) => (
                            <Space wrap>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "project_id_list"]}
                                    key={field.name + 'projects'}
                                    noStyle
                                >
                                        <Select mode={'multiple'} style={{width:'200px'}} placeholder={'请选择目标课程'}>
                                            {
                                                options.map((option:any)=>{return(<Select.Option key={option.id} value={option.id}>{option.name+option.id}</Select.Option>)})
                                            }
                                        </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "lower_limit"]}
                                    key={field.name + 'lower_bound'}
                                    noStyle
                                >
                                    <InputNumber min={0} placeholder={'输入最低限制'} width={'200px'}/>
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
                        <Form.Item
                            noStyle
                        >
                            <Button type="dashed" onClick={() => add()} style={{width:'200px'}} block>
                                添加置换条件
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