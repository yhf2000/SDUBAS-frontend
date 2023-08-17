import ItemName from "../../Common/Form/Item/ItemName";
import ItemType from "../../Common/Form/Item/ItemType";
import ItemUpload from "../../Common/Form/Item/ItemUpload";
import ItemSwitch from "../../Common/Form/Item/ItemSwitch";
import {Form, Input} from "antd";
import ItemTreeData from "./ItemTreeData";

const roles = ['student', 'teacher']
export const options = [
    {
        key: '实验',
        value: '实验'
    },
    {
        key: '活动',
        value: '活动'
    },
    {
        key: '竞赛',
        value: '竞赛'
    },
    {
        key: '课程',
        value: '课程'
    }
]
const tagOptions=[
    {
        key:'1',
        value:'国家精品',
    }
]
const activeType = [
    {
        key: 0,
        value: '未开始'
    },
    {
        key: 1,
        value: '进行中',
    },
    {
        key: 2,
        value: '归档'
    }
]
const ProjectForm1 = (
    <>
        <ItemName label={'项目名称'} name={'name'} required={true}/>
        <ItemType label={'项目类型'} name={'type'} options={options} default={'1'} required={true}/>
        <ItemType label={'项目状态'} name={'active'} options={activeType} default={'0'} required={true}/>
        <ItemType label={'项目标签'} name={'tag'} options={tagOptions} default={'0'} required={false}/>
        {/*<ItemUpload*/}
        {/*    label={'上传文件'}*/}
        {/*    name={'file'}*/}
        {/*    required={false}*/}
        {/*    accept={".zip,.md,.txt,.pdf"}*/}
        {/*    downloadFileSuffix={".zip"}*/}
        {/*/>*/}

        {/*<ItemSwitch label={'是否需要打分'} name={'credit'} children={*/}
        {/*    <>*/}
        {/*        {roles.map((role: any) => {*/}
        {/*            return (*/}
        {/*                <Form.Item key={role} label={role + '对应的学分'} name={['credit', role]} required={true}>*/}
        {/*                    <Input/>*/}
        {/*                </Form.Item>*/}
        {/*            )*/}
        {/*        })}*/}
        {/*    </>*/}
        {/*}/>*/}
        <Form.Item name={'contents'}>
            <ItemTreeData options={options}/>
        </Form.Item>
        <Form.Item name={'img_id'} initialValue={"1"}>
        </Form.Item>
    </>
)

export default ProjectForm1;