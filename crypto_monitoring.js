require("dotenv").config();
const CoinMarketCap = require("coinmarketcap-api");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

//Configuration
const CMC_API_KEY = process.env.COINMARKET_API_KEY;
const client = new CoinMarketCap(CMC_API_KEY);

// Filtering thresholds
const MIN_PRICE_CHANGE_PERCENT = 15;
const MIN_VOLUME_CHANGE = 1000000;

// Fetching cryptocurrency data
async function fetchCryptoData() {
  try {
    const response = await client.getTickers({ limit: 100, convert: "GBP" });
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap:", error.message);
    return [];
  }
}

fetchCryptoData();
