import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { sortJobs } from "../../redux/index";
import { classNames } from "../../utils/utils";

// The HeaderMenu component is responsible for rendering a dropdown menu for sorting jobs and a button for opening mobile filters.
// The handleSort function dispatches the sortJobs action with the selected sorting option.
export default function HeaderMenu({ sortOptions, setMobileFiltersOpen }) {
  // Use the useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch();

  // Define the handleSort function, which dispatches the sortJobs action with the selected sorting option
  function handleSort(option) {
    dispatch(sortJobs(option.name));
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            aria-label="Sort"
          >
            Sort
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {/*  Map over the sortOptions array and render each option as a Menu.Item */}
              {sortOptions.map((option) => (
                <Menu.Item key={option.name} onClick={() => handleSort(option)}>
                  {({ active }) => (
                    <a
                      href={option.href}
                      className={classNames(
                        option.current
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
        aria-label="Filters"
      >
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

HeaderMenu.propTypes = {
  sortOptions: PropTypes.array.isRequired,
  setMobileFiltersOpen: PropTypes.func.isRequired,
};
