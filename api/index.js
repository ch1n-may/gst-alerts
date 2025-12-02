const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Hardcoded deadlines
const deadlines = {
  factory: ["Dec 20: GSTR-3B ₹50k fine", "Jan 15: TDS Q3"],
  retail: ["Dec 20: GSTR-3B ₹25k fine", "Jan 31: ITR-4"]
};

// API route for signup
app.post('/signup', (req, res) => {
  const { email, business } = req.body;
  console.log(`🚀 New user: ${email} (${business})`);
  res.json({
    message: "Alerts activated! Check WhatsApp tomorrow.",
    deadlines: deadlines[business.toLowerCase()] || []
  });
});

// Frontend HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>GST Alerts</title>
      <style>
        body { max-width: 400px; margin: 50px auto; padding: 20px; font-family: Arial; }
        input, select, button { width: 100%; padding: 10px; margin: 8px 0; }
        button { background: #ff6b35; color: white; border: none; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>🚨 Avoid ₹50k GST Fines</h1>
      <input id="email" type="email" placeholder="owner@factory.com">
      <select id="business">
        <option value="factory">Factory</option>
        <option value="retail">Retail</option>
      </select>
      <button onclick="signup()">Start Free Alerts</button>
      <script>
        async function signup() {
          const email = document.getElementById('email').value;
          const business = document.getElementById('business').value;
          try {
            const res = await fetch('/signup', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ email, business })
            });
            const data = await res.json();
            alert('✅ ' + data.message);
          } catch (e) {
            alert('❌ Error: ' + e.message);
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Vercel export
module.exports = app;
