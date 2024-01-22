import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "./index";

// Create a Redux store
export const store = configureStore({
  // The reducer field is an object that maps from action types to reducer functions
  reducer: {
    jobs: jobsReducer,
  },
});
