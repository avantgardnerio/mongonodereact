const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.js');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/users', async (req, res) => {
    const users = await db.get('users').find({});
    res.json(users);
});

app.post('/api/users', async (req, res) => {
    const user = req.body;
    const result = await db.get('users').insert(user);
    res.json(result);
});

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = {
    app,
    close: () => server.close()
};