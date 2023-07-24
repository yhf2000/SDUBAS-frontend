import React, {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo, userLogin} from "../../Redux/Action/user";

import {IState} from "../../Type/base";
import Api from "../../API/api"; // 请使用正确的模块路径

interface IUserLoginCheck {
    jump: boolean
}

const UserLoginCheck = (props: IUserLoginCheck) => {
    const isLogin = useSelector((state: IState) => state.UserReducer.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLogin) {
            Api.getProfile().then((res: any) => {
                dispatch({type: "setUserInfo", data: res});
                dispatch({type: "userLogin", data: res});
            }).catch(() => {
                dispatch({type: "userLogout"});
                props.jump && navigate("/login?to=" + location.pathname, {replace: true});
            });
        }
    }, [isLogin, dispatch, navigate, location.pathname]);

    return null;
};

export default UserLoginCheck;
