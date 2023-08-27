import {Button, Form, Input} from "antd";
import ItemName from "../../Common/Form/Item/ItemName";
import ItemPermission from "../../Permission/Form/Item/ItemPermission";

export const SchoolForm = () => {
    return (
        <>
            <ItemName label={'学校全称'} name={'name'} required={true}/>
            <ItemName label={'学校简称'} name={'school_abbreviation'} required={true}/>
            {/*type表示查询的对象（项目、学校等）*/}
            {/*<ItemPermission type={'0'}/>*/}
        </>
    )
}


export const CollegeForm=(props:any)=>{
    return (
        <>
            <ItemName label={'学院全称'} name={'name'}/>
            {/*需要school_id*/}
            {/*<ItemPermission type={'1'}/>*/}
            <Form.Item name={'school_id'} initialValue={props.school_id}>
                <Input type={'hidden'} />
            </Form.Item>
            <Form.Item name={'college_id'} initialValue={props.college_id??undefined}>
                <Input type={'hidden'} />
            </Form.Item>
        </>
    )
}

export const MajorForm=(props:any)=>{
    return(
        <>
            <ItemName name={'name'} label={'专业全称'} required={true}/>
            {/*需要college_id*/}
            {/*<ItemPermission type={'3'}/>*/}
            <Form.Item name={'school_id'} initialValue={props.school_id}>
                <Input type={'hidden'} />
            </Form.Item>
            <Form.Item name={'college_id'} initialValue={props.college_id}>
                <Input type={'hidden'} />
            </Form.Item>
            <Form.Item name={'major_id'}>
                <Input type={'hidden'} />
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