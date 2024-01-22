import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "./api";

// Define an async action to fetch jobs from the API
export const fetchJobsAsync = createAsyncThunk(
  // The action type will be "jobs/fetchJobs"
  "jobs/fetchJobs",
  // This function is where we do the actual data fetching
  async (page = 1) => {
    // Call the fetchJobs function with the current page number
    const response = await fetchJobs(page);
    // Return the response as the payload of the action
    return response;
  }
);
