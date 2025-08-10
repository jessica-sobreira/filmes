import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setPage } from "../features/modules/paginacaoSlice"; 

export const Paginacao = () => {
    const dispatch = useAppDispatch();
    
     const { totalResults, page, itemsPerPage } = useAppSelector(state => state.paginacao);


    const countPages = Math.ceil(totalResults / itemsPerPage);


    const handlePageChange = (_, newPage) => {
        dispatch(setPage(newPage));
    }

    return (
        <Pagination
            count={countPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 4 }}
        />
    )
}
