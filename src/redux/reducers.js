import { createSlice } from "@reduxjs/toolkit";
import { fetchJobsAsync } from "./actions";
import { sortFunctions } from "./../utils/utils";

export const jobsSlice = createSlice({
  name: "jobs",
  // Define the initial state
  initialState: {
    jobs: [],
    filteredJobs: [],
    currentPage: 1,
    maxPage: 1,
    isLoading: false,
    error: null,
    // Retrieve initial values from localStorage
    searchTerm: localStorage.getItem("searchTerm") || "",
    sortOption: localStorage.getItem("sortOption") || "Newest",
    category: localStorage.getItem("category") || "",
  },
  // Define reducers for different actions
  reducers: {
    // Filter jobs by category
    filterJobsByCategory: (state, action) => {
      const category = action.payload[0];
      // Save the category to localStorage
      localStorage.setItem("category", category);

      // Update state and filter jobs
      state.category = category;
      state.filteredJobs = state.jobs.filter((job) =>
        job.tags.some((tag) => tag.value === category)
      );
      // Sort filtered jobs
      state.filteredJobs.sort(sortFunctions[state.sortOption]);
    },
    // Filter jobs by search term
    filterJobsBySearchTerm: (state, action) => {
      const searchTerm = action.payload;
      // Save the search term to localStorage
      localStorage.setItem("searchTerm", searchTerm);

      // Update state and filter jobs
      state.searchTerm = searchTerm;
      state.filteredJobs = state.jobs.filter((job) =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Sort filtered jobs
      state.filteredJobs.sort(sortFunctions[state.sortOption]);
    },
    // Sort jobs
    sortJobs: (state, action) => {
      const sortOption = action.payload;
      // Save the sort option to localStorage
      localStorage.setItem("sortOption", sortOption);

      // Update state and sort jobs
      state.sortOption = sortOption;
      state.jobs.sort(sortFunctions[sortOption]);
      state.filteredJobs.sort(sortFunctions[sortOption]);
    },
    // Reset filters
    resetFilteredJobs: (state) => {
      // Reset localStorage
      localStorage.setItem("searchTerm", "");
      localStorage.setItem("category", "");
      localStorage.setItem("sortOption", "Newest");

      // Reset state
      state.searchTerm = "";
      state.category = "";
      state.sortOption = "Newest";
      state.filteredJobs = state.jobs;
    },
  },
  // Define extra reducers for async actions
  extraReducers: (builder) => {
    builder
      // When fetchJobsAsync action is pending, set isLoading to true and error to null
      .addCase(fetchJobsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // When fetchJobsAsync action is fulfilled, update the state
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        // Update jobs, currentPage, maxPage, isLoading, and error
        state.jobs = action.payload.jobs;
        state.currentPage = action.payload.currentPage;
        state.maxPage = action.payload.maxPage;
        state.isLoading = false;
        state.error = null;

        // Retrieve searchTerm, category, and sortOption from localStorage
        state.searchTerm = localStorage.getItem("searchTerm") || "";
        state.category = localStorage.getItem("category") || "";
        state.sortOption = localStorage.getItem("sortOption") || "Newest";

        // Apply the filters to jobs only if searchTerm and category are not empty
        state.filteredJobs = state.jobs;
        if (state.searchTerm) {
          state.filteredJobs = state.filteredJobs.filter((job) =>
            job.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          );
        }
        if (state.category) {
          state.filteredJobs = state.filteredJobs.filter((job) =>
            job.tags.some((tag) => tag.value === state.category)
          );
        }
        // Sort the filtered jobs
        state.filteredJobs.sort(sortFunctions[state.sortOption]);

        // If filteredJobs is empty after applying filters, reset it to jobs
        if (state.filteredJobs.length === 0) {
          state.filteredJobs = state.jobs;
        }
      })
      // When fetchJobsAsync action is rejected, set isLoading to false and error to the error message
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions created by createSlice
export const {
  filterJobsByCategory,
  filterJobsBySearchTerm,
  resetFilteredJobs,
  sortJobs,
} = jobsSlice.actions;

// Export the reducer
export default jobsSlice.reducer;
