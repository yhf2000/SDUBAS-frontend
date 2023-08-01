import request from "./request";
import {loginInfo, forgetInfo, verificationEmail} from "../Type/types";

export const Api: { [key: string]: any } = {
    getProfile: async (data: any) => {
        return request.get("user/getProfile", data)
    },
    login: async (data: loginInfo) => {
        return request.post('/user/login', data)
    },
    logout: async () => {
        return request.get('/user/logout')
    },
    forgetPassword: async (data: forgetInfo) => {
        return request.post('/user/forgetPassword', data)
    },
    getCaptcha: async () => {
        return request.get("/user/getCaptcha")
    },
    sendVerificationEmail: async (data: verificationEmail) => {
        return request.post('/user/sendVerificationEmail', data)
    },
    isExist: async (data: any) => {
        return request.get("/user/isExist", data)
    },
    getNotification: async (data: any) => {//需要修改参数
        return request.get('/getNotification')
    },
    getCreditBank: async (data: any) => {
        return request.get("/user/getCreditBank");
    },
    getFundPro: async (data: any) => {
        return request.get('/user/getFundPro');
    },
    getPersonalProfile: async (data: any) => {
        return request.get('/user/getPersonalProfile');
    },
    getResourcePro: async (data: any) => {
        return request.get('/user/getResourcePro');
    },
    getResourcePermission: async (data: any) => {
        return request.get('/user/getResourcePermission');
    },
    getResource: async (data: any) => {
        return request.get('/user/getResource');
    }
}
