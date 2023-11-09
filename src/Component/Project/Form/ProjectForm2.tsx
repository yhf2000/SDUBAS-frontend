import ItemContent from "./Item/ItemContent";
import {CntOptions} from "../../../Config/Project/data";
import RoleManageForm from "../../Permission/Form/RoleManageForm";

const ProjectForm2 = (props: any) => {
    //通过路由判断
    return (
        <>
            <div style={{border: '1px solid #ccc', padding: '10px', bottom: '20px'}}>
                <ItemContent options={CntOptions} pathname={props.pathname}/>
            </div>
            {/*<ItemPermission />*/}
            <div style={{border: '1px solid #ccc', padding: '10px', bottom: '20px', top: '200px'}}>
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