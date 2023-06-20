const { createClient } = require('redis');

const client = createClient();
client.connect();
client.on('error', err => console.log('Redis Client Error', err));

async function setRedis(key, value) {
    await client.set(key, value);
    return true;
}

async function getRedis(key) {
    let value = await client.get(key);
    if(value) return value;
    else return false;
}

async function delRedis(key) {
    await client.del(key);
    console.log('Redis key deleted: ', key);
    return true;
}

module.exports = {
    setRedis,
    getRedis,
    delRedis,
}