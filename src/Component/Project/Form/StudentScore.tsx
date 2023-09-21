import {Button, Form, Input} from "antd";
import ModalFormUseForm from "../../Common/Form/ModalFormUseForm";
import ItemNumber from "../../Record/Form/Item/ItemNumber";
import TableWithPagination from "../../Common/Table/TableWithPagination";
import {Api} from "../../../API/api";
import SubmissionSForm from "./SubmissionSForm";
import ItemType from "../../Common/Form/Item/ItemType";
import ItemText from "../../Common/Form/Item/ItemText";


const columns = [
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "提交类型",
        dataIndex: "type",
        key: "type",
        render:(type:any)=>(type===0?<span>文本</span>:<span>文件</span>)
    },
    {
        title: "查看提交",
        key: "view",
        render: (_: any, rows: any) => {
            return <Button type={'link'} >查看</Button>
        }
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
            <ItemNumber name={'score'} label={'成绩'}/>

            <ItemType name={'is_pass'} label={'通过'} options={[
                {
                    key:0,
                    value:"通过"
                },
                {
                    key:1,
                    value: '不通过'
                }
            ]}/>
            <ItemText name={'comment'} label={'评论'} />
            <TableWithPagination
                name={`StudentSubmissionTable`}
                API={async (data: any) => {
                    return Api.getPCSubmission({
                        pId: props.pId,
                        data: {
                            contentId:props.cId,
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
                    console.log('sub',data);
                    return Api.scoreProCon({cId:props.cId,pId:props.pId,data:data});
                }}
            />
        </>
    );
}

export default StudentScore;