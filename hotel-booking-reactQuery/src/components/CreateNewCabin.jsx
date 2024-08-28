/* eslint-disable react/prop-types */

import {useForm} from 'react-hook-form'
import { useCreateNewCabin, useUpdateCabin } from '../features/cabin/useCabin';
import ImageUploader from './ImageUploader';


export default function CreateNewForm({cabin = {},handleOpen}){

    const {_id, ...cabinData} = cabin;
    const isEditing = Boolean(_id);
    const {createNew,isPending} = useCreateNewCabin();
    const {updateCabin,isPending:isEditingCabin} = useUpdateCabin();
    const {register,handleSubmit,reset,getValues,formState:{errors,isSubmitting}} = useForm({
        defaultValues:isEditing? cabinData :{}
    });


    const capacityOptions = [
        { value: '', label: 'Select' },
        { value: 1, label: 'one' },
        { value: 2, label: 'two'},
        { value: 3, label: 'three' },
        { value: 4, label: 'four' },
      ]


    function onSubmit(data){
        console.log(data);
        if(isEditing){
            updateCabin({id:_id,cabinData:data})
            handleOpen();
        }else{
            createNew(data);
            handleOpen();
        }
        reset();
        
    }



    return(
        <div className='bg-slate-300'>
            <form onSubmit={handleSubmit(onSubmit)}className='px-12 py-4 space-y-8'>
                <div className='space-x-8 flex items-center justify-between'>
                    <label>Cabin name</label>
                    <div>
                        <input 
                            type="text" name="name" placeholder="cabin name" 
                            className="px-4 border rounded-md w-72 h-10"
                            {...register("name",{
                                required:"please enter cabin name",
                                minLength:{value:10,message:'name must be more than 10 character'}
                            })}
                        />
                        {errors?.name?.message && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                </div>
                <div className='space-x-8 flex items-center justify-between'>
                    <label>Description</label>
                    <div>
                        <input 
                            type="text" name="description" placeholder="cabin description" 
                            className="px-4 border rounded-md w-72 h-10"
                            {...register("description",{required:"please enter cabin description",maxLength:100})}
                        />
                        {errors?.description?.message && <p className='text-red-600'>{errors.description.message}</p>}
                    </div>
                </div>
                <div className='space-x-8 flex items-center justify-between'>
                    <label>Capacity</label>
                    <div>
                        <select 
                            name='capacity'
                            // defaultValue={capacity[1]} 
                            className="border rounded  px-4 py-2 w-72" 
                            {...register('capacity',{required:"capacity is required"})}
                        >
                            {capacityOptions.map((cap) => <option key={cap.value} value={cap.value}>{cap.label}</option>)}
                        </select>
                        {errors?.capacity?.message && <p className='text-red-600'>{errors.capacity.message}</p>}
                    </div>
                </div>
                <div className='space-x-8 flex items-center justify-between'>
                    <label>Regular price</label>
                    <div>
                        <input 
                            type="number" name="regularPrice" placeholder="cabin price" 
                            className="px-4 border rounded-md w-72 h-10"
                            {...register("regularPrice",{required:"please enter cabin price"})}
                        />
                        {errors?.regularPrice?.message && <p className='text-red-600'>{errors.regularPrice.message}</p>}
                    </div>
                </div>
                <div className='space-x-8 flex items-center justify-between'>
                    <label>Discount</label>
                    <div>
                        <input 
                            type="number" name="discount" placeholder="discount" 
                            className="px-4 border rounded-md w-72 h-10"
                            {...register("discount",{
                                required:"please enter discount",
                                validate:(value) => 
                                    value <= getValues().regularPrice || "discount should be less than price"

                            })}
                        />
                        {errors?.discount?.message && <p className='text-red-600'>{errors.discount.message}</p>}
                    </div>
                </div>
                {
                    isEditing && <div>
                        <ImageUploader handleOpen={handleOpen} id={_id}/>
                    </div>
                }
                <div className='space-x-4'>
                    <button type='reset' className='px-2 py-1 border-4 rounded-md'>Cancel</button>
                    <button disabled={isPending && isSubmitting && isEditingCabin} className='px-2 py-1 border-4 rounded-md'>{isEditing ? 'Edit cabin' : 'Add cabin'}</button>
                </div>
            </form>
        </div>
    )
}