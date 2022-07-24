import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axiosInstance";

const initialState = {
  token: "",
  singleTask: null,
  users: [],
  formIsOpen: false,
};

const company_id = "company_413ef22b6237417fb1fba7917f0f69e7";

export const getUsers = createAsyncThunk("app/getUsers", async () => {
  try {
    const response = await axiosInstance.get(
      `team?product=outreach&company_id=${company_id}`
    );
    return response.data.results.data;
  } catch (error) {
    return error;
  }
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleFormState(state, action) {
      if (action.payload.edit) {
        state.singleTask = action.payload.task;
      }
      if (action.payload.resetTask) {
        state.singleTask = null
      }
      state.formIsOpen = action.payload.open;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "suceeded";
        // console.log("action.payload", action.payload);
        state.users = action.payload.map((user) => ({
          label: user.name,
          value: user.id,
        }));
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleFormState } = appSlice.actions;

export default appSlice.reducer;
