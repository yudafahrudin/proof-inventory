"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

import DefaultWrapper from "@/components/DefaultWrapper";

const Home: React.FC = () => {
  const router = useRouter();

  const goStockIn = () => {
    router.push("/stock-in");
  };

  return (
    <DefaultWrapper>
      <Button onClick={goStockIn}>Update Stock Data</Button>
      <Button onClick={goStockIn}>Input Stock In</Button>
    </DefaultWrapper>
  );
};

export default Home;
