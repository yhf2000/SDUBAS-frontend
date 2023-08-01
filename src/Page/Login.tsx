import React, {Component, Dispatch, useEffect} from "react";
import {message} from "antd";
import {connect} from "react-redux";
import {IState} from "../Type/base";
import Login from "../Component/User/Login";
import {getUrlParams} from "../Utils/getUrlParams";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

const UrlPrefix = "/v2";
const CLogin = () => {
    const location = useLocation()
    const isLogin = useSelector((state: IState) => state.UserReducer.isLogin)
    const navigate = useNavigate();
    const testLogin = () => {
        if (isLogin) {
            let to = getUrlParams(location.search).to
            if (to === undefined) navigate(UrlPrefix + "/home", {replace: true})
            else {
                navigate(to, {replace: true})
                message.success("loginSuccessfully")
            }
        }
    }
    useEffect(() => {
        testLogin();
    }, []);

    return (
        <>
            <Login/>
        </>
    );
}


export default CLogin;