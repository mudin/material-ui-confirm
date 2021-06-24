import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 10,
  },
  title: {
    padding: "0 24px",
    textAlign: "center",
  },
  content: {
    margin: "12px 0",
  },
  noticeIcon: {
    color: "#7292FD",
    marginTop: 30,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  warningIcon: {
    color: theme.palette.error.main,
    marginTop: 40,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  circularProgress: {
    marginLeft: 0,
    marginRight: theme.spacing(),
  },
}));

const ConfirmationDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
}) => {
  const {
    title,
    description,
    content,
    confirmationText,
    confirmationLoading,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = options;

  const classes = useStyles();

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content ? (
        <DialogContent>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button
          color="primary"
          {...confirmationButtonProps}
          onClick={onConfirm}
          disabled={confirmationLoading}
        >
          {confirmationLoading && (
            <CircularProgress
              className={classes.circularProgress}
              color={"inherit"}
              size={20}
            />
          )}
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
