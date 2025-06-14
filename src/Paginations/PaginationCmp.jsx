/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, Pagination, Paper, TableContainer, TableCell, TableBody, Table, TableRow, TableHead} from '@mui/material';

const filterData = (data, minId) => {
  return data.filter((item) => item.id.localeCompare(minId) >= 0);
};
const PaginationCmp = ({data}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // Filter data with id >= 10
  const filteredData = filterData(data, '10');
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={12}>
        <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} color="primary" />
      </Grid>
    </>
  );
};
PaginationCmp.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PaginationCmp;
