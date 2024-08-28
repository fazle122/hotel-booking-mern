/* eslint-disable react/prop-types */



export default function ConfirmCheckBox({title,value,onClick}){


    return(

        <div className="flex space-x-4">
            <input disabled={value} checked ={value} type="checkbox"  onChange={onClick}/>
            <label>{title}</label>
        </div>
    )
}