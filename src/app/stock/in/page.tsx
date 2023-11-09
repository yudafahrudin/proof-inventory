"use client";

import React, { useState, useEffect } from "react";
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

const StockIn: React.FC = () => {
  const router = useRouter();

  const [listStock, setListStock] = useState([]);

  useEffect(() => {
    handleGetStock();
  }, []);

  const handleGetStock = async () => {
    await fetch("/api/v1/stock").then(async (res) => {
      const { data } = await res.json();
      setListStock(JSON.parse(data));
    });
  };

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
        {listStock.map((stock) => {
          return (
            <TextField
              key={stock[0]}
              type="number"
              id="input-with-icon-textfield"
              label={stock[0]}
              InputProps={{
                endAdornment: stock[1],
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
