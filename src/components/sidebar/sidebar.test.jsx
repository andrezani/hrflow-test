// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useDispatch } from "react-redux";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";
import {
  jobsReducer,
  filterJobsByCategory,
  resetFilteredJobs,
} from "../../redux/index";
import { filters } from "../../constants/constants";

// Mock the fetchJobs function from the api file
jest.mock("../../redux/api", () => ({
  fetchJobs: jest.fn(),
}));

// Mock the useDispatch hook from react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

// Define a mock dispatch function to simulate Redux dispatch calls
const mockDispatch = jest.fn();
// Make useDispatch return our mock dispatch function when called
useDispatch.mockReturnValue(mockDispatch);

// Create a Redux store with the jobsReducer
const store = createStore(jobsReducer);

describe("Sidebar", () => {
  test("renders Sidebar without crashing", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Sidebar filters={[]} />
      </Provider>
    );
    const formElement = getByTestId("sidebar-form");
    // Check if the form element is present in the document
    expect(formElement).toBeInTheDocument();
  });

  test("calls filterJobsByCategory action when a category button is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar filters={filters} />
      </Provider>
    );
    const categoryButton = getByText(filters[0].options[0].label);
    // Simulate a click event on the category button
    fireEvent.click(categoryButton);
    // Check if the mockDispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      filterJobsByCategory([filters[0].options[0].value])
    );
  });

  test("calls resetFilteredJobs action when Reset Filters button is clicked", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Sidebar filters={filters} />
      </Provider>
    );
    const resetButton = getByRole("button", { name: /Reset Filters/i });
    // Simulate a click event on the reset button
    fireEvent.click(resetButton);
    // Check if the mockDispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(resetFilteredJobs());
  });
});
