import CLayout from "./Layout/CLayout";
import CRootJump from "./Layout/CRootJump";
import Home from "./Page/Home";
import ProjectInfo from "./Page/ProjectInfo";

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
    {id: 2, path: "/login", component: <></>},
    {id: 3, path: "/register", component: <></>},
    {id: 3, path: "/project-info/*", component: <ProjectInfo/>},

]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/c/home",},
    {id: 1, title: "实验平台", path: "/c/experiment",},
    {id: 2, title: "教学资源", path: "/c/resources",},
    {id: 3, title: "课程平台", path: "/c/course",},
    {id: 4, title: "教学档案", path: "/c/records",},
]