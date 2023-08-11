import request from "./request";
import {loginInfo, forgetInfo, verificationEmail} from "../Type/types";
import {parentPort} from "worker_threads";
import getData from "./getData";
import itemPassword from "../Component/User/Form/Item/ItemPassword";

export const Api: { [key: string]: any } = {
    /*******************user************************/
    register: async (data: any) => {
        return request.post('/user/register', data?.data);//用户注册
    },
    login: async (data: any) => {
        return request.get('/user/login', data?.data);//用户登录
    },
    logout: async () => {
        return request.get('/user/logout');//登出
    },
    isExist: async (data: any) => {
        return request.get("/user/isExist", data?.data);
    },
    checkPwd: async (data: { password: string }) => {
        return request.get("/user/checkPwd", data);//检查密码是否正确
    },
    getProfile: async (data: any) => {
        return request.get('/user/getProfile');
    },


    //Resource
    /******************Resource*********************/
    newResource: async (data: any) => {
        return request.post('/resources/resource', data?.data); //创建资源项目
    },
    getResource: async (data: any) => {
        return request.get('/resources/resource/view', data?.data);//查看所有资源项目getResource
    },
    getResourceInfo: async (data: any) => {
        return request.get(`/resources/resource/${data.rId}`, data?.data);//查看资源详情
    },
    updateResource: async (data: any) => {
        return request.put(`/resources/resource/${data.rId}`)//修改资源数目
    },
    applyResource: async (data: any) => {
        return request.post(`/resources/${data.rId}/apply`, data.data);//申请某个资源
    },
    getApplyInfo: async (data: any) => {
        return request.get(`/resources/resource/${data.rId}/apply}`, data?.data);//获取一个资源的所有申请
    },
    deleteResource: async (data: any) => {
        return request.post(`/resources/resource/${data.rId}`, data?.data);//删除某一资源
    },


    //资金
    /******************************资金*******************************/
    newFund: async (data: any) => {
        return request.post('/resources/financial', data);//添加资金项目
    },
    newAccount: async (data: any) => {
        return request.post(`/resources/financial/${data.fId}/account`, data?.data);//添加收支记录
    },
    queryTotal: async (data: any) => {
        return request.get(`resources/financial/${data.fId}`, data?.data);//计算总额，外加额外信息
    },
    getFundInfo: async (data: any) => {
        return request.get(`/resources/financial/${data.fId}/accountbook`, data?.data);//查看账单
    },
    deleteFund: async (data: any) => {
        return request.post(`/resources/financial/${data.fid}`, data?.data);//删除资金项目
    },
    updateFund: async (data: any) => {
        return request.put(`/resources/financial/${data.fId}`, data?.data);//修改资金项目
    },
    getFund: async (data: any) => {
        return request.get('/resources/financial', data?.data);//获得资金列表
    },


    //Project
    newPro:async (data:any)=>{
        return request.post('/projects',data.data);//创建项目
    },
    updatePro: async (data: any) => {
        return request.put(`/projects/${data.pId}`, data?.data);//编辑项目
    },
    deletePro: async (data: any) => {
        return request.delete(`/projects/${data.pId}`, data?.data);//删除项目
    },
    getProList: async (data: any) => {
        return request.get('/projects',data.data);//查询项目列表
    },
    getProInfo: async (data: any) => {
        return request.get(`/projects/${data.pId}`, data?.data);//查询项目详情
    },
    getProContent: async (data: any) => {
        return request.get(`/projects/${data.pId}/contents`, data?.data);//查询项目内容
    },
    getProConInfo: async (data: any) => {
        return request.get(`/projects/${data.pId}/contents/${data.cId}`, data?.data);//查询项目内容详情
    },
    addProCredit: async (data: any) => {
        return request.post(`/projects/${data.pId}/credits`, data.data);//添加项目学分认定
    },
    submitProContent: async (data: any) => {
        return request.post(`/projects/${data.pId}/contents/${data.cId}/submissions`, data?.data);
        //项目内容提交
    },
    scoreProCon: async (data: any) => {
        return request.post(`/projects/${data.pId}/contents/${data.cId}/scores`, data.data);
        //项目内容打分
    },
    getUserSubmission: async (data: any) => {
        return request.get(`/projects/${data.pId}/contents/${data.cId}/submission/${data.uId}`, data?.data);
        //查看用户在一个内容下的提交内容
    },
    listProMember: async (data: any) => {
        return request.get(`/projects/${data.pId}/members`);//查看参加的项目成员
    },
}
