import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3030/api/task";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return taskId;
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const markTaskAsCompleted = createAsyncThunk(
  "tasks/markTaskAsCompleted",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}/completed`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to mark task as completed");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const fetchPaginatedTasks = createAsyncThunk(
  "tasks/fetchPaginatedTasks",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const fetchSortedTasks = createAsyncThunk(
  "tasks/fetchSortedTasks",
  async ({ page, limit, order }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/sorted?page=${page}&limit=${limit}&order=${order}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sorted tasks");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

export const fetchTasksSummary = createAsyncThunk(
  "tasks/fetchTasksSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/summary`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks summary");
      }
      return await response.json();
    } catch (error) {
      return handleHttpError(error, rejectWithValue);
    }
  }
);

const handleHttpError = (error, rejectWithValue) => {
  console.error(error);
  return rejectWithValue({ message: error.message });
};
