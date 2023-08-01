import UserProfile from "../Component/User/UserProfile";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";
import {isValueEmpty} from "../Utils/isValueEmpty";
import {avatarServerUrl} from "../config";
import md5 from "js-md5";

const UserInfo = ()=>{
    const userInfo = useSelector((state:IState)=>state.UserReducer.userInfo);
        return (
            <div className="App">
                <UserProfile
                    name={userInfo?.username || ""}
                    email={userInfo?.email || ""}
                    progress={66}
                />
            </div>
        );
}

export default UserInfo;