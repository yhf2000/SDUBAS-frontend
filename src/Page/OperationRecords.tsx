import React, {useEffect, useState} from "react";
import {Api} from "../API/api";
import {CheckCircleOutlined, CloseCircleFilled, CloseOutlined} from "@ant-design/icons";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
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
    useEffect(() => {
        // Api.getValid().then((res: true) => {
        //     if(res)
        //         setIsPass(true);
        // })
    }, [])
    return (
        <>
            <TableWithPagination
                API={async (data: any) => {
                    return Api.getPersonalProfile({data: data})
                }}
                name={'OperationsTable'}
                columns={[
                    {
                        title: '验证',
                        key: 'valid',
                        render: () => {
                            Api.getProfile().then(() => {
                                return(
                                    <>√</>
                                )
                            }).catch(()=>{return (<>×</>)})
                        }
                    },
                    {
                        title:'结果',
                        key:'result',
                        render:()=>{
                            return(
                                <>
                                    {isPass === undefined && <Button
                                        type={'link'}
                                        onClick={()=>{setIsPass(true)}}
                                    >
                                        验证
                                    </Button>
                                    }
                                    {isPass === true && <Pass/>}
                                    {isPass === false && <Reject/>}
                                </>
                            )
                        },
                    }
                ]}
            />
        </>
    );
}

export default OperationRecords;