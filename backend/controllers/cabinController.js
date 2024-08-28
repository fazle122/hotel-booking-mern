import asyncHandler from "../middleware/asyncHandler.js";
import Cabin from "../models/cabinModel.js";
import {ErrorHandler} from "../utils/errorHandlers.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import ApiFilters from "../utils/apiFilters.js";
import Booking from "../models/bookingModel.js";



// const getAllCabins = asyncHandler(async(req,res) =>{
//     console.log('all cabins');

//     const cabins = await Cabin.find();

//     if(cabins){
//         res.status(200).json({
//             cabins,length:cabins.length
//         })
//     }else{
//         new ErrorHandler('Cabins not found',404)
//     }
// })


const getAllCabins = asyncHandler(async(req,res) =>{
    console.log('all cabins');
    console.log('req.query',req.query);


    const pageSize = 8;
    const page = Number(req.query.pageNo || 1);

    const apiFIlters = new ApiFilters(Cabin,req.query,req.user,false).search().filter().sort();
    let cabins = await apiFIlters.query;
    let count = cabins.length;

    if(cabins){
        apiFIlters.pagination(pageSize);
        cabins = await apiFIlters.query.clone();
        res.json({cabins: cabins,count,page,pages:Math.ceil(count/pageSize)});
    }
    else{
        new ErrorHandler('Cabin data not found',404)
    }
})

///// ============ ** Importent ** ============ ////
// const getAvailableCabins = asyncHandler(async(req,res) =>{
//   console.log('all cabins');


//   const pageSize = 4;
//   const page = Number(req.query.pageNo || 1);
//   let bookings = []
//   let filteredCabin = [];

//   if(req.query.startDate || req.query.endDate){
//     // console.log('req.query1',req.query);
//     console.log('sData',req.query.startDate);
//     console.log('eData',req.query.endDate);
//     bookings =  await Booking.find({$and: [{ startDate: req.query.startDate },{ endDate: req.query.endDate}]}).select('cabin')
//     delete req.query.startDate;
//     delete req.query.endDate;
//   }
//   // console.log('booking count',bookings);
//   // console.log('req.query2',req.query);



//   const apiFIlters = new ApiFilters(Cabin,req.query,req.user,false).search().filter().sort();
//   let tempCabin = await apiFIlters.query;
//   const tempCount = tempCabin.length;


//   filteredCabin = tempCabin.filter(function(cabin) {
//     return !bookings.find(function(booking) {
//       return cabin._id.toString() === booking.cabin.toString()
//     })
//   })
//   const filteredCount = filteredCabin.length;
  


  
//   if(tempCabin.length === filteredCabin.length){
//     apiFIlters.pagination(pageSize);
//     tempCabin = await apiFIlters.query.clone();
//     res.json({cabins: tempCabin,count:tempCount,page,pages:Math.ceil(tempCount/pageSize)});
    
//   }else{
//     const currentPage = Number(req.query.pageNo) || 1;
//     const cabin = filteredCabin.slice(pageSize* (currentPage-1), pageSize * currentPage);
//     res.json({cabins:cabin,count:filteredCount,page,pages:Math.ceil(filteredCount/pageSize)});
//   }

// })


const getAvailableCabins = asyncHandler(async(req,res) =>{
  console.log('all cabins');


  const pageSize = 4;
  const page = Number(req.query.pageNo || 1);
  let bookings = []
  let filteredCabin = [];

  if(req.query.startDate || req.query.endDate){
    // console.log('req.query1',req.query);
    console.log('sData',req.query.startDate);
    console.log('eData',req.query.endDate);
    bookings =  await Booking.find({$and: [{ startDate: req.query.startDate },{ endDate: req.query.endDate}]}).select('cabin')
    delete req.query.startDate;
    delete req.query.endDate;
    // }
    // console.log('booking count',bookings);
    // console.log('req.query2',req.query);



    const apiFIlters = new ApiFilters(Cabin,req.query,req.user,false).search().filter().sort();
    let tempCabin = await apiFIlters.query;
    const tempCount = tempCabin.length;


    filteredCabin = tempCabin.filter(function(cabin) {
      return !bookings.find(function(booking) {
        return cabin._id.toString() === booking.cabin.toString()
      })
    })
    const filteredCount = filteredCabin.length;
    


    
    if(tempCabin.length === filteredCabin.length){
      apiFIlters.pagination(pageSize);
      tempCabin = await apiFIlters.query.clone();
      res.json({cabins: tempCabin,count:tempCount,page,pages:Math.ceil(tempCount/pageSize)});
      
    }else{
      const currentPage = Number(req.query.pageNo) || 1;
      const cabin = filteredCabin.slice(pageSize* (currentPage-1), pageSize * currentPage);
      res.json({cabins:cabin,count:filteredCount,page,pages:Math.ceil(filteredCount/pageSize)});
    }
  }else{
    const cabins = await Cabin.find({}).sort({bookingCount:-1}).limit(4);
    res.json({cabins: cabins,count:4,page,pages:Math.ceil(4/pageSize)});
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



const uploadCabinImages = asyncHandler(async (req, res) => {

    console.log('uploading cabin images..')
    console.log(req.body);
   
    let cabin = await Cabin.findById(req?.params?.id);
  
    if (!cabin) {
      return next(new ErrorHandler("cabin not found", 404));
    }
  
    try{
      const uploader = async (image) => upload_file(image, "hotel-management/cabins");
  
      const urls = await Promise.all((req?.body?.images).map(uploader));
      console.log(urls);
  
      urls.map((imgUrl) => {
        cabin?.images?.push({imageId:imgUrl.public_id,url:imgUrl.url});
      })
      // cabin?.images?.push(...urls);
      await cabin?.save();
  
      res.status(200).json({
        cabin: cabin,
      });
  
    }catch(err){
      res.status(404);
      throw new Error(err);
    }
  });



  const deleteCabinImage = asyncHandler(async (req, res) => {

    console.log('delete cabin image..')
    console.log(req?.params?.id);
  
    let cabin = await Cabin.findById(req?.params?.id);
  
    if (!cabin) {
      return next(new ErrorHandler("cabin not found", 404));
    }

    console.log(req.body.imgId);
  
    const isDeleted = await delete_file(req.body.imgId);
  
    if (isDeleted) {
      cabin.images = cabin?.images?.filter(
        (img) => img.imageId !== req.body.imgId
      );
  
      await cabin?.save();
    }
  
    res.status(200).json({
      cabin: cabin,
    });
  });





const deleteCabin = asyncHandler(async(req,res,next) =>{
    console.log('deleting cabin');

    const cabin = await Cabin.findById(req.params.id);
    if(cabin){
    console.log('deleting1 cabin');

        try{
            const deleteResponse = await Cabin.deleteOne({_id:cabin._id});

            for(let i=0; i<cabin.images.length; i++){
                await delete_file(cabin.images[i].id);
            }

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



export {getAllCabins,getAvailableCabins,getCabinData,createCabin,editCabin,uploadCabinImages,deleteCabinImage,deleteCabin};