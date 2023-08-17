import request from "./request";

export const Api: { [key: string]: any } = {
    getProfile: async (data: any) => {
        return request.get("user/getProfile", data)
    }
}
