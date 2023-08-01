import React from "react";

export interface ITableState {
    tableData: {
        [key: string]: {
            selectedRowKeys: React.Key[]
            dataSource: any
            tableVersion: number,
            tablePageInfo: ITablePageInfo | undefined
        }
    }
}

export interface ITablePageInfo {
    total: number
    pageNow: number
    pageSize: number
    searchKey: string
    moreProps: { [key: string]: any } | undefined
}