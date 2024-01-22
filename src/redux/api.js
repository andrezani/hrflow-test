import axios from "axios";

// Define an async function called fetchJobs
export const fetchJobs = async (page = 1) => {
  // Define the options for the HTTP request
  const options = {
    method: "GET",
    url: "https://api.hrflow.ai/v1/jobs/searching",
    params: {
      // The query parameters for the request
      board_keys: [import.meta.env.VITE_RAPID_BOARD_KEYS],
      page: page,
      limit: "10",
    },
    headers: {
      // The headers for the request
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_RAPID_API_KEY,
      "X-USER-EMAIL": import.meta.env.VITE_RAPID_USER_EMAIL,
    },
  };

  // Make the HTTP request and wait for the response
  const response = await axios.request(options);
  // Return an object containing the jobs, current page, and max page
  return {
    jobs: response.data.data.jobs,
    currentPage: page,
    maxPage: response.data.meta.maxPage,
  };
};
