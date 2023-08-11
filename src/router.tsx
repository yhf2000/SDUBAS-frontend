import CLayout from "./Layout/CLayout";
import CRootJump from "./Layout/CRootJump";
import Home from "./Page/Home";
import ProjectInfo from "./Page/ProjectInfo";
import Experiment from "./Page/Experiment"
import CLogin from "./Page/Login"
import Resources from "./Page/Resources";
import Course from "./Page/Course";
import ForgetPass from "./Component/User/Form/ForgetPass";
import Records from "./Page/Records";
import FundInfo from "./Page/FundInfo";
import UserInfo from "./Page/UserInfo";
import ResourceInfo from "./Page/ResourceInfo";
import TResourceInfo from "./Page/TResourceInfo";
import ProComplete from "./Page/ProComplete";

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
    {id: 8, path: "/records", component: <Records/>},
    {id: 9, path: "/fund-info", component: <FundInfo/>},
    {id: 10, path: "/user", component: <UserInfo/>},
    {id: 11, path: "/resource-info", component: <ResourceInfo/>},
    {id: 12, path: "/tresource-info", component: <TResourceInfo/>},
    {id: 13, path: "/pro-complete", component: <ProComplete/>},
]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/c/home",},
    {id: 1, title: "实验平台", path: "/c/experiment",},
    {id: 2, title: "教学资源", path: "/c/resources",},
    {id: 3, title: "课程平台", path: "/c/course",},
    {id: 4, title: "教学档案", path: "/c/records",},
]
