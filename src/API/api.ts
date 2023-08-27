import request from "./request";

export const Api: { [key: string]: any } = {
    //file文件
    checkFile: async (data: any) => {
        return request.post('/files/upload/valid', data.data);
    },
    uploadFile: async (data: any) => {
        return request.post('/files/upload', data.data,
            {headers: {"Content-Type": "multipart/form-data"}});
    },
    getDownLoadUrl:async (data:any)=>{
        return request.get('/files/download',data.data);
    },


    //user自己注册部分
    /*******************user************************/
    register: async (data: any) => {
        return request.post('/users/register', data?.data);//用户注册
    },
    login: async (data: any) => {
        console.log(data.data);
        return request.post('/users/login', data?.data);//用户登录
    },
    logout: async () => {
        return request.put('/users/logout');//登出
    },
    forgetPassword: async (data: any) => {
        return request.post('/users/get_back_password', data.data);//忘记密码
    },
    setPass: async (data: any) => {
        return request.get(`/users/set_password/${data.token}`, data.data);//设置新密码
    },
    isExist: async (data: any) => {
        return request.post("/users/unique_verify", data?.data);//检查字段是否存在
    },
    getCaptcha: async () => {
        return request.get("/users/get_captcha")//获得验证码
    },
    sendVerificationEmail: async (data: any) => {
        console.log('send', data.data);
        return request.post('/users/send_captcha', data.data)//向用户发送验证码
    },
    getProfile: async (data: any) => {
        return request.get('/users/getProfile');//获得用户信息
    },
    updateUsername: async (data: any) => {
        return request.put('/users/username_update', data.data);
    },
    updateEmail: async (data: any) => {
        return request.post('/users/email_update', data.data);
    },
    bind: async (data: any) => {
        return request.post('/users/user_bind_information', data.data);
    },
    updatePwd: async (data: any) => {
        return request.put('/users/password_update', data.data);
    },


    //管理院添加用户部分
    newUser:async (data:any)=>{
        return request.post('/users/',data.data);
    },
    updateUser:async (data:any)=>{
        return request.put('/users/',data.data);
    },
    deleteUser:async (data:any)=>{
        return request.delete('/users/',data.data);
    },
    getUsers:async (data:any)=>{
        return request.get('/users/',data.data);//获得已有用户列表
    },

    //school
    newSchool: async (data: any) => {
        return request.post('/users/school_add', data.data);
    },
    getSchool: async (data: any) => {
        return request.get('/users/school_view', data.data);//查看学校列表
    },
    updateSchool: async (data: any) => {
        return request.put(`/users/school_update/${data.sId}`, data.data);//编辑学校信息
    },
    deleteSchool: async (data: any) => {
        return request.delete(`/users/school_delete/${data.sId}`, data.data);//删除学校
    },

    //college
    newCollege: async (data: any) => {
        return request.post('/users/college_add', data.data);
    },
    getCollege: async (data: any) => {
        return request.get('/users/college_view', data.data);
    },
    updateCollege: async (data: any) => {
        return request.put(`/users/college_update/${data.cId}`, data.data);
    },
    deleteCollege: async (data: any) => {
        return request.delete(`/users/college_delete/${data.cId}`, data.data);//删除某一学院
    },

    //class
    newClass: async (data: any) => {
        return request.post('/users/class_add', data.data);
    },
    updateClass: async (data: any) => {
        return request.put(`/users/class_update/${data.cId}`, data.data);
    },
    getClass: async (data: any) => {
        return request.get('/users/class_view', data.data);//获得班级列表
    },
    deleteClass: async (data: any) => {
        return request.delete(`/users/class_delete/${data.cId}`);//删除班级
    },
    newMajor: async (data: any) => {
        return request.post('/users/major_add', data.data);
    },
    getMajor: async (data: any) => {
        return request.get('/users/major_view', data.data);
    },
    updateMajor: async (data: any) => {
        return request.put(`/users/major_update/${data.mId}`, data.data);
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
        return request.delete(`/resources/resource/${data.rId}`, data?.data);//删除某一资源
    },


    //资金
    /******************************资金*******************************/
    newFund: async (data: any) => {
        return request.post('/resources/financial', data.data);//添加资金项目
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
        return request.delete(`/resources/financial/${data.fId}`, data?.data);//删除资金项目
    },
    updateFund: async (data: any) => {
        return request.put(`/resources/financial/${data.fId}`, data?.data);//修改资金项目
    },
    getFund: async (data: any) => {
        return request.get('/resources/financial', data?.data);//获得资金列表
    },
    updateNote: async (data: any) => {
        return Promise.resolve(true);//需要重写
    },
    deleteAccount: async (data: any) => {
        return request.delete(`/resources/financial/${data.fId}/${data.aId}`, data?.data);
    },


    //Project
    newPro: async (data: any) => {
        return request.post('/projects', data.data);//创建项目
    },
    updatePro: async (data: any) => {
        return request.put(`/projects/${data.pId}`, data?.data);//编辑项目
    },
    deletePro: async (data: any) => {
        return request.delete(`/projects/${data.pId}`, data?.data);//删除项目
    },
    getProList: async (data: any) => {
        return request.get('/projects', data.data);//查询项目列表
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
        //添加项目内容提交
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
    getPCSubmission: async (data: any) => {
        return request.get('/projects/Content/submission', data.data);//查询一个项目内容的提交项
    },


    //permission权限
    getAssignment: async (data: any) => {
        return request.get('/permission/', data.data);//获得莫角色分配的list
    },
    deleteAssignment: async (data: any) => {
        return request.delete('/permission/', data.data);//删除一个角色对某人的分配
    },
}
