import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { CoinList } from "../config/api";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

function CoinsTable() {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(""); 
  const [page, setpage] = useState(1);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList(currency));
    setcoins(data);
    setloading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Cryptocurrency"
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(e) => setsearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page-1)*10, (page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                      style={{
                        backgroundColor: "#16171a",
                        cursor: "pointer",
                        "&:hover":{
                          backgroundColor: "#131111"
                        },
                        fontFamily: "Montserrat",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{marginBottom: 10}}
                        />
                        <div style={{display: 
                        "flex", flexDirection: "column"}}>
                          <span style={{textTransform: "uppercase", fontSize: 22}}>
                            {row.symbol}
                          </span>
                          <span style={{color: "darkgrey"}}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit>0 ? "rgb(14,203,129" : "red",
                          fontWeight: 500
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          count={(handleSearch()?.length/10).toFixed(0)}
          onChange={(_, value)=>{
            setpage(value);
            window.scroll(0,450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
