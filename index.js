// Importiamo le librerie necessarie
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Per caricare variabili d'ambiente dal file .env

const app = express();
const port = process.env.PORT || 3000;

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Usa middleware per gestire le richieste JSON
app.use(express.json());

// Rotta per ottenere le prenotazioni
app.get('/prenotazioni', async (req, res) => {
  const { data, error } = await supabase
    .from('prenotazioni')
    .select('*');
  
  if (error) {
    return res.status(500).send('Errore nel recupero delle prenotazioni');
  }
  res.json(data);
});

// Rotta per aggiungere una prenotazione
app.post('/prenotazioni', async (req, res) => {
  const { nome, data_spettacolo } = req.body;
  
  const { data, error } = await supabase
    .from('prenotazioni')
    .insert([{ nome, data_spettacolo }]);

  if (error) {
    return res.status(500).send('Errore nell\'aggiungere la prenotazione');
  }
  res.status(201).json(data);
});

// Rotta di base
app.get('/', (req, res) => {
  res.send('Benvenuto nel sistema di prenotazione spettacoli!');
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
