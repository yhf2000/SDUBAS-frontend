import CLayout from "./Layout/CLayout";
import CRootJump from "./Layout/CRootJump";
import Home from "./Page/Home";
import ProjectInfo from "./Page/Project/ProjectInfo";
import Experiment from "./Page/Project/Experiment"
import CLogin from "./Page/user/Login"
import Resources from "./Page/Project/Resources";
import Course from "./Page/Project/Course";
import FundInfo from "./Page/FundInfo";
import UserInfo from "./Page/user/UserInfo";
import ResourceInfo from "./Page/ResourceInfo";
import FundProfile from "./Component/Record/FundProfile";
import ResourceProfile from "./Component/Record/ResourceProfile";
import CreditBank from "./Component/Record/CreditBank";
import PersonalProfile from "./Component/Record/PersonalProfile";
import NewPwd from "./Page/user/NewPwd";
import School from "./Page/School/School";
import College from "./Page/School/College";
import MajorClass from "./Page/School/MajorClass";
import ManageUsers from "./Page/ManageUser/ManageUsers";
import AddUsersByRole from "./Page/ManageUser/AddUsersByRole";
import OperationRecords from "./Page/OperationRecords";

export interface IBaseRouter {
    id: number
    path: string
    component?: any
}

export interface IRouter extends IBaseRouter {
    title: string
    icon?: any
    children?: IRouter[]
}

export const mainRouter: IBaseRouter[] = [
    {id: 0, path: "/", component: <CRootJump/>},
    {id: 1, path: "/c/*", component: <CLayout/>},
]


export const CLayoutRouter: IBaseRouter[] = [
    {id: 0, path: "/home", component: <Home/>},
    {id: 1, path: "/profile", component: <></>},
    {id: 2, path: "/login", component: <CLogin/>},
    {id: 3, path: "/register", component: <></>},
    {id: 4, path: "/Project-info/:pId", component: <ProjectInfo/>},
    {id: 5, path: "/experiment", component: <Experiment/>},
    {id: 6, path: "/resources", component: <Resources/>},
    {id: 7, path: "/course", component: <Course/>},
    // {id: 8, path: "/records", component: <Records/>},
    {id: 9, path: "/fund-info/:fId", component: <FundInfo/>},
    {id: 10, path: "/user", component: <UserInfo/>},
    {id: 11, path: "/resource-info/:rId", component: <ResourceInfo/>},
    {id: 13, path: "/record_fund", component: <FundProfile/>},
    {id: 14, path: "/record_resource", component: <ResourceProfile/>},
    {id: 15, path: "/creditBank", component: <CreditBank/>},
    {id: 16, path: '/record_personal', component: <PersonalProfile/>},
    {id: 17, path: '/set_password/:token', component: <NewPwd/>},
    {id: 18, path: '/school', component: <School/>},
    {id: 19, path: 'school/:school_id/college', component: <College/>},
    {id: 20, path: 'school/:school_id/college/:college_id/MajorClass', component: <MajorClass/>},
    {id: 21, path: '/users', component: <ManageUsers/>},//用户管理的页面
    {id: 22, path: '/addUsers/:role_id', component: <AddUsersByRole/>},
    {id: 23, path: '/log', component: <OperationRecords/>}
]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/c/home",},
    {id: 1, title: "实验平台", path: "/c/experiment",},
    {id: 2, title: "教学资源", path: "/c/resources",},
    {id: 3, title: "课程平台", path: "/c/course",},
    // {id: 4, title: "教学档案", path: "/c/records",},
    {id: 6, title: "资源档案", path: "/c/record_resource"},
    {id: 7, title: "资金档案", path: "/c/record_fund"},
    {id: 8, title: "学分银行", path: "/c/creditBank"},
    {id: 9, title: "个人档案", path: "/c/record_personal"},
    {id: 10, title: '学校管理', path: "/c/school"},
    {id: 11, title: '用户管理', path: "/c/users"},
    {id: 12, title: '日志', path: '/c/log'}
]
