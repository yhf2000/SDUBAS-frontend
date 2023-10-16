import TableWithPagination from "../../Component/Common/Table/TableWithPagination";
import {
    Card,
    Form,
    Input,
    List, Select,
    Space,
} from "antd";
import ProCard from "../../Component/Project/ProCard";
import {useNavigate} from "react-router-dom";
import ModalFormUseForm from "../../Component/Common/Form/ModalFormUseForm";
import ProjectForm1 from "../../Component/Project/Form/ProjectForm1";
import {Api} from "../../API/api";
import ProjectForm2 from "../../Component/Project/Form/ProjectForm2";
import {arraytostr} from "../../Utils/arraytostr";


const Experiment = () => {
    const navigate = useNavigate();

    // useMemo
    function handleClick(item: any) {

    }

    // console.log('there is ')
    return (
        <Card
            extra={
                <ModalFormUseForm
                    titile={'新建实验'}
                    type={'create'}
                    btnName={'新建项目'}
                    TableName={'ExperimentMainTable'}
                    subForm={[
                        {
                            component: ProjectForm1,
                            label: "",
                        },
                        {
                            component: ProjectForm2({service_type:7}),
                            label: ""
                        }
                    ]}
                    dataSubmitter={(value: any) => {
                        console.log('up',value);
                        value.tag = arraytostr(value.tag);
                        return Api.newPro({
                            data: value
                        });
                    }}
                />}
        >
            <TableWithPagination
                name={'ExperimentMainTable'}
                useList={true}
                API={async (data:any)=>{return Api.getProListByType({data:{projectType:'实验',tag:'',...data}})}}
                // initData={initData}
                size={'small'}
                getForm={(onFinish: any) => {
                    return (
                        <Space size={30}>
                            <Form.Item label={'标签'}>
                                <Select onChange={onFinish} mode={'multiple'} style={{width:120}}>
                                    <Select.Option value={'国家'}>国家</Select.Option>
                                    <Select.Option value={'省级'}>省级</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label={"名称"} name={"title"}>
                                <Input onPressEnter={() => {
                                    onFinish();
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
                            <ProCard item={item} onClick={() => handleClick(item)} TableName={'ExperimentMainTable'}/>
                        </List.Item>
                    )
                }}
            />
        </Card>
    );
}

export default Experiment;