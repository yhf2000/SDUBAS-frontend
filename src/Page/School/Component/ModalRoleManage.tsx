import {Button, Card, Form, Input, message, Modal} from "antd";
import ModalFormUseForm from "../../../Component/Common/Form/ModalFormUseForm";
import RoleManageForm from "../../../Component/Permission/Form/RoleManageForm";
import {Api} from "../../../API/api";
import TableWithPagination from "../../../Component/Common/Table/TableWithPagination";
import {AssignmentForm} from "../../../Component/Permission/Form/Assignment";
import DeleteConfirm from "../../../Component/Common/DeleteConfirm";
import getData from "../../../API/getData";
import React, {useState} from "react";
import {useDispatch} from "../../../Redux/Store";
import ItemPermission from "../../../Component/Permission/Form/Item/ItemPermission";


interface propsType {
    TableName: string;
    objectId: string;
    type: string;
}

const ModalRoleManage = (props: any) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Button type={props.btnType || 'primary'} onClick={() => {
                setVisible(true)
            }}>角色管理</Button>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                onOk={() => {
                    setVisible(false)
                }}
            >
                <Card
                    extra={
                        (
                            props.newRole ? (<ModalFormUseForm
                                title={'添加角色'}
                                type={'create'}
                                btnName={'添加角色'}
                                TableName={props.TableName}
                                subForm={[
                                    {
                                        component: RoleManageForm({service_type:props.service_type}),
                                        label: ''
                                    },
                                ]}
                                dataSubmitter={async (data: any) => {
                                    // console.log(data);
                                    return Api.newDefaultRole({data: data});
                                }}
                            />) : null
                        )
                    }
                >
                    <TableWithPagination
                        API={async (data: any) => {
                            console.log('id',props.service_id)
                            return Api.getWorkRole({data: {...data,service_type:props.service_type,service_id:props.service_id}})//可能需要请求对象的id,type;
                        }}
                        name={props.TableName}
                        columns={[
                            {
                                title: '角色名',
                                key: 'role_name',
                                dataIndex: 'role_name'
                            },
                            {
                                title: '操作',
                                key: 'operator',
                                render: (_: any, row: any) => {
                                    return (
                                        <>
                                            {
                                                props.newRole &&
                                                (<ModalFormUseForm
                                                    title={'编辑角色'}
                                                    TableName={props.TableName}
                                                    btnName={'编辑'}
                                                    type={'update'}
                                                    subForm={[
                                                        {
                                                            component: (
                                                                <>
                                                                    <Form.Item name={'role_name'}>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                    <Form.Item name={'privilege'}>
                                                                        <ItemPermission service_type={props.service_type}/>
                                                                    </Form.Item>
                                                                </>
                                                            ),
                                                            label: ''
                                                        },
                                                    ]}
                                                    // dataSubmitter={async (values: any) => {
                                                    //     return Api.updateUser({: row.id, data: values})
                                                    // }}
                                                    initData={row}//还需要有权限,或者使用dataLoader
                                                />)
                                            }
                                            <AssignmentForm roleId={row.role_id} {...props}/>
                                        </>
                                    )
                                }
                            }
                        ]}
                    />
                </Card>
            </Modal>
        </>
    )
}

export default ModalRoleManage;