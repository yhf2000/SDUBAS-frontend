import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import StudentScore from "./Form/StudentScore";


const Score = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const columns = [
        {
            title: "学生",
            dataIndex: 'user_name',
            key: 'student',
        },
        {
            title: "成绩",
            key: 'score',
            dataIndex: 'score',
            render: (score: any, row: any) => {
                // console.log('row',row);
                return (
                    <>
                        {
                            score !== null ? <span>{score}</span> :
                                <StudentScore uId={row.user_id} cId={props.cId} pId={props.pId}/>
                        }
                    </>
                )
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
                    search={true}
                    columns={columns}
                />
            </Modal>
        </>
    );
}

export default Score;