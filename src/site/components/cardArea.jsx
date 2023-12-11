import {useEffect} from "react"
import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { backgroundSecond, textstyle } from "../../utils/global"
import Card from "./card";

export default function CardArea(){
    return(
        <div className="w-screen h-screen pt-[10rem]" style={backgroundSecond}>
            <h2 className="text-[6rem] font-bold tracking-wide opacity-95 mb-[15vh] pl-[10vw] leading-tight" style={textstyle}>There are a lot of problems <br /> going on including:</h2>
            <div className="flex flex-row gap-16 pl-[10vw]" id = "card-area">
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
been lost in 2022`,
            highlight: 'alone',
        }}/>
        
        <Card
        theme = {{
            color: '#00AB66',
            heading: 'Cold',
            stats: '45+',
            info: `years since we've had ,
             a colder-than-average year` ,
        }}/>
            </div>
        </div>
    )
}
         
