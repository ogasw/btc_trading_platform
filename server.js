const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fetch BTC Price from CoinGecko
app.get('/api/btc-price', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Bitcoin price' });
  }
});

// Basic trading action (buy/sell simulation)
app.post('/api/trade', (req, res) => {
  const { type, amount } = req.body;
  if (!type || !amount) {
    return res.status(400).json({ error: 'Invalid trade request' });
  }

  const message = `You have successfully ${type} ${amount} BTC.`;
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
                          
