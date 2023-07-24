import CLayout from "./Layout/CLayout";

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
    {id: 0, path: "/", component: <CLayout/>},
    {id: 1, path: "/c/*", component: <CLayout/>},
]


export const CLayoutRouter: IBaseRouter[] = [
    {id: 0, path: "/home", component: <></>},
    {id: 1, path: "/profile", component: <></>},
    {id: 2, path: "/login", component: <></>},
    {id: 3, path: "/register", component: <></>},

]
export const headerMenu: IRouter[] = [
    {id: 0, title: "主页", path: "/home",}
]