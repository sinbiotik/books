import { Pagination, Button } from "@mui/material";
import { Box } from "@mui/system";

interface PaginationBlockProps {
  count: number;
  page: number;
  onChangePage: (page: number) => void;
}

export function PaginationBlock({page, count, onChangePage}: PaginationBlockProps) {  

  function handleChange(e: React.ChangeEvent<unknown>, page: number) {
    onChangePage(page)
  }

  function handleLoadMore() {
    onChangePage(page + 1)
  }

  return(
    <Box
      sx={{
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center'
      }}
    >
      <div>
        <Button
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      </div>
      <Pagination
        page={page}        
        onChange={handleChange}
        count={count}
        showFirstButton
        showLastButton
      />
    </Box>
  )
}