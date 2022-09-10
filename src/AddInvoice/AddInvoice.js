import React, { useState, useEffect } from "react";
import './addInvoice.css'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Table from './AddedTable/AddedTable'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper'


const AddInvoice = ({ customers, goods, setShowModal, handleAdd }) => {
    const [filteredCustomers, setFilteredCustomer] = useState(customers)
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedCustomerIndex, setSelectedCustomerIndex] = useState()

    const [filteredGoods, setFilteredGoods] = useState(goods)
    const [selectedGoods, setSelectedGoods] = useState('')
    const [selectedGoodsIndex, setSelectedGoodsIndex] = useState()

    const [newGoods, setNewGoods] = useState([])
    const [errorAlert, setErrorAlert] = useState(false);


    useEffect(() => {
        setFilteredCustomer(customers)
        setFilteredGoods(goods)
    }, [customers, goods])


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const customerSearch = (searchedVal) => {
        if (searchedVal) {
            const filteredList = filteredCustomers.filter((customer) => {
                return customer.fullName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setFilteredCustomer(filteredList);
        } else {
            setFilteredCustomer(customers);

        }

    };

    const handleListItemClick = (event, customerFullName, customerIndex) => {
        setSelectedCustomer(customerFullName)
        setSelectedCustomerIndex(customerIndex)

    }

    const goodsSearch = (searchedVal) => {
        if (searchedVal) {
            const filteredList = filteredGoods.filter((good) => {
                return good.name.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setFilteredGoods(filteredList);
        } else {
            setFilteredGoods(goods);

        }

    };

    const handleGoodsListItemClick = (event, goodsInfo, goodsIndex) => {
        setSelectedGoods(goodsInfo)
        setSelectedGoodsIndex(goodsIndex)

    }

    const AddGoods = () => {
        if (selectedCustomer && selectedGoods) {
            let newGoodsList = [...newGoods]
            newGoodsList.push({ "id": selectedGoods.id, "name": selectedGoods.name, "price": selectedGoods.price, "quantity": 1, "limit": selectedGoods.quantity })
            setNewGoods(newGoodsList)
        } else {
            setErrorAlert(true)
        }
    }
    return (
        <div className="MainModalAdd">
            <Stack direction="row" justifyContent="flex-end">
                <Button
                    sx={{ width: "30px", color: "black" }}
                    startIcon={<CloseIcon />}
                    onClick={() => { setShowModal(false); setNewGoods([]) }}>
                </Button>
            </Stack>
            <Paper sx={{ maxHeight: "250px", overflow: "auto" }}>
                <Stack direction="row" justifyContent="space-around" margin="10px">
                    <Stack sx={{ width: '40%' }}>
                        <TextField label="Müştərilər" size="small" sx={{ width: '100%' }} id="outlined-start-adornment" placeholder='Axtarış' variant='outlined' onChange={(event) => { customerSearch(event.target.value) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }} />


                        <List component="nav" aria-label="main mailbox folders" sx={{ overflow: 'auto', maxHeight: 150 }}>
                            {filteredCustomers && filteredCustomers.length && filteredCustomers.map((customer, index) => {
                                return (
                                    <ListItemButton
                                        onClick={(event) => handleListItemClick(event, customer.fullName, index)}
                                        selected={selectedCustomerIndex === index}
                                    >
                                        <ListItemText primary={customer.fullName} />


                                    </ListItemButton>
                                )
                            })}

                        </List>
                    </Stack>

                    <Stack sx={{ width: '40%' }}>
                        <TextField label="Məhsullar" size="small" sx={{ width: '100%' }} id="outlined-start-adornment" placeholder='Axtarış' variant='outlined' onChange={(event) => { goodsSearch(event.target.value) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        <List component="nav" aria-label="main mailbox folders" sx={{ overflow: 'auto', maxHeight: 150 }}>
                            {filteredGoods && filteredGoods.length && filteredGoods.map((good, index) => {
                                return (
                                    <ListItemButton
                                        onClick={(event) => handleGoodsListItemClick(event, good, index)}
                                        selected={selectedGoodsIndex === index}
                                    >
                                        <ListItemText primary={
                                            <span className="GoodsInfoTag">
                                                <span>{good.name + " " + "(" + good.quantity + "ədəd)"}</span>
                                                <span>{good.price + "" + "AZN"}</span>
                                            </span>

                                        } />


                                    </ListItemButton>
                                )
                            })}

                        </List>
                        <div className="ListContainer">
                        </div>

                    </Stack>
                    <Stack>
                        <Button sx={{ width: '80px', height: "40px", textTransform: "capitalize", textAlign: "center" }} variant="contained" startIcon={<AddOutlinedIcon />}
                            onClick={AddGoods}>
                        </Button>
                    </Stack>

                </Stack>
            </Paper>
            <Snackbar open={errorAlert} autoHideDuration={3000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">Müştəri və məhsul seçilməlidir!</Alert>
            </Snackbar>
            <div className="AddedGoodsTable">
                <Table selectedCustomer={selectedCustomer} newGoods={newGoods} setNewGoods={setNewGoods} setShowModal={setShowModal} handleAdd={(value) => handleAdd(value)} />
            </div>


        </div>
    );
}

export default AddInvoice;