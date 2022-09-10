import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './main.css';
import Modal from '@mui/material/Modal';
import Table from './Table/Table'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AddInvoice from '../AddInvoice/AddInvoice';
import EditInvoice from '../EditInvoice/EditInvoice';
import ChangeStatus from '../ChangeStatus/ChangeStatus';
import { Box } from '@mui/material';
import SuccessPage from '../SuccesPage/SuccessPage';

const Invoices = () => {
    const [customers, setCustomers] = useState([])
    const [goods, setGoods] = useState([])
    const [invoices, setInvoices] = useState([])
    const [refresh, setRefresh] = useState(true)

    const [showModal, setShowModal] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedInvoiceForEdit, setSelectedInvoiceForEdit] = useState([])
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)

    const [successAlert, setSuccessAlert] = useState(false)
    const [addSuccess, setAddSuccess] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    useEffect(() => {
        axios.get('http://localhost:3001/invoices')
            .then(response => {
                setInvoices(response.data)
            });
    }, [refresh])


    useEffect(() => {
        axios.get('http://localhost:3001/customers')
            .then(response => {
                setCustomers(response.data)
            });
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3001/goods')
            .then(response => {
                setGoods(response.data)
            });
    }, [])



    const handleAdd = (value) => {
        if (value.customer && value.quantity && value.status && value.total) {
            let newInvoice = value
            axios.post('http://localhost:3001/invoices', newInvoice)
                .then(response => { setRefresh(!refresh); setShowModal(false); setAddSuccess(true) });
        } else {
            setErrorAlert(true)
        }
    }

    const handleDeleteInvoice = (id) => {
        if (window.confirm("Qaiməni silməyinizə əminsiniz?")) {
            axios.delete(`http://localhost:3001/invoices/${id}`)
                .then(() => setRefresh(!refresh));
        }
    }


    const handleShowEdit = (id) => {
        axios.get(`http://localhost:3001/invoices/${id}`)
            .then(response => {
                setSelectedInvoiceForEdit([response.data]); setShowEditModal(true)
            });
    }

    const handleEditInvoice = (value) => {
        let editedInvoice = {
            id: value[0].id,
            customer: value[0].customer,
            quantity: Number(value[0].quantity),
            total: Number(value[0].total),
            status: value[0].status
        }
        axios.put(`http://localhost:3001/invoices/${value[0].id}`, editedInvoice)
            .then(response => { setRefresh(!refresh); setShowEditModal(false); setSuccessAlert(true); })

    }

    const handleShowChangeStatus = (id) => {
        axios.get(`http://localhost:3001/invoices/${id}`)
            .then(response => {
                setSelectedInvoiceForEdit(response.data); setShowChangeStatusModal(true)
            });
    }

    const handleStatusChange = (statusId) => {
        let editedInvoice = {
            id: selectedInvoiceForEdit.id,
            customer: selectedInvoiceForEdit.customer,
            quantity: Number(selectedInvoiceForEdit.quantity),
            total: Number(selectedInvoiceForEdit.total),
            status: statusId
        }
        axios.put(`http://localhost:3001/invoices/${selectedInvoiceForEdit.id}`, editedInvoice)
            .then(response => { setRefresh(!refresh); setShowChangeStatusModal(false); setSuccessAlert(true); })
    }

    return (
        <div className="mainContainer">

            <Table invoices={invoices}
                showModal={showModal}
                setShowModal={setShowModal}
                handleShowEdit={(value) => handleShowEdit(value)}
                handleShowChangeStatus={(value) => { handleShowChangeStatus(value) }}
                handleDeleteInvoice={(value) => handleDeleteInvoice(value)} />
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <AddInvoice
                    customers={customers}
                    goods={goods}
                    setShowModal={setShowModal}
                    handleAdd={(value) => handleAdd(value)} />

            </Modal>


            <Modal
                open={showEditModal}
                onClose={() => { setShowEditModal(false); setSelectedInvoiceForEdit([]) }}
            >
                <EditInvoice
                    selectedInvoiceForEdit={selectedInvoiceForEdit}
                    cancelEdit={() => { setShowEditModal(false) }}
                    handleEditInvoice={(value) => handleEditInvoice(value)} />

            </Modal>

            <Modal
                open={showChangeStatusModal}
                onClose={() => { setShowChangeStatusModal(false); setSelectedInvoiceForEdit([]) }}
            >
                <ChangeStatus
                    cancelChangeStatus={() => { setShowChangeStatusModal(false) }}
                    handleStatusChange={(value) => handleStatusChange(value)} />
            </Modal>

            <Modal
                open={addSuccess}
                onClose={() => { setAddSuccess(false); }}
            >
                <SuccessPage closeModal={() => { setAddSuccess(false); }} />
            </Modal>

            <Snackbar open={successAlert} autoHideDuration={3000} onClose={() => setSuccessAlert(false)}>
                <Alert severity="success">Uğurlu Əməliyyat!</Alert>
            </Snackbar>

            <Snackbar open={errorAlert} autoHideDuration={3000} onClose={() => setErrorAlert(false)}>
                <Alert severity="error">Bütün məlumatlar doldurulmalıdır</Alert>
            </Snackbar>

        </div>
    );
}

export default Invoices;