"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";

import DefaultWrapper from "@/components/DefaultWrapper";

const Home: React.FC = () => {
  const router = useRouter();

  const goStockIn = () => {
    router.push("/stock/in");
  };

  const goStockUpdate = () => {
    router.push("/stock/update");
  };

  return (
    <DefaultWrapper>
      <Stack spacing={1}>
        <Button onClick={goStockUpdate}>Update Stock Data</Button>
        <Button onClick={goStockIn}>Input Stock In</Button>
      </Stack>
    </DefaultWrapper>
  );
};

export default Home;
