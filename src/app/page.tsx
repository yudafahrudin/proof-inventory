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

  const goStockInReport = () => {
    router.push("/stock/report");
  };

  return (
    <DefaultWrapper>
      <Stack spacing={1}>
        <Button variant="outlined" onClick={goStockUpdate}>
          Stock
        </Button>
        {/* <Button onClick={goStockIn}>Stock In</Button>
        <Button onClick={goStockInReport}>Stock In Report</Button> */}
      </Stack>
    </DefaultWrapper>
  );
};

export default Home;
