export type KVAction =
    setValue | removeValue | clearValue

export interface setValue {
    type: "kvSetValue"
    key: string
    data: any
}

export interface removeValue {
    type: "kvRemoveValue"
    key: string
}

export interface clearValue {
    type: "kvClearValue"
}