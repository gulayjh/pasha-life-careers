import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';


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
        label: 'Məhsul adı',
    },

    {
        id: 'quantity',
        label: 'Miqdar',
    },
    {
        id: 'price',
        label: 'Qiymət',
    },
    {
        id: 'total',
        label: 'Toplam Məbləğ',
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};




export default function EnhancedTable({ newGoods, selectedCustomer, setNewGoods, showModal, setShowModal, handleAdd }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [addedGoods, setaddedGoods] = useState(newGoods)
    const [total, setTotal] = useState()

    useEffect(() => {
        setaddedGoods(newGoods)
    }, [newGoods])


    useEffect(() => {
        let selectedGoodsList = [...addedGoods]
        const totalPrice = selectedGoodsList.reduce((accumulator, good) => {
            return accumulator + (Number(good.quantity) * Number(good.price));
        }, 0);
        setTotal(totalPrice);
    }, [addedGoods])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDeleteGood = (index) => {
        let selectedGoodsList = [...addedGoods]
        let updatedArray = selectedGoodsList.filter((good, i) => {
            return i !== index
        })
        console.log(updatedArray);
        setaddedGoods(updatedArray)

    }

    const handleQuantityChange = (event, newQuantity, id) => {
        let newList = [...addedGoods]
        const newArr = newList.map((item, index) => {
            if (item.id == id && Number(newQuantity) <= item.limit && Number(newQuantity) > 0) {
                return { "id": item.id, "name": item.name, "quantity": Number(newQuantity), "price": item.price, "limit": item.limit }

            } else {
                return item;

            }
        });
        setaddedGoods(newArr);
    }


    const handleAddInvoice = () => {
        let selectedGoodsList = [...addedGoods]
        const totalQuantity = selectedGoodsList.reduce((accumulator, good) => {
            return accumulator + Number(good.quantity);
        }, 0);
        let newInvoice = {
            "customer": selectedCustomer,
            "quantity": totalQuantity,
            "total": total,
            "status": 1
        }
        handleAdd(newInvoice)
    }

    return (

        <Box sx={{ width: '95%', margin: "50px 20px" }}>
            <Paper sx={{ height: "250px", overflow: 'auto', width: '100%', mb: 1, padding: "10px" }}>
                {addedGoods && addedGoods.length ?
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

                                {stableSort(addedGoods, getComparator(order, orderBy)).map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={1}
                                            key={row.id}
                                        >
                                            <TableCell align="center">{row?.name}</TableCell>
                                            <TableCell align="center">
                                                <TextField size="small" type="number" value={row.quantity} id="outlined-start-adornment" variant='outlined' onChange={(event) => handleQuantityChange(event, event.target.value, row.id)} />
                                            </TableCell>
                                            <TableCell align="center">{row?.price}</TableCell>
                                            <TableCell align="center">{(row?.quantity * row?.price)?.toFixed(2)}</TableCell>
                                            <TableCell align="center" sx={{cursor:"pointer"}} onClick={() => { handleDeleteGood(index) }}><DeleteIcon /></TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null}
            </Paper>
            <Paper sx={{ height: "90px" }}>
                <Typography variant="h6" color="primary" align='right'>
                    Toplam: $ {total?.toFixed(2)}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="right">
                    <Button sx={{ color: "#7C818D;", width: '120px', height: "35px", marginRight: "2%", textTransform: "capitalize" }} variant="outlined"
                        onClick={() => { setShowModal(false); setNewGoods([]) }}>
                        İmtina et
                    </Button>
                    <Button sx={{ width: '150px', height: "35px", textTransform: "capitalize" }} variant="contained" onClick={handleAddInvoice}>
                        Yadda saxla
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}
