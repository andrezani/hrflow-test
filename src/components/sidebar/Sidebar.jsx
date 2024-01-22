// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { resetFilteredJobs } from "../../redux/index";
import ActionButton from "../common/ActionButton";
import Filters from "../filter/Filters";

// Sidebar component
export default function Sidebar({ filters }) {
  // Use Redux dispatch hook
  const dispatch = useDispatch();

  return (
    <form data-testid="sidebar-form" className="hidden lg:block">
      <Filters filters={filters} />
      <ActionButton
        title="Reset Filters"
        onClick={() => dispatch(resetFilteredJobs())}
        fullWidth={true}
      />
    </form>
  );
}

Sidebar.propTypes = {
  filters: PropTypes.array,
};
