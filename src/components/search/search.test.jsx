// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";

// Group tests related to the Search component
describe("Search", () => {
  // Test case to check if the Search component renders with the correct value
  it("renders with the correct value", () => {
    // Render the Search component with a test value and an empty onChange function
    const { getByPlaceholderText } = render(
      <Search value="test" onChange={() => {}} />
    );
    // Check if the input field renders with the correct value
    expect(getByPlaceholderText("Search").value).toBe("test");
  });

  // Test case to check if the onChange prop is called when the input value changes
  it("calls onChange prop when the input value changes", () => {
    // Create a mock function for the onChange prop
    const handleChange = jest.fn();
    // Render the Search component with an empty value and the mock onChange function
    const { getByPlaceholderText } = render(
      <Search value="" onChange={handleChange} />
    );
    // Simulate a change event on the input field
    fireEvent.change(getByPlaceholderText("Search"), {
      target: { value: "test" },
    });
    // Check if the mock onChange function was called once
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
