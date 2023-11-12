import {useEffect} from "react";
import {Api} from "../API/api";
import {useParams} from "react-router-dom";

export const Download = ()=>{
    const {token} = useParams();
    useEffect(()=>{
        Api.download({token:token}).then((file:any)=>{
            const blob = new Blob([file])
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            console.log(blob);
            link.href = url;
            link.setAttribute('download', blob.name); //下载后的文件名myfile.log
            document.body.appendChild(link);
            link.click();
        }).catch(()=>{})
    },[])
    return (<></>)
}