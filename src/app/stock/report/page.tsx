"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace } from "@mui/icons-material";
import {
  IconButton,
  Typography,
  Stack,
  Chip,
  Box,
  Button,
  Divider,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import DefaultWrapper from "@/components/DefaultWrapper";
import { format } from "date-fns";

interface StockInInterface {
  date: string;
  listValue: any[];
  listStock: any[];
}

const StockInReport: React.FC = () => {
  const router = useRouter();

  const [listStockIn, setListStockIn] = useState<StockInInterface[]>([]);
  const [indexActive, setIndexActie] = useState(0);

  useEffect(() => {
    handleGetStockIn();
  }, []);

  const handleGetStockIn = async () => {
    await fetch("/api/v1/stock/in").then(async (res) => {
      const { data } = await res.json();
      setListStockIn(JSON.parse(data).reverse());
    });
  };

  const goBack = () => {
    router.push("/");
  };

  //   const handleOnClick = (_event: React.SyntheticEvent, newValue: number) => {
  //     console.log(newValue);
  //     setActie(newValue);
  //   };

  const handleStockDownload = async () => {
    await fetch("/api/v1/stock/in/download").then(async (res) => {
      const { data } = await res.json();
      const dataParse = JSON.parse(data);
      console.log(dataParse);
    });
  };

  const handleOnClick = (index: number) => {
    setIndexActie(index);
  };

  return (
    <DefaultWrapper
      title="STOCK IN REPORT"
      leftIcon={
        <IconButton onClick={goBack}>
          <KeyboardBackspace sx={{ color: "white" }} />
        </IconButton>
      }
    >
      <Stack spacing={2}>
        <Stack>
          <Button variant="contained" onClick={handleStockDownload}>
            Download All Report
          </Button>
        </Stack>
        {!listStockIn.length ? <Box>data kosong</Box> : null}
        <Tabs value={indexActive}>
          {listStockIn.map((stock, index) => {
            return (
              <Tab
                key={`${stock.date}`}
                label={stock.date}
                onClick={() => handleOnClick(index)}
              />
            );
          })}
        </Tabs>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {listStockIn[indexActive]?.listStock.map((stockData, index) => {
              return (
                <>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">{stockData}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">
                      {listStockIn[indexActive].listValue[index]}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Divider />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    </DefaultWrapper>
  );
};

export default StockInReport;
