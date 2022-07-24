import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axiosInstance";

const initialState = {
  task: {},
  tasks: [],
  status: "idle",
  error: null,
};

const company_id = "company_413ef22b6237417fb1fba7917f0f69e7";
const lead = "lead_465c14d0e99e4972b6b21ffecf3dd691";

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const response = await axiosInstance.get(
      `task/${lead}?company_id=${company_id}`
    );
    return response?.data?.results;
  } catch (error) {
    console.log("error", error.message);
    throw error.message;
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await axiosInstance.post(
      `task/${lead}?company_id=${company_id}`,
      task
    );
    return response.data.results;
  } catch (error) {
    throw error.message;
  }
});
export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  try {
    const response = await axiosInstance.put(
      `task/${lead}/${task.id}?company_id=${company_id}`,
      task.task
    );
    return response.data.results;
  } catch (error) {
    throw error.message;
  }
});
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (task_id) => {
    try {
      await axiosInstance.delete(
        `task/${lead}/${task_id}?company_id=${company_id}`
      );

      return task_id;
    } catch (error) {
      throw error.message;

    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask(state, action) {
      state.task = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action?.payload;
        state.status = "suceeded";
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.tasks = [action?.payload, ...state.tasks];
        // state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "suceeded";
        const taskIndex = state.tasks.findIndex(
          (task) => task.id === action?.payload?.id
        );
        console.log("taskIndex", taskIndex);
        state.tasks[taskIndex] = action?.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.status = "suceeded";
        const task_id = action?.payload;

        const tasks = state.tasks.filter((task) => task.id !== task_id);
        state.tasks = tasks;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
