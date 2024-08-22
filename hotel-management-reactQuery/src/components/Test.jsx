/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */





export default function Text({bookings,bookData,stayData}){
    // console.log('data form text',data);

    return(
        <div>
            
            <div>
                <p>All bookings </p>
                {bookings.map((d) => <p key={d._id}>{d.totalPrice}</p>)}
            </div>
            <div>
                <p>Booked bookings</p>
                {bookData?.map((d) => <p key={d._id}>{d.totalPrice}</p>)}
            </div>
            <div>
                <p>Stay bookings</p>
                {stayData?.map((d) => <p key={d._id}>{d.totalPrice}</p>)}
            </div>
        </div>
    )
}