import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../main.css'

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { visuallyHidden } from '@mui/utils';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography'


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        label: 'Qaimə No',
    },
    {
        id: 'customer',
        label: 'Müştəri',
    },
    {
        id: 'quantity',
        label: 'Məhsul sayı',
    },
    {
        id: 'total',
        label: 'Toplam məbləğ',
    },
    {
        id: 'status',
        label: 'Status',
    },
    {
        id: 'edit',
        label: 'Əmrlər',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        sx={{ color: "#6B707C", fontSize: "12px" }}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,

};




export default function EnhancedTable({ invoices, showModal, setShowModal, handleShowEdit, handleShowChangeStatus, handleDeleteInvoice }) {
    const rowsPerPage = 6;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(1);
    const [filtered, setFiltered] = useState(invoices)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState()
    const [showFilter, setShowFilter] = useState(false)
    const [selectedQuantityFilter, setSelectedQuantityFilter] = useState(0);
    const [selectedPriceFilter, setSelectedPriceFilter] = useState(0);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState(0);
    const [pagination, setPagination] = useState({
        start: 0,
        end: rowsPerPage
    });

    useEffect(() => {
        setFiltered(invoices)
    }, [invoices])

    useEffect(() => {
        setPagination({
            start: 0,
            end: rowsPerPage
        })
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const requestSearch = (searchedVal) => {
        if (searchedVal) {
            const filteredRows = filtered.filter((row) => {
                return row.customer.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setFiltered(filteredRows);
        } else {
            setFiltered(invoices);

        }

    };


    useEffect(() => {
        let newList = [...filtered]
        let filteredList = []
        if (selectedQuantityFilter > 0) {
            switch (selectedQuantityFilter) {
                case 1:
                    filteredList = newList.filter((list) => {
                        return list.quantity < 10
                    })
                    break

                case 2:
                    filteredList = newList.filter((list) => {
                        return list.quantity > 10 && list.quantity < 20
                    })
                    break

                case 3:
                    filteredList = newList.filter((list) => {
                        return list.quantity > 20 && list.quantity < 50
                    })
                    break
                case 4:
                    filteredList = newList.filter((list) => {
                        return list.quantity > 50
                    })
                    break


                default:
                    break;
            }
            setFiltered(filteredList)
        } else {
            setFiltered(invoices)
        }
    }, [selectedQuantityFilter])

    useEffect(() => {
        let newList = [...filtered]
        let filteredList = []
        if (selectedPriceFilter > 0) {
            switch (selectedPriceFilter) {
                case 1:
                    filteredList = newList.filter((list) => {
                        return list.price > 10 && list.quantity < 500
                    })
                    break

                case 2:
                    filteredList = newList.filter((list) => {
                        return list.price > 500 && list.quantity < 1500
                    })
                    break

                case 3:
                    filteredList = newList.filter((list) => {
                        return list.price > 1500
                    })
                    break

                default:
                    break;
            }
            setFiltered(filteredList)
        } else {
            setFiltered(invoices)
        }
    }, [selectedPriceFilter])

    useEffect(() => {
        let newList = [...filtered]
        let filteredList = []
        if (selectedStatusFilter > 0) {
            switch (selectedStatusFilter) {
                case 1:
                    filteredList = newList.filter((list) => {
                        return list.status == 1
                    })
                    break

                case 2:
                    filteredList = newList.filter((list) => {
                        return list.status == 2
                    })
                    break

                case 3:
                    filteredList = newList.filter((list) => {
                        return list.status == 3
                    })
                    break

                default:
                    break;
            }
            setFiltered(filteredList)
        } else {
            setFiltered(invoices)
        }
    }, [selectedStatusFilter])



    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onPaginationChange = (event, start) => {
        setPagination({ start: (start - 1) * rowsPerPage, end: start * rowsPerPage })
        setPage(start)
    }


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (

        <Box sx={{ width: '90%', margin: "0px auto" }}>
            <Paper sx={{ width: '100%', mb: 2, padding: "10px" }}>
                <Typography variant="h6" textAlign="left" margin="15px 10px">
                    Qaimələr
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField label="Axtarış" size="small" sx={{ width: '40%', marginLeft: "10px", }} id="outlined-start-adornment" variant='outlined' onChange={(event) => { requestSearch(event.target.value) }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }} />
                    <Stack direction="row" alignItems="center">
                        <Button sx={{ color: "#7C818D;", width: '120px', height: "40px", marginRight: "5%", textTransform: "capitalize" }} variant="outlined"
                            startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6667 20C11.4864 20 11.3109 19.9415 11.1667 19.8333L7.83334 17.3333C7.72984 17.2557 7.64584 17.1551 7.58798 17.0393C7.53013 16.9236 7.5 16.796 7.5 16.6667V11.9833L1.65334 5.40583C1.2381 4.9374 0.966987 4.35901 0.872571 3.7402C0.778155 3.12138 0.864458 2.48846 1.12111 1.91751C1.37776 1.34656 1.79383 0.861882 2.31932 0.521721C2.84481 0.181561 3.45736 0.000395349 4.08334 0L15.9167 0C16.5426 0.000734209 17.155 0.182199 17.6803 0.522589C18.2055 0.862978 18.6214 1.34781 18.8777 1.91882C19.1341 2.48983 19.2201 3.12273 19.1255 3.74146C19.0308 4.36018 18.7595 4.93841 18.3442 5.40667L12.5 11.9833V19.1667C12.5 19.3877 12.4122 19.5996 12.2559 19.7559C12.0996 19.9122 11.8877 20 11.6667 20ZM9.16667 16.25L10.8333 17.5V11.6667C10.8335 11.4626 10.9085 11.2657 11.0442 11.1133L17.1008 4.29917C17.3028 4.0709 17.4346 3.7892 17.4804 3.48788C17.5262 3.18655 17.484 2.87842 17.359 2.60046C17.2339 2.32251 17.0313 2.08655 16.7755 1.92091C16.5197 1.75527 16.2215 1.66699 15.9167 1.66667H4.08334C3.77871 1.66713 3.48069 1.75546 3.22501 1.92105C2.96933 2.08665 2.76684 2.3225 2.64184 2.60029C2.51684 2.87809 2.47463 3.18605 2.52028 3.48723C2.56592 3.78842 2.69748 4.07004 2.89917 4.29833L8.95667 11.1133C9.09202 11.2659 9.16673 11.4627 9.16667 11.6667V16.25Z" fill="#5F646E" />
                            </svg>}
                            onClick={() => setShowFilter(!showFilter)}>
                            Filter
                        </Button>
                        <Button sx={{ width: '150px', height: "40px", textTransform: "capitalize" }} variant="contained" startIcon={<AddOutlinedIcon />} onClick={() => setShowModal(true)}>
                            Yeni qaimə
                        </Button>
                    </Stack>
                </Stack>

                {showFilter ?
                    <Stack direction="row" margin="20px 0px">
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="quantityFilter">Məhsul sayı</InputLabel>
                            <Select
                                labelId="quantityFilter"
                                label="Məhsul sayı"
                                value={selectedQuantityFilter}
                                onChange={(event) => setSelectedQuantityFilter(event.target.value)}
                                size="small"
                            >
                                <MenuItem value={0}>
                                    <em>Seçilməyib</em>
                                </MenuItem>
                                <MenuItem value={1}>10dan daha az</MenuItem>
                                <MenuItem value={2}>10 və 20 arası</MenuItem>
                                <MenuItem value={3}>20 və 50 arası</MenuItem>
                                <MenuItem value={4}>50dən daha çox</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="quantityFilter">Məbləğ aralığı</InputLabel>
                            <Select
                                labelId="priceFilter"
                                label="Məbləğ aralığı"
                                value={selectedPriceFilter}
                                onChange={(event) => setSelectedPriceFilter(event.target.value)}
                                size="small"
                            >
                                <MenuItem value={0}>
                                    <em>Seçilməyib</em>
                                </MenuItem>
                                <MenuItem value={1}>100$ - 500$</MenuItem>
                                <MenuItem value={2}>500$ - 1500$</MenuItem>
                                <MenuItem value={3}>1500$-dən çox</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="quantityFilter">Status</InputLabel>
                            <Select
                                labelId="Status"
                                label="Status"
                                value={selectedStatusFilter}
                                onChange={(event) => setSelectedStatusFilter(event.target.value)}
                                size="small"
                            >
                                <MenuItem value={0}>
                                    <em>Seçilməyib</em>
                                </MenuItem>
                                <MenuItem value={1}>gözləyir</MenuItem>
                                <MenuItem value={2}>xitam olunub</MenuItem>
                                <MenuItem value={3}>təsdiqlənib</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    : null
                }

                {filtered && filtered.length ?
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>

                                {stableSort(filtered, getComparator(order, orderBy))
                                    .slice(pagination.start, pagination.end)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={1}
                                                key={row.id}
                                            >
                                                <TableCell sx={{ color: "#0C1230", fontSize: "14px", fontWeight: 600 }} align="center">{row.id}</TableCell>
                                                <TableCell sx={{ color: "#0C1230", fontSize: "14px", fontWeight: 600 }} align="center">
                                                    <Stack direction="row" alignItems="center" justifyContent="space-around">
                                                        <Avatar alt="logo" src={row.profileImage} />
                                                        {row.customer}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ color: "#0C1230", fontSize: "14px", fontWeight: 600 }} align="center">{row.quantity}</TableCell>
                                                <TableCell sx={{ color: "#0C1230", fontSize: "14px", fontWeight: 600 }} align="center">{row?.total.toFixed(2)}</TableCell>
                                                <TableCell align="center">
                                                    {(() => {
                                                        switch (row.status) {
                                                            case 1:
                                                                return <span className='waitingStatus'>gözləyir</span>
                                                            case 2:
                                                                return <span className='canceledStatus'>xitam olunub</span>
                                                            case 3:
                                                                return <span className='approvedStatus'>təsdiqlənib</span>
                                                            default:
                                                                break;
                                                        }
                                                    })()}

                                                </TableCell>
                                                <TableCell sx={{ color: "#0C1230", fontSize: "14px", fontWeight: 600 }} align="center">

                                                    <Button aria-describedby={id}
                                                        onClick={(event) => {
                                                            handleClick(event);
                                                            setSelectedRowId(row.id);
                                                        }}>
                                                        <MoreVertIcon />
                                                    </Button>
                                                    <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                    >
                                                        <List sx={{ boxShadow: "0px 4px 55px rgba(0, 0, 0, 0.07)", borderRadius: "12px" }}>
                                                            <ListItem disablePadding>
                                                                <ListItemButton onClick={() => { handleShowEdit(selectedRowId); handleClose() }}>
                                                                    <ListItemIcon>
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M19.0442 0.956628C18.4776 0.390959 17.7098 0.0732422 16.9092 0.0732422C16.1086 0.0732422 15.3407 0.390959 14.7742 0.956628L1.22085 14.51C0.832722 14.8959 0.524981 15.355 0.315428 15.8606C0.105874 16.3663 -0.00133165 16.9084 1.24844e-05 17.4558V19.1666C1.24844e-05 19.3876 0.0878099 19.5996 0.24409 19.7559C0.40037 19.9122 0.612332 20 0.833346 20H2.54418C3.09148 20.0015 3.63365 19.8945 4.13931 19.6851C4.64496 19.4756 5.10406 19.168 5.49001 18.78L19.0442 5.22579C19.6096 4.65929 19.9271 3.8916 19.9271 3.09121C19.9271 2.29082 19.6096 1.52313 19.0442 0.956628ZM4.31168 17.6016C3.84168 18.0685 3.20665 18.3314 2.54418 18.3333H1.66668V17.4558C1.66584 17.1274 1.73014 16.8021 1.85588 16.4987C1.98161 16.1953 2.16628 15.9198 2.39918 15.6883L12.685 5.40246L14.6017 7.31913L4.31168 17.6016ZM17.865 4.04746L15.7767 6.13663L13.86 4.22413L15.9492 2.13496C16.075 2.00938 16.2244 1.90983 16.3887 1.84197C16.553 1.77411 16.7291 1.73929 16.9069 1.73948C17.0847 1.73967 17.2607 1.77488 17.4249 1.8431C17.5891 1.91131 17.7382 2.01119 17.8638 2.13704C17.9893 2.26289 18.0889 2.41225 18.1568 2.57657C18.2246 2.7409 18.2594 2.91698 18.2592 3.09477C18.2591 3.27255 18.2238 3.44856 18.1556 3.61274C18.0874 3.77692 17.9875 3.92605 17.8617 4.05163L17.865 4.04746Z" fill="#5F646E" />
                                                                        </svg>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Düzəliş et" />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton onClick={() => { handleDeleteInvoice(selectedRowId); handleClose() }}>
                                                                    <ListItemIcon>
                                                                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M16.5 3.33333H13.9167C13.7233 2.39284 13.2115 1.54779 12.4677 0.940598C11.7239 0.333408 10.7935 0.0012121 9.83335 0L8.16669 0C7.20652 0.0012121 6.27612 0.333408 5.53231 0.940598C4.7885 1.54779 4.27677 2.39284 4.08335 3.33333H1.50002C1.27901 3.33333 1.06704 3.42113 0.910765 3.57741C0.754484 3.73369 0.666687 3.94565 0.666687 4.16667C0.666687 4.38768 0.754484 4.59964 0.910765 4.75592C1.06704 4.9122 1.27901 5 1.50002 5H2.33335V15.8333C2.33468 16.938 2.77409 17.997 3.5552 18.7782C4.33632 19.5593 5.39536 19.9987 6.50002 20H11.5C12.6047 19.9987 13.6637 19.5593 14.4448 18.7782C15.226 17.997 15.6654 16.938 15.6667 15.8333V5H16.5C16.721 5 16.933 4.9122 17.0893 4.75592C17.2456 4.59964 17.3334 4.38768 17.3334 4.16667C17.3334 3.94565 17.2456 3.73369 17.0893 3.57741C16.933 3.42113 16.721 3.33333 16.5 3.33333ZM8.16669 1.66667H9.83335C10.3502 1.6673 10.8543 1.82781 11.2764 2.1262C11.6984 2.42459 12.0179 2.84624 12.1909 3.33333H5.80919C5.98217 2.84624 6.3016 2.42459 6.72368 2.1262C7.14575 1.82781 7.64979 1.6673 8.16669 1.66667ZM14 15.8333C14 16.4964 13.7366 17.1323 13.2678 17.6011C12.7989 18.0699 12.1631 18.3333 11.5 18.3333H6.50002C5.83698 18.3333 5.20109 18.0699 4.73225 17.6011C4.26341 17.1323 4.00002 16.4964 4.00002 15.8333V5H14V15.8333Z" fill="#5F646E" />
                                                                        </svg>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Sil" />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <ListItemButton onClick={() => { handleShowChangeStatus(selectedRowId); handleClose() }}>
                                                                    <ListItemIcon>
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M15.8333 5V3.33333C15.8333 2.44928 15.4821 1.60143 14.857 0.976311C14.2319 0.35119 13.3841 0 12.5 0L7.5 0C6.61594 0 5.7681 0.35119 5.14298 0.976311C4.51786 1.60143 4.16667 2.44928 4.16667 3.33333V5C3.062 5.00132 2.00296 5.44073 1.22185 6.22185C0.440735 7.00296 0.00132321 8.062 0 9.16667L0 13.3333C0.00132321 14.438 0.440735 15.497 1.22185 16.2782C2.00296 17.0593 3.062 17.4987 4.16667 17.5C4.16667 18.163 4.43006 18.7989 4.8989 19.2678C5.36774 19.7366 6.00363 20 6.66667 20H13.3333C13.9964 20 14.6323 19.7366 15.1011 19.2678C15.5699 18.7989 15.8333 18.163 15.8333 17.5C16.938 17.4987 17.997 17.0593 18.7782 16.2782C19.5593 15.497 19.9987 14.438 20 13.3333V9.16667C19.9987 8.062 19.5593 7.00296 18.7782 6.22185C17.997 5.44073 16.938 5.00132 15.8333 5ZM5.83333 3.33333C5.83333 2.89131 6.00893 2.46738 6.32149 2.15482C6.63405 1.84226 7.05797 1.66667 7.5 1.66667H12.5C12.942 1.66667 13.3659 1.84226 13.6785 2.15482C13.9911 2.46738 14.1667 2.89131 14.1667 3.33333V5H5.83333V3.33333ZM14.1667 17.5C14.1667 17.721 14.0789 17.933 13.9226 18.0893C13.7663 18.2455 13.5543 18.3333 13.3333 18.3333H6.66667C6.44565 18.3333 6.23369 18.2455 6.07741 18.0893C5.92113 17.933 5.83333 17.721 5.83333 17.5V14.1667C5.83333 13.9457 5.92113 13.7337 6.07741 13.5774C6.23369 13.4211 6.44565 13.3333 6.66667 13.3333H13.3333C13.5543 13.3333 13.7663 13.4211 13.9226 13.5774C14.0789 13.7337 14.1667 13.9457 14.1667 14.1667V17.5ZM18.3333 13.3333C18.3333 13.9964 18.0699 14.6323 17.6011 15.1011C17.1323 15.5699 16.4964 15.8333 15.8333 15.8333V14.1667C15.8333 13.5036 15.5699 12.8677 15.1011 12.3989C14.6323 11.9301 13.9964 11.6667 13.3333 11.6667H6.66667C6.00363 11.6667 5.36774 11.9301 4.8989 12.3989C4.43006 12.8677 4.16667 13.5036 4.16667 14.1667V15.8333C3.50363 15.8333 2.86774 15.5699 2.3989 15.1011C1.93006 14.6323 1.66667 13.9964 1.66667 13.3333V9.16667C1.66667 8.50362 1.93006 7.86774 2.3989 7.3989C2.86774 6.93006 3.50363 6.66667 4.16667 6.66667H15.8333C16.4964 6.66667 17.1323 6.93006 17.6011 7.3989C18.0699 7.86774 18.3333 8.50362 18.3333 9.16667V13.3333Z" fill="#5F646E" />
                                                                        </svg>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Statusu dəyiş" />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </List>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                            </TableBody>
                        </Table>
                    </TableContainer>


                    :
                    <Stack>
                        <Typography variant="h6" textAlign="center" margin="15px 10px" sx={{color:"#0051EC"}}>
                            Uyğun məlumat tapılmadı
                        </Typography>
                    </Stack>}
            </Paper>
            <Stack alignItems="center">
                <Pagination color="primary" showQuickJumper current={page} onChange={(event, pageNumber) => { onPaginationChange(event, pageNumber) }} pageSize={rowsPerPage} showSizeChanger={false} count={Math.ceil(filtered.length / rowsPerPage)} />
            </Stack>
        </Box >
    );
}
