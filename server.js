'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(cors());

// app.get('/', (req,res) => res.send('Testing 1, 2, 3'));
app.get('/api/v1/books', (req,res) => {
  client.query(`SELECT book_id, title, author, image_url FROM books;`)
    .then(result => res.send(result.rows));
});

app.get('api/v1/books/:id', (req,res) => {
  client.query(`SELECT * FROM books WHERE book_id=${req.params.id};`)
   .then(results => res.send(results.rows))
   .catch(console.error);
})

app.post('/api/v1/books', (req,res) => {
  client.query(
    'INSERT INTO books(title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;',
    [
    request.body.title, 
    request.body.author,
    request.body.isbn,
    request.body.image_url,
    request.body.description
    ],
    function(err) {
      if(err) console.err(err)
    }
  )
});

app.listen(PORT, () => console.log(`Listening on port:  ${PORT}`));