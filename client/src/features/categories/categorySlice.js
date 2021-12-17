import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/API";

import HomeIcon from "@mui/icons-material/Home";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WineBarIcon from "@mui/icons-material/WineBar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const categoryIcons = [
  <AttachMoneyIcon />,
  <HomeIcon />,
  <DirectionsBikeIcon />,
  <ShoppingBasketIcon />,
  <RestaurantIcon />,
  <LocalHospitalIcon />,
  <SportsTennisIcon />,
  <LocalMoviesIcon />,
  <SportsEsportsIcon />,
  <CheckroomIcon />,
  <WineBarIcon />,
];

const fetchCategories = createAsyncThunk("category/getCategory", async () => {
  const response = await getCategories();
  return response.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action) => action.payload
    );
  },
});

export default categorySlice.reducer;
export { fetchCategories };
export const selectAllCategories = (state) => state.categories;
export const selectCategoryById = (categoryID) => (state) =>
  state.categories.find(({ id }) => id === categoryID);
