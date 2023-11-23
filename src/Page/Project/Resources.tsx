import {Card, Form, Input, List, Select, Space} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {useLocation, useNavigate} from "react-router-dom";
import "../../Config/CSS/Resources.css";
import React, {useEffect} from "react";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import ProCard from "../../Component/Project/ProCard";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
import {arraytostr} from "../../Utils/arraytostr";
import {tagOptions} from "../../Config/Project/data";
import {useDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base"; // 导入自定义样式

const Resources = () => {
    const location = useLocation();
    const navigate = useNavigate();
    function handleClick(item: any) {
        navigate(`/c/project-info/${item.id}`);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        Api.getUserPermission({data: {service_type: 7}})
            .then((res: any) => {
                    dispatch({type: 'setUserPermission', service_type: 7, data: res.map((e: any) => e.label)})
                }
            )
    }, [])
    return (
        <div className={"table-container"}>
            <Card
                title={'教学资源'}
                style={{minWidth: '1000px'}}
                headStyle={{textAlign: 'left'}}
                extra={(
                    <>
                        <ModalFormUseForm
                            title={'新建资源'}
                            type={'create'}
                            btnName={'新建资源'}
                            TableName={'ResourcesTable'}
                            subForm={[
                                {
                                    component: ProjectForm1({type: '教学资源'}),
                                    label: "",
                                },
                                {
                                    component: ProjectForm2({service_type: 7, pathname: location.pathname}),
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
                    </>
                )}
            >
                <TableWithPagination
                    name={'ResourcesTable'}
                    useList={true}
                    API={async (data: any) => {
                        if (data.tag)
                            data.tag = arraytostr(data.tag);
                        else data.tag = ''
                        return Api.getProListByType({data: {...data, projectType: "教学资源"}})
                    }}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={'标签'} name={'tag'}>
                                    <Select onChange={onFinish} mode={'multiple'} style={{width: 120, height: '30px'}}
                                            maxTagCount='responsive'>
                                        {tagOptions.map((option: any) => {
                                            return (<Select.Option key={option.key}
                                                                   value={option.value}>{option.value}</Select.Option>)
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item label={"名称"} name={"project_name"}>
                                    <Input onPressEnter={onFinish}/>
                                </Form.Item>
                            </Space>
                        );
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