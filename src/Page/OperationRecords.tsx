import React, {useEffect, useState} from "react";
import {Api} from "../API/api";
import {
    CheckCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import ValidButton from "../Component/Record/ValidButton";
import {Button, Card, Descriptions} from "antd";
import "../Config/CSS/Table.css";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";
import {useDispatch} from "../Redux/Store";

const Pass = () => {
    return (
        <div style={{display: 'flex'}}>
            <CheckCircleOutlined style={{color: 'green', fontSize: '24px'}}/>
            <div style={{fontSize: '20px', color: 'green'}}>验证通过</div>
        </div>
    )
}

const Reject = () => (
    // <div style={{
    //     display: 'flex'
    // }}>
    <div style={{
        display: 'flex',
        // transform: 'translate(80%, -50%)'
    }}
    >
        <CloseOutlined style={{color: 'red', fontSize: '24px'}}/>
        <div style={{fontSize: '20px', color: 'red'}}>验证失败</div>
    </div>
    // {/*</div>*/}
)
const OperationRecords = () => {
    const dataSource = useSelector((state: IState) => state.TableReducer.tableData['OperationsTable'])
    const [isPass, setIsPass] = useState<any>(undefined);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const setDataSource = (data: any, name: string) => {
        return dispatch({type: 'setDataSource', data: data, name: name, add: true})
    }
    useEffect(() => {
        setIsPass(undefined);
    }, [dataSource?.tablePageInfo?.pageNow])
    const onClick = () => {
        if (dataSource) {
            setLoading(true)
            const ids = dataSource['dataSource'].map((d: any) => d.id)
            Api.getValidAll({data: {id_list: ids}}).then((res: any) => {
                let flag = true;
                const data = dataSource['dataSource'].map((d: any, index: number) => {
                    if (res[index].verify === false) {
                        flag = false
                    }
                    return {...d, result: res[index].verify,block_number:res[index].block_number}
                })
                setIsPass(flag)
                setDataSource(data, 'OperationsTable');
                setLoading(false);
            })
                .catch(() => {
                    setLoading(false)
                })
        }
    }
    return (
        <div
            className={"table-container"}
        >
            <Descriptions
                title={'区块链节点信息'}
                bordered
            >
                <Descriptions.Item label={'节点id'}>{1}</Descriptions.Item>
                <Descriptions.Item label={'版本信息'}>"p2p": "8",
                    "block": "11",
                    "app": "0"</Descriptions.Item>
                <Descriptions.Item label={'节点名称'}>mytestnet</Descriptions.Item>
                <Descriptions.Item label={'最新区块高度'}>{1}</Descriptions.Item>
                <Descriptions.Item label={'最新区块时间戳'}>{1}</Descriptions.Item>
                <Descriptions.Item label={'验证者地址'}>55A8C4E72E5CE4E6B692F9AFD4F182DC30E8F598</Descriptions.Item>
            </Descriptions>
            <Card
                title={'日志记录'}
                headStyle={{textAlign:'left'}}
                style={{top:'20px'}}
                extra={
                    isPass === undefined ? <Button style={{
                        // // padding: '10px 20px',
                        // // background: '#f0f0f0',
                        // color: '#333',
                        // border: 'none',
                        // borderRadius: '5px',
                        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        // fontSize: '16px',
                        // // fontWeight: 'lighter',
                        // cursor: 'pointer',
                        // transition: 'background 0.3s ease',
                        // top: '50%',
                        // left: '50%',
                        // transform: 'translate(-50%, -50%)',
                    }} onClick={onClick} loading={loading}>全部验证</Button> : (isPass ? <Pass/> :
                        <Reject/>)
                }
            >
                <TableWithPagination
                    API={async (data: any) => {
                        return Api.getOperationLogs({data: data})
                    }}
                    name={'OperationsTable'}
                    columns={[
                        {
                            title: '操作',
                            key: 'operation',
                            dataIndex: 'func'
                        },
                        {
                            title: '时间',
                            key: 'time',
                            dataIndex: 'oper_dt'
                        },
                        {
                            title: '验证结果',
                            key: 'result',
                            dataIndex: 'result',
                            render: (pass: any, record: any) => {
                                return (
                                    <ValidButton record={record} loading={loading} isPass={record?.result}/>
                                )
                            },
                            width: "200px"
                        },
                        {
                            title:'区块号',
                            key:'block_number',
                            dataIndex:'block_number',
                            render:(block_number:number)=>{
                                return(block_number === undefined ? (<>未验证</>) : (<>{block_number}</>))
                            }
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

export default OperationRecords;