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
  Divider,
  LinearProgress,
} from "@mui/material";
import { format } from "date-fns";

import DefaultWrapper from "@/components/DefaultWrapper";

import { StockInterface } from "@/configs/interfaces/stock";

interface StockInInterface {
  date_in: string;
  stock_id: number;
  name: string;
  value: string;
}

const StockIn: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listStock, setListStock] = useState<StockInterface[]>([]);
  const [stockIn, setStockIn] = useState<StockInInterface[]>([]);
  const dateNow = format(new Date(), "dd/MM/yyyy");
  useEffect(() => {
    handleGetStock();
  }, []);

  const handleGetStock = async () => {
    setLoading(true);
    try {
      await fetch("/api/stock", { cache: "no-store" }).then(async (res) => {
        const data = await res.json();
        if (Array.isArray(data)) {
          setListStock(data);
          setStockIn(
            data.map((stock: StockInterface) => {
              return {
                date_in: dateNow,
                stock_id: Number(stock.id),
                name: stock.name,
                value: "",
              };
            })
          );
        }
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStockIn = async () => {
    setLoading(true);
    try {
      await fetch("/api/stock/in", {
        method: "POST",
        body: JSON.stringify(stockIn),
      }).then(async () => {
        gotStockInReport;
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stock: StockInterface
  ) => {
    setStockIn((prev) => {
      prev.forEach((stockIn) => {
        if (stockIn.stock_id === Number(stock.id)) {
          stockIn.value = e.target.value;
        }
      });

      return [...prev];
    });
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

      <Divider />
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Stack>
        {listStock.map((stock, index) => {
          return (
            <TextField
              key={stock.id}
              type="number"
              id="input-with-icon-textfield"
              label={stock.name}
              InputProps={{
                endAdornment: stock.uom,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(222);
                handleChange(e, stock);
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
