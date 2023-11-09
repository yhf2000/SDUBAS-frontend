import React, {useState} from "react";
import {Button, Card, Col, Divider, Image, message, Modal, Row} from "antd";
import Meta from "antd/es/card/Meta";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import {Api} from "../../API/api";
import getData from "../../API/getData";
import ProjectForm1 from "./Form/ProjectForm1";
import {useTranslation} from "react-i18next";
import DeleteConfirm from "../Common/DeleteConfirm";
import {useDispatch} from "../../Redux/Store";
import ProjectForm2 from "./Form/ProjectForm2";
import ModalRoleManage from "../../Page/School/Component/ModalRoleManage";
import {arraytostr} from "../../Utils/arraytostr";
import {useNavigate} from "react-router-dom";


export default function ProCard({item, TableName, pathname}: any) {
    const [t] = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name});
    }
    return (
        <Card
            style={{
                transform: isHovered ? 'translateY(-6px)' : 'none',
                transition: 'transform 0.2s ease', cursor: 'pointer',
            }}
        >
            <Row gutter={16} style={{minWidth:'1200px'}}>
                <Col span={4} style={{height: "80px"}}>
                    <Image
                        src={item.url}
                        // src={"https://th.bing.com/th?id=OIP.nkWmM-lReaN8kH-ieXmZrQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
                        alt="Item Image" style={{height: '80px'}} preview={false}/>
                </Col>
                <Col span={16}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={() => {
                         navigate(`/c/project-info/${item.id}`, {state: {url: item.url, item: item}});
                     }}
                >
                    <div
                        style={{fontWeight: 'bold', textAlign: 'center', justifyContent: 'center'}}>{item.name}</div>
                </Col>
                {/*<Col>*/}
                {/*    {item.score && <div style={{textAlign: 'center'}}>成绩: {item.score}</div>}*/}
                {/*    <Divider type={'horizontal'}/>*/}
                {/*    {item.progress && (<div style={{textAlign: 'center'}}>*/}
                {/*        个人进度: {item.progress} / {item.totalProjects}*/}
                {/*    </div>)}*/}
                {/*</Col>*/}
                <Col style={{display: 'flex',justifyContent:'flex-start'}} span={4}>
                    <ModalFormUseForm
                        title={t('编辑项目')}
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
                                component: ProjectForm2({service_type: 7, pathname: pathname}),
                                label: '',
                            }
                        ]}
                        dataLoader={async () => {
                            return Api.getProInfo({pId: item.id})
                        }}
                        // initData={{img_id:{name:'what',file_id:19}}}
                        dataSubmitter={(value: any) => {
                            value.tag = arraytostr(value.tag);
                            // console.log('va',value)
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