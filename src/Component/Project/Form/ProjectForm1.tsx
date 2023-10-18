import ItemName from "../../Common/Form/Item/ItemName";
import ItemType from "../../Common/Form/Item/ItemType";
import ItemUpload from "../../Common/Form/Item/ItemUpload";
import {activeType, ProOptions, tagOptions} from "../../../Config/Project/data";
const roles = ['student', 'teacher']

const ProjectForm1 = (
    <>
        <ItemUpload accept={'.jpg'} name={'img_id'} label={'上传图片'} aes={false}/>
        <ItemName label={'项目名称'} name={'name'} required={true}/>
        <ItemType label={'项目类型'} name={'type'} options={ProOptions} default={'1'} required={true}/>
        <ItemType label={'项目状态'} name={'active'} options={activeType} default={'0'} required={true}/>
        <ItemType label={'项目标签'} name={'tag'} options={tagOptions} default={'0'} mode={'multiple'} required={false}/>
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
        {/*<Form.Item name={'contents'}>*/}
        {/*    <ItemTreeData options={options}/>*/}
        {/*</Form.Item>*/}
    </>
)

export default ProjectForm1;