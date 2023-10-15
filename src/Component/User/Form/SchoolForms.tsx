import {Button, Form, Input} from "antd";
import ItemName from "../../Common/Form/Item/ItemName";
import ItemPermission from "../../Permission/Form/Item/ItemPermission";
import ItemUpload from "../../Common/Form/Item/ItemUpload";
import BatchImport from "../../Common/BatchImport";

export const SchoolForm = () => {
    return (
        <>
            <ItemName label={'学校全称'} name={'name'} required={true}/>
            <ItemName label={'学校简称'} name={'school_abbreviation'} required={true}/>
            <ItemUpload name={'file_id'} accept={".png,.jpg"} label={'学校Logo'}/>
            {/*type表示查询的对象（项目、学校等）*/}
            {/*<ItemPermission service_type={'0'}/>*/}
        </>
    )
}


export const CollegeForm=(props:any)=>{
    return (
        <>
            <ItemName label={'学院全称'} name={'name'}/>
            {/*需要school_id*/}
            {/*<ItemPermission type={'1'}/>*/}
            <Form.Item name={'school_id'} initialValue={props.school_id} style={{display:'none'}}>
                {/*<Input type={'hidden'} />*/}
            </Form.Item>
            <Form.Item name={'college_id'} initialValue={props.college_id??undefined} style={{display:'none'}}>
                {/*<Input type={'hidden'} />*/}
            </Form.Item>
            <ItemUpload name={'file_id'} label={'学院logo'} accept={".png,.jpg"}/>
        </>
    )
}

export const MajorForm=(props:any)=>{
    return(
        <>
            <ItemName name={'name'} label={'专业全称'} required={true}/>
            {/*需要college_id*/}
            {/*<ItemPermission type={'3'}/>*/}
            <Form.Item name={'school_id'} initialValue={props.school_id} style={{display:'none'}}>
                {/*<Input type={'hidden'} />*/}
            </Form.Item>
            <Form.Item name={'college_id'} initialValue={props.college_id} style={{display:'none'}}>
                {/*<Input type={'hidden'} />*/}
            </Form.Item>
            {
                props.create === 0&&(
                    <Form.Item name={'major_id'} style={{display:'none'}} initialValue={props.major_id}>
                        {/*<Input type={'hidden'} />*/}
                    </Form.Item>
                )
            }
            <Form.Item name={'education_program'} label={'培养方案'}>
                <BatchImport item={true} btnName={'上传方案'} btnType={'default'} />
            </Form.Item>
        </>
    )
}

export const ClassForm=(props:any)=>{
    return(
        <>
            <ItemName name={'name'} label={'班级'} required={true}/>
            {/*需要college_id*/}
            {/*<ItemPermission type={'4'} />*/}
            <Form.Item name={'school_id'} initialValue={props.school_id}>
                <Input type={'hidden'} />
            </Form.Item>
            <Form.Item name={'college_id'} initialValue={props.college_id}>
                <Input type={'hidden'} />
            </Form.Item>
            <Form.Item name={'class_id'}>
                <Input type={'hidden'} />
            </Form.Item>
        </>
    )
}