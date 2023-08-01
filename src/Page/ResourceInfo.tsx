import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import './FundInfo.css'
import {Api} from "../API/api";
import RequestResource from "../Component/Record/Form/Request";
import {useEffect, useState} from "react";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";

const {Meta} = Card;
interface permissionType{
    request:boolean;
    view:boolean;
}
const initState:permissionType={
    request:true,
    view:true
}
const ResourceInfo = () => {
    const dispatch = useDispatch();
    const [permission,setPermission] = useState(initState);
    useEffect(()=>{
        dispatch(getData(
            'getResourcePermission',
            {},
            (data:any)=>{
                console.log(data)
                setPermission(data);
            }
        ))
    },[])
    console.log(permission);
    return (
        <>
            <Card title={'资源详情'}>
                <div className={'card-container'}>
                    <Card className={'card'}>
                        <Meta title="Note" description="This is the content of Card 1." />
                    </Card>
                </div>
                <TableWithPagination
                    search={true}
                    API={Api.getProfile}
                    columns={[
                        {
                            title:'描述',
                            dataIndex: 'description',
                            key:'description'
                        },
                        {
                            title:'操作人',
                            dataIndex:'operator',
                            key:'operator'
                        },
                        {
                            title: '状态',
                            dataIndex: 'state',
                            key:'state',
                        },
                        {
                            title:'记录日期',
                            dataIndex: 'date',
                            key:'date'
                        },
                    ]}
                />
                {permission.request&&<RequestResource button={<Button type={'primary'} size={'small'} style={{marginTop:'20px'}}>申请</Button> }/>}
            </Card>
        </>
    )
}

export default ResourceInfo;
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