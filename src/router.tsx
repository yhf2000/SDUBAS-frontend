import CLayout from "./Layout/CLayout";
import CRootJump from "./Layout/CRootJump";
import Home from "./Page/Home";

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

]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/c/home",}
]