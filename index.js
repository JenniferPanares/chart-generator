const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "code" directory
app.use(express.static(path.join(__dirname, 'code')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'code', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});