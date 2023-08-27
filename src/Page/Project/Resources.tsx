import Course from "./Course";
import {Button, Card, Form, Input, List, Tabs} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Link, useNavigate} from "react-router-dom";
import "../../Config/CSS/Resources.css";
import React, {useState} from "react";
import ItemTitle from "../../Component/Common/Form/Item/ItemTitle";
import FileUpload from "../../Component/Common/FileUpload";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import ProCard from "../../Component/Project/ProCard";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2"; // 导入自定义样式

// const initData=[
//     {
//         'id':'2',
//         'name':'操作系统教案',
//         'credit':undefined,
//         'progress':undefined,
//         'totalProjects':undefined,
//         'date':'2023-8-11',
//         'proImage':'https://www.neea.edu.cn/res/Home/1711/171116582.jpg',
//         'score':undefined
//     }
// ]

const Resources = () => {
    const newItem = (
        <>
            <ItemTitle/>
        </>
    )
    const navigate = useNavigate();
    function handleClick(item: any) {
        navigate(`/c/project-info/${item.id}`);
    }
    return (
        <div>
            <Card
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
                                component:ProjectForm2,
                                label:""
                            }
                        ]}
                        dataSubmitter={(value: any) => {
                            // console.log('value:', value);
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
                        className="resources-table" // 使用自定义样式类
                        API={async (data:any)=>{return Api.getProList({data:data})}}
                        // initData={initData}
                        renderItem={(item: any) => {
                            return (
                                <List.Item key={item.name}>
                                    <ProCard item={item} onClick={() => handleClick(item)} TableName={'ResourceProjectMainTable'}/>
                                </List.Item>
                            )
                        }}
                    />
            </Card>
        </div>

    );
};

export default Resources;