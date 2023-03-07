import { Box, FormControl, FormHelperText, InputLabel} from "@mui/material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";


interface FiltersBlockProps {
  category: string;
  orderBy: string;
  onSelectCategory: (value: string) => void;
  onSelectOrderBy: (value: string) => void;
}

export function FiltersBlock({
  category, orderBy, onSelectCategory, onSelectOrderBy
}: FiltersBlockProps){

  const handleChangeCategory = (e: SelectChangeEvent) => {
    onSelectCategory(e.target.value);
  };
  const handleChangeOrderBy = (e: SelectChangeEvent) => {
    onSelectOrderBy(e.target.value);
  };

  return(
    <Box
      sx={{mt: 1, py: 1, display:'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2,}}
    >
      <FormControl sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="category__label">category:</InputLabel>
        <Select
          labelId="category__label"          
          value={category}
          label="category:"
          onChange={handleChangeCategory}
        >
          <MenuItem value='all'><em>all</em></MenuItem>
          <MenuItem value='art'>art</MenuItem>
          <MenuItem value='biography'>biography</MenuItem>
          <MenuItem value='computers'>computers</MenuItem>
          <MenuItem value='history'>history</MenuItem>
          <MenuItem value='medical'>medical</MenuItem>
          <MenuItem value='poetry'>poetry</MenuItem>
        </Select>
        <FormHelperText>Select a category</FormHelperText>
      </FormControl>
      
      <FormControl sx={{ m: 1, minWidth: 130 }}>
      <InputLabel id="order-by__label">order by:</InputLabel>
        <Select
          labelId="order-by__label"
          value={orderBy}
          label="order by:"
          onChange={handleChangeOrderBy}
        >
          <MenuItem value="relevance"><em>relevance</em></MenuItem>
          <MenuItem value='newest'>newest</MenuItem>
        </Select>
        <FormHelperText>Select order by</FormHelperText>
      </FormControl>
    </Box>
  )
}