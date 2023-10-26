import React, {useContext, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import {Api} from "../../API/api";
import {Card, Descriptions} from "antd";
import "../../Config/CSS/PersonalProfile.css";
import {SelectUser} from "./CreditBank";
import TableWithPagination from "../Common/Table/TableWithPagination";
import {PersonalProfileColumns} from "../../Config/Resource/columns";
import {useDispatch} from "../../Redux/Store"; // 引入 CSS 样式文件
const PersonalProfile = () => {
    const userinfo = useSelector((state:IState)=>state.UserReducer)
    const [record, setRecord] = useState<any>(undefined);
    const dispatch = useDispatch()
    const AddTableVersion = (name:string)=>{
        dispatch({type:'addTableVersion',name:name})
    }
    useEffect(()=>{
        console.log(1)
        AddTableVersion('PersonalTable')
    },[record])
    return (
        <Card extra={
            <>
                <SelectUser setRecord={setRecord}/>
                <span
                    style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                        padding: '5px 10px',
                        borderRadius: '4px',
                    }}
                >
                        {record === undefined ? "请选择" : `当前用户为:${record.user_name}`}
                </span>
            </>
        }>
            <Descriptions
                title={"用户信息"}
                >
                <Descriptions.Item label={'姓名'}>{record?.username}</Descriptions.Item>
                <Descriptions.Item label={'入学时间'}>2021-09-06</Descriptions.Item>
                <Descriptions.Item label={'毕业时间'}>/</Descriptions.Item>
                <Descriptions.Item label={'学号'}>202100150155</Descriptions.Item>
                <Descriptions.Item label={'去向'}>家里蹲</Descriptions.Item>
            </Descriptions>
            {
                record&&<TableWithPagination
                    name={'PersonalTable'}
                    columns={PersonalProfileColumns}
                    API={async (data:any)=>{
                        // console.log(record)
                        return Api.getPersonalProfile({data:{user_id:record.user_id,...data}})}}
                    bordered
                />
            }

            {/*<TableWithPagination*/}
            {/*    */}
            {/*/>*/}
        </Card>
    )
};

export default PersonalProfile;

