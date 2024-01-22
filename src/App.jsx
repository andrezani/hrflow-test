import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobsList from "./components/jobs/JobsList";
import Search from "./components/search/Search";
import Loader from "./components/loader/Loader";
import Sidebar from "./components/sidebar/Sidebar";
import HeaderMenu from "./components/header/HeaderMenu";
import MobileFilters from "./components/filter/MobileFilterDialog";
import Pagination from "./components/pagination/Pagination";
import Alert from "./components/Alert/Alert";

import { fetchJobsAsync, filterJobsBySearchTerm } from "./redux/index";
import { sortOptions, filters } from "./constants/constants";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const { filteredJobs, isLoading, error } = useSelector((state) => state.jobs);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterJobsBySearchTerm(searchTerm));
  }, [dispatch, searchTerm]);

  if (error) {
    return <Alert message={error} />;
  }

  return (
    <div className="body grid grid-cols-1 lg:grid-cols-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="col-span-1 lg:col-span-4">
          <MobileFilters
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          />

          <main className="flex-shrink-0 min-w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Jobs Board
              </h1>

              <HeaderMenu
                sortOptions={sortOptions}
                setMobileFiltersOpen={setMobileFiltersOpen}
              />
            </div>

            <section aria-labelledby="jobs-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Sidebar */}
                <Sidebar filters={filters} />

                {/* Main */}
                <div className="lg:col-span-3">
                  <Search
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <JobsList jobs={filteredJobs} />
                  <Pagination />
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
