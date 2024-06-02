import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/theme";
import { CacheProvider } from "@emotion/react";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "./context";
import { companyManagerRoutes } from "./routes";

import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct.png";
import { Settings } from "@mui/icons-material";

export default function App() {
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();


  const routesToRender = companyManagerRoutes;

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });


  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <Routes>
        {getRoutes(routesToRender)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
