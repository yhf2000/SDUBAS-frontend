import {Button, Card} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import '../Config/CSS/FundInfo.css'
import {Api} from "../API/api";
import RequestResource from "../Component/Record/Form/Request";
import React, {useEffect, useState} from "react";
import {useDispatch} from "../Redux/Store";
import getData from "../API/getData";
import {useLocation, useParams} from "react-router-dom";
import EditCard from "../Component/Common/EditCard";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm";
import {ResourceForm} from "../Component/Record/ResourceProfile";

const {Meta} = Card;


const ResourceInfo = () => {

    const [fundInfo, setFundInfo] = useState<any>();
    const {rId} = useParams();
    const location = useLocation();
    const {row} = location.state;

    useEffect(() => {
        Api.getResourceInfo({rId: rId})
            .then((res: any) => {
                setFundInfo(res);
            }).catch(() => {
        })
    }, [setFundInfo])

    const handleChange = (note: any) => {
        let newInfo = fundInfo.slice();
        newInfo.note = note;
        setFundInfo(newInfo);
    }
    return (
        <>
            <Card
                title={row.name}
                headStyle={{textAlign: 'left'}}
                extra={(
                    <>
                        <RequestResource rId={rId}
                                         button={<Button type={'primary'} size={'small'}
                                                         style={{marginTop: '20px'}}>申请</Button>} TableName={'ApplicationTable'}/>
                        <ModalFormUseForm
                            title={'编辑资源'}
                            type={'update'}
                            TableName={'ApplicationTable'}
                            btnName={'编辑'}
                            width={1000}
                            subForm={[
                                {
                                    component: ResourceForm,
                                    label: '',
                                },
                                // {
                                //     component: ProjectForm2,
                                //     label:'',
                                // }
                            ]}
                            initData={row}
                            dataSubmitter={(value: any) => {
                                console.log('data:',value);
                            }}
                        />
                    </>
                )}
            >
                <div className={'fund-info-card'}>
                    <Meta description={'资源数目:'+row.count}/>
                    {/*<EditCard*/}
                    {/*    title={'备注'}*/}
                    {/*    API={async (data:any)=>{return Api.updateNote({rId:rId,data:data})}}*/}
                    {/*    content={fundInfo?.note}*/}
                    {/*    setFundInfo={handleChange}*/}
                    {/*    className={'card'}*/}
                    {/*/>*/}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '1000px'}}>
                        <TableWithPagination
                            name={'ApplicationTable'}
                            API={async (data: any) => {
                                return Api.getResourceInfo({rId: rId, data: data})
                            }}
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
                </div>
            </Card>
        </>
    )
}

export default ResourceInfo;
