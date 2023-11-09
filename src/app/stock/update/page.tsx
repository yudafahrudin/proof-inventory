"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace, Edit } from "@mui/icons-material";
import {
  IconButton,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import DefaultWrapper from "@/components/DefaultWrapper";

const StockUpdate: React.FC = () => {
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

  const handleChangeOne = async (file: File | null) => {
    if (!file) return;

    try {
      const body = new FormData();
      body.append("file", file);

      await fetch("/api/v1/stock", {
        method: "POST",
        body,
      }).then(async () => {
        setListStock([]);
        handleGetStock();
      });
    } catch (e: any) {
      console.error(e);
    }
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
        <FormLabel>
          <MuiFileInput
            label="tambahkan list stock terbaru"
            onChange={handleChangeOne}
          />
        </FormLabel>
        <Box>
          <List dense>
            {listStock.map((stock) => {
              return (
                <>
                  {" "}
                  <ListItem key={stock[0]}>
                    <ListItemIcon>
                      <Edit sx={{ fontSize: 17 }} />
                    </ListItemIcon>
                    <ListItemText>{stock[0]}</ListItemText>
                    <Typography variant="subtitle2">{stock[1]}</Typography>
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
