/* eslint-disable linebreak-style */
import React from 'react';

// Old utils
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObj.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

export const tableHead = ['Enter Your Details', '', '', 'Nationality', ''];

export const handleContextMenu = (event) => {
  event.preventDefault();
};

// helps avatar icon arrangement with the data
export const stringAvatar = (name) => {
  if (name && typeof name === 'string' && name.includes(' ')) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [firstName, lastName] = name?.split(' ');
    return <>{`${firstName[0]}${lastName[0]}`}</>;
  } else if (name && typeof name === 'string') {
    return `${name[0]}`;
  } else {
    // Handle the case where 'name' is undefined or not a string
    return '';
  }
};

// helps formating it from "2023-09-02" to "September 02, 2023"
export const formattedDate = (originalDateString) => {
  // Parse the original date string into a Date object
  const parts = originalDateString?.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  // Create a Date object
  const date = new Date(`${year}-${month}-${day}`);

  // Get the month name
  const monthName = monthNames[date.getMonth()];

  // Get the day and year
  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
};

export const formateIsoDate = (dateString) => {
  // Create a Date object from the input string
  const dateObj = new Date(dateString);

  // Get the year, month, and day from the Date object
  const year = dateObj.getUTCFullYear();
  const month = monthNames[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate();

  // Create the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

// Example usage:
// const originalDateString = "2023-02-09";
// const formattedDate = formatDate(originalDateString);
// console.log(formattedDate);
