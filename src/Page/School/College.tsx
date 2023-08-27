import Title from "antd/es/typography/Title";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Image, List, message, Modal, Row} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import getData from "../../API/getData";
import DeleteConfirm from "../../Component/Common/DeleteConfirm";
import React from "react";
import {useDispatch} from "../../Redux/Store";
import {CollegeForm} from "../../Component/User/Form/SchoolForms";

const College = () => {
    const location = useLocation();
    const {row} = location.state;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Image src={row.image} alt={'学校图片'}/>
            <Title level={2}>{row.name}</Title>
            <Card
                extra={
                    (
                        <ModalFormUseForm
                            title={'添加学院'}
                            TableName={row.id + 'CollegeTable'}
                            type={'create'}
                            btnName={'添加学院'}
                            subForm={[
                                {
                                    component: () => CollegeForm({school_id: row.id}),
                                    label: '',
                                }
                            ]}
                            dataSubmitter={async (data: any) => {
                                console.log(data);
                                return Api.newCollege({data: data})
                            }}
                        />

                    )
                }
            >
                <TableWithPagination
                    name={row.id + 'CollegeTable'}
                    API={async (data: any) => {
                        return Api.getCollege({data:{school_id:row.id,...data}})
                    }}
                    useList={true}
                    renderItem={(item: any) => {
                        return (
                            <List.Item>
                                <Row>
                                    <Col>
                                        <Image src={item.image} alt={'学院院徽'}/>
                                    </Col>
                                    <Col flex={'auto'}>
                                        <Button type={'link'}
                                                onClick={() => navigate(`/c/${row.id}/${item.id}/MajorClass`, {
                                                    state: {
                                                        school: row,
                                                        college: item
                                                    }
                                                })}>{item.name}</Button>
                                    </Col>
                                    <Col>
                                        <ModalFormUseForm
                                            title={'编辑学院'}
                                            TableName={row.id + 'CollegeTable'}
                                            type={'update'}
                                            btnName={'编辑'}
                                            subForm={[
                                                {
                                                    component: CollegeForm,
                                                    label: ''
                                                }
                                            ]}
                                            // dataLoader={async ()=>{return }}
                                            dataSubmitter={async (data: any) => {
                                                return Api.updateCollege({cId: item.id, data: data})
                                            }}
                                            initData={item}
                                        />
                                    </Col>
                                    <Col>
                                        <DeleteConfirm
                                            onConfirm={() => {
                                                dispatch(getData(
                                                    'deleteCollege',
                                                    {cId: item.id},
                                                    (res: any) => {
                                                        AddTableVersion(row.id + 'CollegeTable')
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
                        );
                    }}
                />
            </Card>
        </>
    )
}

export default College;