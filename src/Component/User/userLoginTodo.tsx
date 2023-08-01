import {loginInfo} from "../../Type/types";

import getData from "../../API/getData";
import {useDispatch} from "react-redux";
import {Api} from "../../API/api";
import {Dispatch} from "react";

export default function UserLoginTodo(props: loginInfo){
           return (dispatch:Dispatch<any>)=>{
               Api.login(props).then((r:any)=>{
                   Api.getProfile().then((res:any)=>{
                       dispatch({type: "setUserInfo", data: res});
                       dispatch({type: "userLogin"});
                   })
               })
           }
            //    getData(
            //     "login",
            //    {props},
            //     (r: any) => {
            //         dispatch(getData(
            //             'getProfile',
            //             {},
            //             (res:any)=>{
            //                 dispatch({type: "setUserInfo", data: res});
            //                 dispatch({type: "userLogin"});
            //             }
            //         ))
            //     }
            // )
};
