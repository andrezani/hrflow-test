import PropTypes from "prop-types";

// The InfoBlock component is responsible for rendering a block of information under the JobCard component.
// The component renders a paragraph element with the title and the items from the data array. If the data array is empty or not provided, it renders the text "Not provided".
// Each item from the data array is rendered in a span element. If the isTag prop is true, the item's value is displayed; otherwise, the item's name is displayed. A comma is added after each item except the last one.
export const InfoBlock = ({ title, data, isTag = false }) => (
  <p className="text-gray-500 mt-2 text-left ">
    <strong>{title}: </strong>
    {data && data.length > 0
      ? data.map((item, index) => (
          <span key={index} className="ml-2">
            {isTag ? item.value : item.name}
            {index < data.length - 1 ? "," : ""}&nbsp;
          </span>
        ))
      : "Not provided"}
  </p>
);

InfoBlock.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  isTag: PropTypes.bool,
};
