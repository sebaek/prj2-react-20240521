import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Navbar />
      <Box
        mx={{
          base: 0,
          lg: 200,
        }}
        mt={20}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
