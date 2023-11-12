"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  LinearProgress,
} from "@mui/material";
import DefaultWrapper from "@/components/DefaultWrapper";
import { format } from "date-fns";

interface StockInInterface {
  date_in: string;
  stock_id: number;
  value: number;
}

interface StockInTransfromInterface {
  [id: string]: StockInInterface[];
}

const StockInReport: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [listStockIn, setListStockIn] = useState<StockInInterface[]>([]);
  const [indexActive, setIndexActie] = useState(0);

  useEffect(() => {
    handleGetStockIn();
  }, []);

  const handleGetStockIn = async () => {
    try {
      await fetch("/api/stock/report").then(async (res) => {
        const data = await res.json();
        if (Array.isArray(data)) {
          setListStockIn(data);
        }
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const transformStockIn = useMemo(() => {
    let stockInTransform: StockInTransfromInterface;
    stockInTransform = {};

    // populate key
    listStockIn.forEach((stock) => {
      stockInTransform[stock.date_in] = [];
    });

    // populate data
    listStockIn.forEach((stock) => {
      if (stockInTransform[stock.date_in]) {
        stockInTransform[stock.date_in].push(stock);
      }
    });

    return stockInTransform;
  }, [listStockIn]);

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
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Stack spacing={2}>
        <Stack>
          {/* <Button variant="contained" onClick={handleStockDownload}>
            Download All Report
          </Button> */}
        </Stack>
        {!transformStockIn ? <Box>data kosong</Box> : null}
        <Tabs value={indexActive}>
          {Object.keys(transformStockIn).map((key, index) => {
            return (
              <Tab
                key={`${key}`}
                label={key}
                onClick={() => handleOnClick(index)}
              />
            );
          })}
        </Tabs>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {/* {listStockIn[indexActive]?.listStock.map((stockData, index) => {
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
            })} */}
          </Grid>
        </Stack>
      </Stack>
    </DefaultWrapper>
  );
};

export default StockInReport;
