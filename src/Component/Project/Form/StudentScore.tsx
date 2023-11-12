import {Button, Form, Input, Modal} from "antd";
import ModalFormUseForm from "../../Common/Form/ModalFormUseForm";
import ItemNumber from "../../Record/Form/Item/ItemNumber";
import TableWithPagination from "../../Common/Table/TableWithPagination";
import {Api} from "../../../API/api";
import ItemType from "../../Common/Form/Item/ItemType";
import ItemText from "../../Common/Form/Item/ItemText";
import TextArea from "antd/es/input/TextArea";
import {useState} from "react";


const MyRender = (props:any)=>{
    const [visible,setVisible] = useState(false);
    const {rows} = props;
    if(rows.content)//如果是文本的话
    {
        return (
            <>
                <Modal
                    open={visible}
                    onCancel={()=>{setVisible(false)}}
                >
                    <TextArea
                        title={'文本'}
                        disabled={true}
                        value={rows.content}
                    />
                </Modal>
                <Button type={'link'} onClick={()=>{setVisible(true)}}>查看</Button>
            </>
        )
    }
    return <Button type={'link'} onClick={()=>{window.open(rows.url)}}>下载</Button>
}
const columns = [
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "提交类型",
        dataIndex: "content",
        key: "type",
        render:(type:any)=>(type!==undefined?<span>文本</span>:<span>文件</span>)
    },
    {
        title: "查看提交",
        key: "view",
        render: (_: any, rows: any) => <MyRender rows={rows} />
    },
];

const StudentScore = (props: any) => {
    const scoreForm = (
        <>
            <Form.Item name={'honesty'} label={'诚信度'}>
                <Input/>
            </Form.Item>
            <Form.Item name={'honesty_weight'} label={'诚实度占比'}>
                <Input />
            </Form.Item>
            <Form.Item name={'user_id'} initialValue={props.uId} style={{display:'none'}}>
            </Form.Item>
            <ItemNumber name={'score'} label={'成绩'} max={100}/>

            <ItemType name={'is_pass'} label={'通过'} options={[
                {
                    key:1,
                    value:"通过"
                },
                {
                    key:0,
                    value: '不通过'
                }
            ]}/>
            <ItemText name={'comment'} label={'评论'} />
            <TableWithPagination
                name={`StudentSubmissionTable`}
                API={async (data: any) => {//该API获得学生在该内容的所有提交包括url
                    return Api.getUserSubmission({
                        pId: props.pId,
                        cId:props.cId,
                        data: {
                            userId:props.uId,
                            ...data
                        }
                    })
                }}
                columns={columns}
            />
        </>
    )
    return (
        <>
            <ModalFormUseForm
                title={'学生评分'}
                btnName={'评分'}
                btnType={'link'}
                TableName={`Student${props.cId}ScoreTable`}
                subForm={[
                    {
                        component: scoreForm,
                        label: '',
                    }
                ]}
                dataSubmitter = {async (data:any)=>{
                    // console.log('sub',data);
                    return Api.scoreProCon({cId:props.cId,pId:props.pId,data:data});
                }}
            />
        </>
    );
}

export default StudentScore;