import {useState} from "react";
import {Button, Modal} from "antd";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {useDispatch} from "../../Redux/Store";


const TemplateApproval = (props: any) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    return (
        <>
            <Button type={'text'} onClick={() => {
                setVisible(true)
            }}>审批申请</Button>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                footer={null}
            >
                <TableWithPagination
                    API={async (data: any) => {//获得申请该角色的人员列表的API
                        return Api.getApplication({data:{...data,service_id:props.pId,service_type:props.service_type}})
                    }}
                    name={'TemplateUsersTable'}//申请该模板角色的用户
                    columns={[
                        {
                            title: '用户名',
                            dataIndex: 'user_name',
                            key: 'userName'
                        },
                        {
                            title: '操作',
                            key: 'operator',
                            render: (_: any, row: any) => {
                                return (
                                    <>
                                        <Button color={'green'} type={'text'} icon={<CheckOutlined color={'green'}/>}
                                            onClick={()=>{
                                                Api.approve({service_id:props.pId,id:row.apply_role_id,data:{is_pass:true}})
                                                    .then(()=>{
                                                        AddTableVersion('TemplateUsersTable');
                                                        AddTableVersion('TemplateRolesTable');
                                                    })
                                                    .catch(()=>{})
                                            }}//通过的api
                                        >通过</Button>
                                        <Button icon={<CloseOutlined />} type={'text'} color={'red'}
                                            onClick={()=>{
                                                Api.approve({service_id:props.pId,id:row.apply_role_id,data:{is_pass:false}})
                                                    .then(()=>{
                                                        AddTableVersion('TemplateUsersTable');
                                                        AddTableVersion('TemplateRolesTable');
                                                    })
                                                    .catch(()=>{})
                                            }}//拒绝的api
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
// const Approval = () => {
//     const [visible, setVisible] = useState(false);
//     const columns = [
//         {
//             title: '申请对象',
//             dataIndex: 'rolename',
//             key: 'roleName'
//         },
//         {
//             title: '审批',
//             key: 'approval',
//             render: (_: any, rows: any) => {
//                 return (
//                     <>
//                         <TemplateApproval />
//                     </>
//                 );
//             }
//         },
//     ]
//     return (
//         <>
//             <Button type={'text'} onClick={() => setVisible(true)}>审批</Button>
//             <Modal
//                 open={visible}
//                 onCancel={() => {
//                     setVisible(false)
//                 }}
//                 footer={null}
//             >
//                 <TableWithPagination
//                     API={async (data: any) => {
//                         return Api.getTemplates({data: data})
//                     }}//需要模板角色的表格，然后通过该表格可以查看申请该角色的记录。包括已通过和未通过的记录
//                     name={'TemplateRolesTable'}
//                     //需要审批列
//                     columns={[
//                         {},
//                         {}
//                     ]}
//                 />
//             </Modal>
//         </>
//     );
// }

export default TemplateApproval;