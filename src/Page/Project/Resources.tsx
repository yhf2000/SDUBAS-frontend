import Course from "./Course";
import {Button, Card, Form, Input, List, Tabs} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "../../Config/CSS/Resources.css";
import React, {useState} from "react";
import ItemTitle from "../../Component/Common/Form/Item/ItemTitle";
import FileUpload from "../../Component/Common/FileUpload";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import ProCard from "../../Component/Project/ProCard";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
import {arraytostr} from "../../Utils/arraytostr"; // 导入自定义样式

const Resources = () => {
    const location = useLocation();
    const navigate = useNavigate();
    function handleClick(item: any) {
        navigate(`/c/project-info/${item.id}`);
    }

    return (
        <div>
            <Card
                title={'教学资源'}
                extra={(
                    <ModalFormUseForm
                        titile={'新建资源'}
                        type={'create'}
                        btnName={'新建资源'}
                        TableName={'ResourceProjectMainTable'}
                        subForm={[
                            {
                                component: ProjectForm1,
                                label: "",
                            },
                            {
                                component: ProjectForm2({service_type:7,pathname:location.pathname}),
                                label: ""
                            }
                        ]}
                        dataSubmitter={(value: any) => {
                            value.tag = arraytostr(value.tag);
                            return Api.newPro({
                                data: value
                            });
                        }}
                    />
                )}
            >
                <TableWithPagination
                    name={'ResourcesTable'}
                    useList={true}
                    API={async (data: any) => {
                        return Api.getProListByType({data: {...data, projectType: "课程",tag:''}})
                    }}
                    // initData={initData}
                    renderItem={(item: any) => {
                        return (
                            <List.Item key={item.name}>
                                <ProCard item={item} onClick={() => handleClick(item)}
                                         TableName={'ResourceProjectMainTable'}
                                         pathname={location.pathname}
                                />
                            </List.Item>
                        )
                    }}
                />
            </Card>
        </div>

    );
};

export default Resources;