"use client"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const AlertDialog = ({children, handleConfirm, disabled})=> {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div variant="ghost" className='p-0' onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='font-semibold'>
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='text-black'>
            This action cannot be undone. The same will be deleted from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='ghost' onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleConfirm()} autoFocus disabled={disabled} className={cn(disabled && "cursor-not-allowed bg-gray-500")} >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}