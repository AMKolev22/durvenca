import {useEffect} from "react"
import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { backgroundSecond } from "../../utils/global"
import Card from "./card";

export default function CardArea(){
    return(
        <div className="h-screen w-screen flex flex-row gap-14 pl-[10vw]" style={backgroundSecond} id = "card-area">
        <Card 
        theme = {{
            color: '#3457D5',
            heading: 'CO2',
            stats: '>80%',
            info: `increase over 
the last`,
            highlight: '30 years',
        }}/>
        <Card 
        theme = {{
            color: '#FF6B00',
            heading: 'Temps',
            stats: '9X',
            info: `warmest year in 
a row`,
            highlight: '(2014-2022)',
        }}/>
        <Card 
        theme = {{
            color: '#00AB66',
            heading: 'Forestation',
            stats: '10M',
            info: `acres of forest has 
been lost in`,
            highlight: '2022',
        }}/>
        </div>
    )
}