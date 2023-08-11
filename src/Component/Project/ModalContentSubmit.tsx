import {Button, Modal} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {useState} from "react";
import projectInfo from "../../Page/ProjectInfo";

const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "作者",
        dataIndex: "author",
        key: "author",
    },
    {
        title: "日期",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
    },
];
const ModalContentSubmit = (props:any) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewSubmission = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

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
                    API={"submitProContent"}
                    columns={columns}
                    pId={props.pId}
                    cId={props.cId}
                />
            </Modal>
        </div>
    );
}

export default ModalContentSubmit;