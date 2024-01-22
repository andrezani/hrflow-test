import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { List } from "react-movable";
import JobCard from "./JobCard";

// The JobsList component is responsible for rendering a list of jobs.
// When a job card is clicked, the handleCardClick function is called, which updates expandedJobId.
export default function JobsList({ jobs }) {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [items, setItems] = useState(jobs);
  const [mouseMove, setMouseMove] = useState(false);

  // Update items state when jobs prop changes
  useEffect(() => {
    setItems(jobs);
  }, [jobs]);

  // Function to handle job card click events
  const handleCardClick = (id) => {
    if (!mouseMove) {
      setExpandedJobId(id !== expandedJobId ? id : null);
    }
  };

  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems((arr) => {
            const newArr = [...arr];
            const [removed] = newArr.splice(oldIndex, 1);
            newArr.splice(newIndex, 0, removed);
            return newArr;
          })
        }
        renderList={({ children, props }) => (
          <ul {...props} className="mt-12 space-y-6">
            {children}
          </ul>
        )}
        renderItem={({ value, props }) => (
          <li
            {...props}
            onMouseDown={() => setMouseMove(false)}
            onMouseMove={() => setMouseMove(true)}
            onMouseUp={() => {
              handleCardClick(value.id);
              setMouseMove(false);
            }}
            className="p-5 bg-white rounded-md shadow-sm hover:bg-blue-100 transition-colors duration-100"
          >
            <JobCard job={value} isExpanded={value.id === expandedJobId} />
          </li>
        )}
      />
    </section>
  );
}

JobsList.propTypes = {
  jobs: PropTypes.array.isRequired,
};
