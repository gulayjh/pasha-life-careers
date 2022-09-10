import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import './editinvoice.css'

const EditInvoice = ({ selectedInvoiceForEdit, handleEditInvoice, cancelEdit }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(selectedInvoiceForEdit)
    useEffect(() => {
        setSelectedInvoice(selectedInvoiceForEdit)
    }, [selectedInvoiceForEdit])

    const handleInvoiceChange = (event, value, field) => {
        let updatedInvoice = [...selectedInvoice]
        updatedInvoice[0][field] = value
        setSelectedInvoice(updatedInvoice)
    }
    return (
        <div className="MainModal">
            <Stack direction="row" justifyContent="flex-end">
                <Button
                    sx={{ width: "30px", color: "black" }}
                    startIcon={<CloseIcon />}
                    onClick={cancelEdit}>
                </Button>
            </Stack>
            <Typography variant="h6" textAlign="left" margin="10px 40px">
                Qaimə
            </Typography>
            {selectedInvoice && selectedInvoice.length && selectedInvoice.map((invoice) => {
                return (
                    <Stack direction="row" margin="50px auto" justifyContent="space-around">
                        <TextField label="Qaimə No" size="small" type="number" value={invoice.id} id="outlined-start-adornment" variant='outlined' onChange={(event) => handleInvoiceChange(event, event.target.value, "id")} />
                        <TextField label="Müştəri" size="small" type="text" value={invoice.customer} id="outlined-start-adornment" variant='outlined' onChange={(event) => handleInvoiceChange(event, event.target.value, "customer")} />
                        <TextField label="Məhsul sayı" size="small" type="number" value={invoice.quantity} id="outlined-start-adornment" variant='outlined' onChange={(event) => handleInvoiceChange(event, event.target.value, "quantity")} />
                        <TextField label="Qiymət" size="small" type="number" value={invoice.total} id="outlined-start-adornment" variant='outlined' onChange={(event) => handleInvoiceChange(event, event.target.value, "total")} />
                    </Stack>

                )
            })}
            <Stack direction="row" alignItems="center" justifyContent="right" marginRight="40px">
                <Button sx={{ color: "#7C818D;", width: '120px', height: "40px", marginRight: "2%", textTransform: "capitalize" }} variant="outlined"
                    onClick={() => { cancelEdit(); setSelectedInvoice([]) }}>
                    İmtina et
                </Button>
                <Button sx={{ width: '150px', height: "40px", textTransform: "capitalize" }} variant="contained" onClick={() => { handleEditInvoice(selectedInvoice); setSelectedInvoice([]) }}>
                    Düzəliş et
                </Button>
            </Stack>

        </div>
    );
}

export default EditInvoice
