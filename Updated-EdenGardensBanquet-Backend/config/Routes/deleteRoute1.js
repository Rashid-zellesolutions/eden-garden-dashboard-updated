const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Route to delete all documents in a specific collection
router.delete('/delete-collection', async (req, res) => {
  const { collectionName } = req.body;

  if (!collectionName) {
    return res.status(400).send({ message: 'Collection name is required' });
  }

  try {
    const collection = mongoose.connection.collection(collectionName);
    await collection.deleteMany({});
    res.status(200).send({ message: `All documents in ${collectionName} have been deleted` });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred', error });
  }
});

module.exports = router;
