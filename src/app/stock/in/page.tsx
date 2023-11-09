"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace } from "@mui/icons-material";
import {
  IconButton,
  Typography,
  Stack,
  Chip,
  TextField,
  Box,
  Button,
} from "@mui/material";
import DefaultWrapper from "@/components/DefaultWrapper";
import { format } from "date-fns";

import { STOCKS } from "../config";

const StockIn: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };
  return (
    <DefaultWrapper
      title="STOCK IN"
      leftIcon={
        <IconButton onClick={goBack}>
          <KeyboardBackspace sx={{ color: "white" }} />
        </IconButton>
      }
    >
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle1">IN DATE</Typography>
          <Chip label={format(new Date(), "dd MMMM yyyy")} />
        </Stack>
        <Box>
          <Button variant="contained">kirim</Button>
        </Box>
      </Stack>
      <Stack>
        {STOCKS.map((stock) => {
          return (
            <TextField
              key={stock.title}
              type="number"
              id="input-with-icon-textfield"
              label={stock.title}
              InputProps={{
                endAdornment: stock.uom,
              }}
              variant="standard"
            />
          );
        })}
      </Stack>
    </DefaultWrapper>
  );
};

export default StockIn;
