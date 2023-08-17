import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import md5 from "js-md5";
import {IUserAvatar} from "../../Type/user";
import {isValueEmpty} from "../../Utils/isValueEmpty";
import {avatarServerUrl} from "../../config";


const UserAvatarByEmail = (props: IUserAvatar) => {
    if (!isValueEmpty(props.email)) {
        let avatarUrl = `${avatarServerUrl}/${md5(props.email as string)}?d=identicon`;
        return (
            <Avatar
                src={avatarUrl}
                shape={props.shape}
                size={props.size}
            />
        )
    } else {
        return (
            <Avatar
                icon={<UserOutlined/>}
                shape={props.shape}
                size={props.size}
            />
        )
    }
}

export default UserAvatarByEmail