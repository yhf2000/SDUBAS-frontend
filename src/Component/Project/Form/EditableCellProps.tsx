import { useState } from 'react';
import { Input, Upload, Button } from 'antd';
import { UploadOutlined,CloseCircleOutlined } from '@ant-design/icons';

interface EditableCellProps {
    value: string;
    onChange: (value: string) => void;
    isEditing: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange, isEditing }) => {
    const [editingValue, setEditingValue] = useState(value);
    const [file, setFile] = useState<any>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingValue(e.target.value);
    };

    const handleFileUpload = (file: any) => {
        setFile(file);
        onChange(file.name);
    };

    const handleCancelUpload = () => {
        setFile(null);
        onChange('');
    };

    return (
        <div>
            {isEditing ? (
                <Input value={editingValue} onChange={handleTextChange} />
            ) : (
                <span>{value}</span>
            )}
            {isEditing && (
                <Upload
                    beforeUpload={(file) => {
                        handleFileUpload(file);
                        return false; // 阻止自动上传
                    }}
                >
                    {file ? (
                        <Button onClick={handleCancelUpload} type="link" icon={<CloseCircleOutlined />} />
                    ) : (
                        <Button icon={<UploadOutlined />} />
                    )}
                </Upload>
            )}
        </div>
    );
};

export default EditableCell;