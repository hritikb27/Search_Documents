const { db } = require('../firebase.js');

const collection = db.collection('search-docs')

async function getItemsFromDB() {
    const docRef = await collection.get();
    return docRef.docs.map(doc => doc.data());
}

module.exports = {
    getItemsFromDB,
}