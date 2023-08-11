import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {ModalForm} from "@ant-design/pro-form";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import ItemName from "../Common/Form/Item/ItemName";
import ItemText from "../Common/Form/Item/ItemText";

const FundForm = (
    <>
        <ItemName label={'资金名称'} name={'name'} required={true}/>
        <ItemText label={'备注'} name={'note'}/>
    </>
);
const FundProfile = () => {
    const navigate = useNavigate();
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
                    subForm={[
                        {
                            component: FundForm,
                            label: "",
                        }
                    ]}
                    submitter={async (value:any)=>{
                        return Api.newFund({data:value});
                    }}
                />
            </div>
            <TableWithPagination
                API={"getFund"}
                columns={[
                    {
                        title: '资金',
                        dataIndex: 'fund',
                        key: 'fund',
                        render: (title: string) => {
                            return (
                                <Button type={'link'} onClick={() => navigate('/c/fund-info')}>{title}</Button>
                            )
                        }
                    },
                    {
                        title: '创建者',
                        dataIndex: 'creator',
                        key: 'creator'
                    },
                    {
                        title: '创建日期',
                        dataIndex: 'createDate',
                        key: 'createDate',
                    },
                    {
                        title: '最近更新日期',
                        dataIndex: 'date',
                        key: 'date'
                    },
                ]}
            />
        </>
    );
}

export default FundProfile;