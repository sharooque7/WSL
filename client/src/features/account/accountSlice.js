import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { router } from "../../app/router/route";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}
const initialState = {
  user: getUser(),
  token: getToken(),
  islogged: false,
};

export const signInUser = createAsyncThunk(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const { user, token } = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      toast.success("Logged In");
      return { user, token };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.islogged = !action.payload;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.navigate("/login");
    },
    signIn: (state, action) => {
      state.islogged = action.payload;
      router.navigate("/login");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signInUser.fulfilled), (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.islogged = true;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      throw action.payload;
    });
  },
});
export const { signOut, setUser, signIn } = accountSlice.actions;
