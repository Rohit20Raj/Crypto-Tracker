import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { CryptoState } from "../../CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const {currency, setcurrency} = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme} >
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" onClick={() => navigate("/")} style={{
                  flex: 1,
                  color: "gold",
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                  fontWeight: "bold"
                  }}>
                Crypto-Tracker
                <Select
                  defaultValue={"INR"}
                  variant="outlined"
                  style={{
                    width: 100,
                    height: 40,
                    marginRight: 15,
                    float: "right"
                  }}
                  value={currency}
                  onChange={(e)=>setcurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
