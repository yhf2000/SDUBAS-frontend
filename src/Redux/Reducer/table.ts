import {TableAction} from "../Action/table";
import {ITableState} from "../../Type/table";

const initState: ITableState = {
    tableData: {}
}

export const TableReducer = (state: ITableState = initState, action: TableAction) => {
    let State = {...state}
    State.tableData = {...State.tableData}
    const initTableData = (name: string) => {
        if (State.tableData[name] === undefined)
            State.tableData[name] = {
                selectedRowKeys: [],
                dataSource: [],
                tableVersion: 0,
                tablePageInfo: undefined
            }
    }
    if (action.name !== undefined) {
        initTableData(action.name)
    }
    switch (action.type) {
        case "setSelectedRowKeys":
            State.tableData[action.name].selectedRowKeys = action.data
            break

        case "addTableVersion":
            const nv = State.tableData[action.name].tableVersion
            State.tableData[action.name].tableVersion = Math.abs(nv) + 1
            break

        case "setDataSource":
            State.tableData[action.name].dataSource = action.data
            if(action.add) {
                const nv = State.tableData[action.name].tableVersion
                State.tableData[action.name].tableVersion = -(Math.abs(nv) + 1)
            }
            break

        case "setTablePageInfo":
            State.tableData[action.name].tablePageInfo = action.data
            break

        default:
            break

    }
    return State
}
