import TableWithPagination, {TableWithPaginationProps} from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, Card, Image, message, Modal} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useDispatch} from "../../Redux/Store";

const CreditBank = () => {
    const [credits, setCredits] = useState<any>();
    const [username, setUsername] = useState(undefined);
    const dispatch = useDispatch();
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    //自动得到学生的总学分
    useEffect(() => {
        Api.getUserCredits().then((res: any) => {
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
                    type={'0'}
                    API={async (data: any) => {
                        return Api.getCredits({data: data})
                    }}
                    name={'StudentCreditTable'}
                    columns={[
                        {
                            title: '图片',
                            dataIndex: 'proImage',
                            key: 'proImage',
                            render: (imgUrl: string, row: any) => {
                                return (
                                    <Link to={`/c/project-info/${row.pId}`}>
                                        <Image src={imgUrl} alt={'img'} width={150} height='auto'/>
                                    </Link>
                                );
                            }
                        },
                        {
                            title: '科目',
                            dataIndex: 'project_name',
                            key: 'title',
                            render: (title: string, row: any) => {
                                return (
                                    <Link to={`/c/project-info/${row.pId}`}>
                                        {title}
                                    </Link>
                                )
                            }
                        },
                        {
                            title: '学分',
                            dataIndex: 'credit',
                            key: 'credit',
                        },
                        {
                            title: '结果',
                            dataIndex: 'is_pass',
                            key: 'isPass'
                        },
                    ]}
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
                        return Api.getUsers({data: {...data, role_id: 1}})
                    }}//需要role_id
                    name={'StudentSelectTable'}
                    columns={[
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
                                        <Button
                                            type={'default'}
                                            onClick={() => {
                                                props.setUsername(row.user_name);
                                                setVisible(false);
                                            }}
                                        >选择</Button>
                                    </>
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
