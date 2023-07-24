import {AvatarSize} from "antd/es/avatar/SizeContext";

export interface IUserInfo {
    email: string
    username: string
}

export interface IUserState {
    isLogin: boolean
    userInfo: IUserInfo | undefined
}

export interface IUserAvatar {
    email?: string | null
    size?: AvatarSize
    shape?: 'circle' | 'square'
}