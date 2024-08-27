import express, { request, response } from 'express';
import Review from '../models/reviewModel.js'

const router = express.Router();


//Route for delete a review
router.delete('/:id',async(request,response)=>{
    try {
        const {id}=request.params;
        const result=await Review.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Review not found'});
        }
        return response.status(200).send({message:'Book deleted successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

//Route to update a review
router.put('/:id',async(request,response)=>{
    try {
        if(!request.body.comment){
            return response.status(400).send({
                message:'Comment section is empty'
            })
        }
        const {id}=request.params;
        const result=await Review.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:'Review not found'})
        }else{
            return response.status(200).send({message:'Book updated successfully'})

        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }

})

//Route to get reviews for one service from the database by id
router.get('/service/:id',async(request,response)=>{
    try {
        const {id}=request.params;
        const reviews=await Review.find({'serviceID':id}).populate('userID','firstName lastName profilePhoto');
        return response.status(200).json({
            count:reviews.length,
            data:reviews
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})
//Route to get all the reviews by userID
router.get('/myReviews/:userID',async(req,res)=>{
    try {
        const {userID}=req.params;
        const reviews=await Review.find({userID}).populate('serviceID','title');
        return res.status(200).send({
            count:reviews.length,
            data:reviews
        })
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send({essage:error.message})
    }
})


//Route for save a new review
router.post('/',async(request,response)=>{
    try {
        if(
            !request.body.comment
        ){
            return response.status(400).send({
                message:'Comment is empty'
            });
        }
        const newReview={
            serviceID:request.body.serviceID,
            userID:request.body.userID,
            rating:request.body.rating,
            comment:request.body.comment,
        }
        const review=await Review.create(newReview);
        return response.status(201).send(review);
    } catch (error) {
        console.log(error.message);
    }
})




export default router;