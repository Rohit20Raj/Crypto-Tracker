import axios from "axios";
import React, { useEffect, useState } from "react";
import CoinInfo from "./CoinInfo";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "./Banner/Carousel";
import "../styles/Coinpage.css";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div
      className="container"
    >
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          className="subtitle"
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
          <div className="market-data">
            <span>
              <Typography variant="h6">
                <b>Rank: &nbsp;</b>
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span>
              <Typography variant="h6">
                <b>Current Price: &nbsp;</b>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span>
              <Typography variant="h6">
              <b>Market Cap: &nbsp;</b>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </Typography>
            </span>
          </div>
        </Typography>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  );
};

export default Coinpage;
