import {Button, Card, Col, Image, List, message, Modal, Row, Space} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import getData from "../../API/getData";
import DeleteConfirm from "../../Component/Common/DeleteConfirm";
import React from "react";
import {useDispatch} from "../../Redux/Store";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import {Link, useNavigate} from "react-router-dom";
import {SchoolForm} from "../../Component/User/Form/SchoolForms";
import AssignRole from "../../Component/Permission/AssignRole";

const School = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <div className={"table-container"}>
            <Card
                title={'学校管理'}
                headStyle={{textAlign:'left'}}
                style={{minWidth:'1000px'}}
                extra={
                    (
                        <>
                            <ModalFormUseForm
                                title={'添加学校'}
                                type={'create'}
                                btnName={'添加学校'}
                                TableName={'SchoolTable'}
                                subForm={[
                                    {
                                        component: SchoolForm,
                                        label: ""
                                    }
                                ]}
                                dataSubmitter={async (data: any) => {
                                    // console.log(data)
                                    return Api.newSchool({data: data})
                                }}
                            />
                        </>
                    )
                }
            >
                <TableWithPagination
                    name={'SchoolTable'}
                    API={async (data: any) => {
                        return Api.getSchool({data: data})
                    }}
                    useList={true}
                    renderItem={
                        (row: any) => {
                            return (
                                <>
                                    <List.Item>
                                        <Row gutter={16} style={{minWidth:'800px'}}>
                                            <Col>
                                                <Image src={row.image} alt={'学校校徽'} style={{height:'80px'}}/>
                                            </Col>
                                            <Col flex={'auto'}>
                                                <Button type={'link'} onClick={() => {
                                                    navigate(`/c/school/${row.id}/college`, {state: {row: row}})
                                                }}>{row.name}</Button>
                                            </Col>
                                            <Col>
                                                <ModalFormUseForm
                                                    title={'编辑学校'}
                                                    TableName={'SchoolTable'}
                                                    btnName={'编辑'}
                                                    type={'update'}
                                                    subForm={[
                                                        {
                                                            component: SchoolForm,
                                                            label: "",
                                                        }
                                                    ]}
                                                    dataSubmitter={async (values: any) => {
                                                        return Api.updateSchool({sId: row.id, data: values})
                                                    }}
                                                    initData={{name:row.name,school_abbreviation:row.school_abbreviation,school_logo_id:{url:row.image,file_id:row.school_logo_id,file_name:'学校logo'}}}//还需要有权限,或者使用dataLoader
                                                />
                                            </Col>
                                            <Col>
                                                <DeleteConfirm
                                                    onConfirm={() => {
                                                        dispatch(getData(
                                                            'deleteSchool',
                                                            {sId: row.id},
                                                            (res: any) => {
                                                                AddTableVersion('SchoolTable')
                                                                message.success('删除成功')
                                                                return Promise.resolve(res);
                                                            },
                                                            (error: any) => {
                                                                message.error('删除失败');
                                                            }
                                                        ));
                                                    }}//删除的Api
                                                    content={
                                                        <Button type={'link'} danger={true}>删除</Button>
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </List.Item>
                                </>
                            )
                        }
                    }
                />
            </Card>
        </div>
    )
}

export default School;