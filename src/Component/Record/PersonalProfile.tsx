import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base";
import {Api} from "../../API/api";
import {Avatar, Card, List} from "antd";
import UserAvatarByEmail from "../User/UserAvatarByEmail";
import "./PersonalProfile.css"; // 引入 CSS 样式文件


const iactivities = [
    "参加学校科技创新大赛",
    "担任志愿者协助社区活动",
    "参加国际交流会议并发表演讲",
    "组织校内文化节活动",
    "参加户外拓展训练",
];

const iawards = [
    "优秀学生奖",
    "科学创新奖",
    "志愿者先锋奖",
    "学术研究奖",
    "领导力奖",
];
const PersonalProfile = () => {
    const userInfo = useSelector((state: IState) => state.UserReducer.userInfo);
    const [activities, setActivities] = useState(iactivities);
    const [awards, setAwards] = useState(iawards);

    // const getPro = () => {
    //     Api.getPersonalProfile().then((data: any) => {
    //         setActivities(data.activities);
    //         setAwards(data.awards);
    //     }).catch((error: any) => console.log('error:', error));
    // };
    //
    // useEffect(() => {
    //     getPro();
    // }, []);

    return (
        <div className="profile">
            <Card className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {/*{userInfo?.email}*/}
                        <UserAvatarByEmail email={"1494106501@qq.com"} size={64}/>
                    </div>
                    {/*{userInfo?.username}*/}
                    <div className="profile-username">{"yd3826"}</div>
                </div>
                <div className="profile-body">
                    <div className="profile-contact">
                        {/*{userInfo?.email}*/}
                        <div className="profile-email">{"1494106501@qq.com"}</div>
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