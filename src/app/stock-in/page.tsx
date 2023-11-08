"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { KeyboardBackspace } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DefaultWrapper from "@/components/DefaultWrapper";

const StockIn: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };
  return (
    <DefaultWrapper
      leftIcon={
        <IconButton onClick={goBack}>
          <KeyboardBackspace sx={{ color: "white" }} />
        </IconButton>
      }
    >
      Blank Page!
    </DefaultWrapper>
  );
};

export default StockIn;
