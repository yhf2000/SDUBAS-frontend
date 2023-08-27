import React, {useState} from "react";
import {Button, Card, Col, Divider, message, Modal, Row} from "antd";
import Meta from "antd/es/card/Meta";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import {Api} from "../../API/api";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import getData from "../../API/getData";
import ProjectForm1 from "./Form/ProjectForm1";
import {useTranslation} from "react-i18next";
import DeleteConfirm from "../Common/DeleteConfirm";
import {useDispatch} from "../../Redux/Store";
import RoleManageForm from "../Permission/Form/RoleManageForm";
import modalContentSubmit from "./ModalContentSubmit";
import ProjectForm2 from "./Form/ProjectForm2";
import AssignRole from "../Permission/AssignRole";
// import ProjectForm2 from "./Form/ProjectForm2";


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


export default function ProCard({item, onClick,TableName}: any) {
    const [t] = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const AddTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name});
    }


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
                                {item.credit && <div>学分:{item.credit}</div>}
                                <div>日期:{item.date}</div>
                            </div>
                        }
                    />
                </Col>
                <Col>
                    {item.score && <div style={{textAlign: 'center'}}>成绩: {item.score}</div>}
                    <Divider type={'horizontal'}/>
                    {item.progress && (<div style={{textAlign: 'center'}}>
                        个人进度: {item.progress} / {item.totalProjects}
                    </div>)}
                </Col>
                <Col style={{display:'flex'}}>
                    <ModalFormUseForm
                        title={t('updateProject')}
                        btnType={'link'}
                        TableName={TableName}
                        btnName={'编辑'}
                        width={1000}
                        subForm={[
                            {
                                component: ProjectForm1,
                                label: '',
                            },
                            {
                                component: ProjectForm2,
                                label:'',
                            }
                        ]}
                        dataLoader={async () => {
                            return Api.getProInfo({pId:item.id}).then((res:any)=>{

                                return Promise.resolve(res);
                            }).catch(()=>{})
                        }}
                        dataSubmitter={(value: any) => {
                            console.log('data:',value);
                            return Api.updatePro({pId: item.id, data: value});
                        }}
                    />
                    <AssignRole />
                    <DeleteConfirm
                        onConfirm={() => {
                            dispatch(getData(
                                'deletePro',
                                {pId: item.id},
                                (res: any) => {
                                    AddTableVersion(TableName)
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
        </Card>
    )
}