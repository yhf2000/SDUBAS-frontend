import request from "./request";

const Api = {
    getProfile: async () => {
        return request.get("user/getProfile")
    }
}

export default Api;