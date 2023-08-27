import {useState} from "react";
import {Form, Space, Switch} from "antd";

const ItemSwitch = (props: any) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (checked: boolean) => {
        setChecked(checked);
    }
    return (
        <>
            <div>是否需要打分</div>
            <Form.List
                name={props.name}
            >
                {() => (
                    <>
                        <Form.Item>
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        {checked && props.children}
                    </>
                )}

            </Form.List>
        </>
    )
}
export default ItemSwitch;