import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import AddBill from "../Component/Record/Form/AddBill";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import './FundInfo.css'
import {Api} from "../API/api";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";

const {Meta} = Card;
const initInfo:{note:string,value:string} = {note:'',value:''}
const FundInfo = () => {
    const {fId} = useParams();
    const dispatch = useDispatch();
    const [saveInfo,setSaveInfo] = useState(initInfo);

    useEffect(()=>{
        dispatch(getData(
            'getFundInfo',
            {fId:fId},
            (res:any)=>{
                setSaveInfo(res);
            },
            ()=>{

            }
        ))
    },[fId])
    return (
        <>
            <Card title={'账目详情'}>
                <div className={'fcard-container'}>
                    <Card key={'0'} className={'card'}>
                        <Meta title="Note" description={saveInfo.note}/>
                    </Card>
                    <Card key={'1'} className={'card'}>
                        <Meta title="Value" description={saveInfo.value}/>
                    </Card>
                </div>
                <AddBill fId={fId} button={<Button type={"link"} size={'small'} style={{marginLeft: '1000px'}}>记账</Button>}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '1000px'}}>
                        <TableWithPagination
                            API={"getFundInfo"}
                            columns={[
                                {
                                    title: '收支',
                                    dataIndex: 'value',
                                    key: 'value'
                                },
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
                                    title: '记录日期',
                                    dataIndex: 'date',
                                    key: 'date'
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