import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';


const FileUpload = () => {
    const handleUpload = (info: any) => {
        if (info.file.status === 'done') {
            console.log('File uploaded successfully');
        } else if (info.file.status === 'error') {
            console.log('File upload failed');
        }
    };

    return (
        <Upload
            name="file"
            action="/upload-url"
            onChange={handleUpload}
        >
            <Button icon={<UploadOutlined/>}>上传</Button>
        </Upload>
    );
}

export default FileUpload;