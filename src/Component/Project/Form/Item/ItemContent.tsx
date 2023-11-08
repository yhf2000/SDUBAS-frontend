import {Button, Form, Input, Select, Space, Switch} from "antd";
import ItemUpload from "../../../Common/Form/Item/ItemUpload";
import ItemText from "./ItemText";
import {useState} from "react";
import ConditionLimitItem from "../../../Common/Form/ConditionLimit";

const ItemContent = (props: any) => {
    const [checked, setChecked] = useState<boolean>(false)
    const [conList, setConList] = useState<any>([]);
    const addRow = () => {
        setConList([...conList, {projects: [], lower_bound: ''}]);
    };
    const onChange = () => {
        setChecked(!checked);
    }
    console.log(props.pathname)
    return (
        <Form.List name={'contents'}>
            {(fields, {add, remove}) => (
                <>
                    {fields.map((field) => (
                        <Space key={field.key} style={{marginBottom: 8}} wrap>
                            <Form.Item
                                {...field}
                                name={[field.name, "prefix"]}
                                label={'目录'}
                                noStyle
                            >
                                <Input placeholder={'路径/x/y/z'}/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, "name"]}
                                label={'名称'}
                                noStyle
                            >
                                <Input placeholder={'名称'}/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'id']}
                                noStyle
                            >
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'weight']}
                                label={'权重'}
                                noStyle
                            >
                                <Input placeholder="内容权重"/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'type']}
                                label={'类型'}
                                noStyle
                            >
                                <Select style={{width: 120}}>
                                    {props.options.map((option: { key: string, value: string }) => {
                                        return (
                                            <Select.Option
                                                key={option.key}
                                                value={option.key}>
                                                {option.value}
                                            </Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <ItemUpload {...field} key={field.name + 'file_id'} name={[field.name, 'file_id']}
                                        accept={'.docx,.zip,.doc,.pdf,.ppt,.mp4'} aes={props.pathname === '/c/resources'}/>
                            <ItemText {...field} key={field.name + 'content'} name={[field.name, 'content']}/>
                            <Switch defaultChecked={false} checkedChildren={'可置换'} onChange={onChange}
                                    unCheckedChildren={'不可置换'} />
                            {checked&&<Form.Item {...field} key={field.name + 'set_list'} name={[field.name, 'set_list']} noStyle>
                                <ConditionLimitItem/>
                            </Form.Item>}
                            <Button
                                key={field.name+'btn'}
                                type={'link'}
                                // style={{width: 50}}
                                onClick={() => remove(field.name)}>
                                Remove
                            </Button>
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                            添加内容
                        </Button>
                    </Form.Item>
                </>
            )
            }
        </Form.List>
    )
}

export default ItemContent;