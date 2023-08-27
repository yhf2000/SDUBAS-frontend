import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, message} from "antd";
import {useNavigate} from "react-router-dom";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import ItemText from "../Common/Form/Item/ItemText";
import DeleteConfirm from "../Common/DeleteConfirm";
import getData from "../../API/getData";
import React from "react";
import {useDispatch} from "../../Redux/Store";

export const FundForm = (
    <>
        <ItemName label={'资金名称'} name={'name'} required={true}/>
        <ItemText label={'备注'} name={'note'}/>
    </>
);
const FundProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name})
    }
    return (
        <>
            <div style={{
                right: 0, top: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '20px',
            }}>
                <ModalFormUseForm
                    title={'新建资金'}
                    type={'create'}
                    TableName={'FundTable'}
                    btnName={'新建资金'}
                    subForm={[
                        {
                            component: FundForm,
                            label: "",
                        }
                    ]}
                    dataSubmitter={async (value:any)=>{
                        // console.log('fundData:',value);
                        return Api.newFund({data:value});
                    }}
                />
            </div>
            <TableWithPagination
                name={'FundTable'}
                API={async (data:any)=>{return Api.getFund({data:data})}}
                columns={[
                    {
                        title: '资金',
                        dataIndex: 'name',
                        key: 'name',
                        render: (title: string,row:any) => {
                            return (
                                <Button type={'link'} onClick={() => navigate(`/c/fund-info/${row.Id}`,{state:{row:row}})}>{title}</Button>
                            )
                        }
                    },
                    {
                        title: '操作',
                        key:'operator',
                        render:(_:any,rows:any)=>{
                            return(
                                <>
                                    <DeleteConfirm
                                        onConfirm={() => {
                                            dispatch(getData(
                                                'deleteFund',
                                                {fId:rows.Id},
                                                (res: any) => {
                                                    addTableVersion('FundTable');
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
                                </>
                            )
                        }
                    }
                ]}
            />
        </>
    );
}

export default FundProfile;