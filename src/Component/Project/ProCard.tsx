import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Image, message, Modal, Row} from "antd";
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
import ProjectForm2 from "./Form/ProjectForm2";
import ModalRoleManage from "../../Page/School/Component/ModalRoleManage";
import {arraytostr} from "../../Utils/arraytostr";
import {useLocation, useNavigate} from "react-router-dom";
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


export default function ProCard({item,TableName,pathname}: any) {
    const [t] = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    // const [url,setUrl] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(item.url);
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
                    <Image src={item.url} alt="Item Image" style={{width: '100%', height: 'auto'}}/>
                </Col>
                <Col span={16}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={()=>{
                         navigate(`/c/project-info/${item.id}`,{state:{url:item.url,item:item}});
                     }}
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
                                {/*<div>日期:{item.date}</div>*/}
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
                        type={'update'}
                        TableName={TableName}
                        btnName={'编辑'}
                        width={1000}
                        subForm={[
                            {
                                component: ProjectForm1,
                                label: '',
                            },
                            {
                                component: ProjectForm2({service_type:7,pathname:pathname}),
                                label:'',
                            }
                        ]}
                        dataLoader={async () => {
                            return Api.getProInfo({pId:item.id})
                        }}
                        dataSubmitter={(value: any) => {
                            value.tag = arraytostr(value.tag);
                            return Api.updatePro({pId: item.id, data: value});
                        }}
                    />
                    <ModalRoleManage editable={false} newRole={false} newUser={false} btnType={'link'}
                                     TableName={`Project${item.id}Roles`} service_type={7} service_id={item.id}/>
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