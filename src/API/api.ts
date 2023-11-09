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
    getDownLoadUrl: async (data: any) => {
        return request.get('/files/download', data.data);
    },

    //user自己注册部分
    /*******************user************************/
    register: async (data: any) => {
        return request.post('/users/register', data?.data);//用户注册
    },
    login: async (data: any) => {
        // console.log(data.data);
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
        // console.log('send', data.data);
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
    batchImport: async (data: any) => {
        console.log(data);
        return request.post('/users/user_add_batch', data.data);
    },
    getOperations: async (data: any) => {
        return request.get('/operations', data.data);
    },
    active:async (data:any)=>{
        return request.put('/users/activation',data.data)//用户激活
    },


    //管理院添加用户部分
    //1.管理员添加角色
    // newRole: async (data: any) => {
    //     return request.post('/', data.data);
    // },
    getRoles: async (data: any) => {
        return request.get('/permissions/search_created_role', data.data);//获得角色
    },
    updateRole: async (data: any) => {
        return request.put('/', data.data);
    },
    deleteRole: async (data: any) => {
        return request.delete('/', data.data);
    },

    newUser: async (data: any) => {
        return request.post('/users/user_add', data.data);
    },
    updateUser: async (data: any) => {
        return request.put('/users/', data.data);
    },
    deleteUser: async (data: any) => {
        return request.delete('/users/', data.data);
    },

    //school
    newSchool: async (data: any) => {
        return request.post('/users/school_add', data.data);
    },
    getSchool: async (data: any) => {
        return request.get('/users/school_view', data.data);//查看学校列表
        // return {rows: [{id: 1, name: '山东大学'}], totalNum: 1, totalPage: 1}
    },
    updateSchool: async (data: any) => {
        return request.put(`/users/school_update/${data.sId}`, data.data);//编辑学校信息
    },
    deleteSchool: async (data: any) => {
        return request.delete(`/users/school_delete/${data.sId}`, data.data);//删除学校
    },
    newDefaultRole:async (data:any)=>{
        return request.post('/',data.data);
    },

    //college
    newCollege: async (data: any) => {
        return request.post('/users/college_add', data.data);
    },
    getCollege: async (data: any) => {
        return request.get('/users/college_view', data.data);
        // return {rows: [{id: 1, name: '计科'}]}
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
        // return {rows: [{id: 1, name: '计科'}]}
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
        // return {rows: [{Id: 1, name: '4090', state: 1, count: 5}]}
    },
    getResourceInfo: async (data: any) => {
        return request.get(`/resources/resource/${data.rId}/get`, data?.data);//查看资源详情
    },
    updateResource: async (data: any) => {
        return request.put(`/resources/resource/${data.rId}`)//修改资源数目
    },
    applyResource: async (data: any) => {
        return request.post(`/resources/resource/apply/${data.rId}`, data.data);//申请某个资源
    },
    getApplyInfo: async (data: any) => {
        return request.get(`/resources/resource/ifapply/${data.rId}`, data?.data);//获取一个资源的所有申请
        // return  {rows:[{who:'我',what:'4090',when:'8-10'}]}
    },
    deleteResource: async (data: any) => {
        return request.delete(`/resources/resource/${data.rId}/delete`, data?.data);//删除某一资源
    },
    getResourceUse: async (data: any) => {
        return request.get(`/resources/resource/application/${data.rId}/${data.day}`,data.data);
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
        return request.get('/resources/financial/search', data?.data);//获得资金列表
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
        return request.put(`/projects/update/${data.pId}`, data?.data);//编辑项目
    },
    deletePro: async (data: any) => {
        return request.delete(`/projects/delete/${data.pId}`, data?.data);//删除项目
    },
    getProList: async (data: any) => {
        return request.get('/projects/list', data.data);//查询项目列表
    },
    getProListByType: async (data: any) => {
        return request.get('/projects/project/type', data.data);
    },
    getProInfo: async (data: any) => {
        return request.get(`/projects/get/${data.pId}`, data?.data);//查询项目详情
    },
    getProContent: async (data: any) => {
        return request.get(`/projects/contents/${data.pId}`, data?.data);//查询项目内容
    },
    getProConInfo: async (data: any) => {
        return request.get(`/projects/${data.pId}/contents/${data.cId}`, data?.data);//查询项目内容详情
    },
    addProCredit: async (data: any) => {
        return request.put(`/projects/credits/${data.pId}`, data.data);//添加项目学分认定
    },
    submitProContent: async (data: any) => {
        return request.post(`/projects/submissions/${data.pId}/contents/${data.cId}`, data?.data);
        //添加项目内容提交
    },
    scoreProCon: async (data: any) => {
        return request.post(`/projects/scores/${data.pId}/contents/${data.cId}`, data.data);
        //项目内容打分
    },
    getUserSubmission: async (data: any) => {
        return request.get(`/projects/submissions/${data.pId}/contents/${data.cId}`, data?.data);
        //查看用户在一个内容下的提交内容
    },
    listProMember: async (data: any) => {
        return request.get(`/projects/members/${data.pId}`);//查看参加的项目成员
    },
    getPCSubmission: async (data: any) => {
        return request.get(`/projects/content/submission/${data.pId}`, data.data);//查询一个项目内容的提交项
    },
    submit: async (data: any) => {
        return request.post(`/projects/submit/${data.pId}/contents/${data.cId}`, data.data);//用户提交项目内容提交项
    },
    getStuConScore: async (data: any) => {
        return request.get(`/projects/content/${data.pId}/${data.cId}/score/all`, data.data);//查询所有学生某个项目内容的成绩
    },
    getUserCntsScore: async (data: any) => {
        return request.get(`/projects/${data.pId}/user/score/all`, data.data);//学生该项目所有内容的成绩
    },
    getProScore: async (data: any) => {
        return request.get(`/projects/score/${data.pId}`);//查看项目成绩
    },
    Sign: async (data: any) => {
        return request.put(`/projects/${data.pId}/content/video/renew`, data.data);
    },
    getRefresh:async (data:any)=>{
        return request.get(`/projects/${data.pId}/${data.cId}/finish/renew`)
    },
    getRefreshAll:async (data:any)=>{
        return request.get(`/projects/${data.pId}/${data.cId}/finish/super`)
    },
    getTypeCredits:async (data:any)=>{
        return request.get(`/projects/${data.pId}/credits/all`,data.data);//获得所有的学分认证
    },
    //creditBank学分银行
    getUserCredits: async (data: any) => {
        return request.get('/projects/user/credits',data.data);
        // if(data.data.username === 'dyyy')
        //     return {credit: 55};
        // else return {credit:66}
    },
    getRequirements:async (data:any)=>{
        return request.get('/projects/user/credits')
        // return {rows:[{key:'0',name:'黄垚挺',type:'必修',completedCredits:70,requiredCredits:100},{key:'1',name:'黄垚挺',type:'国学',completedCredits:70,requiredCredits:100}]}
    },
    getCourseByCredit:async (data:any)=>{
      return request.get(`/projects/project/list/${data.type}`,data?.data);
      // return {rows:[{course:'人工智能',credits:5,complete:1}]}
    },
    getAllCourse:async (data:any)=>{
        return request.get('/projects/list',data?.data);//请求所有课程
    },

    //permission权限
    getAssignment: async (data: any) => {
        return request.get('/permission/', data.data);//获得某角色分配的list
    },
    deleteAssignment: async (data: any) => {
        console.log('chao',data.data);
        return request.delete(`/resources/resource/delete_user_in_resources/${data.rId}/${data.roleId}/${data.uId}`,);//删除一个角色对某人的分配
    },
    getTemplates: async (data: any) => {
        // return request.get('/permission/', data.data);  //
        return {rows:[{id:1,time_limit:1,template_name:'学生',permissions:['查看','提交']}]}
    },
    createTemplates:async (data:any)=>{
        return request.post('/permission',data.data);//创建模板角色
    },
    applyTemplate:async (data:any)=>{
        return request.post('/permission',data.data);
    },
    getPermission: async (data: any) => {
        return request.get('/permissions/return_privilege_list', data.data);//获得对应类型的权限
    },
    addDefaultRole: async (data: any) => {
        return request.post('/permissions/add_default_role', data.data);//添加默认角色
    },
    getCredits: async (data: any) => {
        return request.get('/projects/user/credits/all', data.data);//获得学分
    },
    getUsers: async (data: any) => {
        return request.get('/permissions/get_user_info', data.data);//获得已有用户列表
    },
    getWorkRole: async (data: any) => {
        return request.get('/permissions/get_work_role', data.data);//获得workrole
    },
    addUserByRole:async (data:any)=>{
        return request.post(`/resources/resource/add_user_in_resources/${data.rId}`,data.data);//往角色里添加用户
    },
    getCreatedUsers:async (data:any)=>{
        return request.get('/permissions/search_created_user',data.data);
    },


    //个人档案
    getPersonalProfile:async (data:any)=>{
        return request.get('/projects/user/personal/file',data.data);
    },

    //日志
    getValid:async (data:any)=>{
        return request.get("/users/get_operation",data.data)
        // if(data.id == 1)
        //     return {data:true}
        // return {data:false}
    },
    getValidAll:async (data:any)=>{
        // console.log(data.data)
        return request.get('/users/verify_hash',data.data);
    },
    getOperationLogs:async (data:any)=>{
        return request.get("/users/get_operation",data.data)
    }
}
