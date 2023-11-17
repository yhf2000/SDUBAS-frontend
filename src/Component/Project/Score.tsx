import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Form, Input, Modal, Select, Space} from "antd";
import {useEffect, useState} from "react";
import StudentScore from "./Form/StudentScore";
import {tagOptions} from "../../Config/Project/data";


const Score = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const columns = [
        {
            title: "学生",
            dataIndex: 'user_name',
            key: 'student',
        },
        {
            title: "操作",
            key: 'operator',
            render: (score: any, row: any) => {
                // console.log('row',row);
                return (
                    <>
                        <StudentScore uId={row.user_id} cId={props.cId} pId={props.pId}/>
                    </>
                )
            }
        },
        {
            title: '成绩',
            key: 'score',
            dataIndex: 'score'
        },
        {
            title:'提交情况',
            key:'submit',
            render:(_:any,record:any)=>{
                return (<>{record.finish_count}/{record.total_count}</>)
            }
        },
        {
            title:'通过',
            key:'pass',
            dataIndex: 'is_pass',
            render:(pass:any)=>{
                if(pass)return <div style={{color:'green'}}>通过</div>
                else if(pass === false) return <div style={{color:'red'}}>未通过</div>
            }
        }
    ]
    const handleViewSubmission = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    return (
        <>
            <Button onClick={handleViewSubmission} type={'ghost'}>评分</Button>
            <Modal
                title="得分情况"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <TableWithPagination
                    name={`Student${props.cId}ScoreTable`}//某一内容所有学生成绩表
                    API={async (data: any) => {
                        return Api.getStuConScore({pId: props.pId, cId: props.cId, data: data})
                    }}
                    columns={columns}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={"用户名"} name={"user_name"}>
                                    <Input onPressEnter={onFinish}/>
                                </Form.Item>
                            </Space>
                        );
                    }}
                />
            </Modal>
        </>
    );
}

export default Score;