import axios from "axios";




async function getSettingsData() {
    const url = `/api/settings`;
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



export {getSettingsData}