import express from 'express';
import Category from '../models/categoryModel.js';
import Service from '../models/serviceModel.js';
import { authentication, authorization } from '../middleware/auth.js';

const router = express.Router();

//route to save a new category
router.post('/', authentication, authorization(['admin']), async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const newCategory = { name: req.body.name };
        const createdCategory = await Category.create(newCategory);
        return res.status(201).send(createdCategory);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get all categories
router.get('/', async (req, res) => {
    try {
        const Categories = await Category.find();
        return res.status(200).send({
            count: Categories.length,
            data: Categories
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to get a category by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (category) {
            return res.status(200).send(category);
        }
        return res.status(404).send({ message: 'Category not found' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to update a category by id
router.put('/:id', authentication, authorization(['admin']), async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name: req.body.name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }

        //update the category name in the service collection
        await Service.updateMany(
            { 'category._id': id },
            { $set: { 'category.name': req.body.name } }
        );

        return res.status(200).send({ message: 'Category updated successfully', data: updatedCategory });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route to delete a category by id
router.delete('/:id', authentication, authorization(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }

        //remove the category reference from services
        await Service.updateMany(
            { 'category._id': id },
            { $unset: { category: '' } }
        );

        return res.status(200).send({ message: 'Category deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;