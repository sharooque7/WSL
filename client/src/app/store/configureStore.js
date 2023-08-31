import { formSlice } from "../model/formSlice";
import { configureStore } from "@reduxjs/toolkit";
import { skillSlice } from "../../features/skill/skillSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    modal: formSlice.reducer,
    skill: skillSlice.reducer,
    account: accountSlice.reducer,
  },
});
