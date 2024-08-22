import asyncHandler from "../middleware/asyncHandler.js";
import Cabin from "../models/cabinModel.js";
import ErrorHandler from "../utils/errorHandlers.js";




const getAllCabins = asyncHandler(async(req,res) =>{
    console.log('all cabins');

    const cabins = await Cabin.find();

    if(cabins){
        res.status(200).json({
            cabins,length:cabins.length
        })
    }else{
        new ErrorHandler('Cabins not found',404)
    }
})

const getCabinData = asyncHandler(async(req,res) =>{
    console.log('get cabin');

    const cabin = await Cabin.findById(req.params.id);

    if(cabin){
        res.status(200).json({message:'success',data:cabin})
    }else{
        // new ErrorHandler('cabin not found',404)
        res.status(404);
        throw new Error('Cabin not found');
    }
})




const createCabin = asyncHandler(async(req,res) =>{
    console.log('create cabin');
    console.log('cabin data',req.body);

    const newCabin = await Cabin.create(req.body);
    if(newCabin){
        res.status(201).json(newCabin);
    }else{
        new ErrorHandler('Cabin cannot be created',404)
    }
})

const editCabin = asyncHandler(async(req,res) => {
    console.log('edit cabin');

    const {name,description,capacity,regularPrice,discount} = req.body;
    const cabin = await Cabin.findById(req.params.id);
    if(cabin){
        try{
            if(cabin){
                cabin.name = name;
                cabin.description = description;
                cabin.capacity = capacity;
                cabin.regularPrice = regularPrice;
                cabin.discount = discount;
            }
            const editResponse = await cabin.save()
            res.status(200).json({message:'Cabin updated',cabin:editResponse})
        }catch(err){
            console.log(err);
            res.status(404).json({message:err});
        }
    }else{
        res.status(404).json({message:'cabin data not found'});
  
    }

})

const deleteCabin = asyncHandler(async(req,res,next) =>{
    console.log('deleting cabin');

    const cabin = await Cabin.findById(req.params.id);
    if(cabin){
    console.log('deleting1 cabin');

        try{
            const deleteResponse = await Cabin.deleteOne({_id:cabin._id});
            res.status(200).json({message:'Cabin deleted'})
        }catch(err){
            // res.status(404);
            // throw new Error(err);
            res.status(404).json({message:'cabin data can not be deleted'});
        }
    }else{
        res.status(404).json({message:'cabin data not found'});
        // return next(new ErrorHandler("Cabin data not found", 404)); 
    }
   

})



export {getAllCabins,getCabinData,createCabin,editCabin,deleteCabin};