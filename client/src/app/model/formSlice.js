import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  update: false,
  _id: "",
};

export const formSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = action.payload.res;
      state._id = action.payload._id;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(isAnyOf(), (state, action) => {});
    // builder.addMatcher(isAnyOf(), (state, action) => {});
  },
});
export const { setOpen, setUpdate } = formSlice.actions;
