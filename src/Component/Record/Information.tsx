// import './Record.css';
import {Avatar, Card, List} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";

const Information = () => {
    return (
        <div style={{maxWidth: "1500px", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)"}}>
            <TableWithPagination
                API={async (data: any) => {
                    return Api.getProListByType({data: {...data, projectType: '通知'}})
                }}
                columns={[
                    {
                        title: '标题',
                        dataIndex: 'title',
                        key: 'title'
                    },
                    {
                        title: '内容',
                        dataIndex: 'content',
                        key: 'content'
                    },
                    {
                        title: '日期',
                        dataIndex: 'date',
                        key: 'date'
                    }
                ]}
            />
        </div>
    );
}

export default Information;