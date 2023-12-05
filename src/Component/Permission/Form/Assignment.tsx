import {Button, Card, Form, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch} from "../../../Redux/Store";
import TableWithPagination from "../../Common/Table/TableWithPagination";
import {Api} from "../../../API/api";
import DeleteConfirm from "../../Common/DeleteConfirm";
import React, {useState} from "react";
import {BindForm2} from "../../User/Form/BindForm";
import {BindForm1} from "../../User/Form/BindForm1";
import ModalFormUseForm from "../../Common/Form/ModalFormUseForm";

const Assignment = (props: any) => {
    const dispatch = useDispatch();
    const addTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Form
                onFinish={(value: any) => {
                    value.username = value.username.split(/,|\n|\s+/).filter((str: any) => str.trim() !== '');
                    Api.addUserByRole({rId: props.service_id, data: {...value}})
                        .then(() => {
                            message.success('添加成功');
                            addTableVersion('Role' + props.roleId + 'Users');
                        }).catch(() => {
                    })
                }}
            >
                <Form.Item name={'role_id'} initialValue={props.roleId} style={{display: 'none'}}>
                </Form.Item>
                <Form.Item
                    name={'username'}
                    label={'分配'}
                >
                    <TextArea placeholder={'格式为\'张三,李四\''}/>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>添加</Button>
                </Form.Item>
            </Form>
            <TableWithPagination
                name={'Role' + props.roleId + 'Users'}
                API={async (data: any) => {
                    return Api.getUsers({data: {...data, role_id: props.roleId}})
                }}
                columns={[
                    {
                        title: '用户名',
                        key: 'user_name',
                        dataIndex: 'user_name'
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        render: (_: any, row: any) => {
                            return (
                                <>
                                    {props.editable && (
                                        <ModalFormUseForm
                                            title={'编辑用户'}
                                            TableName={'Role' + props.roleId + 'Users'}
                                            btnName={'编辑'}
                                            type={'update'}
                                            subForm={[
                                                {
                                                    component: BindForm2,
                                                    label: '用户信息'
                                                },
                                            ]}
                                            // dataSubmitter={async (values: any) => {
                                            //     return Api.updateUser({: row.id, data: values})
                                            // }}
                                            initData={row}//还需要有权限,或者使用dataLoader
                                        />
                                    )
                                    }
                                    <DeleteConfirm
                                        onConfirm={async () => {
                                            Api.deleteAssignment({
                                                uId: row.user_id,
                                                roleId: props.roleId
                                                , rId: props.service_id
                                            })
                                                .then(() => {
                                                    addTableVersion('Role' + props.roleId + 'Users');
                                                    message.success('删除成功')
                                                })
                                                .catch(() => {
                                                })
                                        }}
                                        content={
                                            <Button type={'link'} danger={true}>移除</Button>
                                        }
                                    />
                                </>
                            )
                        }
                    }
                ]}
            />
        </>
    )
}

export default Assignment;


export const AssignmentForm = (props: any) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                footer={null}
            >
                <Card
                    extra={(
                        props.newUser ? (
                            <ModalFormUseForm
                                type={'create'}
                                btnName={'添加用户'}
                                TableName={'Role' + props.roleId + 'Users'}//具体名称再添加
                                subForm={[
                                    {
                                        component: BindForm2,
                                        label: '用户信息'
                                    },
                                    {
                                        component: BindForm1,
                                        label: '登录信息'
                                    }
                                ]}
                                dataSubmitter={async (data: any) => {
                                    return Api.newUser({data: data});
                                }}
                            />) : null
                    )}
                >
                    <Assignment editable={false} {...props}/>
                </Card>
            </Modal>
            <Button type={'link'} onClick={() => {
                setVisible(true)
            }}>分配</Button>
        </>
    )
}