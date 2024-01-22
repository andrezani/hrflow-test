import PropTypes from "prop-types";
import { Transition, Dialog, Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { filterJobsByCategory, resetFilteredJobs } from "../../redux/index";

// The MobileFilters component is a mobile-friendly filter dialog for job categories.
// It uses the headless UI library for the dialog and disclosure components.
export default function MobileFilters({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filters,
}) {
  const dispatch = useDispatch();

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
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <button
                                  type="button"
                                  className="text-gray-900 w-full text-left"
                                  onClick={() => handleCategoryChange(option)}
                                >
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm font-medium text-gray-900"
                                  >
                                    {option.label}
                                  </label>
                                </button>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                        <button
                          type="button"
                          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => dispatch(resetFilteredJobs())}
                        >
                          Reset Filters
                        </button>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

MobileFilters.propTypes = {
  mobileFiltersOpen: PropTypes.bool.isRequired,
  setMobileFiltersOpen: PropTypes.func.isRequired,
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
