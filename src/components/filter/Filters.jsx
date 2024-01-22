// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { filterJobsByCategory } from "../../redux/index";

// The Sidebar component is responsible for rendering a list of filters.
// When a category is selected, the handleCategoryChange function is called, which updates the checked property of the category options and dispatches the filterJobsByCategory action with the selected category.
// The component also includes a button to reset the filters, which dispatches the resetFilteredJobs action when clicked.
export default function Sidebar({ filters }) {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle category change events
  function handleCategoryChange(changedOption) {
    // Update the checked property of all options
    const newFilters = filters.map((filter) => {
      if (filter.id === "category") {
        filter.options = filter.options.map((option) => {
          if (option.value === changedOption.value) {
            return { ...option, checked: true };
          }
          return { ...option, checked: false };
        });
      }
      return filter;
    });

    // Get the selected category
    const category = newFilters
      .find((filter) => filter.id === "category")
      .options.find((option) => option.checked).value;

    // Dispatch the filterJobsByCategory action with the selected category
    dispatch(filterJobsByCategory([category]));
  }

  return (
    <div className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      {filters.map((section) => (
        // Render a Disclosure component for each filter section
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
          defaultOpen={section.id === "category"}
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <ul role="list" className="space-y-4">
                  {section.options.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        className="text-gray-900"
                        onClick={() => handleCategoryChange(option)}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
