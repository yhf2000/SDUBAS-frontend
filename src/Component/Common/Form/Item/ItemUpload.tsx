import {Button, Form, Input, message, Modal, Upload} from "antd";
import {InboxOutlined, UploadOutlined} from "@ant-design/icons";
import {calculateHash} from "../../../../Utils/fileUpload";
import {useEffect, useState} from "react";
import {Api} from "../../../../API/api";
import {isValueEmpty} from "../../../../Utils/isValueEmpty";
import {useDispatch} from "../../../../Redux/Store";
import {useSelector} from "react-redux";
import {IState} from "../../../../Type/base";
import {decrypt, encrypt, generateAESKey} from "../../../../Utils/encrypt";
import JSEncrypt from 'jsencrypt';
import {getBase64} from "../../../../Utils/fileUpload";
import {RcFile} from "antd/es/upload";

const {Dragger} = Upload;


const UploadFile = (props: any) => {
    const {value, onChange} = props;
    const [visible, setVisible] = useState(false);
    // console.log(value)
    const [fileName, setFileName] = useState(value?.name);
    const [previewImg,setPreviewImg] = useState('')
    const [fileDd,setFileDd] = useState<any|undefined>(undefined);
    const {RSAPbKey} = useSelector((state: IState) => state.KeyReducer)
    const [AESKey,setAESKey] = useState<any>();
    const dispatch = useDispatch();
    const setRSAPbKey = (data: any) => {
        dispatch({type: 'setRSAPbKey', data: data})
    }
    //初始传入的参数
    useEffect(() => {
        if(props.value?.name)
        {
            setFileName(value?.name)
            //如果是图片需要预览
            if(props.type === 'image')
            {
                setPreviewImg(value.url);
            }else{
                setFileDd(value.url);
            }
            //将其变为file_id
            onChange(value?.file_id);
        }
    }, [props.value])

    let nameList: string[] = []
    for (let nm of props.accept.split(",")) {
        nameList.push("*" + nm)
    }

    //始终使用file_id作为返回值
    const callback = (value: any) => {
        onChange(value.file_id)
    }

    const preUpload = async (file: any) => {
        //大小判断
        if(props.sizeLimit)
        {
            if(file.size/(1024*1024) > props.sizeLimit)//MB
            {
                return new Promise<void>((resolve,reject)=>{message.error('文件大小超过限制');return reject();})
            }
        }
        //如果是图片需要预览
        if(props.type === 'image')
        {
            const img = await getBase64(file as RcFile);
            setPreviewImg(img);
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
            const k = generateAESKey();
            setAESKey(k);
            file = await encrypt(file,k);
            // const file2 = await decrypt(file,k);
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
            // const rsaDecrypt = new JSEncrypt();
            // rsaDecrypt.setPrivateKey("-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGDXGYbmEro5dN 6Ja/co12cyop250rQ3qHeFSjIom0l576zmci9b6u25EvzDAMcm0zQMOhkZ6k1zZQ agZkut7kVLLGxWOrGAELS9YrrXpd5z+SJ6Vka2oq0c8alxfGJWIQkrSVw2h9EZeI dND2bWB9SIB1a7qCkaoGVfDEKyBaQZI6eQvoKizSM17324I/V3strBS8GXy4xWoq pBvnqQj+s1uP6hHPq8hlHrgzFfcwLVSjUKqLvADzHJkuasqrgPWKMVhDG+Scsxsn w7S96JwJyjFPpsDXvN/TTtiMTXROIi5BhcqyNoOOWn+xKyc7IWjiBSK7uaE0J1VA wEs96tuVAgMBAAECggEABMBn0Z9m/L61BO0n82SSg51UYqKz4kjWf2TiAElLgntX bhmrnHQcOg0R2P1jcw5VE7NhviuZ4cc5X16Gfr4uViNjZ/oZCmQjX5usghRsaM+r 1RwsZKdgabHqRRoLkPkZTDUo2KWn3nBLRr5+u5rOLiiiJFm2+iZNLPpnh11S2QzK Lcb1w5aAbWoaw4rw2GR1SOa/Ww65/U0zE2ltnajoovdeom0uirqn+wGBBiNRbWV5 8ZYBjHwqiaPyrSvhgiRJKZMMUTm/juzd1vPk66jgNutF6haRwb1G1RYGBCQaXkoo 63ZSvvvjKyP9PpRqVqMTB4aO+CSP0AOPdE0Xf9Y69QKBgQDzpQbq2HR0kaUziI86 s5WjxYYte7MkbkCWDYovaodnLSGY+Ti0EZ4FkJp1nAeLwsw9EFGBVqH+3369TOrf QjdI0QjB0teDHZ3vn1njEt6QIUJcfyzFO7Om0ALIdm402r3t01xS/Jw4WK+lmmYv wG5/Y8TELJ6EwvpwwRDOg4YlNwKBgQDQGIs5H4OR8y+Lf7xzSfwSxqFGh8D4mvkg NjOJGlNZ3+VnVjGPr9tIA4uwxAvUwtGYrTfaYQ3LE5eDBL1oSXa5m8NjbsqFiCGV EQ8K/1tB8TBfT7gmN4TsbjxqebZ2CdsEvRZ+LAd2uyZ5gEZdLRPJibcywYvlJ2nf QcfxJxbrkwKBgEE665Ewhm03GS2k4APtVKDWH0hKF/om8m+6DEcJlFrRQG9+Oeor 1UzUHCZksbh/XML0fX3NPe3I1FvGHhPL3JVIMboCwuQ9p60h0qTyxld8MBInkkrz 4vNEOZqF6peIANWNguhM7V5AkDYcEkOyl2LPyTxkXcRZl0dcyS0hFWcdAoGAUM9X MWWliEXxzrBaFENE2l28P1F0hJZZ7EJgHPvWJm6l/U0hjfTyqLKHyqs3FPZawnlx 2SIbYyNGkSCEFT2CF23/oFtj1hsZP3QSbWjgnWj2Ke0hS+X/fnkIiSiezJPjM6Hi XDjo5RikRkakDIb2yirqs5EprGFz4bj/1gwiAHUCgYEA05FiiOLzoX3mfB3urTMB fvKEQOKM5hN7phUEocWOTg7buhvuWutYSBcAxzGWcvyySb8Tk6gKtcXebVOttv7w Vl2ww2lJ3DKRaiuJMkjBrGMJ1nufuHNd3bgRYHhdM2TPAraUI2pltC4RWVrdO12N 7P+JRiKnCtgaz3NDRaxwx7A= -----END PRIVATE KEY-----")
            // let de;
            // if(encryptedAESKey)
            // {
            //     console.log(rsaDecrypt.getPrivateKey())
            //     console.log(rsaEncrypt.getPublicKey())
            //     console.log(encryptedAESKey)
            //     de = rsaDecrypt.decrypt(encryptedAESKey);
            //     console.log('解密',de);
            // }
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
                // message.error('上传失败，请重新上传')
            })
    }
    return (
        <>
            {!isValueEmpty(value) ? (
                <>
                    {props.type === 'image' ?(<img alt='图片' src={previewImg} style={{height:'80px',marginRight:'20px',marginTop:'10px'}} />):(
                    <Button type={'link'} onClick={() => {
                       if(fileDd !== undefined) window.open(fileDd);
                    }}>{fileName||value?.name}</Button>)}
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
            label={props.label || undefined}
            {...props}
            required={props.required}
            rules={[{
                required:props.required,
            }]}
            // noStyle={props.label===undefined}
        >
            <UploadFile {...props} />
        </Form.Item>
    );
}

export default ItemUpload;