import {loginInfo} from "../../Type/types";

import getData from "../../API/getData";
import {useEffect} from 'react'
import {useDispatch} from "../../Redux/Store";
import UserLoginCheck from "./UserLoginCheck";

export default function UserLoginTodo(props: loginInfo) {
    const dispatch = useDispatch();
    // Api.login(props).then((r:any)=>{
    //     Api.getProfile().then((res:any)=>{
    //         dispatch({type: "setUserInfo", data: res});
    //         dispatch({type: "userLogin"});
    //     })
    // }).catch((error:any)=>console.log(error));
    useEffect(() => {
        dispatch(getData(
            "login",
            {props},
            (r: any) => {
                return <UserLoginCheck jump={false}/>
            },
            (error: any) => {

            }
        ))
    }, [dispatch])
    return null
};
