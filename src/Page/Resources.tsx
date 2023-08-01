import Course from "./Course";
import { Button, Card } from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import { Api } from "../API/api";
import { useNavigate } from "react-router-dom";
import "../Config/CSS/Resources.css"; // 导入自定义样式

const Resources = () => {
    const navigate = useNavigate();
    return (
        <Card className="resources-card"> {/* 使用自定义样式类 */}
            <TableWithPagination
                className="resources-table" // 使用自定义样式类
                API={Api.getResource}
                columns={[
                    {
                        title: "项目",
                        dataIndex: "project",
                    },
                    {
                        title: "详情",
                        dataIndex: "detail",
                        render: () => {
                            return (
                                <Button
                                    className="resources-btn" // 使用自定义样式类
                                    type={"link"}
                                    onClick={() => navigate("/c/tresource-info")}
                                >
                                    查看详情
                                </Button>
                            );
                        },
                    },
                ]}
            />
        </Card>
    );
};

export default Resources;