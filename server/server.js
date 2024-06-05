const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs'); // Mengimpor modul fs untuk membaca file

app.use(cors()); // Mengizinkan permintaan dari semua domain

app.get('/json/profit.json', (req, res) => {
  // Membaca file profit.json
  fs.readFile('json/profit.json', 'utf8', (err, data) => {
    if (err) {
      // Jika terjadi kesalahan dalam membaca file
      res.status(500).json({ error: 'Gagal membaca file' });
    } else {
      // Mengirimkan data JSON sebagai respons
      res.json(JSON.parse(data));
    }
  });
});

app.listen(3000, () => {
  console.log('Server berjalan pada http://localhost:3000');
});
