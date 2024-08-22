import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
  } from "recharts";




export default function StatusChart(){



    const startData = [
        {
            duration:'1 night',
            value: 5,
            color:"#ef4444"
        },
        {
            duration:'2 night',
            value: 4,
            color:"#f97316"
        },
        {
            duration:'3 night',
            value: 1,
            color:"#eab308"
        },
        {
            duration:'4 night',
            value: 1,
            color:"#84cc16 "
        },
    ]


    return(
        <div className="bg-white rounded-md flex flex-col items-center justify-center">
            <p>status chart</p>
            <ResponsiveContainer width="100%" height={240}>
            <PieChart>
            <Pie
                data={startData}
                nameKey="duration"
                dataKey="value"
                innerRadius={85}
                outerRadius={110}
                cx="40%"
                cy="50%"
                paddingAngle={3}
            >
                {startData.map((entry) => (
                <Cell
                    fill={entry.color}
                    stroke={entry.color}
                    key={entry.duration}
                />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                verticalAlign="middle"
                align="right"
                width="30%"
                layout="vertical"
                iconSize={15}
                iconType="circle"
            />
            </PieChart>
            </ResponsiveContainer>
            
        </div>
    )
}