import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import './FundInfo.css'
import {Api} from "../API/api";
import RequestResource from "../Component/Record/Form/Request";
import {useEffect, useState} from "react";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";
import {useParams} from "react-router-dom";

const {Meta} = Card;

const ResourceInfo = () => {
    const {rId} = useParams();

    return (
        <>
            <Card
                title={'资源详情'}
            >
                <div className={'card-container'}>
                    <Card className={'card'}>
                        <Meta title="Note" description="This is the content of Card 1."/>
                    </Card>
                </div>
                <div style={{width: '1000px', marginLeft: '250px'}}>
                    <TableWithPagination
                        search={true}
                        API={"getProfile"}
                        columns={[
                            {
                                title: '描述',
                                dataIndex: 'description',
                                key: 'description'
                            },
                            {
                                title: '操作人',
                                dataIndex: 'operator',
                                key: 'operator'
                            },
                            {
                                title: '状态',
                                dataIndex: 'state',
                                key: 'state',
                            },
                            {
                                title: '记录日期',
                                dataIndex: 'date',
                                key: 'date'
                            },
                        ]}
                    />
                </div>
                 <RequestResource rId={rId}
                    button={<Button type={'primary'} size={'small'} style={{marginTop: '20px'}}>申请</Button>}/>
            </Card>
        </>
    )
}

export default ResourceInfo;
