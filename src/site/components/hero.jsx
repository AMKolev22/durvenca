import React from "react"
import "../../utils/tailwind.css"
import { background, textstyle, buttonstyle } from "../../utils/global"


export default function Hero(){


    return(
        <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center bg-no-repeat" id = "hero" style={background} >
            <div className="flex items-center flex-col">
                <p className="text-center font-extrabold text-[12rem] leading-tight tracking-wider opacity-[0.95]" style={textstyle}>Explore a nature<br /> sandbox.</p>
                <p className="text-center font-bold opacity-[0.9] leading-normal tracking-wide text-[1.5rem] pt-4" style={textstyle}>save the world, tree by tree.</p>
                <a className="text-[1.8rem] font-bold opacity-[0.95] block"><p style={buttonstyle}>PLAY</p></a>
            </div>
        </div>
    )
}