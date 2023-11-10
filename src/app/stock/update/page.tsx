"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace, Edit, Delete } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import DefaultWrapper from "@/components/DefaultWrapper";

interface ListStockInterface {
  name: string;
  code: string;
  uom: string;
}
const StockUpdate: React.FC = () => {
  const router = useRouter();
  const [listStock, setListStock] = useState<ListStockInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetStock();
  }, []);

  const handleGetStock = async () => {
    await fetch("/api/stock/update").then(async (res) => {
      const data = await res.json();
      setLoading(false);
      setListStock(data);
    });
  };

  const handleDeleteAllStock = async () => {
    await fetch("/api/stock/update", {
      method: "DELETE",
    }).then(async () => {
      setListStock([]);
    });
  };

  const handleChangeFile = async (file: File | null) => {
    if (!file) return;

    try {
      const body = new FormData();
      body.append("file", file);

      await fetch("/api/stock/update", {
        method: "POST",
        body,
      }).then(async () => {
        handleGetStock();
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  const goBack = () => {
    router.push("/");
  };

  const openTemplate = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1wbkvUy404C13WSvAlSR2HMaRm3i-D86amSBmA3eMyFs/edit?usp=drive_link",
      "_blank"
    );
  };

  return (
    <DefaultWrapper
      title="UPDATE STOCK DATA"
      leftIcon={
        <IconButton onClick={goBack}>
          <KeyboardBackspace sx={{ color: "white" }} />
        </IconButton>
      }
    >
      <Stack mt={2} spacing={2}>
        <MuiFileInput
          label="tambahkan daftar stock terbaru sesuai template"
          onChange={handleChangeFile}
          inputProps={{
            accept: ".xlsx, .xls, .csv",
          }}
        />

        <Button onClick={openTemplate}>Lihat Template</Button>
        <Button onClick={handleDeleteAllStock}>Hapus Semua Data Stock</Button>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box>
          <List dense>
            <ListItem key="header">
              <ListItemText>Nama</ListItemText>
              <Typography variant="subtitle2" mr={5}>
                Code
              </Typography>
              <Typography variant="subtitle2">Uom </Typography>
            </ListItem>
            <Divider />
            {listStock.map((stock) => {
              return (
                <>
                  <ListItem
                    key={stock?.name}
                    secondaryAction={
                      <Delete color="action" sx={{ fontSize: 17 }} />
                    }
                  >
                    <ListItemIcon>
                      <Edit sx={{ fontSize: 17 }} />
                    </ListItemIcon>
                    <ListItemText>{stock?.name}</ListItemText>
                    <Typography variant="subtitle2" mr={5}>
                      {stock?.code}
                    </Typography>
                    <Typography variant="subtitle2">{stock?.uom}</Typography>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
      </Stack>
    </DefaultWrapper>
  );
};

export default StockUpdate;
