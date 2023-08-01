export type loginInfo = {
    username: string,
    password: string
}

export type forgetInfo = {
    username: string,
    email: string,
    captchaId: string,
    captcha: string
}

export type verificationEmail = {
    email: string,
    captcha: string,
    captchaId: string
}
