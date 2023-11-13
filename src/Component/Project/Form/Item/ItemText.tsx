import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";

const ItemText = (props: any) => {
    return (
        <>
            <Form.Item
                {...props}
            >
                <Text {...props}/>
            </Form.Item>
        </>
    )
}

export default ItemText;

const Text = (props: any) => {
    const {value, onChange} = props;
    const [visible, setVisible] = useState(false);
    const [defaultValue,setDefaultValue] = useState(value);
    return (
        <>
            <Modal
                open={visible}
                onOk={() => {setDefaultValue(value);setVisible(false);}}
                onCancel={()=>{onChange(defaultValue);setVisible(false);}}
                title={'上传文本'}
            >
                <Input.TextArea
                    onChange={onChange}
                    autoSize={true}
                    value={value}
                />
            </Modal>
            {
                !visible && (
                    value ? (<Button type={'link'} onClick={() => setVisible(true)}>{value.slice(0,5)}...</Button>)
                        : (
                            <Button type={'link'} onClick={() => {
                                setVisible(true)
                            }}>上传文本</Button>
                        )
                )
            }
        </>
    )
}