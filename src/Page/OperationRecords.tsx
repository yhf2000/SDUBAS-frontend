import React, {useEffect, useState} from "react";
import {Api} from "../API/api";
import {
    CheckCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import ValidButton from "../Component/Record/ValidButton";
import {Button} from "antd";
import "../Config/CSS/Table.css";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";
import {useDispatch} from "../Redux/Store";

const Pass = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <CheckCircleOutlined style={{color: 'green', fontSize: '48px', marginRight: '8px'}}/>
            <div style={{fontSize: '24px', color: 'green'}}>验证通过</div>
        </div>
    )
}

const Reject = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <CloseOutlined style={{color: 'red', fontSize: '48px', marginRight: '8px'}}/>
            <div style={{fontSize: '24px', color: 'red'}}>验证失败</div>
        </div>
    )
}
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
        setLoading(true)
        if (dataSource) {
            const ids = dataSource['dataSource'].map((d: any) => d.id)
            Api.getValidAll({data: {id_list: ids}}).then((res: any) => {
                let flag = true;
                const data = dataSource['dataSource'].map((d: any,index:number) => {
                    if(res[index].verify === false){flag=false}
                    return {...d, result: res[index].verify}
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
            {isPass === undefined ? <Button onClick={onClick} loading={loading}>全部验证</Button> : (isPass ? <Pass/> :
                <Reject/>)}
            <TableWithPagination
                API={async (data: any) => {
                    return Api.getOperationLogs({data: data})
                }}
                name={'OperationsTable'}
                columns={[
                    {
                        title:'操作',
                        key:'operation',
                        dataIndex: 'func'
                    },
                    {
                        title: '时间',
                        key:'time',
                        dataIndex: 'oper_dt'
                    },
                    {
                        title: '结果',
                        key: 'result',
                        dataIndex: 'result',
                        render: (pass: any, record: any) => {
                            return (
                                <ValidButton record={record} loading={loading} isPass={record?.result}/>
                            )
                        },
                        width: "200px"
                    }
                ]}
            />
        </div>
    );
}

export default OperationRecords;