import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import {Api} from "../../API/api";
import {Card} from "antd";
import "../../Config/CSS/PersonalProfile.css";
import {SelectUser} from "./CreditBank";
import TableWithPagination from "../Common/Table/TableWithPagination"; // 引入 CSS 样式文件
const PersonalProfile = () => {
    const [username, setUsername] = useState(undefined);
    return (
        <Card extra={
            <>
                <SelectUser setUsername={setUsername}/>
                <span
                    style={{
                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                        padding: '5px 10px',
                        borderRadius: '4px',
                    }}
                >
                        {username === undefined ? "请选择" : `当前用户为:${username}`}
                </span>
            </>
        }>
            {/*<TableWithPagination*/}
            {/*    */}
            {/*/>*/}
        </Card>
    )
};

export default PersonalProfile;