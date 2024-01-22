import PropTypes from "prop-types";

// The Alert component is responsible for rendering an error message.
// The handleDismiss function is used to handle clicks on the dismiss button. It reloads the page to dismiss the error message.
export default function Alert({ message }) {
  // Function to handle clicks on the dismiss button
  const handleDismiss = () => {
    window.location.reload();
  };

  return (
    <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8">
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>
            {/* Render the error icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="self-center ml-3">
            {/* Render the error message */}
            <span className="text-red-600 font-semibold">Error</span>
            <p className="text-red-600 mt-1">{message}</p>
          </div>
        </div>
        {/* Render the dismiss button */}
        <button className="self-start text-red-500" onClick={handleDismiss}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
