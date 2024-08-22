
import { Tooltip } from '@material-tailwind/react'
import {Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function SalesChart(){

    const saleData = [
        {label:"aug 01",totalSales:500,extraSales:20},
        {label:"aug 02",totalSales:299,extraSales:56},
        {label:"aug 03",totalSales:342,extraSales:64},
        {label:"aug 04",totalSales:643,extraSales:75},
        {label:"aug 05",totalSales:333,extraSales:86},
        {label:"aug 06",totalSales:534,extraSales:45},
        {label:"aug 07",totalSales:242,extraSales:86},
        {label:"aug 08",totalSales:445,extraSales:45},
        {label:"aug 09",totalSales:354,extraSales:43},
        {label:"aug 10",totalSales:976,extraSales:86},
        {label:"aug 11",totalSales:865,extraSales:20},
        {label:"aug 12",totalSales:556,extraSales:34},
        {label:"aug 13",totalSales:867,extraSales:56},
        {label:"aug 14",totalSales:566,extraSales:20},
        {label:"aug 15",totalSales:865,extraSales:86},
    ]

    return(
        <div>
            <p>chart</p>
            <dic>
                <AreaChart data={saleData} height={400} width={700}>
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