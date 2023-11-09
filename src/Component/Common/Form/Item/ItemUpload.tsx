import {Button, Form, Input, message, Modal, Upload} from "antd";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";
import {calculateHash} from "../../../../Utils/fileUpload";
import {useEffect, useState} from "react";
import {Api} from "../../../../API/api";
import {isValueEmpty} from "../../../../Utils/isValueEmpty";
import {useDispatch} from "../../../../Redux/Store";
import {useSelector} from "react-redux";
import {IState} from "../../../../Type/base";
import {encrypt, generateAESKey} from "../../../../Utils/encrypt";
import JSEncrypt from 'jsencrypt';
import {setState} from "@antv/s2";

const {Dragger} = Upload;
const UploadFile = (props: any) => {
    const {value, onChange} = props;
    const [visible, setVisible] = useState(false);
    console.log(value)
    const [fileName, setFileName] = useState(value?.name);
    const {RSAPbKey} = useSelector((state: IState) => state.KeyReducer)
    const [AESKey,setAESKey] = useState<any>();
    const dispatch = useDispatch();
    const setRSAPbKey = (data: any) => {
        dispatch({type: 'setRSAPbKey', data: data})
    }
    useEffect(() => {
        if(props.value?.name)
        {
            setFileName(value?.name)
            onChange(value?.file_id);
        }
    }, [props.value])

    let nameList: string[] = []
    for (let nm of props.accept.split(",")) {
        nameList.push("*" + nm)
    }
    const callback = (value: any) => {
        onChange(value.file_id)
    }

    const preUpload = async (file: any) => {
        if(props.sizeLimit)
        {
            if(file.size/(1024*1024) > props.sizeLimit)//MB
            {
                return new Promise<void>((resolve,reject)=>{message.error('文件大小超过限制');return reject();})
            }
        }
        //先计算时长
        const fileType = file.type;
        let duration: number | null = null;
        if (fileType.startsWith("video/")) {
            const url = window.URL.createObjectURL(file);
            const audioElement = new Audio(url);
            audioElement.addEventListener("loadedmetadata", function (_event) {
                duration = audioElement.duration;
            });
        }
        //如果需要加密则加密
        if(props.aes)
        {
            setAESKey(generateAESKey());
            // console.log(file)
            file = await encrypt(file,AESKey);
        }
        const code = await calculateHash(file);
        // console.log(code);
        const size = file.size;
        return new Promise<void>((resolve, reject) => {
            let data;
            if (duration)
                data = {size: size, ...code, time: duration}
            else
                data = {size: size, ...code}
            Api.checkFile({data: {...data,type:props.aes}})
                .then((res: any) => {
                    if (res.file_id !== null) {
                        callback(res);
                        setFileName(file.name);
                        setVisible(false);
                        return reject();
                    } else {
                        setRSAPbKey(res.public_key)
                        return resolve(file);
                    }
                }).catch(()=>{return reject()})
        })
    }

    const handleUpload = async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        if (props.aes) {
            const rsaEncrypt = new JSEncrypt();
            rsaEncrypt.setPublicKey(RSAPbKey);
            const encryptedAESKey = rsaEncrypt.encrypt(AESKey);
            if(encryptedAESKey)
                formData.append('ase_key', encryptedAESKey);
        }
        else{
            formData.append('ase_key',' ');
        }
        Api.uploadFile({data: formData})
            .then((res: any) => {
                message.success('上传成功')
                setFileName(file.name);
                setVisible(false);
                callback(res);
            })
            .catch(() => {
                message.error('上传失败，请重新上传')
            })
    }
    return (
        <>
            {!isValueEmpty(value) ? (
                <>
                    <Button type={'link'} onClick={() => {
                        Api.getDownLoadUrl({data: {id: value.file_id ? value.file_id : value}}).then((data: any) => {
                            window.open(data.url);
                        })
                    }}>{fileName||value?.name}</Button>
                    <Button danger onClick={() => {
                        setVisible(true);
                        onChange(null);
                    }}>重新上传</Button>
                </>
            ) : (!visible && <Button style={{width: '80px'}} onClick={() => {
                setVisible(true)
            }} icon={<UploadOutlined/>}/>)}
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={() => {
                    setVisible(false)
                }}
            >
                <Dragger
                    // fileList={fileList}
                    maxCount={1}
                    beforeUpload={preUpload}
                    customRequest={({file}) => {
                        handleUpload(file)
                    }}
                    action=''
                    accept={props.accept}
                    multiple={false}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                    <p className="ant-upload-hint">
                        请上传一个 {nameList} 文件
                    </p>
                </Dragger>
            </Modal>
        </>

    )
}
const ItemUpload = (props: any) => {
    return (
        <Form.Item
            name={props.name ?? 'file_id'}
            // label={props.label ?? '上传文件 '}
            {...props}
            noStyle
        >
            <UploadFile {...props} />
        </Form.Item>
    );
}

export default ItemUpload;