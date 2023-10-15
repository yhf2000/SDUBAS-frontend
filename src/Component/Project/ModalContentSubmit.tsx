import {Button, Form, Input, Modal} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {useEffect, useState} from "react";
import projectInfo from "../../Page/Project/ProjectInfo";
import {Api} from "../../API/api";
import ItemUpload from "../Common/Form/Item/ItemUpload";
import SubmissionSForm from "./Form/SubmissionSForm";

const ModalContentSubmit = (props: any) => {
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
            title: "提交",
            key: "submit",
            render: (_: any, rows: any) => {
                return (rows.commit===0?<SubmissionSForm pId={props.pId} cId={props.cId} rows={rows} />
                        :<span>已提交</span> //如果需要
                )
            }
        },
    ];
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewSubmission = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    useEffect(()=>{},[props.cId])
    // console.log('contentId',props.cId);
    return (
        <div>
            <div style={{float: "right", marginRight: 6}}>
                <Button onClick={handleViewSubmission}>查看需提交内容</Button>
            </div>

            <Modal
                title="Submission List"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <TableWithPagination
                    name={`SubmitContentTable-${props.cId}`}
                    API={async (data: any) => {
                        return Api.getPCSubmission({
                            pId:props.pId,
                            data: {

                                // userId: props.userId ?? "1",
                                contentId: props.cId,
                                ...data
                            }
                        })
                    }}
                    columns={columns}
                />
            </Modal>
        </div>
    );
}

export default ModalContentSubmit;