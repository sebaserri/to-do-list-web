import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  fetchPaginatedTasks,
  fetchSortedTasks,
  fetchTasks,
  fetchTasksSummary,
  markTaskAsCompleted,
} from "./tasksAction";

const initialState = {
  tasks: [],
  loading: false,
  success: false,
  successAddTask: false,
  errorAddTask: false,
  successDeleteTask: false,
  errorDeleteTask: null,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalTasks: 0,
  },
  summary: {
    completed: 0,
    notCompleted: 0,
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = action.payload.data;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.successAddTask = false;
        state.errorAddTask = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.successAddTask = true;
        state.tasks.push(action.payload.data);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.errorAddTask = action.payload.message;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.successDeleteTask = false;
        state.errorDeleteTask = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.successDeleteTask = true;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.errorDeleteTask = action.payload.message;
      })

      .addCase(markTaskAsCompleted.pending, (state) => {
        state.loading = true;
      })
      .addCase(markTaskAsCompleted.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.data.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.data;
        }
      })
      .addCase(markTaskAsCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(fetchPaginatedTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginatedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalTasks: action.payload.total,
        };
      })
      .addCase(fetchPaginatedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(fetchSortedTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSortedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalTasks: action.payload.total,
        };
      })
      .addCase(fetchSortedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(fetchTasksSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data;
      })
      .addCase(fetchTasksSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;
