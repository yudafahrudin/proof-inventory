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

interface StockInterface {
  stockName: string;
  uom: string;
  value: number;
}

const StockIn: React.FC = () => {
  const router = useRouter();

  const [listStock, setListStock] = useState<StockInterface[]>([]);

  useEffect(() => {
    handleGetStock();
  }, []);

  const handleGetStock = async () => {
    await fetch("/api/v1/stock").then(async (res) => {
      const { data } = await res.json();
      const dataParse = JSON.parse(data);

      const transform = dataParse.map((stockdata: any[]) => {
        return {
          stockName: stockdata[0],
          uom: stockdata[1],
          value: null,
        };
      });

      setListStock(transform);
    });
  };

  const handleSubmitStockIn = async () => {
    const bodyData = {
      date: format(new Date(), "dd/MM/yyyy"),
      listStock: listStock.map((stock) => stock.stockName),
      listValue: listStock.map((stock) => stock.value),
    };

    await fetch("/api/v1/stock/in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then(async () => {
      gotStockInReport();
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const stockInData = listStock[index];
    stockInData.value = Number(e.target.value);
    setListStock([...listStock]);
  };

  const goBack = () => {
    router.push("/");
  };

  const gotStockInReport = () => {
    router.push("/stock/report");
  };

  return (
    <DefaultWrapper
      title="STOCK IN INPUT"
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
          <Button variant="contained" onClick={handleSubmitStockIn}>
            kirim
          </Button>
        </Box>
      </Stack>

      <Stack>
        {listStock.map((stock, index) => {
          return (
            <TextField
              key={stock.stockName}
              type="number"
              id="input-with-icon-textfield"
              label={stock.stockName}
              InputProps={{
                endAdornment: stock.uom,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              variant="standard"
            />
          );
        })}
      </Stack>
    </DefaultWrapper>
  );
};

export default StockIn;
