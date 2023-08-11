import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import ItemText from "../Common/Form/Item/ItemText";

const ResourceProfile = () => {
    const ResourceForm = (
        <>
            <ItemName label={'资源名称'} name={'name'} required={true}/>
            <ItemText label={'备注'} name={'note'}/>
        </>
    )
    const navigate = useNavigate();
    const userInfo = useSelector((state: IState) => state.UserReducer.userInfo);
    return (
        <>
            <div style={{
                right: 0, top: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '20px',
            }}>
                <ModalFormUseForm
                    title={'新建资金项目'}
                    type={'create'}
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
                API={"getResource"}
                columns={[
                    {
                        title: '名称',
                        dataIndex: 'title',
                        key: 'title',
                        render: (title: string) => {
                            return (
                                <Button type={'link'} onClick={() => {
                                    navigate('/c/resource-info')
                                }}>{title}</Button>
                            )
                        }
                    },
                    {
                        title: '日期',
                        dataIndex: 'date',
                        key: 'date'
                    },
                    {
                        title: '状态',
                        dataIndex: 'state',
                        key: 'state',
                    },
                ]}
            />
        </>
    );
}

export default ResourceProfile;