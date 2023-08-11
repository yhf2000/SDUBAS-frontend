import TableWithPagination from "../Component/Common/Table/TableWithPagination";
import {useTranslation} from "react-i18next";
import {
    Card,
    Form,
    Input,
    List,
    message,
    Space,
} from "antd";
import ProCard from "../Component/Project/ProCard";
import {useNavigate} from "react-router-dom";
import ModalFormUseForm from "../Component/Common/Form/ModalFormUseForm";
import ProjectForm from "../Component/Project/Form/ProjectForm";
import {Api} from "../API/api";
import {useMemo} from "react";


const Experiment = () => {
    const navigate = useNavigate();
    // useMemo
    function handleClick(item: any) {
        navigate(`/c/project-info/${item.id}`);
    }
    console.log('there is ')
    return (
        <Card
            title={'Experiment'}
            extra={
                <ModalFormUseForm
                    titile={'新建实验'}
                    type={'create'}
                    subForm={[
                        {
                            component: ProjectForm,
                            label: "",
                        },
                    ]}
                    dataSubmitter={(value: any) => {
                        console.log('value:', value);
                        return Api.newPro({
                            data: value
                        });
                    }}
                />}
        >
            <TableWithPagination
                name={'ExperimentMainTable'}
                useList={true}
                API={async (data:any)=>{return Api.getProList({data:{...data}})}}
                size={'small'}
                getForm={(onFinish: any) => {
                    return (
                        <Space size={30}>
                            <Form.Item label={"Search"} name={"title"}>
                                <Input onPressEnter={() => {
                                    onFinish()
                                }}/>
                            </Form.Item>
                        </Space>
                    );
                }}
                useFormBtn={false}
                defaultPageSize={12}
                renderItem={(item: any) => {
                    return (
                        <List.Item key={item.name}>
                            <ProCard item={item} onClick={() => handleClick(item)}/>
                        </List.Item>
                    )
                }}
            />
        </Card>
    );
}

export default Experiment;