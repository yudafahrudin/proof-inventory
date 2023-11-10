import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  SxProps,
  Typography,
  DialogActions,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";

const modalMobileContainer: SxProps = {
  "& .MuiDialog-container": {
    alignItems: "flex-end",
  },
};

const modalMobileContent: SxProps = {
  width: "100vw",
  height: "70vh",
  margin: 0,
};

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  onDismiss?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  dismissTitle?: string;
}
const Modal: React.FC<ModalProps> = ({
  title = "",
  open,
  onDismiss,
  onAction,
  children,
  actionTitle = "SIMPAN",
  dismissTitle = "TUTUP",
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="App">
      <Dialog
        open={Boolean(open)}
        sx={isMobile ? modalMobileContainer : null}
        PaperProps={{ sx: isMobile ? modalMobileContent : null }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">{title}</Typography>
            <Button onClick={onDismiss}>{dismissTitle}</Button>
          </Stack>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ marginBottom: 1 }}
            fullWidth
            onClick={onAction}
          >
            {actionTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
