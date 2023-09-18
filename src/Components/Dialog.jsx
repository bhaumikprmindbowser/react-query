import React from "react";
import {
  Dialog,
  IconButton,
  DialogContent,
  DialogActions,
  Slide,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function SlideDialog({
  isOpen,
  onClose,
  title,
  children,
  dialogAction,
  titleVariant,
  contentStyle,
  footerStyle,
  titleStyle,
  colseIconStyle,
  disableBackDropClick,
  transitionDuration = 600,
  closeButton = true,
  ...props
}) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      transitionDuration={transitionDuration}
      aria-describedby="alert-dialog-slide-description"
      keepMounted
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={disableBackDropClick ? () => {} : onClose}
      PaperProps={{
        sx: { borderRadius: "20px", m: 0, p: 4, width: "100%" },
      }}
      {...props}
    >
      <Box display="flex" justifyContent={"flex-end"}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: (theme) => theme.palette.secondary.dark }}
        >
          <CloseIcon
            fontSize="small"
            sx={{ color: (theme) => theme.palette.secondary.black }}
          />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          flex: 1,
          p: 0,
          ...contentStyle,
        }}
      >
        {children}
      </DialogContent>
      {dialogAction && (
        <DialogActions
          sx={{
            ...footerStyle,
          }}
        >
          {dialogAction}
        </DialogActions>
      )}
    </Dialog>
  );
}
