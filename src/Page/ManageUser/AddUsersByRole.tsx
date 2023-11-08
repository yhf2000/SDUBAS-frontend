import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import { Card, Space} from "antd";
import {useLocation} from "react-router-dom";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import {BindForm1, EditUserForm} from "../../Component/User/Form/BindForm1";
import {BindForm2} from "../../Component/User/Form/BindForm";
import React from "react";
import {useDispatch} from "../../Redux/Store";
import BatchImport from "../../Component/Common/BatchImport";
import {sha256} from "js-sha256";

const AddUsersByRole = () => {
    const location = useLocation();
    const row = location.state.row;
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <Card
            // title={row.name}
            extra={(
                <Space>
                    <BatchImport
                        item={false}
                        API={async (data: any) => {
                            return Api.batchImport({data: {information_list:data,role_id:row.role_id}})
                        }}
                        TableName={`UsersMainTable${row.role_id}`}
                        btnName={'批量导入用户'}
                    />
                    <ModalFormUseForm
                        type={'create'}
                        btnName={'添加用户'}
                        TableName={`UsersMainTable${row.role_id}`}
                        subForm={[
                            {
                                component: BindForm2({role_id: row.role_id}),
                                label: '用户信息'
                            },
                            {
                                component: BindForm1,
                                label: '登录信息'
                            }
                        ]}
                        dataSubmitter={async (data: any) => {
                            data.enrollment_dt = data.enrollment_dt.split(' ')[0]
                            data.graduation_dt = data.graduation_dt.split(' ')[0]
                            data.password = sha256(data.password+data.username)
                            return Api.newUser({data: data});
                        }}
                    />
                </Space>
            )}
        >
            <TableWithPagination
                API={async (data: any) => {
                    return Api.getUsers({data: {...data, role_id: row.role_id}});
                }}
                name={'UsersMainTable'}
                columns={[
                    {
                        title: '学/工号',
                        dataIndex: 'cardId',
                        key: 'cardId'
                    },
                    {
                        title: '用户名',
                        dataIndex: 'user_name',
                        key: 'username'
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        render: (_: any, row: any) => {
                            return (
                                <>
                                    <ModalFormUseForm
                                        title={'编辑用户'}
                                        TableName={'UsersMainTable'}
                                        btnName={'编辑'}
                                        type={'update'}
                                        subForm={[
                                            {
                                                component: EditUserForm,
                                                label: '用户信息'
                                            },
                                        ]}
                                        // dataSubmitter={async (values: any) => {
                                        //     return Api.updateUser({: row.id, data: values})
                                        // }}
                                        initData={row}//还需要有权限,或者使用dataLoader
                                    />
                                    {/*<DeleteConfirm*/}
                                    {/*    onConfirm={() => {*/}
                                    {/*        dispatch(getData(*/}
                                    {/*            'deleteUser',*/}
                                    {/*            {sId: row.id},*/}
                                    {/*            (res: any) => {*/}
                                    {/*                AddTableVersion('UsersMainTable')*/}
                                    {/*                message.success('删除成功')*/}
                                    {/*                return Promise.resolve(res);*/}
                                    {/*            },*/}
                                    {/*            (error: any) => {*/}
                                    {/*                message.error('删除失败');*/}
                                    {/*            }*/}
                                    {/*        ));*/}
                                    {/*    }}//删除的Api*/}
                                    {/*    content={*/}
                                    {/*        <Button type={'link'} danger={true}>删除</Button>*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                </>
                            )
                        }
                    }
                ]}
            />
        </Card>
    )
}

export default AddUsersByRole;