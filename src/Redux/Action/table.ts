import React from "react";
import {ITablePageInfo} from "../../Type/table";

export type TableAction =
    setSelectedRowKeys |
    addTableVersion |
    setDataSource |
    setTablePageInfo

// 设置表格选定的行
export interface setSelectedRowKeys {
    type: "setSelectedRowKeys",
    name: string
    data: React.Key[]
}

// 更新表格版本
export interface addTableVersion {
    type: "addTableVersion"
    name: string
}

// 表格的源数据
export interface setDataSource {
    type: "setDataSource"
    name: string
    data: any
    add: boolean
}

export interface setTablePageInfo{
    type: "setTablePageInfo"
    name: string
    data: ITablePageInfo
}