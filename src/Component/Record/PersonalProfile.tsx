import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../Type/base";
import { Api } from "../../API/api";
import { Avatar, Card, List } from "antd";
import UserAvatarByEmail from "../User/UserAvatarByEmail";
import "./PersonalProfile.css"; // 引入 CSS 样式文件

const PersonalProfile = () => {
    const userInfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const [activities, setActivities] = useState([]);
    const [awards, setAwards] = useState([]);

    const getPro = () => {
        Api.getPersonalProfile().then((data:any) => {
            setActivities(data.activities);
            setAwards(data.awards);
        }).catch((error:any)=>console.log('error:',error));
    };

    useEffect(() => {
        getPro();
    }, []);

    return (
        <div className="profile">
            <Card className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <UserAvatarByEmail email={userInfo?.email} size={64} />
                    </div>
                    <div className="profile-username">{userInfo?.username}</div>
                </div>
                <div className="profile-body">
                    <div className="profile-contact">
                        <div className="profile-email">{userInfo?.email}</div>
                    </div>
                    <div className="profile-activities">
                        <h3>活动经历</h3>
                        <List
                            size="small"
                            bordered
                            dataSource={activities}
                            renderItem={(item) => (
                                <List.Item className="profile-list-item">{item}</List.Item>
                            )}
                        />
                    </div>
                    <div className="profile-awards">
                        <h3>获奖记录</h3>
                        <List
                            size="small"
                            bordered
                            dataSource={awards}
                            renderItem={(item) => (
                                <List.Item className="profile-list-item">{item}</List.Item>
                            )}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PersonalProfile;