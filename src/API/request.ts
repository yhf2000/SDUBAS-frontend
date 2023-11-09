import axios, {AxiosRequestConfig} from "axios";
import {message} from "antd";
import {getAddress} from "../config";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";

const baseUrl = getAddress().SERVER
const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
})
service.defaults.withCredentials = true
let isLogin = false;

const getZipFile: any = async (url: string, data: object, config?: AxiosRequestConfig, filename?: string) => {
    const response = await service.post(url, data, {
        ...config, responseType: 'blob'
    });
    try {
        let blob = new Blob([response.data], {type: 'application/zip'})
        let Url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = Url
        link.download = filename ?? `${Date.now()}-TestCase.zip`
        link.click()
        URL.revokeObjectURL(Url)
    } catch (e) {
        return Promise.reject(e)
    }
    return Promise.resolve()
}


const messageDisabledList = [
    "/users/getProfile",
    "/projects/project/type"
]

const DealResponse = async (resp: any, url: string) => {
    // const isLogin = useSelector((state:IState)=>state.UserReducer.isLogin)
    try {
        const response = await resp;
        // console.log('response',response);
        localStorage.setItem('server-time', response.data.timestamp)
        if (Math.abs(response.data.timestamp - Date.now()) > 60000) {
            message.error("本地时间异常")
            // return Promise.reject("本地时间异常")
        }
        switch (response.data.code) {
            case 0:
                isLogin = true
                return response.data.data
            default:
                // if(isLogin)
                    message.error(response.data.message);
                return Promise.reject(response.data.message)
        }
    } catch (e: any) {
        const response = e.response
        if (response === undefined) {
            if(isLogin)
                message.error("网络错误")
            return Promise.reject("网络错误")
        }
        switch (response.data.code) {
            case 401:
                return Promise.reject(response.data.message)
            default:
                if (messageDisabledList.indexOf(url) === -1)
                    message.error(response.data.message);
                return Promise.reject(response.data.message)
        }
    }
}

const get = async (url: string, params?: object, config?: AxiosRequestConfig) => {
    return await DealResponse(service.get(url, {
        ...{headers: {"Cache-Control": "no-cache, no-store, must-revalidate","Access-Control-Allow-Origin":"*"}}, params, ...config,
    }), url)
}

const post = async (url: string, data: object, config?: AxiosRequestConfig) => {
    return await DealResponse(service.post(url, data, {
        ...{headers: {"Cache-Control": "no-cache, no-store, must-revalidate","Access-Control-Allow-Origin":"*"}}, ...config
    }), url);
}

const put = async (url: string, data?: object, config?: AxiosRequestConfig) => {
    return await DealResponse(service.put(url, data, {
        ...{headers: {"Cache-Control": "no-cache, no-store, must-revalidate","Access-Control-Allow-Origin":"*"}, ...config}
    }), url);
}
const Delete = async (url: string, config?: AxiosRequestConfig) => {
    return await DealResponse(service.delete(url, {
        ...{headers: {"Cache-Control": "no-cache, no-store, must-revalidate","Access-Control-Allow-Origin":"*"}},
        ...config
    }), url);
}

const request = {
    get,
    post,
    put,
    getZipFile,
    delete: Delete
}
export default request;
