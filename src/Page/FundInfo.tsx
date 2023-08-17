import {Button, Card, message} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import AddBill from "../Component/Record/Form/AddBill";
import './FundInfo.css'
import {Api} from "../API/api";
import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import getData from "../API/getData";
import EditCard from "../Component/Common/EditCard";
import DeleteConfirm from "../Component/Common/DeleteConfirm";
import {useDispatch} from "../Redux/Store";

const {Meta} = Card;
const FundInfo = () => {

    const {fId} = useParams();
    const location = useLocation();
    const {row} = location.state;
    const dispatch = useDispatch();
    const addTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name})
    }
    return (
        <>
            <Card title={'账目详情'}>
                <div className={'fcard-container'}>
                    <EditCard
                        title={'资金备注'}
                        API={async (data: any) => {
                            return Api.updateNote({fId: fId, data: data})
                        }}
                        content={row.note}
                    />
                    <Card key={'1'} className={'card'}>
                        <Meta title="Value"
                            // description={saveInfo.value}
                        />
                    </Card>
                </div>
                <AddBill fId={fId}
                         button={<Button type={"link"} size={'small'} style={{marginLeft: '1000px'}}>记账</Button>}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '1000px'}}>
                        <TableWithPagination
                            name={'AccountTable'}
                            API={async (data: any) => {
                                return Api.getFundInfo({fId: fId, data: data})
                            }}
                            columns={[
                                {
                                    title: '数额',
                                    dataIndex: 'amount',
                                    key: 'amount',
                                    render: (amount: number, row: any) => {
                                        const color = row.state === 0 ? "green" : "red";
                                        return (
                                            <span style={{color}}>
                                                {row.state === 0 ? "+" : "-"}{amount}
                                            </span>
                                        )
                                    }
                                },
                                {
                                    title: '日志记录',
                                    dataIndex: 'log_content',
                                    key: 'log_content'
                                },
                                {
                                    title: '操作',
                                    key: 'operator',
                                    render: (_: any, row: any) => {
                                        return (
                                            <DeleteConfirm
                                                onConfirm={() => {
                                                    dispatch(getData(
                                                        'deleteAccount',
                                                        {fId:row.finance_id,aId:row.Id},
                                                        (res: any) => {
                                                            addTableVersion('AccountTable');
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
                                        )
                                    }
                                },
                            ]}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}

export default FundInfo;
// .my-cards {
//     display: flex;
//     justify-content: center;
//     align-items: flex-start;
// }
//
// .my-card {
//     margin: 0 10px;
//     width: 300px;
// }