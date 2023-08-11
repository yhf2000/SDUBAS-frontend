import {Card, Form, Input, List, message, Space, Tag, Typography} from "antd";
import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {useTranslation} from "react-i18next";
import ProCard from "../Component/Project/ProCard";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm";
import JoinProjectBtn from "../Component/Project/JoinProjectBtn";
import {Link, useNavigate} from "react-router-dom";
import ProjectForm from "../Component/Project/Form/ProjectForm";
import getData from "../API/getData";
import {useDispatch} from "../Redux/Store";
import {Api} from "../API/api";

const Course = () => {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (item:any)=>{
        navigate(`/c/project-info/${item.id}`)
    }
    return (
        <>
            <Card
                title={t('Course')}
                extra={
                    <ModalFormUseForm
                        titile={'新建课程'}
                        type={'create'}
                        subForm={[
                            {
                                component: ProjectForm,
                                label: "",
                            },
                        ]}
                        dataSubmitter={(value:any)=>{
                            return Api.newPro({data:value});
                        }}
                    />}
            >
                <TableWithPagination
                    // name={'Course'}
                    useList={true}
                    API={"getProList"}
                    getForm={(onFinish: any) => {
                        return (
                            <Space size={30}>
                                <Form.Item label={t("Search")} name={"title"}>
                                    <Input onPressEnter={() => {
                                        onFinish()
                                    }}/>
                                </Form.Item>
                            </Space>
                        );
                    }}
                    useFormBtn={false}
                    defaultPageSize={5}
                    renderItem={(item: any) => {
                        return (
                            <List.Item key={item.name}>
                                <ProCard item={item} onClick={() => handleClick(item)}/>
                            </List.Item>
                        )
                    }}
                />
            </Card>
        </>
    );
}

export default Course;