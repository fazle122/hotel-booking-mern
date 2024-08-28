
import {useNavigate} from 'react-router-dom' 


export default function Fail(){

    const navigate = useNavigate();


    return (
        <div>
            <p>your booking confirmation failed. please try again later</p>
            <button className="px-2 py-1 rounded-md" onClick={() => navigate('/bookins')}>Go back</button>
        </div>
    )
}