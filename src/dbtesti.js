const bodyparser = require('body-parser')
const fs = require('fs');
const express = require('express')  //Jos ei toimi, niin "npm install express"
const cors = require('cors');
const { Pool } = require('pg');
const app = express()
const port = 8080



const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

app.use(cors())  //jos ei toimi, niin "npm install cors"
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const sqlLause = 'INSERT INTO T_tentti(nimi, kuvaus) VALUES($1, $2)'
const arvot = ['eka tentti', 'ekan tentin kuvaus']


try {
  const res = await pool.query(sqlLause, arvot)
  console.log(res.rows[0])
  // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
} catch (err) {
  console.log(err.stack)
}