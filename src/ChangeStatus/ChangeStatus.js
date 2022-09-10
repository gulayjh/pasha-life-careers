import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './changeStatus.css'
import CloseIcon from '@mui/icons-material/Close';

const ChangeStatus = ({ handleStatusChange, cancelChangeStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState()


    return (
        <div className="MainModalChangeStatus">
            <Stack direction="row" justifyContent="flex-end">
                <Button
                    sx={{ width: "30px",color:"black" }}
                    startIcon={<CloseIcon />}
                    onClick={() => { cancelChangeStatus(); }}>
                </Button>
            </Stack>
            <Stack margin="20px auto">
                <Button
                    sx={{ margin: "10px auto", width: "250px", color: "#e0b300", backgroundColor: "#fffae8", border: "2px solid #e0b300", borderRadius: "16px", textTransform: "capitalize" }}
                    onClick={() => { setSelectedStatus(1) }}>
                    gözləyir
                </Button>
                <Button sx={{ margin: "10px auto", width: "250px", color: "#ff463d", backgroundColor: "#fff7f7", border: "2px solid #ff463d", borderRadius: "16px", textTransform: "capitalize" }}
                    onClick={() => { setSelectedStatus(2) }}>
                    xitam olunub
                </Button>
                <Button
                    sx={{ margin: "10px auto", width: "250px", color: "#488c6e", backgroundColor: "#ecfdf3", border: "2px solid #488c6e", borderRadius: "16px", textTransform: "capitalize" }}
                    onClick={() => { setSelectedStatus(3) }}>
                    təsdiqlənib
                </Button>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" marginTop="20px">
                <Button sx={{ color: "#7C818D;", width: '120px', height: "40px", marginRight: "2%", textTransform: "capitalize" }} variant="outlined"
                    onClick={() => { cancelChangeStatus(); }}>
                    İmtina et
                </Button>
                <Button sx={{ width: '120px', height: "40px", textTransform: "capitalize" }} variant="contained" onClick={() => { handleStatusChange(selectedStatus); }}>
                    Düzəliş et
                </Button>
            </Stack>

        </div >
    );
}

export default ChangeStatus;
