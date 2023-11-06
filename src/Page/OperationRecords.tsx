import React, {useEffect, useState} from "react";
import {Api} from "../API/api";
import {
    CheckCircleOutlined,
    CheckCircleTwoTone,
    CloseCircleFilled,
    CloseCircleOutlined,
    CloseOutlined
} from "@ant-design/icons";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import ValidButton from "../Component/Record/ValidButton";
import {Button} from "antd";


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
    const [isPass, setIsPass] = useState<any>(undefined);

    return (
        <div

        >
            <TableWithPagination
                API={async (data: any) => {
                    return Api.getOperationLogs({data: data})
                }}
                name={'OperationsTable'}
                columns={[
                    {
                        title: '验证',
                        key: 'valid',
                        dataIndex: 'valid',
                        width: "200px"
                    },
                    {
                        title: '结果',
                        key: 'result',
                        dataIndex: 'result',
                        render: (pass: any, record: any) => {
                            if (isPass === undefined)
                                return (
                                    <ValidButton record={record} isPass={isPass}/>
                                )
                            if (pass)
                                return <Button icon={<CheckCircleTwoTone twoToneColor={"#52c41a"}/>} type={'ghost'}
                                               disabled={true}/>
                            return <Button icon={<CloseCircleOutlined style={{color: 'red'}}/>} type={'ghost'}
                                           disabled={true}/>
                        },
                        width: "200px"
                    }
                ]}
            />
        </div>
    );
}

export default OperationRecords;