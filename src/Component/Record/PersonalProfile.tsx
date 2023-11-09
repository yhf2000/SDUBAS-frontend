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
    const userinfo = useSelector((state: IState) => state.UserReducer)
    const [record, setRecord] = useState<any>({user_name:userinfo.userInfo?.username});
    const dispatch = useDispatch()
    const AddTableVersion = (name: string) => {
        dispatch({type: 'addTableVersion', name: name})
    }
    useEffect(() => {
        // console.log(record)
        AddTableVersion('PersonalTable')
    }, [record])
    return (
        <div
            className={"table-container"}
        >
            <Card
                title={'个人档案'}
                headStyle={{textAlign:'left'}}
                style={{minWidth:'1000px'}}
                extra={
                <>
                    <SelectUser setRecord={setRecord}/>
                    <span
                        style={{
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            padding: '5px 10px',
                            borderRadius: '4px',
                        }}
                    >
                        {record?.username === undefined ? "请选择" : `当前用户为:${record?.user_name??userinfo.userInfo?.username}`}
                </span>
                </>
            }>
                <Descriptions
                    title={"用户信息"}
                >
                    <Descriptions.Item label={'姓名'}>{record?.user_name}</Descriptions.Item>
                    <Descriptions.Item label={'入学时间'}>{record?.enrollment_dt}</Descriptions.Item>
                    <Descriptions.Item label={'毕业时间'}>/</Descriptions.Item>
                    <Descriptions.Item label={'学号'}>{record?.card_id}</Descriptions.Item>
                </Descriptions>
                <TableWithPagination
                        name={'PersonalTable'}
                        columns={PersonalProfileColumns}
                        API={async (data: any) => {
                            // console.log(record)
                            if(record?.user_id)
                            {
                                data = {user_id:record.user_id, ...data}
                            }
                            return Api.getPersonalProfile({data: {...data}})
                        }}
                        bordered
                    />


                {/*<TableWithPagination*/}
                {/*    */}
                {/*/>*/}
            </Card>
        </div>
    )
};

export default PersonalProfile;

