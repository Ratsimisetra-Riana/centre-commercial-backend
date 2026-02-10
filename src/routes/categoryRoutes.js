const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Créer un category
router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
    res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les categorys
router.get('/', async (req, res) => {
    try {
        const categorys = await Category.find();
        res.json(categorys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Category supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/bulk", async (req, res) => {
  try {
    const categories = await Category.insertMany(req.body);
    res.status(201).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;