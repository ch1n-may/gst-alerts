const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const deadlines = {
  "factory": ["Dec 20: GSTR-3B ₹50k fine", "Jan 15: TDS Q3"],
  "retail": ["Dec 20: GSTR-3B ₹25k fine", "Jan 31: ITR-4"]
};

app.post('/signup', (req, res) => {
  const { email, business } = req.body;
  console.log(`🚀 New user: ${email} (${business})`);
  res.json({ message: "Alerts activated! Check WhatsApp tomorrow." });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>GST Alerts</title><style>body{max-width:400px;margin:50px auto;padding:20px;border:1px solid #ddd;}</style></head>
    <body>
      <h1>🚨 Avoid ₹50k GST Fines</h1>
      <input id="email" placeholder="owner@factory.com" type="email" style="width:100%;padding:10px;margin:10px 0;">
      <select id="business" style="width:100%;padding:10px;margin:10px 0;">
        <option>Factory</option>
        <option>Retail</option>
      </select>
      <button onclick="signup()" style="width:100%;padding:12px;background:#ff6b35;color:white;border:none;cursor:pointer;">Start Free Alerts</button>
      <script>
        async function signup() {
          const email = document.getElementById('email').value;
          const business = document.getElementById('business').value;
          try {
            const response = await fetch('/signup', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({email, business})
            });
            const data = await response.json();
            alert('✅ ' + data.message);
          } catch(e) { alert('Error: ' + e.message); }
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = app;
