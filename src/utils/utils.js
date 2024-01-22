// This function takes any number of arguments, filters out any falsy values,
// and returns a string of class names separated by spaces.
// It's useful for conditionally applying class names based on certain conditions.
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Each word in the string will start with an uppercase letter, and the rest of the word will be lowercase
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// It filters the tags to include only those with a name and value, and where the name is "company" or "type"
// It then maps each tag to a new object with the name and value in title case
export function formatJobTags(tags) {
  return tags
    .filter(
      (tag) =>
        tag.name &&
        tag.value &&
        (tag.name.toLowerCase() === "company" ||
          tag.name.toLowerCase() === "type")
    )
    .map((tag) => ({
      name: toTitleCase(tag.name),
      value: toTitleCase(tag.value),
    }));
}

// Function to format a date string into a human-friendly format, e.g. "1 Jan, 2021"
export function formatDate(date) {
  const parsedDate = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const humanFriendlyDate = `${parsedDate.getDate()} ${
    monthNames[parsedDate.getMonth()]
  }, ${parsedDate.getFullYear()}`;

  return humanFriendlyDate;
}

// Each function takes two jobs and returns a number indicating their sort order
export const sortFunctions = {
  // Sort by date, newest first
  Newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  // Sort by date, oldest first
  Oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
  // Sort alphabetically by name
  Name: (a, b) => (a.name || "").localeCompare(b.name || ""),
  // Sort by category
  Category: (a, b) => {
    // Find the category tag for each job
    const aCategory =
      a.tags.find((tag) => tag.name === "category")?.value || "";
    const bCategory =
      b.tags.find((tag) => tag.name === "category")?.value || "";

    // Sort jobs without a category to the bottom
    if (!aCategory) return 1;
    if (!bCategory) return -1;

    // Compare categories alphabetically
    return aCategory.localeCompare(bCategory);
  },
};
