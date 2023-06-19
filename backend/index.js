const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const { addItemToDB } = require('./services/addItem.js');
const { getItemsFromDB } = require('./services/getItems.js');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,POST, PUT',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server Alive!');
});

app.post('/addItem', async (req, res) => {
    const { id, name, content } = req.body;
    console.log('item: ', id, name, content);
    await addItemToDB({ id, name, content });
});

app.get('/search', async (req, res) => {
    const items = await getItemsFromDB();
})

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});