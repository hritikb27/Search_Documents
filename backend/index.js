const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const { addItemToDB } = require('./services/addItem.js');
const { getItemsFromDB } = require('./services/getItems.js');
const { setRedis, getRedis, delRedis } = require('./utils/redis.js');

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
    const { item } = req.body;
    const result = await addItemToDB(item);
    // delete redis key to update the cache on next search
    await delRedis('items');
    res.json(result);
});

app.get('/search', async (req, res) => {
    const query = req.query.query;
    const redisCache = await getRedis('items');
    
    // if redisCache exists, filter it and return it
    if (redisCache){
        // filter items by query
        const items = JSON.parse(redisCache).filter(item => item.name.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
        res.json(items);
    }
    // else, get items from DB, cache them, filter them, and return them
    else {
        let items = await getItemsFromDB();
        await setRedis('items', JSON.stringify(items));
        // filter items by query
        items = items.filter(item => item.name.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
        res.json(items);
    }
})

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});