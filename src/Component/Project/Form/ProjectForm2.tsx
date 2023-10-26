import ItemTreeData from "./Item/ItemTreeData";
import {Form, Input} from "antd";
import ItemContent from "./Item/ItemContent";
import {CntOptions} from "../../../Config/Project/data";
import ItemPermission from "../../Permission/Form/Item/ItemPermission";
import RoleManageForm from "../../Permission/Form/RoleManageForm";

const ProjectForm2 =(props:any)=>{
    //通过路由判断
    return(
        <>
            <ItemContent options={CntOptions} pathname={props.pathname}/>
            {/*<ItemPermission />*/}
            <RoleManageForm service_type={props.service_type} />
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