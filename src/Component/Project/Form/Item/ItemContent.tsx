import {Button, Form, Input, Select, Space} from "antd";
import ItemUpload from "../../../Common/Form/Item/ItemUpload";

const ItemContent = (props: any) => {
    return (
        <Form.List name={'contents'}>
            {(fields, {add, remove}) => (
                <>
                    {fields.map((field) => (
                        <Space key={field.name} style={{marginBottom: 8}}>
                            <Form.Item
                                {...field}
                                name={[field.name, "prefix"]}
                                key={field.name + 'prefix'}
                                label={'目录'}
                                noStyle
                            >
                                <Input placeholder={'路径/x/y/z'}/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, "name"]}
                                key={field.name + 'name'}
                                label={'名称'}
                                noStyle
                            >
                                <Input placeholder={'名称'}/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'id']}
                                key={field.name + 'id'}
                                noStyle
                            >
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'weight']}
                                key={field.name + 'weight'}
                                label={'权重'}
                                noStyle
                            >
                                <Input placeholder="内容权重"/>
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, 'type']}
                                key={field.name + 'type'}
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
                            <ItemUpload {...field} key={field.name+'file'} name={[field.name,'file']} accept={'.docx,.zip,.doc,.pdf,.ppt'}/>
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