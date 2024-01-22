import PropTypes from "prop-types";
import { InfoBlock } from "../common/InfoBlock";
import { formatDate, formatJobTags } from "../../utils/utils";

//JobCard component
export default function JobCard({ job, isExpanded }) {
  return (
    <div>
      <div>
        <div className="justify-between sm:flex">
          <div className="flex-1">
            {/* Display the job name */}
            <h3 className="text-xl font-medium text-cyan-600">{job.name}</h3>
          </div>
          <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
            <span className="flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {/* SVG path for the calendar icon */}
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Display the formatted job creation date */}
              {formatDate(job.created_at)}
            </span>
          </div>
        </div>
        <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0 sm:justify-between">
          <span className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* SVG path for the lock icon */}
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {/* Display the formatted job tags */}
            {formatJobTags(job.tags).map((tag, index) => (
              <span
                key={index}
                className="flex items-center text-gray-500 mr-3"
              >
                <strong>{tag.name}:</strong>&nbsp;{tag.value}
              </span>
            ))}
          </span>
          <span className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* SVG path for the location pin icon */}
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {/* Display the job location */}
            {job.location.text}
          </span>
        </div>
        {/* If the card is expanded, display additional job information */}
        {isExpanded && (
          <div className="mt-6">
            <InfoBlock
              title="Category"
              data={job.tags.filter((tag) => tag.name === "category")}
              isTag
            />
            <InfoBlock title="Skills" data={job.skills} />
            {/* Display the tasks related to the job */}
            <InfoBlock title="Tasks" data={job.tasks} />
            {/* Display the job description */}
            <p className="text-gray-500 mt-2 text-left">
              <strong>Description: </strong>
              {job.summary ? job.summary : "Not provided"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};
