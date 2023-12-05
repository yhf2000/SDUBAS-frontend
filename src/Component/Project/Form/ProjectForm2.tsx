import ItemContent from "./Item/ItemContent";
import {CntOptions} from "../../../Config/Project/data";
import RoleManageForm from "../../Permission/Form/RoleManageForm";

const ProjectForm2 = (props: any) => {
    //通过路由判断
    return (
        <>
            <div style={{border: '1px solid #ccc', padding: '10px', bottom: '20px'}}>
                <div style={{marginBottom:'10px'}}>项目内容(文件和文本只能上传一项):</div>
                <ItemContent options={CntOptions} pathname={props.pathname}/>
            </div>
            {/*<ItemPermission />*/}
            <div style={{border: '1px solid #ccc', padding: '10px', bottom: '20px', top: '200px'}}>
                <div style={{marginBottom:'10px'}}>项目角色:</div>
                <RoleManageForm service_type={props.service_type}/>
            </div>
        </>
    )
}

// const ProjectForm2 = (
//     <>
//         <ItemContent options={CntOptions}/>
//         {/*<ItemPermission />*/}
//         <RoleManageForm service_type={props.service_type}/>
//     </>
// )
export default ProjectForm2;