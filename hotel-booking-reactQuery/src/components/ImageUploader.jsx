/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteCabinImage, useUploadCabinImage } from "../features/cabin/useCabin";
import { useQuery } from "@tanstack/react-query";
import { fetchCabinDetail } from "../services/cabinService";



export default function ImageUploader({handleOpen,id}){

    const fileInputRef = useRef(null);
    // const navigate = useNavigate();
  
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
  
    const {mutate:uploadProductImages,isLoading,error,isSuccess} = useUploadCabinImage();
  
    const {mutate:deleteProductImage,isLoading: isDeleteLoading, error: deleteError,isSuccess:isDeletingSuccess} = useDeleteCabinImage();
  
    // const  {data} = useFetchCabinDetail();
    const  {data} = useQuery({
      queryKey:["cabins",id],
      queryFn:() => fetchCabinDetail(id)
    });
    // console.log(data?.data?.data?.images);
  
    useEffect(() => {
      if (data) {
        setUploadedImages(data?.data?.data?.images);
      }
  
      if (error) {
        toast.error(error?.data?.message);
      }
  
      if (deleteError) {
        toast.error(deleteError?.data?.message);
      }
  
      if (isSuccess) {
        handleOpen();
        setImagesPreview([]);
        // toast.success("Images Uploaded");
        // navigate("/cabins");
      }

      if (isDeletingSuccess) {
        handleOpen();
      }


    }, [data, error, isSuccess, deleteError, isDeletingSuccess,handleOpen]);
  
    const onChange = (e) => {
      const files = Array.from(e.target.files);
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((oldArray) => [...oldArray, reader.result]);
            setImages((oldArray) => [...oldArray, reader.result]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    const handleResetFileInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  
    const handleImagePreviewDelete = (image) => {
      const filteredImagesPreview = imagesPreview.filter((img) => img != image);
  
      setImages(filteredImagesPreview);
      setImagesPreview(filteredImagesPreview);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      console.log()
  
      uploadProductImages({ id, data: { images } });
    };
  
    const deleteImage = (imgId) => {
      console.log(imgId)
      deleteProductImage({ id, data: { imgId } });
      // setUploadedImages(data.product?.image.filter((item) => item.images.id === imgId));

    };





    console.log(isLoading);

    // if(isLoading) return <Loader />
    // if(productLoading) return <Loader />

    return (
       
      
          <div className="border rounded-md flx items-center justify-center">
            <div className="">
              <form  className="">
                <h2 className="mx-3 my-1 text-xl">Upload Product Images</h2>
                <div className="mx-3">

    
                  <div className="custom-file">
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="product_images"
                      className="border"
                      id="customFile"
                      multiple
                      onChange={onChange}
                      onClick={handleResetFileInput}
                    />
                  </div>
    
                  {imagesPreview?.length > 0 && (
                    <div className="my-4">
                      <p className="">New Images:</p>
                      <div className="flex space-x-2">
                        {imagesPreview?.map((img) => (
                          <div key={img} className="">
                            <div className="border w-36 rounded-md flex flex-col items-center justify-center">
                              <img
                                src={img}
                                alt="Card"
                                className=""
                                style={{ width: "100%", height: "80px" }}
                              />
                              <button 
                                type="button"
                                className="my-1 w-8 bg-red-400 text-white rounded-sm"
                                onClick={() => handleImagePreviewDelete(img)}
                              >
                                <p>x</p>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
    
                  {uploadedImages?.length > 0 && (
                    <div className="">
                      <p className="">Uploaded Images:</p>
                      <div className="flex space-x-2">
                        {uploadedImages?.map((img) => (
                          <div key={img?.imageId} className="">
                            <div className="border w-36 rounded-md flex flex-col items-center justify-center">
                              <img
                                src={img?.url}
                                alt="Card"
                                className=""
                                style={{ width: "100%", height: "80px" }}
                              />
                              <button
                                className={`my-1 w-5 ${isDeleteLoading ?  "bg-gray-400":  "bg-red-400"} text-white rounded-sm `}
                                type="button"
                                disabled={isLoading || isDeleteLoading}
                                onClick={() => deleteImage(img?.imageId)}
                                // onClick={() => console.log(img?.imageId)}
                              >
                               <MdDeleteForever size={20} className=''/>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
    
                <button
                  type="submit"
                  className="bg-black text-white px-2 py-1 rounded-md mx-3 my-6 w-24"
                  disabled={isLoading || isDeleteLoading}
                  onClick={submitHandler}
                >
                  {isDeleteLoading? "Deleting..." : isLoading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        
      );
} 
