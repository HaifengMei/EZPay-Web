import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class BaseDialog extends React.Component {
  render() {
    const { open, title, handleClose, handleConfirm, confirmText, children } = this.props
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            {
              handleClose && <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            }
            {
              handleConfirm && <Button onClick={handleConfirm} color="primary">
                {confirmText}
              </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}