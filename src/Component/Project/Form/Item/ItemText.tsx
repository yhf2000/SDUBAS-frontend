import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import ReactMarkdown from "react-markdown";
import TextArea from "antd/es/input/TextArea";

const ItemText = (props: any) => {
    return (
        <>
            <Form.Item
                {...props}
            >
                <Text {...props} />
            </Form.Item>
        </>
    )
}

export default ItemText;

const Text = (props: any) => {
    const {value, onChange} = props;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState(value);
    return (
        <>
            <Modal
                open={visible}
                onOk={() => {
                    setDefaultValue(value);
                    setVisible(false);
                }}
                onCancel={() => {
                    onChange(defaultValue);
                    setVisible(false);
                }}
                title={'上传文本'}
                width={'1000px'}
                bodyStyle={{height: '500px'}}
            >
                <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                    <div>
                        <div style={{marginBottom: '10px', fontSize: '15px'}}>输入文本:</div>
                        <Input.TextArea
                            // autoSize={true}
                            showCount={true}
                            onChange={onChange}
                            value={value}
                            style={{height: '400px', width: '400px'}}
                        />
                    </div>
                    <div>
                        <div style={{marginBottom: '10px', fontSize: '15px'}}>MarkDown实时渲染:</div>
                        <div style={{height: '400px', width: '400px',overflow:'auto'}}>
                            <ReactMarkdown
                                children={value}
                            />
                        </div>
                    </div>

                </div>
            </Modal>
            {
                !visible && (
                    value ? (<Button type={'link'} onClick={() => setVisible(true)}>{value.slice(0, 5)}...</Button>)
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