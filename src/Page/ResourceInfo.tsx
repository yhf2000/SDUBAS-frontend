import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import './FundInfo.css'
import {Api} from "../API/api";
import RequestResource from "../Component/Record/Form/Request";
import {useEffect, useState} from "react";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";
import {useParams} from "react-router-dom";
import EditCard from "../Component/Common/EditCard";

const {Meta} = Card;


const ResourceInfo = () => {

    const [fundInfo,setFundInfo] = useState<any>();
    const {rId} = useParams();

    useEffect(()=>{
        Api.getResourceInfo({rId:rId})
            .then((res:any)=>{
                setFundInfo(res);
            }).catch(()=>{})
    },[setFundInfo])

    const handleChange = (note:any)=>{
        let newInfo = fundInfo.slice();
        newInfo.note = note;
        setFundInfo(newInfo);
    }
    return (
        <>
            <Card
                title={'资源详情'}
            >
                <div className={'card-container'}>
                    <EditCard
                        title={'资源备注'}
                        API={async (data:any)=>{return Api.updateNote({rId:rId,data:data})}}
                        content={fundInfo?.note}
                        setFundInfo={handleChange}
                        className={'card'}
                    />
                </div>
                <div style={{width: '1000px', marginLeft: '250px'}}>
                    <TableWithPagination
                        search={true}
                        API={async (data:any)=>{return Api.getResourceInfo({rId:rId,data:data})}}
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
