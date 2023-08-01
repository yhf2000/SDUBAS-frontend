import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {Api} from "../API/api";
import {Button, Card} from "antd";
import '../Config/CSS/ResourceInfo.css'

const TResourceInfo = () => {
    return (
        <div>
            <h2 className="resource-info-title">项目资源详情</h2>
            <TableWithPagination
                className="resource-info-table"
                title={"项目资源详情"}
                API={"getResource"}
                columns={[
                    {
                        title: "名称",
                        dataIndex: "name",
                    },
                    {
                        title: "描述",
                        dataIndex: "description",
                    },
                    {
                        title: "预览",
                        dataIndex: "preview",
                        render: () => {
                            return <Button type={"link"}>预览</Button>;
                        },
                    },
                    {
                        title: "下载",
                        dataIndex: "download",
                        render: (row: any) => {
                            return row && <Button type={"link"}>下载</Button>;
                        },
                    },
                ]}
            />
        </div>
    );
}

export default TResourceInfo;