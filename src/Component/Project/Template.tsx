import {Button, Form, message, Modal, Space} from "antd";
import {useState} from "react";
import {Api} from "../../API/api";
import {DatePicker} from "antd";
import ModalFormUseForm from "../Common/Form/ModalFormUseForm";
import moment from "moment";

const {RangePicker} = DatePicker;

const Template = (props: any) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ModalFormUseForm
                btnName={'申请'}
                btnType={'link'}
                subForm={[
                    {
                        component: (
                            <>
                                {props.record.time_limit &&
                                    (
                                        <Form.Item name={'time'} label={'期限'}>
                                            <RangePicker/>
                                        </Form.Item>
                                    )
                                }
                                <Form.Item name={'id'} initialValue={props.record.id} style={{display: 'none'}}/>
                            </>
                        )
                    }
                ]}
                dataSubmitter={async (data: any) => {
                    data.time = data.time.map((t:any)=>{
                        return moment(t).format('YYYY-MM-DD');
                    })
                    return Api.applyTemplate(data);
                }}
            />
        </>
    )
};

export default Template;