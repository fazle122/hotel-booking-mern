/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Tooltip } from '@material-tailwind/react'
import {Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function SalesChart({bookings}){

    // console.log(bookings);
    let saleData1 =[];

    for(var i=0; i<bookings.length; i++){
        const date = new Date(bookings[i].startDate).toISOString().substring(0, 10);
        const existingItem = saleData1.find(el => el.label === date);
        if(existingItem){
            console.log('yes');
            existingItem.totalSales = existingItem.totalSales + bookings[i].totalPrice
        }else{
            const date = new Date(bookings[i].startDate).toISOString().substring(0, 10);
            const newItem = {
                label:date,
                totalSales:bookings[i].totalPrice
            }
            saleData1.push(newItem);
        }
    }
    saleData1.map((data) => console.log(data));
    console.log(saleData1);


    // const saleData = [
    //     {label:"aug 01",totalSales:500},
    //     {label:"aug 02",totalSales:299},
    //     {label:"aug 03",totalSales:342},
    //     {label:"aug 04",totalSales:643},
    //     {label:"aug 05",totalSales:333},
    //     {label:"aug 06",totalSales:534},
    //     {label:"aug 07",totalSales:242},
    //     {label:"aug 08",totalSales:445},
    //     {label:"aug 09",totalSales:354},
    //     {label:"aug 10",totalSales:976},
    //     {label:"aug 11",totalSales:865},
    //     {label:"aug 12",totalSales:556},
    //     {label:"aug 13",totalSales:867},
    //     {label:"aug 14",totalSales:566},
    //     {label:"aug 15",totalSales:865},
    // ]

    // // saleData.map((data) => console.log(data));
    // console.log(saleData);


    return(
        <div className='flex flex-col items-center justify-center bg-white'>
            <p>Sales distribution</p>
            <dic>
                <AreaChart data={saleData1} height={300} width={500}>
                    <XAxis  dataKey="label" />
                    <YAxis unit="$" />
                    <CartesianGrid />
                    <Tooltip />
                    <Area dataKey='totalSales' type="monotone" stroke="blue" fill="gray"/> 
                </AreaChart>
            </dic>
        </div>
    )
}