import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import { backgroundSecond, textstyle } from "../../utils/global"; 

import arrow from '../../../public/arrow.svg'



export default function Info(){

    useEffect(()=>{
        AOS.init();
        AOS.refresh();
    })

    return(
        <div id = "info" className="h-screen w-screen flex flex-col bg-no-repeat relative" style={backgroundSecond}>
            <h1 className="text-[4rem] tracking-wide font-bold opacity-95 mt-[25vh] ml-[7vw] max-w-fit" style = { textstyle }>The world needs awareness regarding<br /> CO2 emmissions.</h1>
            <h1 className="text-[3rem] tracking-wide font-bold opacity-95 ml-[7vw] mt-[7vh] max-w-fit" style = { textstyle }>Although we get some, we don't get the scale of<br /> this problem.</h1>
            <div className="flex flex-row ml-[27vw] mt-[15rem] relative">
                <p className="text-[2.2rem] tracking-wide leading-widest font-bold mr-[5rem] whitespace-nowrap opacity-95" style={textstyle}>3% average <span className="font-black">every year.<br /></span>(1B metric tons)</p>
                <img src={arrow} className="scale-[1.3] -rotate-[16deg]" />
                <div className="h-[24rem] w-[43rem] absolute bottom-0 right-0 mr-[42rem] rounded-2xl flex flex-col opacity-95" style={{backgroundColor: '#00AB66'}}>
                    <h1 className="text-[4rem] font-extrabold underline pl-16 pt-10" style={textstyle}>90%</h1>
                    <p className = "text-[2.4rem] font-bold leading-[3.4rem] opacity-95 pl-16 mt-6" style={textstyle}>Amount of increase of CO2 emissions over the last 30<br /> years.</p>
                </div>
            </div>
        </div>
    )

}