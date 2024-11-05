import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { contextData } from './Context';
import { useContext } from 'react';

export default function DeleteAll() {
  const { open, setOpen, setIsDelete, isDelete, setDailySales } =
    useContext(contextData);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDocs = () => {
    localStorage.removeItem('dailySales'); // Sadece günlük satışları temizler
    setDailySales(null); // Arayüzü güncellemek için dailySales'i boşaltır
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Verileri silmek istiyor musun ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hayır</Button>
          <Button onClick={deleteDocs}>Evet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
