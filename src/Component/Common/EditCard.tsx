import {useState} from "react";
import {Button, Card, message} from "antd";
import TextArea from "antd/es/input/TextArea";

const EditCard = (props:any)=>{
    const [editing, setEditing] = useState(false);
    const [content,setContent] = useState(props.content);

    const handleEdit = ()=>{
        setEditing(true);
    }

    const handleSave = ()=>{
        props.API({note:content}).then(()=>{
            // console.log('note',content);
            message.success('保存成功')
        }).catch(()=>{})
        setEditing(false);
    }
    const handleChange = (value:any)=>{
        setContent(value);
    }
    return (
        <Card
            title={props.title}
            className={props.className}
            extra={
                editing ? (
                    <Button type="link" onClick={handleSave}>
                        保存
                    </Button>
                ) : (
                    <Button type="link" onClick={handleEdit}>
                        编辑
                    </Button>
                )
            }
        >
            {editing ? (
                <TextArea value={content} onChange={(e)=>handleChange(e.target.value)}/>
            ) : (
                <p>{content}</p>
            )}
        </Card>
    );
}

export default EditCard;