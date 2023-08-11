// import './Record.css';
import {Avatar, Card, List} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";

const Information = () => {
    return (
        <div>
            <TableWithPagination
                API={"getProList"}
                columns={[{title: '题目', dataIndex: 'title', key: 'title'}, {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content'
                }, {title: '日期', dataIndex: 'date', key: 'date'}]}
            />
        </div>
    );
}

export default Information;