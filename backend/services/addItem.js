const { db } = require('../firebase.js');

const collection = db.collection('search-docs')

async function addItemToDB(item) {
    const docRef = collection.doc(item.id);
    await docRef.set(item);
}

module.exports = {
    addItemToDB,
}