import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import bgImage from "../assets/proof-bg.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proof Inventory",
  description: "simple inventory for café",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body
        // style={{
        //   backgroundImage: `url(${bgImage.src})`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        // }}
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
