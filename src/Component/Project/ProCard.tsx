import React, {useState} from "react";
import {Button, Card, Col, Divider, message, Row} from "antd";
import Meta from "antd/es/card/Meta";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import {Api} from "../../API/api";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import getData from "../../API/getData";
import ProjectForm from "./Form/ProjectForm";
import {useTranslation} from "react-i18next";
import DeleteConfirm from "../Common/DeleteConfirm";
import {useDispatch} from "../../Redux/Store";
import RoleManageForm from "../Common/RoleManageForm";


const initialValues = {
    roles: [
        {
            roleName: '角色1',
            assignedUsers: ['用户1', '用户2'],
        },
        {
            roleName: '角色2',
            assignedUsers: ['用户3', '用户4'],
        },
    ],
};


export default function ProCard({item, onClick}: any) {
    const [t] = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    return (
        <Card
            style={{
                transform: isHovered ? 'translateY(-6px)' : 'none',
                transition: 'transform 0.2s ease', cursor: 'pointer'
            }}
        >
            <Row gutter={16}>
                <Col span={4}>
                    <img src={item.proImage} alt="Item Image" style={{width: '100%', height: 'auto'}}/>
                </Col>
                <Col span={16}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={onClick}
                >
                    <Meta
                        title={<div
                            style={{fontWeight: 'bold', textAlign: 'center'}}>{item.name}</div>}
                        description={
                            <div style={{
                                display: 'flex',
                                gap: '200px',
                                marginLeft: '300px',
                                marginTop: '50px'
                            }}>
                                <div>学分:{item.credit}</div>
                                <div>日期:{item.date}</div>
                            </div>
                        }
                    />
                </Col>
                <Col>
                    <div style={{textAlign: 'center'}}>成绩: {item.score}</div>
                    <Divider type={'horizontal'}/>
                    <div style={{textAlign: 'center'}}>
                        个人进度: {item.progress} / {item.totalProjects}
                    </div>
                </Col>
                <Col>
                    <ModalFormUseForm
                        title={'角色管理'}
                        btnName={'角色管理'}
                        width={700}
                        initData={initialValues}
                        subForm={[
                            {
                                component: <RoleManageForm/>,
                                label: ""
                            }
                        ]}
                        dataSubmitter={()=>{return Promise.resolve('xxx')}}//角色管理的API
                    />
                </Col>
                <Col>
                    <ModalFormUseForm
                        title={t('updateProject')}
                        type={'update'}
                        subForm={[
                            {
                                component: ProjectForm,
                                label: '',
                            }
                        ]}
                        // dataLoader={async () => {
                        //     return Api.getProInfo({pId:item.id}).then((res:any)=>{
                        //         return Promise.resolve(res);
                        //     }).catch(()=>{})
                        // }}
                        initData={{
                            name: "数据结构",
                            type: '2',
                            tag: '1',
                            img_id: '1',
                            credit: undefined,
                            active: '1',
                            contents: [
                                {
                                    id:'1',
                                    type: '2',
                                    name: "数据结构课设",
                                    weight: '0.5'
                                },
                                {
                                    id:'2',
                                    type: '0',
                                    name: "数据结构课设1",
                                    weight: '0.5',
                                    faId: '1'
                                },
                                {
                                    id:'3',
                                    type: '0',
                                    name: "数据结构课设2",
                                    weight: '0.5',
                                    faId: '2'
                                },
                                {
                                    id:'4',
                                    type: '0',
                                    name: "数据结构课设3",
                                    weight: '0.5'
                                }
                            ]
                        }}
                        dataSubmitter={(value: any) => {
                            return Api.updatePro({pId: item.id, data: value});
                        }}
                    />
                    <DeleteConfirm
                        onConfirm={() => {
                            dispatch(getData(
                                'deletePro',
                                {pId:item.id},
                                (res:any)=>{
                                    message.success('删除成功')
                                    return Promise.resolve(res);
                                },
                                (error:any)=>{
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
        </Card>
    )
}