import { TableAction } from "../Action/table";
import { ITableState } from "../../Type/table";

const initState: ITableState = {
    tableData: {}
}

export const TableReducer = (state: ITableState = initState, action: TableAction) => {
    const newState = { ...state }; // 创建状态副本
    newState.tableData = { ...newState.tableData }; // 创建 tableData 副本

    const initTableData = (name: string) => {
        if (newState.tableData[name] === undefined) {
            newState.tableData[name] = {
                selectedRowKeys: [],
                dataSource: [],
                tableVersion: 0,
                tablePageInfo: undefined
            };
        }
    };

    if (action.name !== undefined) {
        initTableData(action.name);
    }

    switch (action.type) {
        case "setSelectedRowKeys":
            newState.tableData[action.name] = {
                ...newState.tableData[action.name], // 创建 name 对应的副本
                selectedRowKeys: action.data
            };
            break;

        case "addTableVersion":
            const nv = newState.tableData[action.name].tableVersion;
            newState.tableData[action.name] = {
                ...newState.tableData[action.name], // 创建 name 对应的副本
                tableVersion: Math.abs(nv) + 1
            };
            break;

        case "setDataSource":
            newState.tableData[action.name] = {
                ...newState.tableData[action.name], // 创建 name 对应的副本
                dataSource: action.data
            };
            if (action.add) {
                const nv = newState.tableData[action.name].tableVersion;
                newState.tableData[action.name] = {
                    ...newState.tableData[action.name], // 创建 name 对应的副本
                    tableVersion: -(Math.abs(nv) + 1)
                };
            }
            break;

        case "setTablePageInfo":
            newState.tableData[action.name] = {
                ...newState.tableData[action.name], // 创建 name 对应的副本
                tablePageInfo: action.data
            };
            break;

        default:
            break;
    }

    return newState;
};