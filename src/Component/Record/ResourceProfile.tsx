import TableWithPagination from "../Common/Table/TableWithPagination";
import {Api} from "../../API/api";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
const ResourceProfile = () =>{
    const navigate = useNavigate();
    const userInfo = useSelector((state:IState)=>state.UserReducer.userInfo);
    return(
        <>
            <TableWithPagination
                API={"getResourcePro"}
                columns={[
                    {
                        title:'名称',
                        dataIndex:'title',
                        key:'title'
                    },
                    {
                        title:'日期',
                        dataIndex: 'date',
                        key:'date'
                    },
                    {
                        title:'状态',
                        dataIndex:'state',
                        key:'state',
                    },
                    {
                        title:'查看详情',
                        dataIndex: 'fundInfo',
                        key:'fundInfo',
                        render:()=>{
                            return(
                                <Button type={'link'} onClick={()=>{navigate('/c/resource-info')}}>查看</Button>
                            )
                        }
                    }
                ]}
            />
        </>
    );
}

export default ResourceProfile;