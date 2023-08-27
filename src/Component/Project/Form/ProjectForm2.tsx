import ItemTreeData from "./Item/ItemTreeData";
import {Form, Input} from "antd";
import ItemContent from "./Item/ItemContent";
import {CntOptions} from "../../../Config/Project/data";
import ItemPermission from "../../Permission/Form/Item/ItemPermission";
import RoleManageForm from "../../Permission/Form/RoleManageForm";

const ProjectForm2 =(
    //添加内容
      <>
          <ItemContent options={CntOptions}/>
          <ItemPermission />
          <RoleManageForm />
          <Form.Item name={'img_id'} initialValue={"1"}>
          </Form.Item>
      </>
    );
export default ProjectForm2;