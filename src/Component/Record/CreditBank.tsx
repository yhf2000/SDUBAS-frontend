import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Card, Form, Input, message, Modal, Select, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "../../Redux/Store";
import {CreditBankChildColumns, CreditBankColumns} from "../../Config/Resource/columns";
import records from "../../Page/Records";

const CreditBank = () => {
    const [credits, setCredits] = useState<any>();
    const [username, setUsername] = useState(undefined);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    //自动得到学生的总学分
    useEffect(() => {
        Api.getUserCredits({data: {username: username}}).then((res: any) => {
            setCredits(res.credit);
        }).catch(() => {
            message.error('刷新重试')
        })
        AddTableVersion('StudentCreditTable');
    }, [username]);
    return (
        <>
            <Card extra={
                <>
                    <SelectUser setUsername={setUsername}/>
                    <span
                        style={{
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            padding: '5px 10px',
                            borderRadius: '4px',
                        }}
                    >
                        {username === undefined ? "请选择" : `已修学分:${credits}`}
                    </span>
                </>
            }>
                <TableWithPagination
                    API={async (data: any) => {
                        return Api.getRequirements({data: data})
                    }}
                    columns={CreditBankColumns}
                    expandedRowRender={(record: any) => ChildTable(record)}
                    APIRowsTransForm={(rows: any) => {
                        for (let i = 0; i < rows.length; i++) {
                            rows[i] = {key:`${i}`,...rows[i]}
                        }
                        return rows
                    }}
                />
            </Card>
        </>
    )
}


export const SelectUser = (props: any) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Modal
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                title={'选择查看'}
                footer={null}
            >
                <TableWithPagination
                    API={async (data: any) => {
                        return Api.getCreatedUsers({data: data})
                    }}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={"用户名"} name={"user_name"}>
                                    <Input onPressEnter={() => {
                                        onFinish();
                                    }}/>
                                </Form.Item>
                            </Space>
                        );
                    }}
                    useFormBtn={false}
                    columns={[
                        {
                            title: '用户名',
                            dataIndex: 'user_name',
                            key: 'username'
                        },
                        {
                            title: '操作',
                            key: 'operator',
                            render: (_: any, record: any) => {
                                // console.log(record);
                                return (
                                    <Button type={'default'} onClick={() => {
                                        props.setRecord(record);
                                        setVisible(false)
                                    }}>选择</Button>
                                )
                            }
                        }
                    ]}
                />
            </Modal>
            <Button type={'primary'} onClick={() => setVisible(true)}>选择</Button>
        </>
    );
}

export default CreditBank;


const ChildTable = (record: any) => {
    // console.log(record);
    return (
        // <Table
        //     columns={CreditBankChildColumns}
        // />
        <TableWithPagination
            API={async (data:any) => {
                return Api.getCourseByCredit({type:record.type,data:data})
            }}
            columns={CreditBankChildColumns}
        />
    )
}