import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import StudentScore from "./Form/StudentScore";



const Score = (props:any) => {
    const [modalVisible, setModalVisible] = useState(false);

    const columns = [
        {
            title: "学生",
            key: 'student',
        },
        {
            title: "成绩",
            key: 'score',
            dataIndex: 'score',
            render: (score: any,row:any) => {
                return (
                    <>
                        {
                            score !== undefined ? <span>{score}</span> : <StudentScore uId={row.id} cId={props.cId}/>
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
            <div style={{float: "right", marginRight: 6}}>
                <Button onClick={handleViewSubmission}>评分</Button>
            </div>
            <Modal
                title="Submission List"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <TableWithPagination
                    name={`StudentScoreTable}`}
                    API={async ()=>{return true}}
                    columns={columns}
                />
            </Modal>
        </>
    );
}

export default Score;