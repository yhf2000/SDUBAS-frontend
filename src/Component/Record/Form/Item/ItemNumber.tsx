import {Form, Input} from "antd";
import React from "react";
import {withTranslation} from "react-i18next";
import {Api} from "../../../../API/api";

const ItemNumber = (props: any) => {
    return (
        <Form.Item
            name="number"
            label={"number"}
            rules={
                [
                    {
                        required:
                            props.editable !== false && props.notRequired !== true,
                        message: "numberEmpty"
                    },
                ]
            }
            hasFeedback>
            <Input
                disabled={props.editable === false}
                bordered={props.editable}
            />
        </Form.Item>
    )
}

export default withTranslation()(ItemNumber)