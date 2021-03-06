import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    toggleModalState: (state) => !state,
  },
});

export const { toggleModalState } = modalSlice.actions;
export default modalSlice.reducer;
