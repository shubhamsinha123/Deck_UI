/* eslint-disable linebreak-style */
import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import {
  Box,
  Alert,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  SvgIcon,
  Tooltip,
  Zoom,
  TextField,
  Autocomplete,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, zhCN} from '@mui/x-data-grid';
import {Dna} from 'react-loader-spinner';
import {formatDate} from '../Utils/utils';

// AdminCall
const AdminWindow = () => {
  const [status, setStatus] = useState({message: '', severity: ''});
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [open, setOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  // Dialog box delete
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const token = localStorage.getItem('tokenAdmin');
  const navigate = useNavigate();

  /**
   * Fetches data from the API and updates the state with the response.
   * Makes a GET request to the '/getData' endpoint
   *  with an authorization header.
   * On success, updates the state with the received data.
   * On failure, updates the status with an error message.
   * @function fetchData
   * @return {void}
   */
  const fetchData = () => {
    axios
      .get('/getData', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch(() => {
        setStatus({
          message: `Error`,
          severity: 'error'
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({message: '', severity: ''});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleEditClick = (id) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
  };

  const handleSaveClick = (id) => () => {
    setOpen(true);
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
  };

  const handleDeleteClick = (id) => () => {
    setDialogOpen(true);
    // Store the id in a state variable to access
    //  it later when "Agree" is clicked
    setItemIdToDelete(id);
  };

  const handleDialogResponse = async () => {
    setDialogOpen(false);
    try {
      // Make the delete API call using the stored itemIdToDelete
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/removeData/${itemIdToDelete}`);

      if (response.status === 202) {
        // Update your state to remove the deleted row
        setRows(rows.filter((row) => row.id !== itemIdToDelete));
        setStatus({
          message: `Item with ID = "${itemIdToDelete}" deleted successfully.`,
          severity: 'success'
        });
        fetchData();
      }
    } catch (error) {
      setStatus({
        message: `Error updating item with id ${itemIdToDelete}`,
        severity: 'error'
      });
      // Handle network or other errors
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true}
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = {...newRow, isNew: false};
    const userDate = formatDate(newRow.date);
    const approvedDate = formatDate(newRow.eDate);
    axios
      .patch(`/updateData/${newRow.id}`, {
        date: userDate,
        eDate: approvedDate,
        visaStatus: newRow.visaStatus
      })
      .then(() => {
        setStatus({
          message: `Item with ID = "${newRow.id}" updated successfully.`,
          severity: 'success'
        });
        setOpen(false);
        fetchData();
        // window.location.reload();
      })
      .catch(() => {
        setStatus({
          message: `Error updating ID "${newRow.id}". Please try add the approval date as well, Thanks`,
          severity: 'error'
        });
        fetchData();
        setOpen(false);
      });
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const filteredRows = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(searchInput.toLowerCase())),
    [rows, searchInput]
  );

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'id',
      headerClassName: 'common-header',
      headerName: 'ID',
      width: 150,
      editable: false,
      cellClassName: 'onChange'
      // disabled: true,
    },
    {
      field: 'name',
      headerClassName: 'common-header',
      width: 200,
      align: 'center',
      editable: false,
      cellClassName: 'onChange',
      renderHeader: () => <em className="headerStyle">{'Passenger Name'}</em>,
      valueGetter: (params) => `${params.row.name || ''}`
    },
    {
      field: 'location',
      headerClassName: 'common-header',
      renderHeader: () => <em className="headerStyle">{'Destination'}</em>,
      type: 'string',
      width: 200,
      align: 'center',
      headerAlign: 'left',
      editable: false,
      cellClassName: 'onChange',
      valueGetter: (params) => `${params.row.location || ''}`
    },
    {
      field: 'date',
      headerClassName: 'common-header',
      renderHeader: () => <em className="headerStyle">{'Tentative Date'}</em>,
      type: 'date',
      width: 150,
      align: 'center',
      editable: false,
      cellClassName: 'onChange',
      valueGetter: (params) => {
        if (params.row.date) {
          return new Date(params.row.date);
        }
        return '';
      }
    },
    {
      field: 'country',
      headerClassName: 'common-header',
      renderHeader: () => <em className="headerStyle">{'Native Country'}</em>,
      width: 200,
      align: 'center',
      editable: false,
      cellClassName: 'onChange',
      type: 'singleSelect',
      valueGetter: (params) => `${params.row.country || ''}`
    },
    {
      field: 'visaStatus',
      headerClassName: 'common-header',
      renderHeader: () => <em className="headerStyle">{'Visa Status'}</em>,
      width: 150,
      align: 'center',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Approved', 'Denied', 'Special'],
      valueGetter: (params) => `${params.row.visaStatus || ''}`
    },
    {
      field: 'eDate',
      headerClassName: 'common-header',
      renderHeader: () => <span className="headerStyle">{'Approved Date'}</span>,
      type: 'date',
      width: 150,
      align: 'center',
      editable: true,
      valueGetter: (params) => {
        if (params.row.eDate) {
          return new Date(params.row.eDate);
        }
        return '';
      }
    },
    {
      field: 'actions',
      headerClassName: 'common-header',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              className="buttonAction"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="buttonAction"
              onClick={handleCancelClick(id)}
              // color="inherit"
            />
          ];
        }
        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="buttonAction"
            onClick={handleEditClick(id)}
            // color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            className="buttonAction"
            label="Delete"
            onClick={handleDeleteClick(id)}
            // color="inherit"
          />
        ];
      }
    }
  ];

  const goBackHome = () => {
    localStorage.removeItem('tokenAdmin');
    // Or however you handle authentication
    sessionStorage.clear();
    navigate('/');
  };

  /**
   * HomeIcon component renders a home icon using SvgIcon.
   * @param {object} props - The properties passed to the component.
   * @return {JSX.Element} The rendered home icon.
   */
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <>
      <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography style={{textAlign: 'center'}} variant="h3">
        Welcome to admin dashboard.
      </Typography>
      <Typography style={{margin: '1vw 39vw'}} variant="h5">
        Search by passenger name:{' '}
      </Typography>
      <Stack spacing={2} sx={{width: 300, margin: '1vw 40vw'}}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          handleHomeEndKeys
          // selectOnFocus
          // clearOnBlur
          options={rows?.map((option) => option?.name)}
          onChange={(event, newValue) => {
            setSearchInput(newValue || '');
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search" onChange={(e) => setSearchInput(e.target.value)} />
          )}
        />
      </Stack>

      <Tooltip title="Logout" TransitionComponent={Zoom} arrow placement="top">
        <Button onClick={goBackHome}>
          <HomeIcon sx={{fontSize: 40}} color="success" />
        </Button>
      </Tooltip>
      <div style={{margin: '0 10rem', display: 'inline-block'}}>
        {rows.length > 0 ? (
          <>
            {/* <BasicTextFields /> */}
            {/* <PostFile /> */}
            <Typography className="textHeader">Admin Dashboard</Typography>
            <Box
              sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                  color: 'text.secondary'
                },
                '& .textPrimary': {
                  color: 'text.primary'
                }
              }}
            >
              {status.message && (
                <Alert
                  className="alertDialog"
                  onClose={() => setStatus({message: '', severity: ''})}
                  severity={status.severity}
                >
                  {status.message}
                </Alert>
              )}
              {filteredRows.length === 0 ? (
                <Typography variant="h6" align="center" className="tableData" style={{marginTop: '20px'}}>
                  No such data available
                </Typography>
              ) : (
                <DataGrid
                  rows={filteredRows}
                  className="tableData"
                  columns={columns}
                  editMode="row"
                  initialState={{
                    pagination: {
                      paginationModel: {page: 0, pageSize: 5}
                    }
                  }}
                  pageSizeOptions={[5]}
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  // Set the French locale
                  localeText={zhCN}
                />
              )}
            </Box>
          </>
        ) : (
          <>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </>
        )}

        <Dialog
          open={dialogOpen}
          // onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{minWidth: '30rem'}}>
            {'Warning!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure you want to delete this particular data with `}
              <span style={{fontWeight: 'bold'}}>
                {`ID = ${itemIdToDelete} `}
                {`?`}
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button
              onClick={handleDialogResponse}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Typography style={{marginTop: 100}}></Typography>
    </>
  );
};
export default AdminWindow;
