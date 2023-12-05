import {AvatarSize} from "antd/es/avatar/SizeContext";

export type Role = "superadmin" | "admin" | "user"

export enum Sex {
    Unknown = 2,
    Male = 1,
    Female = 0
}

export interface IUserInfo {
    email: string
    username: string
    is_bind: any
    status: any
    card_id:string
    roles: Role
    enrollment_dt:string
    graduation_dt:string
    realname:string,
    oj_bind:boolean//oj绑定
    oj_username:string,
}

export interface IUserState {
    isLogin: boolean
    queryLogin: boolean
    userInfo: IUserInfo | undefined
    userPermission:IUserPermission
}

export interface IUserAvatar {
    email?: string | null
    size?: AvatarSize
    shape?: 'circle' | 'square'
    className?: string | null
}

export interface IUserPermission{
        [key:string]:any
}