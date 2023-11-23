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
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";


export default function ProCard({item, TableName, pathname}: any) {
    const [t] = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const permission = useSelector((state: IState) => state.UserReducer.userPermission[7] ?? []);
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
            <Row style={{minWidth: '1200px'}}>
                <Col span={2} style={{height: "80px"}}>
                    <Image
                        src={item.url}
                        // src={"https://th.bing.com/th?id=OIP.nkWmM-lReaN8kH-ieXmZrQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
                        alt="Item Image" style={{height: '80px'}} preview={false}/>
                </Col>
                <Col span={5}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={() => {
                         if (item.active === 0) {
                             message.info('未开放');
                         } else {
                             navigate(`/c/project-info/${item.id}`, {state: {url: item.url, item: item}});
                         }
                     }}
                >
                    <div style={{fontWeight: 'bold', textAlign: 'center', justifyContent: 'center'}}>{item.name}</div>
                </Col>
                <Col span={2}>
                    {
                        item.active === 0 && <Button type={'text'} style={{color: 'red'}}>未开放</Button>
                    }
                    {
                        item.active === 1 && <Button type={'text'} style={{color: 'green'}}>进行中</Button>
                    }
                    {
                        item.active === 2 && <Button type={'text'} style={{color: 'yellow'}}>归档</Button>
                    }
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-start'}} span={4}>
                    {
                        permission.some((e: any) => e === '项目编辑') && (
                            <>
                                <ModalFormUseForm
                                    title={t('编辑项目')}
                                    type={'update'}
                                    TableName={TableName}
                                    btnName={'编辑'}
                                    width={1000}
                                    subForm={[
                                        {
                                            component: ProjectForm1({}),
                                            label: '',
                                        },
                                        {
                                            component: ProjectForm2({service_type: 7, pathname: pathname}),
                                            label: '',
                                        }
                                    ]}
                                    dataLoader={async () => {
                                        return Api.getProInfo({pId: item.id}).then((res: any) => {
                                            return res;
                                        })
                                    }}
                                    // initData={{img_id:{file_name:'what',url:"https://tse3-mm.cn.bing.net/th/id/OIP-C.dGSqeSYfrebW8r7baIn2BQAAAA?rs=1&pid=ImgDetMain"},type:'xx',contents:[{file_id:{file_name:'ww',url:'https://tse3-mm.cn.bing.net/th/id/OIP-C.dGSqeSYfrebW8r7baIn2BQAAAA?rs=1&pid=ImgDetMain'}}]}}
                                    dataSubmitter={(value: any) => {
                                        console.log(value)
                                        value.tag = arraytostr(value.tag);
                                        return Api.updatePro({pId: item.id, data: value});
                                    }}
                                />
                                <ModalRoleManage editable={false} newRole={false} newUser={false} btnType={'link'}
                                                 TableName={`Project${item.id}Roles`} service_type={7}
                                                 service_id={item.id}/>
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
                            </>
                        )
                    }
                </Col>
            </Row>
        </Card>
    )
}