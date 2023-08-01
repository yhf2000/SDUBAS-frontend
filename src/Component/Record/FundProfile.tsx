import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
const FundProfile = () =>{
    const navigate=useNavigate();
    return(
        <>
            <TableWithPagination
                API={Api.getFundPro}
                columns={[
                    {
                        title:'资金',
                        dataIndex:'fund',
                        key:'fund'
                    },
                    {
                        title:'创建者',
                        dataIndex: 'creator',
                        key:'creator'
                    },
                    {
                        title:'创建日期',
                        dataIndex:'createDate',
                        key:'createDate',
                    },
                    {
                        title:'最近更新日期',
                        dataIndex:'date',
                        key:'date'
                    },
                    {
                        title:'查看详情',
                        dataIndex: 'fundInfo',
                        key:'fundInfo',
                        render:()=>{
                            return(
                                <Button type={'link'} onClick={()=>{navigate('/c/fund-info')}}>查看</Button>
                            )
                        }
                    }
                ]}
            />
        </>
    );
}

export default FundProfile;