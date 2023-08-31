import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  allSkills: null,
  skill: null,
};

export const pullUserSkill = createAsyncThunk(
  "skill/pullUserSkill",
  async (_, thunkAPI) => {
    try {
      const users_skills = await agent.Skill.pull();
      toast.success("Fetched all skills");
      return { users_skills };
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
export const addUserSkill = createAsyncThunk(
  "skill/addUserSkill",
  async (data, thunkAPI) => {
    try {
      const skill = thunkAPI.getState().skill.skill;
      const users_skills = await agent.Skill.create(data);
      toast.success("Skills Added Successfull");
      return { users_skill: [...skill, users_skills] };
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const updateUserSkill = createAsyncThunk(
  "skill/addUserSkill",
  async (data, thunkAPI) => {
    try {
      const skill = thunkAPI.getState().skill.skill;
      const users_skills = await agent.Skill.update(data);
      const updatedskill = skill?.filter(
        (value) => value._id !== users_skills?._id
      );
      toast.success("skill update successfull");
      return { users_skill: [...updatedskill, users_skills] };
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const removeUserSkill = createAsyncThunk(
  "skill/removeUserSkill",
  async (data, thunkAPI) => {
    try {
      const users_skills = await agent.Skill.remove({ _id: data });
      console.log(users_skills);
      const skill = thunkAPI.getState().skill.skill;
      const newSkills = skill?.filter(
        (value) => value._id !== users_skills?._id
      );

      toast.error("Skill Deleted");
      return { users_skill: [...newSkills] };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
export const fetchUserSkill = createAsyncThunk(
  "skill/fetchUserSkill",
  async (data, thunkAPI) => {
    try {
      const users_skill = await agent.Skill.read({ user: data });
      toast.success("Fetched User Skill");
      return { users_skill };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    emptySkill: (state) => {
      state.skill = null;
      state.allSkills = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSkill.fulfilled, (state, action) => {
      state.skill = action.payload.users_skill;
    });
    builder.addCase(removeUserSkill.fulfilled, (state, action) => {
      state.skill = action.payload.users_skill;
    });
    builder.addCase(updateUserSkill.fulfilled, (state, action) => {
      state.skill = action.payload.users_skill;
    });
    builder.addCase(pullUserSkill.fulfilled, (state, action) => {
      state.allSkills = action.payload.users_skills;
    });
    builder.addMatcher(
      isAnyOf(addUserSkill.fulfilled, fetchUserSkill.fulfilled),
      (state, action) => {
        state.skill = action.payload.users_skill;
      }
    );
    builder.addMatcher(
      isAnyOf(
        addUserSkill.rejected,
        pullUserSkill.rejected,
        fetchUserSkill.rejected,
        updateUserSkill.rejected,
        removeUserSkill.rejected
      ),
      (state, action) => {
        throw action.payload;
      }
    );
  },
});
export const { emptySkill } = skillSlice.actions;
