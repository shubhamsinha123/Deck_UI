/* eslint-disable linebreak-style */
import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
// import axios from 'axios';
// import NewFile from '../PostField/NewFile';

const columns = [
  {field: 'id', headerName: 'ID', width: 150},
  {
    field: 'Name',
    headerName: 'NAME',
    width: 130,
    valueGetter: (params) => `${params.row.name || ''}`
  },
  {
    field: 'Location',
    headerName: 'LOCATION',
    width: 130,
    valueGetter: (params) => `${params.row.location || ''}`
  }
];
const NewPagMUI = () => {
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   // Fetch data from API when the component mounts
  //   axios
  //     .get('/getM')
  //     .then((response) => {
  //       setRows(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  return (
    <div style={{height: 400, width: '100%'}}>
      <DataGrid
        rows={2}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 5}
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
export default NewPagMUI;
