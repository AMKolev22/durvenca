import {useEffect} from "react"
import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { backgroundSecond } from "../../utils/global"
import Card from "./card";

export default function CardArea(){
    return(
        <div className="h-screen w-screen flex flex-row" style={backgroundSecond}>
        <Card 
        theme = {{
            color: '#3457D5',
            heading: 'CO2',
            stats: '>80%',
            info: `increase over 
the last`,
            highlight: '30 years',
        }}/>
        </div>
    )
}