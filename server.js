'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = required('fs');
const bodyParser = require('body-parser');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

// const CLIENT_URL = process.env.CLIENT_URL;
// client.connect();
// client.on('error', err => console.error(err));

app.use(express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/login'), (request, response) =>
response.sendFile('/login.html'), {root: '/public'}));
app.get('/routine'), (request, response) =>
response.sendFile('/routine.html'), {root: '/public'}));
app.get('/search'), (request, response) =>
response.sendFile('/search.html'), {root: '/public'}));

app.get('/api/v1/users/:user_id', (request, response) => {
  client.query(
    `SELECT * FROM users INNER JOIN workout_routine ON user.user_id=routine_id WHERE user_id=${request.params.user_id};`
    )
  .then(result => response.send(result.rows))
  .catch(console.error);
}

app.post('/api/v1/users', bodyParser, (request, response) => {
  client.query(
    `INSERT INTO users(username, password) VALUES($1, $2)`,
    [request.body.username, request.body.password]
  )
  .then(() => res.sendStatus(201))
  .catch(console.error);
});

app.post('/api/v1/workout_routine', bodyParser, (request, response) => {
  let {routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2} = request.body;
  client.query(
    `INSERT INTO workout_routine(routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
    [routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2]
  )
  .then(() => response.sendStatus(201))
  .catch(console.error);
});

app.put('/api/v1/users/:user_id', (request, response) => {
  let {routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2} = request.body;
  client.query(
    `UPDATE workout_routine SET(routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
    [routine_id, monday1, monday2, tuesday1, tuesday2, wednesday1, wednesday2, thursday1, thursday2, friday1, friday2, saturday1, saturday2, sunday1, sunday2]
  )
  .then(() => response.send('Update Complete'))
  .catch(console.error);
});

app.delete('/api/v1/users/:user_id', (request, response) => {
  client.query(
    `DELETE FROM users INNER JOIN workout_routine WHERE user_id=$1;`,
    [request.params.id]
  )
  .then(() => response.send('Deleted'))
  .catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// export PORT=3000
// export CLIENT_URL=http://localhost:8080
// export DATABASE_URL=postgres://localhost:5432/books_app
// export DATABASE_URL=postgres://postgres:plokij09@localhost:5432/books_app
