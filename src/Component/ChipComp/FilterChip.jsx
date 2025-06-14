/* eslint-disable linebreak-style */
import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

// common/utils
export const FilterChip = ({filterChips, filterChip, listData, handleFilterChange}) => {
  const countObjectsByCity = (data, cityName) => {
    const filteredData = data.filter((item) => item.country === cityName);
    return filteredData.length;
  };

  return (
    <div>
      {filterChips.map((filterItem) => (
        <Chip
          key={filterItem.value}
          style={{height: '5ch', fontSize: '2ch', margin: '0 0.5rem'}}
          label={filterItem.label}
          size="small"
          color={filterChip === filterItem.value ? filterItem.color : 'default'}
          avatar={<Avatar>{countObjectsByCity(listData, filterItem.value)}</Avatar>}
          onClick={() => {
            handleFilterChange(filterItem.value);
          }}
        />
      ))}
    </div>
  );
};

FilterChip.propTypes = {
  filterChips: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  filterChip: PropTypes.string.isRequired,
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired
    })
  ).isRequired,
  handleFilterChange: PropTypes.func.isRequired
};
