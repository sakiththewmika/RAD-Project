import express from 'express';
import Category from '../models/categoryModel.js';

const router = express.Router();

//route to save a new category
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newCategory = {
            name: req.body.name,
        };
        const createdCategory = await Category.create(newCategory);
        return res.status(201).send(createdCategory);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all category
router.get('/', async (req, res) => {
    try {
        const Categories = await Category.find();
        return res.status(200).send({
            count : Categories.length,
            data : Categories
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a category by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        if(category) {
            return res.status(200).send(category);
        }
        return res.status(404).send({message: 'Category not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a category by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.name 
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Category.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Category not found'});
        }
        return res.status(200).send({message: 'Category updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a category by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Category.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Category not found'});
        } 
        return res.status(200).send({message: 'Category deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;