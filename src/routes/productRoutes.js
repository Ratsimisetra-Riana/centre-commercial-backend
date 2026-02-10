const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Créer un produit
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
    res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        .populate('categoryId')   // <-- populate the category
        .populate('shopId');  ;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        .populate('categoryId')   // <-- populate the category
        .populate('shopId');  ;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un produit
router.put('/:id', async (req, res) => {
    try {
        const produit = await Product.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un produit
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "produit supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/bulk", async (req, res) => {
  try {
    const categories = await Product.insertMany(req.body);
    res.status(201).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;