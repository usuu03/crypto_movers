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

// Filter the top movers
function filterTopMovers(data) {
  return data.filter((coin) => {
    const priceChange24h = coin.quote.GBP.percent_change_24 || 0;
    const volume24h = coin.quote.GBP.volume_24h || 0;

    return (
      priceChange24h > MIN_PRICE_CHANGE_PERCENT || volume24h > MIN_VOLUME_CHANGE
    );
  });
}

// Send Email Notification
async function sendMail(movers) {
  if (movers.length === 0) {
    console.log("No significant movers to notify.");
    return;
  }

  const emailContent = movers
    .map((mover) => {
      return `
      🚀 <b>${mover.name} (${mover.symbol})</b><br>
      💰 Price: $${mover.quote.GBP.price.toFixed(2)}<br>
      📊 24h Change: ${mover.quote.GBP.percent_change_24h.toFixed(2)}%<br>
      🔄 Volume: $${mover.quote.GBP.volume_24h.toLocaleString()}<br>
      <hr>
    `;
    })
    .join("");

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "📈 Crypto Movers Alert!",
    html: `<p>Here are the top cryptocurrencies moving today:</p>${emailContent}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending mail:", error.message);
  }
}

// Main job
async function job() {
  console.log("Fetching cryptocurrency data...");
  const data = await fetchCryptoData();

  console.log("Filtering top movers...");
  const movers = filterTopMovers(data);

  console.log("Sending email notification...");
  await sendMail(movers);
}

// Schedule the job (e.g., run every hour)
schedule.scheduleJob("*/1 * * * *", () => {
  console.log("Crypto monitoring job started...");
  job();
});

console.log("Crypto monitoring automation started...");
