import {Button, Card, Form, Input} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import {Api} from "../../API/api";
import React from "react";
import {useDispatch} from "../../Redux/Store";
import {useNavigate} from "react-router-dom";
import ItemPermission from "../../Component/Permission/Form/Item/ItemPermission";
import RoleManageForm from "../../Component/Permission/Form/RoleManageForm";
import "../../Config/CSS/Table.css";


const ManageUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <div className={"table-container"}>
            <Card
                title={'用户管理'}
                headStyle={{textAlign:'left'}}
                extra={(
                    <ModalFormUseForm
                        title={'添加角色'}
                        type={'create'}
                        btnName={'添加角色'}
                        TableName={'RolesMainTable'}
                        subForm={[
                            {
                                component: RoleManageForm({service_type: 0}),
                                label: ''
                            },
                        ]}
                        dataSubmitter={async (data: any) => {
                            console.log('sub', data);
                            return Api.addDefaultRole({data: data});
                        }}
                    />
                )}
            >
                <TableWithPagination
                    name={'RolesMainTable'}
                    API={async (data: any) => {
                        return Api.getRoles({data: data})
                    }}
                    columns={[
                        {
                            title: '角色名',
                            key: 'role_name',
                            dataIndex: 'role_name',
                            render: (name: any, row: any) => {
                                return (
                                    <Button type={'link'} onClick={() => {
                                        navigate(`/c/addUsers/${row.role_id}`, {state: {row: row}})
                                    }}>
                                        {name}
                                    </Button>
                                )
                            }
                        },
                        {
                            title: '操作',
                            key: 'operator',
                            render: (_: any, row: any) => {
                                return (
                                    <>
                                        <ModalFormUseForm
                                            title={'编辑角色'}
                                            TableName={'RolesMainTable'}
                                            btnName={'编辑'}
                                            type={'update'}
                                            subForm={[
                                                {
                                                    component: (
                                                        <>
                                                            <Form.Item name={'role_id'} style={{display:'none'}} initialValue={row.role_id}>
                                                            </Form.Item>
                                                            <Form.Item name={'role_name'}>
                                                                <Input/>
                                                            </Form.Item>
                                                            <Form.Item name={'privilege'}>
                                                                <ItemPermission service_type = {0}/>
                                                            </Form.Item>
                                                        </>
                                                    ),
                                                    label: ''
                                                },
                                            ]}
                                            dataSubmitter={async (values: any) => {
                                                return Api.updateRole({role_id: row.id, data: values})
                                            }}
                                            initData={row}//还需要有权限,或者使用dataLoader
                                        />
                                    </>
                                )
                            }
                        }
                    ]}
                />
            </Card>
        </div>
    )
}

export default ManageUsers;