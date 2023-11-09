import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import getData from "../../API/getData";
import {useDispatch} from "../../Redux/Store";
import {useSelector} from "react-redux";
import {IState} from "../../Type/base"; // 请使用正确的模块路径

interface IUserLoginCheck {
    jump: boolean
}

const UserLoginCheck = (props: IUserLoginCheck) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = useSelector((state:IState)=>state.UserReducer.isLogin)


    useEffect(() => {
        // if(isLogin)
        dispatch(getData(
            "getProfile",
            {},
            (res: any) => {
                dispatch({type: "setUserInfo", data: res});
                dispatch({type: "userLogin"});
            },
            () => {
                dispatch({type: "userLogout"});
                props.jump && navigate("/login?to=" + location.pathname, {replace: true});
            }
        ))
    }, [dispatch, navigate, location.pathname, props.jump]);

    return null;
};

export default UserLoginCheck;
