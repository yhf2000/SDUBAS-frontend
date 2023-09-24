import {Button, message, Modal, Upload} from "antd";
import {useState} from "react";
import {read, utils, writeFileXLSX} from 'xlsx';
import {InboxOutlined} from "@ant-design/icons";
import {Api} from "../../API/api";
import moment from "moment";

const {Dragger} = Upload;
const BatchImport = (props: any) => {
    const [visible, setVisible] = useState(false);
    const handleUpload = (file: any) => {

        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            let workbook = read(e.target?.result);
            let sheet = workbook.Sheets[workbook.SheetNames[0]];
            let arr = utils.sheet_to_json(sheet, {defval: ''});
            let newArr = arr.map((item: any) => {
                delete item.__EMPTY
                item.enrollment_dt = moment(new Date((item.enrollment_dt - 25569) * 86400 * 1000)).format('YYYY-MM-DD');
                item.graduation_dt = moment(new Date((item.graduation_dt - 25569) * 86400 * 1000)).format('YYYY-MM-DD');
                return item
            })
            setTimeout(() => {
                props.API(newArr).then(() => {
                        message.success('导入成功！');
                        setVisible(false);
                    }
                ).catch(()=>{message.error('导入失败')})
            }, 5000);
        };
    };

    return (
        <>
            <Button onClick={() => {
                setVisible(true)
            }} type={props.btnType||'primary'}>{props.btnName}</Button>
            <Modal
                title={props.btnName}
                open={visible}
                onCancel={() => setVisible(false)}
            >
                <Dragger
                    maxCount={1}
                    accept={'.xlsx'}
                    customRequest={({file}) => handleUpload(file)}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                </Dragger>
            </Modal>
        </>
    )
}

export default BatchImport;