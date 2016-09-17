import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import * as jwt from 'jsonwebtoken';

import {
  users,
  addUser
} from './db';
// import cors from 'cors';

const app = express();
const port = 3000;
const statuses = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_AUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409
}
const secret = 'jwt example';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressJwt({ secret }).unless({
  path: [
    '/',
    '/login'
  ]
}));

// app.use(cors());

const authNotFound = (subject, req, res) => {

  const target = (req.body || {})[subject];

  if (target) {
    return false;
  }

  res.status(statuses.NOT_AUTHORIZED)
     .json({error: `${subject} was not found in the requiest`});
  return true;
}

app.post('/login', (req, res) => {

  if (authNotFound('username', req, res)
      || authNotFound('password', req, res)) {

    return;
  }

  const body = req.body;
  const username = body['username'];
  const password = body['password'];
  const token = jwt.sign({ username, password }, secret);

  res.status(statuses.CREATED)
     .json({ token });
});

app.post('/api/users', (req, res) => {

  const username = (req.body || {})['username'];

  if (!username) {
    res.status(statuses.CONFLICT)
       .json({error: 'invalid request: username was not found in the requiest'});
    return;
  }

  const size = users.length;
  const user = addUser(username);

  res.status(users.length === size ? statuses.NO_CONTENT : statuses.CREATED)
     .json(user);
});

app.get('/users/:id', (req, res) => {

  const id = (req.params || {})['id'] || 0

  if (0 <= id && id > users.length) {
    res.status(statuses.NOT_FOUND)
       .send({error: 'not found'});
    return;
  }

  res.status(statuses.OK)
     .json(users.filter(u => u.id == id));
});

app.all('*', (req, res) => res.status(statuses.OK).json(users));

app.listen(port, () => console.log(`express running on ${port}...`));
