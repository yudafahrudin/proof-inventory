"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace, NavigateNext } from "@mui/icons-material";
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
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

import DefaultWrapper from "@/components/DefaultWrapper";

import { STOCKS } from "../config";

const StockUpdate: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
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
          <MuiFileInput label="tambahkan list stock terbaru" />
        </FormLabel>
        <Box width={300}>
          <List dense>
            {STOCKS.map((stock) => {
              return (
                <ListItem key={stock.title}>
                  <ListItemIcon>
                    <NavigateNext />
                  </ListItemIcon>
                  <ListItemText>{stock.title}</ListItemText>
                  <Typography variant="subtitle2">{stock.uom}</Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Stack>
    </DefaultWrapper>
  );
};

export default StockUpdate;
