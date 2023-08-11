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
    roles: Role
}

export interface IUserState {
    isLogin: boolean
    queryLogin: boolean
    userInfo: IUserInfo | undefined
}

export interface IUserAvatar {
    email?: string | null
    size?: AvatarSize
    shape?: 'circle' | 'square'
    className?: string | null
}