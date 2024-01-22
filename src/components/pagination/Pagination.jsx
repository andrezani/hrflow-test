// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync } from "../../redux/index";
import ActionButton from "../common/ActionButton";

// The Pagination component is responsible for rendering a pagination control.
export default function Pagination() {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Select the currentPage and maxPage values from the Redux state
  const currentPage = useSelector((state) => state.jobs.currentPage);
  const maxPage = useSelector((state) => state.jobs.maxPage);

  // Function to handle clicks on the Previous button
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(fetchJobsAsync(currentPage - 1));
    }
  };

  // Function to handle clicks on the Next button
  const handleNext = () => {
    if (currentPage < maxPage) {
      dispatch(fetchJobsAsync(currentPage + 1));
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
        <ActionButton
          title="Previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        />
        <div>
          Page {currentPage} of {maxPage}
        </div>
        <ActionButton
          title="Next"
          onClick={handleNext}
          disabled={currentPage === maxPage}
        />
      </div>
    </div>
  );
}
