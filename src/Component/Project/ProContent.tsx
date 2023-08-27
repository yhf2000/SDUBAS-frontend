import TableWithPagination from "../Common/Table/TableWithPagination";

const ProContent = ()=>{

    return(
        <>
            <TableWithPagination
                API={"getProContent"}
                columns
            />
        </>
    );
}

export default ProContent;