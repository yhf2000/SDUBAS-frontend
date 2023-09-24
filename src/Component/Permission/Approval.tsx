import {useState} from "react";
import {Button, Modal} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";


const TemplateApproval = (props: any) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type={'link'} onClick={() => {
                setVisible(true)
            }}>审阅</Button>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                footer={null}
            >
                <TableWithPagination
                    API={async (data: any) => {//获得申请该角色的人员列表的API
                    }}
                    name={'TemplateUsersTable'}//申请该模板角色的用户
                    columns={[
                        {
                            title: '',
                            dataIndex: '',
                            key: ''
                        },
                        {
                            title: '操作',
                            key: 'operator',
                            render: (_: any, row: any) => {
                                return (
                                    <>
                                        <Button icon={<CheckOutlined/>}
                                            onClick={()=>{}}//通过的api
                                        >通过</Button>
                                        <Button icon={<CloseOutlined />}
                                            onClick={()=>{}}//拒绝的api
                                        >拒绝</Button>
                                    </>
                                )
                            }
                        }
                    ]}
                />
            </Modal>
        </>
    )
}
//模板角色审批，使用modal弹窗式
const Approval = () => {
    const [visible, setVisible] = useState(false);
    const columns = [
        {
            title: '申请对象',
            dataIndex: 'rolename',
            key: 'roleName'
        },
        {
            title: '审批',
            key: 'approval',
            render: (_: any, rows: any) => {
                return (
                    <>
                        <TemplateApproval />
                    </>
                );
            }
        },
    ]
    return (
        <>
            <Button type={'text'} onClick={() => setVisible(true)}>审批</Button>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                footer={null}
            >
                <TableWithPagination
                    API={async (data: any) => {
                        return Api.getTemplates({data: data})
                    }}//需要模板角色的表格，然后通过该表格可以查看申请该角色的记录。包括已通过和未通过的记录
                    name={'TemplateRolesTable'}
                    //需要审批列
                    columns={[
                        {},
                        {}
                    ]}
                />
            </Modal>
        </>
    );
}

export default Approval;