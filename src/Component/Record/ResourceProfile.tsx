import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button, message} from "antd";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import ItemText from "../Common/Form/Item/ItemText";
import ItemNumber from "./Form/Item/ItemNumber";
import DeleteConfirm from "../Common/DeleteConfirm";
import getData from "../../API/getData";
import {useDispatch} from "../../Redux/Store";

const ResourceProfile = () => {
    const ResourceForm = (
        <>
            <ItemName label={'资源名称'} name={'name'} required={true}/>
            <ItemNumber label={'资源总数'} name={'count'} required={true} />
        </>
    )
    const navigate = useNavigate();
    const userInfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const dispatch = useDispatch();
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
                    title={'新建资源项目'}
                    type={'create'}
                    btnName={'新建资源'}
                    TableName={'ResourceTable'}
                    subForm={[
                        {
                            component: ResourceForm,
                            label: "",
                        }
                    ]}
                    dataSubmitter={async (value:any)=>{
                        return Api.newResource({data:value});
                    }}
                />
            </div>
            <TableWithPagination
                name={'ResourceTable'}
                API={async (data:any)=>{return Api.getResource({data:data})}}
                columns={[
                    {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name',
                        render: (title: string,rows:any) => {
                            return (
                                <Button type={'link'} onClick={() => {
                                    navigate(`/c/resource-info/${rows.Id}`)
                                }}>{title}</Button>
                            )
                        }
                    },
                    {
                        title: '状态',
                        dataIndex: 'state',
                        key: 'state',
                        render:(state:any)=>{
                            return (state===1?<span>可用</span>:<span>不可用</span>)
                        }
                    },
                    {
                        title: '操作',
                        key:'operator',
                        render:(_:any,rows:any)=>{
                            return(
                                <>
                                    <ModalFormUseForm
                                        title={'编辑资金'}
                                        type={'update'}
                                        TableName={'ResourceTable'}
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
                                        // dataLoader={}
                                        dataSubmitter={(value: any) => {
                                            console.log('data:',value);
                                        }}
                                    />
                                    <DeleteConfirm
                                        onConfirm={() => {
                                            dispatch(getData(
                                                'deleteResource',
                                                {rId:rows.Id},
                                                (res: any) => {
                                                    addTableVersion('ResourceTable')
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

export default ResourceProfile;