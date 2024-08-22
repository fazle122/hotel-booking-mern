import axios from "axios";



async function fetchCabinData() {
    var url = `/api/cabins`;
    try{
        const data = await axios({
            method:'get',
            url,
            headers:{
                'Content-Type':'application/json'
            }
        });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
        throw new Error(error);

    }
}


async function fetchCabinDetail(id) {
    var url = `/api/cabins/${id}`;
    try{
        const data = await axios({
            method:'get',
            url,
            headers:{
                'Content-Type':'application/json'
            }
        });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
        throw new Error(error);

    }
}



async function createNewCabin(cabinData) {
    var url = `api/cabins/new`;
    console.log(cabinData);
    const newCabinData = {
        name:cabinData['name'],
        description:cabinData['description'],
        capacity:cabinData['capacity'],
        regularPrice:Number(cabinData['regularPrice']),
        discount:Number(cabinData['discount'])
    }
    console.log(newCabinData);
    try{
        const data = await axios({
            method:'post',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:newCabinData
        });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
        throw new Error(error.response.data.message || error.message);
    }
    
}

async function updateCabinData({id,cabinData}) {
    var url = `api/cabins/${id}`;
    console.log(cabinData);
    console.log(id);
    const newCabinData = {
        name:cabinData.name,
        description:cabinData['description'],
        capacity:cabinData['capacity'],
        regularPrice:Number(cabinData['regularPrice']),
        discount:Number(cabinData['discount'])
    }
    console.log(newCabinData);
    try{
        const data = await axios({
            method:'put',
            url,
            headers:{
                'Content-Type' : 'application/json'
            },
            data:newCabinData
        });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
        throw new Error(error.response.data.message || error.message);
    }
    
}

async function deleteCabin(id){
    var url = `api/cabins/${id}`;

    try{
        const data = await axios({
            method:'delete',
            url,
            headers:{
                'Content-Type':'application/json'
            }
        })
        // console.log(data);
        return data;

    }catch(error){
        console.log(error);
        throw new Error(error.response.data.message || error.message);
    }

}


export {fetchCabinData,fetchCabinDetail,createNewCabin,updateCabinData,deleteCabin}