import Course from "./Course";
import {Button, Card, Form, Input, Tabs} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {Api} from "../API/api";
import {Link, useNavigate} from "react-router-dom";
import "../Config/CSS/Resources.css";
import React, {useState} from "react";
import ItemTitle from "../Component/Common/Form/Item/ItemTitle";
import FileUpload from "../Component/Common/FileUpload";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm"; // 导入自定义样式

const Items = [
    {
        key: '0',
        label: '我的',
    },
    {
        key: '1',
        label: '所有',
    },
]

const Resources = () => {
    const newItem = (
        <>
            <ItemTitle/>
        </>
    )
    const [activeLabel, setActiveLabel] = useState<string>(Items[0].label);
    const handleTabChange = (label: string) => {
        setActiveLabel(label);
    };
    const navigate = useNavigate();
    return (
        <div>
            <Tabs activeKey={activeLabel} onChange={handleTabChange}
                  items={Items.map((item: any) => {
                      return {
                          key: item.label,
                          label: item.label,
                      }
                  })}
            >
            </Tabs>
            <Card
                className="resources-card"
            >
                {activeLabel === '所有' && (
                    <TableWithPagination
                        className="resources-table" // 使用自定义样式类
                        API={"getResource"}
                        columns={[
                            {
                                title: "项目",
                                dataIndex: "name",
                                render: (title: any) => {
                                    return (
                                        <>
                                            <Link to={'/c/tresource-info'}>{title}</Link>
                                        </>
                                    );
                                }
                            },
                        ]}
                    />

                )}
                {activeLabel === '我的' && (
                    <>
                    </>
                )}
            </Card>
        </div>

    );
};

export default Resources;