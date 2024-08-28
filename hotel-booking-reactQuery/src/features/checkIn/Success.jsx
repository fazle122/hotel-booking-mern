
import {useNavigate} from 'react-router-dom' 
import {useParams} from 'react-router-dom'


export default function Success(){

    const params = useParams();
    

    const navigate = useNavigate();

    return (
        <div>
            <p>your booking is confirmed</p>
            <p>{`Booking id: ${params.id}`}</p>
            <button className="px-2 py-1 rounded-md" onClick={() => navigate('/')}>Go back</button>
        </div>
    )
}