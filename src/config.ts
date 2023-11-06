// 服务器配置信息
export function getAddress() {

    if (process.env.NODE_ENV === 'development') {
        return {
            SERVER: 'http://localhost:8000',
            FRONT: 'http://localhost:3000',
        }
    } else {
        return {
            SERVER: 'http://43.138.34.119/api',
            FRONT: 'http://43.138.34.119',
        }
    }
}

// 头像显示服务器配置信息
export const avatarServer = "cravatar.cn"
export const avatarServerUrl = "https://cravatar.cn/avatar"