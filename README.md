# 📈 Crypto Movers Notification Automation

This automation script monitors the cryptocurrency market using the [CoinMarketCap API](https://coinmarketcap.com/api/). It identifies the top cryptocurrencies with significant price changes or high trading volume and sends email notifications with the details. The script is written in **Node.js** and runs periodically based on a schedule.

---

## 🚀 Features

- Fetches data for the top 100 cryptocurrencies from CoinMarketCap.
- Filters cryptocurrencies based on:
  - **Price change percentage** in the last 24 hours.
  - **Trading volume** in the last 24 hours.
- Sends email notifications with detailed information about the top movers.
- Runs automatically on a defined schedule.

---

## 📋 Requirements

- Node.js (v12 or higher)
- A valid [CoinMarketCap API Key](https://coinmarketcap.com/api/).
- A valid Gmail or SMTP email account for sending notifications.

---

## 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/crypto-movers-notifier.git
   cd crypto-movers-notifier
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Open the script file (`crypto_monitoring.js`).
   - Replace the following placeholders with your credentials:
     - `your_coinmarketcap_api_key`: Your CoinMarketCap API key.
     - `your_email@example.com`: Your email address.
     - `your_email_password`: Your email password or app-specific password.
     - `receiver_email@example.com`: Recipient email address.

4. **Run the script**:
   ```bash
   node crypto_monitoring.js
   ```

---

## ⚙️ Configuration

### Thresholds

You can customize the thresholds for filtering top movers in the script:

- **Minimum Price Change**:
  - Modify `MIN_PRICE_CHANGE_PERCENT` (default: `10`).
- **Minimum Volume Change**:
  - Modify `MIN_VOLUME_CHANGE` (default: `1,000,000` USD).

### Schedule

The script is scheduled to run every hour by default. You can adjust the frequency by modifying this line in the script:

```javascript
schedule.scheduleJob("0 * * * *", () => {
```

Examples:

- Every 30 minutes: `"*/30 * * * *"`
- Every day at 9 AM: `"0 9 * * *"`

---

## 📧 Email Notifications

The script uses **nodemailer** to send email notifications. It is pre-configured for Gmail but can be customized for other SMTP providers.

### Gmail Configuration:

- Ensure you enable **"Allow less secure apps"** in your Google account settings (or create an **App Password** for increased security).

### Email Content:

Each email includes the following details for significant movers:

- **Name and Symbol** (e.g., Bitcoin - BTC)
- **Current Price**
- **24h Price Change (%)**
- **24h Trading Volume**

---

## 📝 Example Email Notification

**Subject**: 📈 Crypto Movers Alert!

**Body**:

```
🚀 Bitcoin (BTC)
💰 Price: $30,000.00
📊 24h Change: +12.34%
🔄 Volume: $5,000,000,000

🚀 Ethereum (ETH)
💰 Price: $2,000.00
📊 24h Change: +15.78%
🔄 Volume: $3,200,000,000
```

---

## 🛡️ Security

- Keep your **CoinMarketCap API Key** and email credentials secure.
- For Gmail, use an **App Password** instead of your main password.

---

## 🐛 Troubleshooting

- **Error: "Invalid API Key"**:
  - Ensure your CoinMarketCap API Key is correct.
- **Emails not sending**:
  - Check your email credentials and SMTP configuration.
  - Ensure your email account allows third-party access.
- **No movers detected**:
  - Adjust the thresholds (`MIN_PRICE_CHANGE_PERCENT` and `MIN_VOLUME_CHANGE`).

---

## 📌 Future Enhancements

- Add support for Slack or Telegram notifications.
- Store and compare historical data for advanced analysis.
- Add the ability to track specific cryptocurrencies.

---

## 🖊️ License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
