import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {Api} from "../API/api";
import {Button, Card, Upload} from "antd";
import '../Config/CSS/ResourceInfo.css'
import FileUpload from "../Component/Common/FileUpload";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TResourceInfo = () => {
    const [t] = useTranslation();
    return (
        <div style={{display: 'flex', justifyContent: 'center',}}>
            <Card
                title={'项目资源详情'}
                extra={
                    <FileUpload/>
                }
                style={{width: '70%', alignItems: 'center', height: '100vh'}}
            >
                <TableWithPagination
                    className="resource-info-table"
                    title={"项目资源详情"}
                    API={"getProList"}
                    columns={[
                        {
                            title: "名称",
                            dataIndex: "name",
                            render:(name:string,row:any)=>{
                                return(
                                    <Link to={`/c/project-info/${row.pId}`}>
                                        {t(name)}
                                    </Link>
                                )
                            }
                        },
                        {
                            title: "描述",
                            dataIndex: "description",
                        },
                    ]}
                />
            </Card>
        </div>
    );
}

export default TResourceInfo;