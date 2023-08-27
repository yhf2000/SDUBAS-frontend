import {Button, Card, message} from "antd";
import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import {BindForm2, BindForm3} from "../../Component/User/Form/BindForm";
import {BindForm1} from "../../Component/User/Form/BindForm1";
import {Api} from "../../API/api";
import {SchoolForm} from "../../Component/User/Form/SchoolForms";
import React from "react";
import getData from "../../API/getData";
import DeleteConfirm from "../../Component/Common/DeleteConfirm";
import {useDispatch} from "../../Redux/Store";

const ManageUsers = () => {
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Card
                title={'用户管理'}
                headStyle={{fontSize: 28}}
                extra={(
                    <ModalFormUseForm
                        title={'添加用户'}
                        type={'create'}
                        btnName={'添加用户'}
                        TableName={'UsersMainTable'}
                        subForm={[
                            {
                                component: BindForm2,
                                label: '用户信息(1)'
                            },
                            {
                                component: BindForm3(),
                                label: '用户信息(2)'
                            },
                            {
                                component: BindForm1,
                                label: '登录信息'
                            }
                        ]}
                        dataSubmisster={async (data:any)=>{
                            return Api.newUser({data:data});
                        }}
                    />
                )}
            >
                <TableWithPagination
                    name={'UsersMainTable'}
                    API={async (data: any) => {
                        return Api.getUsers({data: data})
                    }}
                    columns={[
                        {
                            title: '用户名',
                            key: 'username',
                            dataIndex: 'username'
                        },
                        {
                            title: '姓名',
                            key: 'realName',
                            dataIndex: 'realName'
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
                                                    component: BindForm2,
                                                    label: '用户信息(1)'
                                                },
                                                {
                                                    component: BindForm3(),
                                                    label: '用户信息(2)'
                                                },
                                                {
                                                    component: BindForm1,
                                                    label: '登录信息'
                                                }
                                            ]}
                                            // dataSubmitter={async (values: any) => {
                                            //     return Api.updateUser({: row.id, data: values})
                                            // }}
                                            initData={row}//还需要有权限,或者使用dataLoader
                                        />
                                        <DeleteConfirm
                                            onConfirm={() => {
                                                dispatch(getData(
                                                    'deleteUser',
                                                    {sId: row.id},
                                                    (res: any) => {
                                                        AddTableVersion('UsersMainTable')
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
                        }
                    ]}
                />
            </Card>
        </>
    )
}

export default ManageUsers;