import {Form, Input} from "antd";
import React from "react";
import {withTranslation} from "react-i18next";

const ItemPassword = (props: any) => {
    let firstPassProps = {name: "password", label: props.t("password")}
    if (props.newpass === true) firstPassProps = {name: "new_password", label: '新密码'}
    if (props.oldpass === true) firstPassProps = {name: "old_password", label: props.t("旧密码")}
    return (
        <>
            <Form.Item {...firstPassProps}
                       rules={[
                           {required: true, message: props.t("passwordEmpty")},
                       ]}
                       hasFeedback>
                <Input.Password onChange={(e)=>{if (props.onChange)props.onChange(e.target.value)}}/>
            </Form.Item>
            {
                props.oldpass === undefined && props.noConfirm !== true && (
                    <Form.Item
                        name="confirm"
                        label={
                            props.t("确认" + (props.newpass ? "新" : "") + "密码")
                        }
                        dependencies={[firstPassProps.name]}
                        hasFeedback
                        rules={[
                            {required: true, message: props.t("确认密码")},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue(firstPassProps.name) === value)
                                        return Promise.resolve();
                                    return Promise.reject(props.t("两次输入的密码不同"));
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                )
            }
        </>
    )
}

export default withTranslation()(ItemPassword)