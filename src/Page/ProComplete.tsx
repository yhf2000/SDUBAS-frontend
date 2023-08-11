import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {Button, Col, Form, Input, List, Row, Space} from "antd";
import {useState} from "react";
import ProCard from "../Component/Project/ProCard";
import {useTranslation} from "react-i18next";

const items = [
    {
        name: '作业1',
        start: '2023-7-20 00:00',
        ddl: '2023-8-7 00:00',
        submit: 'true'
    },
    {
        name: '作业2',
        start: '2023-7-19 10:00',
        ddl: '2023-8-6 12:00',
        submit: false
    }
]
const ProComplete = () => {
    const {t} = useTranslation();
    const [submit, setSubmit] = useState(true);
    return (
        <>
            <TableWithPagination
                useList={true}
                API={"getProComplete"}//待完成的API接口
                size={'small'}
                // getForm={(onFinish: any) => {
                //     return (
                //         <Space size={30}>
                //             <Form.Item label={t("Search")} name={"title"}>
                //                 <Input onPressEnter={() => {
                //                     onFinish()
                //                 }}/>
                //             </Form.Item>
                //         </Space>
                //     );
                // }}
                useFormBtn={false}
                defaultPageSize={12}
                renderItem={(item: any) => {
                    return (
                        <List.Item key={item.name}>
                            <Row>
                                <Col>
                                    {item.name}
                                </Col>
                                <Col>
                                    {item.start}-{item.ddl}
                                </Col>
                                <Col>
                                    {item.submit ? <p>已提交</p> : <Button type={'link'}>提交</Button>}
                                </Col>
                            </Row>
                        </List.Item>
                    )
                }}
            />
        </>
    );
}

export default ProComplete;