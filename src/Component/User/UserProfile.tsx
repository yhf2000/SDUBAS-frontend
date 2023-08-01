import { Card, Row, Col, Avatar, Progress, Divider } from 'antd';
import './UserProfile.css';
import UserAvatarByEmail from "./UserAvatarByEmail";

interface UserProfileProps {
    name: string;
    email: string;
    progress: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, progress }) => {
    return (
        <div className="user-profile">
            <Card className="user-card">
                <Row gutter={16}>
                    <Col span={6}>
                        <UserAvatarByEmail email={email} className={'user-avatar'} size={128}/>
                    </Col>
                    <Col span={18}>
                        <div className="user-info">
                            <h2 className="user-name">{name}</h2>
                            <p className="user-email">{email}</p>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card className="user-progress-card">
                <h3 className="user-progress-title">用户进度</h3>
                <Divider />
                <div className="user-progress">
                    <span className="user-progress-text">{`${progress}%`}</span>
                    <Progress percent={progress} />
                </div>
            </Card>
        </div>
    );
};

export default UserProfile;