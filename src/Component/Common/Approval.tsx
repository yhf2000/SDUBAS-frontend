import TableWithPagination from "./Table/TableWithPagination";
import {Button, Modal} from "antd";
import {useState} from "react";

interface Props {
    API: any;//用来请求申请数据的API
    columns: any;//表格的列
    TableName: string;//表格的名字，用来更新表格版本
}

const Approval: React.FC<Props> = ({API, columns, TableName}) => {
    const [visible,setVisible] = useState(false);
    return (
        <>
            <Button type={'primary'} onClick={()=>setVisible(true)}>查看申请</Button>
            <Modal
                open={visible}
                onCancel={()=>{setVisible(false)}}
                footer={null}
            >
                <TableWithPagination
                    name={TableName}
                    API={API}
                    columns={columns}
                />
            </Modal>
        </>
    )
}

export default Approval;