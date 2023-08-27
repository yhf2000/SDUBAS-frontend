import {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import ItemUpload from "../../Common/Form/Item/ItemUpload";
import {ModalForm} from "@ant-design/pro-form";


const form = (
    <>
    </>
)
const SubmissionSForm=(props:any)=>{
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [fileList, setFileList] = useState([]);


    const handleInputChange = (e:any) => {
        setInputValue(e.target.value);
    };

    const handleFileChange = (info:any) => {
        setFileList(info.fileList);
    };

    const button=(props.rows.type === 0 ? (
        <Button type="link" >
            提交文本
        </Button>
    )
    : (
        <Button type="link">
            提交文件
        </Button>
    ))
    return (
        <>
            <ModalForm
                title={'提交'}
                trigger={button}
                modalProps={{
                    maskClosable: false,
                    destroyOnClose: true,
                    width: 500,
                    okText: "提交"
                }}
                onFinish={(values:any)=>{console.log(values);return Promise.resolve(true)}}//需要添加addTableVersion
            >
                <Form.Item name={'pId'} initialValue={props.rows.id}>
                    <Input type={'hidden'}/>
                </Form.Item>
                <Form.Item name={'uId'} initialValue={'001'}>
                </Form.Item>
                {props.rows.type === 0 && (
                    <>
                        <span>字数限制:{props.rows.count_limit}</span>
                        <Form.Item name={'text'} label={'请输入文本'}
                                   rules={[
                                       {required: true, message: '请输入文本'},
                                       {
                                           validator: (_, value) => {
                                               if (value && value.length > props.rows.count_limit) {
                                                   return Promise.reject(`最多输入 ${props.rows.count_limit} 个字`);
                                               }
                                               return Promise.resolve();
                                           }
                                       }
                                   ]}
                        >
                            <Input.TextArea value={inputValue} onChange={handleInputChange}
                                            placeholder="请输入文本"/>
                        </Form.Item>
                    </>
                )}
                {props.rows.type === 1 && (
                    <ItemUpload
                        label={'上传文件'}
                        name={'file'}
                        accept={props.rows.type_limit}
                    />
                )}
            </ModalForm>
        </>
    )
}

export default SubmissionSForm;