import React from "react";
import { Stack, Typography, AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Computer, AccountCircle } from "@mui/icons-material";

interface Props {
  children: React.ReactNode;
  title?: string;
  leftIcon?: React.ReactNode;
}

const DefaultWrapper: React.FC<Props> = ({ children, title, leftIcon }) => {
  return (
    <>
      <Stack direction="row">
        <AppBar position="static">
          <Toolbar>
            {leftIcon ? leftIcon : <Computer color="inherit" />}
            <Typography ml={2}>PROOF INVENTORY</Typography>
            <Stack direction="row" sx={{ marginLeft: "auto" }}>
              <AccountCircle />
              <Typography ml={1}> halo!</Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </Stack>
      <Stack padding={2}>{children}</Stack>
    </>
  );
};

export default DefaultWrapper;
