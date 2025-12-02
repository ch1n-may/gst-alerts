const express = require('express');
const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML file
app.use(express.static('public'));

// Signup endpoint - LOGS USER DATA
app.post('/signup', (req, res) => {
  const { email, business_type } = req.body;
  
  // THIS IS THE MONEY LINE - Logs every signup
  console.log(`🚀 New user: ${email} (${business_type})`);
  
  res.json({ success: true, message: 'Signup logged!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});